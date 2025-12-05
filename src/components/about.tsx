import { Link, Outlet } from 'react-router';
import { PRESIDIUM } from '../globlas';

export default function About() {
  return (
    <>
      <div className="h-full flex flex-col body-text justify-between">
        <div className="flex flex-col gap-4">
          <p>
            Die „Deutsch-Bulgarische Gesellschaft zur Förderung der Beziehungen
            zwischen Deutschland und Bulgarien e. V.“ mit Sitz in Berlin wurde
            am 1. Dezember 1995 als gemeinnütziger Verein in Marburg auf
            Initiative von Wolfgang Gesemann und Helmut Schaller gegründet. Am
            31. Mai 1996 fand in der Staatsbibliothek zu Berlin/Preußischer
            Kulturbesitz die erste und damit konstituierende
            Mitgliederversammlung der Gesellschaft statt.
          </p>

          <p>
            Ziel der Gesellschaft, die als private, unabhängige und
            überparteiliche Vereinigung arbeitet, ist die Unterstützung und
            Förderung wissenschaftlicher und kultureller Beziehungen zwischen
            Deutschland und Bulgarien, insbesondere auf sprach-, literatur- und
            kulturwissenschaftlichem Gebiet. Die Schwerpunkte des Wirkens liegen
            auf der Veröffentlichung von einschlägiger Literatur,
            Vortragsveranstaltungen, Symposien und Ausstellungen zu und über
            Bulgarien aus verschiedenen Bereichen der Wissenschaft und Kultur.
            Die Gesellschaft ist seit ihrer Gründung bestrebt, über die
            Beziehungen zwischen Deutschland und Bulgarien hinaus weitere
            FachvertreterInnen und Institutionen im Ausland für eine
            Zusammenarbeit zu gewinnen. Die Gesellschaft steht allen an
            Bulgarien Interessierten offen. Auch Institutionen, Vereine und
            Firmen können Mitglied werden.
          </p>

          <div className="flex flex-2 justify-center items-center bg-[url(/images/flower.JPG)] bg-cover bg-bottom min-h-[400px]">
            <Link
              className="self-center w-fit text-center rounded-md  p-3 mx-3 bg-cambridge font-semibold hover:bg-periwinkleh transition:bg transition delay-50 duration-200 ease-in text-white"
              to="/membership"
            >
              <span>Unterstützen auch Sie unsere Arbeit </span>
              <span className="hidden xl:inline">
                und werden Sie Mitglied der Deutsch-Bulgarischen Gesellschaft
              </span>
            </Link>
          </div>

          <p>
            Die Gesellschaft versteht sich als Mittlerin auch im Sinne der
            Ausgestaltung eines erweiterten Europa und eines anzustrebenden
            europäischen Bewusstseins der Bürger der Europäischen Union. Sie
            vertritt dabei den Standpunkt, dass dies nicht mit politischen,
            ökonomischen und finanziellen Kompetenzen allein erreicht werden
            kann. Wie schon die Romantik erkannte, sind Völker lebendige
            Organismen, in denen verschiedene geistige, kulturelle und religiöse
            Kräfte wirksam sind. Geistes- und ideengeschichtliche
            Kulturkompetenz in erheblichem Maß sind daher unabdingbare
            Voraussetzungen für ein europäisches Gelingen. Die
            „Deutsch-Bulgarische Gesellschaft e. V.“ versteht sich insofern auch
            als „Kompetenzteam“ für diese Fragen. Um hierin Erfolg zu haben, ist
            sie auf ihre Mitglieder angewiesen, die Anregungen geben, aber auch
            nehmen wollen. Es ist daher Anliegen der Gesellschaft, Mitglieder
            aus den verschiedensten Bereichen des wissenschaftlichen,
            kulturellen, politischen und wirtschaftlichen Lebens zu gewinnen, um
            eine möglichst breite sachliche und fachlich versierte Wirkung zu
            erzielen.
          </p>
        </div>

        <div>
          <h3 className="text-center subheading">Präsidium</h3>
          <ul className="sm:grid grid-cols-3">
            {PRESIDIUM.map(({ title, name }, i) => (
              <li
                key={i}
                className="flex flex-col items-center text-center p-4"
              >
                {title ? (
                  <>
                    <div className="text-sm text-gray-500">{title}</div>
                    <div className="">{name}</div>
                  </>
                ) : (
                  <>
                    <div className="text-sm hidden md:block">&nbsp;</div>
                    <div>{name}</div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
}
