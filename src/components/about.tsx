import { Link, Outlet } from 'react-router';
import { useCmsPresidium } from '../hooks/useCms';

export default function About() {
  const { data: presidium } = useCmsPresidium();
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

          <div className="my-4 flex flex-2 justify-center items-center rounded-md bg-[url(/images/flower.JPG)] bg-cover bg-bottom min-h-[320px]">
            <Link
              className="btn-primary mx-3"
              to="/membership"
            >
              <span>Unterstützen auch Sie unsere Arbeit </span>
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

        <div className="mt-12">
          <h2 className="section-heading">Präsidium</h2>
          <ul className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {presidium.map(({ title, name }, i) => (
              <li key={i} className="text-center">
                <div className="text-sm uppercase tracking-wide text-ink-muted">
                  {title ?? ' '}
                </div>
                <div className="mt-0.5 font-medium text-brand-900">{name}</div>
              </li>
            ))}
          </ul>
        </div>

        <Outlet />
      </div>
    </>
  );
}
