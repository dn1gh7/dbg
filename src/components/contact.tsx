import { Globe, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <>
      <p>
        Deutsch-Bulgarische Gesellschaft zur Förderung der Beziehungen zwischen
        Deutschland und Bulgarien e.V.{' '}
      </p>
      <strong>Präsidentin</strong>
      <p>Dr. Sigrun Comati</p>
      <p>Postfach 1207, 65402 Rüsselsheim</p>
      <p>
        <a className=" " href="">
          <Mail className="inline" />
          <span className="underline ml-2 hover:bg-cambridge visited:text-visited">
            comati@t-online.de
          </span>
        </a>
      </p>
      <p>
        <Globe className="inline" />
        <a
          href="https://comati.de/"
          target="_blank"
          className="underline ml-2 hover:bg-cambridge visited:text-visited"
        >
          www.comati.de
        </a>
      </p>
      <strong>Vizepräsident</strong>
      <p>Prof. Dr. Raiko Krauß</p>
      <p>
        Institut für Ur- und Frühgeschichte und Archäologie des Mittelalters
      </p>
      <p>Hohentübingen, Burgsteige 11</p>
      <p>72070 Tübingen</p>
      <p>
        <a className=" " href="">
          <Mail className="inline" />
          <span className="underline ml-2 hover:bg-cambridge visited:text-visited">
            raiko.krauss@uni-tuebingen.de
          </span>
        </a>
      </p>
      <p>
        <Globe className="inline" />
        <a
          className="underline ml-2 hover:bg-cambridge visited:text-visited"
          href="https://uni-tuebingen.de/fakultaeten/philosophische-fakultaet/fachbereiche/altertums-und-kunstwissenschaften/ur-und-fruehgeschichte-und-archaeologie-des-mittelalters/abteilungen/juengere-urgeschichte/mitarbeiter/nach-funktion/krauss-raiko-prof-dr/"
        >
          Raiko Krauß @ Universität Tübingen
        </a>
      </p>

      <strong>Geschäftsführerin</strong>
      <p>Sabine Lefèvre</p>
      <p>Rießerseestr. 5</p>
      <p>12527 Berlin</p>
      <p>
        <a className=" " href="">
          <Mail className="inline" />
          <span className="underline ml-2 hover:bg-cambridge visited:text-visited">
            sabine.lefevre@hu-berlin.de
          </span>
        </a>
      </p>
    </>
  );
}
