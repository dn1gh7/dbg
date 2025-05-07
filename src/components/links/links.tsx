import { lol } from './linkCollection';

export default function Links() {
  return (
    <>
      <div className="md:grid md:grid-cols-2">
        {lol.map((category, i) => (
          <section key={i} className="">
            <h2 className="mb-3">{category.title}</h2>
            <ul className="   ml-5 mb-5 list-disc marker:text-cambridge">
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
      </div>
    </>
  );
}
