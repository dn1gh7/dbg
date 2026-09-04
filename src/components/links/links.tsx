import { useCmsLinkSections } from '../../hooks/useCms';

export default function Links() {
  const { data: sections } = useCmsLinkSections();

  return (
    <>
      <div className="md:grid md:grid-cols-2 md:gap-x-10 body-text">
        {sections.map((category, i) => (
          <section key={i} className="">
            <h2 className="section-heading">
              {category.title}
            </h2>
            <ul className="ml-5 mb-8 list-disc space-y-2 marker:text-brand-500">
              {category.links.map((link, j) => (
                <li key={j}>
                  <a
                    className="link-inline"
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
