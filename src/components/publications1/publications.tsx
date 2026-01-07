import { bulgarica, bibliothek } from './publications_paths';

import 'swiper/css';
import 'swiper/css/navigation';

import PublicationSwiper from './publicationsSwiper';
// import 'swiper/css/pagination';

export interface Publication {
  title: string;
  description?: string;
  pdf_path: string;
  pdf_path1: string;
  pdf_path2: string;
  img_path: string;
}

export default function Publications() {
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
        <section className="mb-5 md:mb-15">
          <h2 className="subheading bg-cambridge p-2 text-white">
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
          ></PublicationSwiper>
        </section>
        <section className="my-5 md:my-15  flex flex-col">
          <div className="bg-cambridge p-2 items-center md:flex justify-between mb-3">
            <h2 className="subheading block md:inline mb-2 sm:mb-0 text-white">
              Bulgarien Jahrbuch (seit 2017 Bulgarica)
            </h2>
            <a
              href="/Richtlinien_BJ.pdf"
              target="_blank"
              className=" bg-white text-cambridge rounded-md block md:inline text-center p-2 sm:w-fit "
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
          ></PublicationSwiper>
        </section>

        <section className="my-5 md:my-15  ">
          <h2 className="subheading bg-cambridge text-white p-2">
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
