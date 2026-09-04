import 'swiper/css';
import 'swiper/css/navigation';

import { useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';

import PublicationSwiper from './publicationsSwiper';
import { publicationSlug } from './slug';
import { useCmsPublicationsBibliothek, useCmsPublicationsBulgarica } from '../../hooks/useCms';
// import 'swiper/css/pagination';

/** The series a publication belongs to. Only `bulgarica` and `bibliothek` are
 *  listed on the publications page; `forum` is described there in prose only. */
export type PublicationCategory = 'bulgarica' | 'bibliothek' | 'forum';

export interface Publication {
  title: string;
  description?: string;
  category?: PublicationCategory;
  pdf_path: string;
  pdf_path1: string;
  pdf_path2: string;
  img_path: string;
}

export default function Publications() {
  const { data: bibliothek } = useCmsPublicationsBibliothek();
  const { data: bulgarica } = useCmsPublicationsBulgarica();
  const { hash } = useLocation();

  // The home page links here as /publications#<slug>. Which series that slug lives
  // in only becomes knowable once the CMS lists have loaded, so this is derived
  // rather than resolved once on mount.
  const target = useMemo(() => {
    const slug = decodeURIComponent(hash.replace(/^#/, ''));
    if (!slug) return null;
    for (const [section, list] of [
      ['bibliothek', bibliothek],
      ['bulgarica', bulgarica],
    ] as const) {
      if (list.some((p) => publicationSlug(p) === slug)) return { section, slug };
    }
    return null;
  }, [hash, bibliothek, bulgarica]);

  useEffect(() => {
    if (!target) return;
    document
      .getElementById(target.section)
      ?.scrollIntoView({ block: 'start', behavior: 'smooth' });
  }, [target]);

  return (
    <>
      <div className="body-text min-w-0 w-full">
        <p className="">
          Die Schriften der Deutsch-Bulgarischen Gesellschaft werden seit 2004
          von der „Dr. Horst Röhling-Stiftung“ gefördert. Die Stiftung wurde von
          unserem Ehrenmitglied Dr. Horst Röhling (1929-2017) beim Förderfonds
          des Stifterverbandes für die Deutsche Wissenschaft eingerichtet. Sie
          dient der Förderung von Wissenschaft und Forschung, insbesondere der
          Beziehungen zwischen Deutschland und Bulgarien.
        </p>
        <section id="bibliothek" className="mb-5 md:mb-15 scroll-mt-24 md:scroll-mt-8">
          <h2 className="section-heading">
            Bulgarische Bibliothek
          </h2>
          <p>
            In der 1916 von dem führenden Balkanologen und Bulgaristen Gustav
            Weigand in Leipzig begründeten „Bulgarischen Bibliothek“ erschienen
            bis 1919 insgesamt neun Bände zu verschiedenen bulgaristischen
            Themen, darunter die bulgarischen Volkslieder von Penčo Slavejkov.
            Diese Reihe wird seit 1996 im Sinne Gustav Weigands fortgesetzt,
            beginnend mit dem unveränderten Nachdruck der kommentierten Ausgabe
            der „Zweiundsiebzig Lieder des bulgarischen Volkes“ von Gerhard
            Gesemann, in „Neuer Folge“ zunächst vom Biblion Verlag in Marburg,
            dann in München, jetzt vom Verlag Otto Sagner München/Berlin
            fortgesetzt. Neben Fachbüchern und wissenschaftlichen Abhandlungen
            steht in dieser Reihe auch bulgarische Literatur in deutscher
            Übersetzung im Mittelpunkt.
          </p>
          <PublicationSwiper
            instanceId="bibliothek"
            themeColor="#b8ccf2"
            publications={bibliothek}
            focusSlug={target?.section === 'bibliothek' ? target.slug : undefined}
          ></PublicationSwiper>
        </section>
        <section
          id="bulgarica"
          className="my-5 md:my-15 flex flex-col scroll-mt-24 md:scroll-mt-8"
        >
          <div className="section-heading flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <h2 className="subheading">
              Bulgarien Jahrbuch (seit 2017 Bulgarica)
            </h2>
            <a
              href="/Richtlinien_BJ.pdf"
              target="_blank"
              className="btn-secondary shrink-0 text-sm"
            >
              Richtlinien zur Veröffentlichung
            </a>
          </div>
          <p>
            Das Bulgarien-Jahrbuch, seit 2017 fortgeführt als Bulgarica, ist das
            Informationsorgan der Gesellschaft. Es bietet aktuelle Beiträge zu
            verschiedenen, auf Bulgarien bezogenen Themenbereichen wie: Sprache,
            Kultur, Archäologie, Geschichte, Wirtschaft und Politik und stellt
            in einem Anzeigen- und Besprechungsteil die aktuelle
            Bulgarienliteratur vor.
          </p>

          <PublicationSwiper
            instanceId="bulgarica"
            themeColor="#b8ccf2"
            publications={bulgarica}
            focusSlug={target?.section === 'bulgarica' ? target.slug : undefined}
          ></PublicationSwiper>
        </section>

        <section id="forum" className="my-5 md:my-15 scroll-mt-24 md:scroll-mt-8">
          <h2 className="section-heading">
            Forum: Bulgarien
          </h2>
          <p>
            Herausgegeben durch: Sigrun Comati, Thede Kahl, Helmut Schaller
            Verlag: Frank & Timme, Berlin.
          </p>
          <p>
            Forum: Bulgarien bietet Monographien, Handbüchern und Sammelwerken
            zu Sprache, Literatur und Gesellschaft Bulgariens ein Podium.
            Thematische Schwerpunkte liegen auf den Fachgebieten Slavistik,
            Kulturwissenschaften, Sprachwissenschaft, Literaturwissenschaft,
            Geschichte und Altertumswissenschaft, Politikwissenschaft und
            Soziologie.
          </p>
        </section>
      </div>
    </>
  );
}
