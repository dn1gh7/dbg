import { useEffect, useState } from 'react';
import { isStrapiConfigured } from '../lib/strapi/config';
import {
  fetchCmsEventById,
  fetchCmsEvents,
  fetchCmsHomePublications,
  fetchCmsLinkSections,
  fetchCmsPresidium,
  fetchCmsPublicationsByCategory,
  type CmsEvent,
  type LinkSection,
} from '../lib/strapi/queries';
import type { PresidiumMember } from '../globlas';
import type { Publication } from '../components/publications1/publications';
import { STATIC_PRESIDIUM } from '../globlas';
import {
  STATIC_BIBLIOTHEK,
  STATIC_BULGARICA,
  STATIC_OTHERS,
} from '../components/publications1/publications_paths';
import { lol as staticLinkGroups } from '../components/links/linkCollection';

type AsyncState<T> = {
  data: T;
  loading: boolean;
  fromCms: boolean;
};

function useCmsList<T>(
  staticFallback: T,
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[] = [],
): AsyncState<T> {
  const configured = isStrapiConfigured();
  const [data, setData] = useState<T>(staticFallback);
  const [loading, setLoading] = useState(configured);
  const [fromCms, setFromCms] = useState(false);

  useEffect(() => {
    if (!configured) {
      setData(staticFallback);
      setLoading(false);
      setFromCms(false);
      return;
    }

    const ac = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const next = await fetcher(ac.signal);
        if (!ac.signal.aborted) {
          setData(next);
          setFromCms(true);
        }
      } catch {
        if (!ac.signal.aborted) {
          setData(staticFallback);
          setFromCms(false);
        }
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- staticFallback is stable per call site
  }, [configured, ...deps]);

  return { data, loading, fromCms };
}

export function useCmsEvents(): AsyncState<CmsEvent[]> {
  return useCmsList<CmsEvent[]>([], fetchCmsEvents, []);
}

export function useCmsPresidium(): AsyncState<PresidiumMember[]> {
  return useCmsList(STATIC_PRESIDIUM, fetchCmsPresidium, []);
}

export function useCmsPublicationsBulgarica(): AsyncState<Publication[]> {
  return useCmsList(STATIC_BULGARICA, (s) => fetchCmsPublicationsByCategory('bulgarica', s), []);
}

export function useCmsPublicationsBibliothek(): AsyncState<Publication[]> {
  return useCmsList(STATIC_BIBLIOTHEK, (s) => fetchCmsPublicationsByCategory('bibliothek', s), []);
}

export function useCmsHomeReading(): AsyncState<Publication[]> {
  const staticHome: Publication[] = [
    {
      title: 'Bulgarica 7',
      pdf_path: '',
      pdf_path1: '',
      pdf_path2: '',
      img_path: '/publications/bulgarica_7.jpg',
    },
    {
      title: 'Bulgarica 6',
      pdf_path: '',
      pdf_path1: '',
      pdf_path2: '',
      img_path: '/publications/9783954771769_g.jpg',
    },
    STATIC_OTHERS[0],
  ];
  return useCmsList(staticHome, fetchCmsHomePublications, []);
}

export function useCmsLinkSections(): AsyncState<LinkSection[]> {
  return useCmsList(staticLinkGroups, fetchCmsLinkSections, []);
}

type EventDetailState =
  | { status: 'loading'; event: null }
  | { status: 'ready'; event: CmsEvent | null };

export function useCmsEventDetail(eventId: string | undefined): EventDetailState {
  const configured = isStrapiConfigured();
  const [state, setState] = useState<EventDetailState>({ status: 'loading', event: null });

  useEffect(() => {
    if (!eventId) {
      setState({ status: 'ready', event: null });
      return;
    }

    if (!configured) {
      setState({ status: 'ready', event: null });
      return;
    }

    const ac = new AbortController();
    setState({ status: 'loading', event: null });

    (async () => {
      try {
        const ev = await fetchCmsEventById(eventId, ac.signal);
        if (ac.signal.aborted) return;
        setState({ status: 'ready', event: ev });
      } catch {
        if (ac.signal.aborted) return;
        setState({ status: 'ready', event: null });
      }
    })();

    return () => ac.abort();
  }, [eventId, configured]);

  return state;
}
