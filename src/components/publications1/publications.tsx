import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { bulgarica, bibliothek } from './publications_paths';
import { BASE_URL } from '../../globlas';

import 'swiper/css';
import 'swiper/css/navigation';

interface Publications {
  title: string;
  pdf_path: string;
  img_path: string;
}

//420x596

export default function Publications() {
  return (
    <>
      <div className=" min-w-0">
        <h3>
          Die Schriften der Deutsch-Bulgarischen Gesellschaft werden seit 2004
          von der „Dr. Horst Röhling-Stiftung“ gefördert. Die Stiftung wurde von
          unserem Ehrenmitglied Dr. Horst Röhling (1929-2017) beim Förderfonds
          des Stifterverbandes für die Deutsche Wissenschaft eingerichtet. Sie
          dient der Förderung von Wissenschaft und Forschung, insbesondere der
          Beziehungen zwischen Deutschland und Bulgarien.
        </h3>
        <section className="my-15  p-10">
          <h2 className="text-xl">Bulgarische Bibliothek</h2>
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
          <Swiper
            className="min-w-0 w-full"
            slidesPerView={4}
            modules={[Navigation]}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {bibliothek.map((p, i) => (
              <SwiperSlide className=" min-w-0" key={i}>
                <div className="flex justify-center">
                  <img
                    className="hover:grayscale-100 object-contain max-h-full"
                    src={BASE_URL + p.img_path}
                    alt={p.title}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="my-15  p-10">
          <h2 className="text-xl">Bulgarien Jahrbuch (seit 2017 Bulgarica)</h2>
          <p>
            Das Bulgarien-Jahrbuch, seit 2017 fortgeführt als Bulgarica, ist das
            Informationsorgan der Gesellschaft. Es bietet aktuelle Beiträge zu
            verschiedenen, auf Bulgarien bezogenen Themenbereichen wie: Sprache,
            Kultur, Archäologie, Geschichte, Wirtschaft und Politik und stellt
            in einem Anzeigen- und Besprechungsteil die aktuelle
            Bulgarienliteratur vor.
          </p>
          <Swiper
            className="min-w-0"
            spaceBetween={15}
            slidesPerView={4}
            modules={[Navigation]}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {bulgarica.map((p, i) => (
              <SwiperSlide key={i}>
                <div className="flex justify-center">
                  <a href="/9783954770779_f.pdf">
                    <img
                      className="hover:grayscale-100"
                      src={BASE_URL + p.img_path}
                      alt={p.title}
                    />
                  </a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="my-15  p-10">
          <h2 className="text-xl">Forum: Bulgarien</h2>
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
