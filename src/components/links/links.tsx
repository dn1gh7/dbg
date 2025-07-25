import { lol } from './linkCollection';

export default function Links() {
  return (
    <>
      <div className="md:grid md:grid-cols-2 sm:gap-5 md:gap-10 body-text">
        {lol.map((category, i) => (
          <section key={i} className="">
            <h2 className=" subheading text-white p-1 bg-cambridge">
              {category.title}
            </h2>
            <ul className="   ml-5 mb-5 list-disc marker:text-cambridge">
              {category.links.map((link, j) => (
                <li key={j} className="pb-2">
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
