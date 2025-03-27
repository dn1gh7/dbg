import React from 'react';
import { lol } from './linkCollection';

export default function Links() {
  return (
    <>
      {lol.map((category, i) => (
        <section>
          <h2 className="mt-10 mb-3">{category.title}</h2>
          <ul className="ml-5">
            {category.links.map((link, i) => (
              <li>
                <a
                  className="underline hover:bg-blue-100 visited:text-visited"
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
