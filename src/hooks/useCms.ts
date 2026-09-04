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
import type { PresidiumMember } from '../globals';
import type { Publication } from '../components/publications/publications';
import { STATIC_CMS_EVENTS, STATIC_PRESIDIUM } from '../globals';
import {
  STATIC_BIBLIOTHEK,
  STATIC_BULGARICA,
  STATIC_OTHERS,
} from '../components/publications/publications_paths';
import { STATIC_LINK_SECTIONS } from '../components/links/linkCollection';

type AsyncState<T> = {
  data: T;
  loading: boolean;
  fromCms: boolean;
  error: Error | null;
};

function isAbort(err: unknown): boolean {
  return err instanceof DOMException && err.name === 'AbortError';
}

/** Surface CMS failures instead of silently falling back — a blank section with no
 * explanation was the hardest part of this integration to debug. */
function reportCmsFailure(label: string, err: unknown): Error {
  const error = err instanceof Error ? err : new Error(String(err));
  console.warn(
    `[cms] ${label} failed, falling back to built-in content: ${error.message}`
  );
  return error;
}

function useCmsList<T>(
  label: string,
  staticFallback: T,
  fetcher: (signal: AbortSignal) => Promise<T>,
  deps: unknown[] = []
): AsyncState<T> {
  const configured = isStrapiConfigured();
  const [data, setData] = useState<T>(staticFallback);
  const [loading, setLoading] = useState(configured);
  const [fromCms, setFromCms] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!configured) {
      setData(staticFallback);
      setLoading(false);
      setFromCms(false);
      setError(null);
      return;
    }

    const ac = new AbortController();
    setLoading(true);

    (async () => {
      try {
        const next = await fetcher(ac.signal);
        if (ac.signal.aborted) return;
        setData(next);
        setFromCms(true);
        setError(null);
      } catch (err) {
        if (ac.signal.aborted || isAbort(err)) return;
        setData(staticFallback);
        setFromCms(false);
        setError(reportCmsFailure(label, err));
      } finally {
        if (!ac.signal.aborted) setLoading(false);
      }
    })();

    return () => ac.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- staticFallback is stable per call site
  }, [configured, ...deps]);

  return { data, loading, fromCms, error };
}

export function useCmsEvents(): AsyncState<CmsEvent[]> {
  return useCmsList<CmsEvent[]>(
    'events',
    STATIC_CMS_EVENTS,
    fetchCmsEvents,
    []
  );
}

export function useCmsPresidium(): AsyncState<PresidiumMember[]> {
  return useCmsList('presidium', STATIC_PRESIDIUM, fetchCmsPresidium, []);
}

export function useCmsPublicationsBulgarica(): AsyncState<Publication[]> {
  return useCmsList(
    'publications (bulgarica)',
    STATIC_BULGARICA,
    (s) => fetchCmsPublicationsByCategory('bulgarica', s),
    []
  );
}

export function useCmsPublicationsBibliothek(): AsyncState<Publication[]> {
  return useCmsList(
    'publications (bibliothek)',
    STATIC_BIBLIOTHEK,
    (s) => fetchCmsPublicationsByCategory('bibliothek', s),
    []
  );
}

const STATIC_HOME_READING: Publication[] = [
  {
    title: 'Bulgarica 7',
    category: 'bulgarica',
    pdf_path: '',
    pdf_path1: '',
    pdf_path2: '',
    img_path: '/publications/bulgarica_7.jpg',
  },
  {
    title: 'Bulgarica 6',
    category: 'bulgarica',
    pdf_path: '',
    pdf_path1: '',
    pdf_path2: '',
    img_path: '/publications/9783954771769_g.jpg',
  },
  // No category: this one is a review in an outside journal, not a DBG series title,
  // so the home page links it to its source rather than to /publications.
  STATIC_OTHERS[0],
];

export function useCmsHomeReading(): AsyncState<Publication[]> {
  return useCmsList(
    'home publications',
    STATIC_HOME_READING,
    fetchCmsHomePublications,
    []
  );
}

export function useCmsLinkSections(): AsyncState<LinkSection[]> {
  return useCmsList(
    'link sections',
    STATIC_LINK_SECTIONS,
    fetchCmsLinkSections,
    []
  );
}

type EventDetailState = {
  status: 'loading' | 'ready';
  event: CmsEvent | null;
};

export function useCmsEventDetail(
  eventId: string | undefined
): EventDetailState {
  const configured = isStrapiConfigured();
  const [state, setState] = useState<EventDetailState>({
    status: 'loading',
    event: null,
  });

  useEffect(() => {
    if (!eventId) {
      setState({ status: 'ready', event: null });
      return;
    }

    // Without a CMS the detail page can still serve the built-in events.
    if (!configured) {
      setState({
        status: 'ready',
        event: STATIC_CMS_EVENTS.find((e) => e.id === eventId) ?? null,
      });
      return;
    }

    const ac = new AbortController();
    setState({ status: 'loading', event: null });

    (async () => {
      try {
        const ev = await fetchCmsEventById(eventId, ac.signal);
        if (ac.signal.aborted) return;
        setState({ status: 'ready', event: ev });
      } catch (err) {
        if (ac.signal.aborted || isAbort(err)) return;
        reportCmsFailure(`event ${eventId}`, err);
        setState({
          status: 'ready',
          event: STATIC_CMS_EVENTS.find((e) => e.id === eventId) ?? null,
        });
      }
    })();

    return () => ac.abort();
  }, [eventId, configured]);

  return state;
}
