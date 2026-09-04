interface ContentContainerProps {
  children: React.ReactNode;

  handleHamburgerClick: () => void;
  title?: string;
}

export default function ContentContainer({
  children,
  title,

  handleHamburgerClick,
}: ContentContainerProps) {
  return (
    <div className="w-full md:flex-8 min-w-0 md:pl-70">
      <div className="bg-white min-w-0">
        <header className="flex flex-row h-20 md:h-32 md:space-x-6 sticky top-0 md:static z-48">
          <div className="relative w-full max-sm-w-1/2 border-b-8 border-brand-600 bg-[url(/images/P1080694_more_expanded.JPG)] bg-cover bg-left">
            {/* The photo underneath is light in places; without this scrim the white
                title sat at roughly 1.5:1 in the bright areas. */}
            <div
              className="absolute inset-0 bg-gradient-to-r from-brand-900/85 via-brand-900/60 to-brand-900/25"
              aria-hidden="true"
            />

            <div className="relative flex h-full items-center gap-2 pl-2 md:pl-10">
              <button
                onClick={() => handleHamburgerClick()}
                className="shrink-0 rounded-md p-1 text-white md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="Menü öffnen"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>

              <div className="min-w-0">
                <p className="truncate text-[0.6875rem] md:text-xs font-medium uppercase tracking-[0.14em] text-brand-200">
                  Deutsch-Bulgarische Gesellschaft e. V.
                </p>
                {/* The title row keeps its height even when empty. The header is
                    vertically centred, so dropping the row outright would slide the
                    society name down on pages without a title. The heights match the
                    line-height of the text below: 1.75rem, then 2.25rem from md. */}
                <div className="min-h-7 md:min-h-9">
                  {title && (
                    <h1 className="truncate text-lg md:text-3xl font-semibold tracking-tight text-white">
                      {title}
                    </h1>
                  )}
                </div>
              </div>
            </div>
          </div>

          <img
            src={'/Cyril-methodius-small.jpg'}
            className="w-1/4 border-b-8 border-brand-600 object-cover object-top max-sm:hidden"
            alt=""
          />
          <img
            src={'/images/P1030760.jpg'}
            className="w-1/4 border-b-8 border-brand-600 object-cover max-sm:hidden"
            alt=""
          />
        </header>

        <main className="px-5 sm:px-8 md:px-10 lg:px-14 py-8 md:py-12 body-text">
          <div className="mx-auto max-w-3xl xl:max-w-4xl">{children}</div>
        </main>
      </div>
    </div>
  );
}
