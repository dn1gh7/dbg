import { lol } from './linkCollection';

export default function Links() {
  return (
    <>
      {lol.map((category, i) => (
        <section key={i}>
          <h2 className="mt-10 mb-3">{category.title}</h2>
          <ul className="ml-5 list-disc marker:text-cambridge">
            {category.links.map((link, j) => (
              <li key={j}>
                <a
                  className="underline hover:bg-cambridge visited:text-visited"
                  target="_blank"
                  href={link.ref}
                >
                  {link.text}
                </a>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
}
