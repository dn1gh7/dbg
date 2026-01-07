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
      {/* h-full */}
      <div className=" bg-white min-w-0  ">
        <div className="flex flex-row h-15 md:h-30 md:space-x-6    sticky top-0 md:static z-48">
          <div className="border-b-10 border-cambridge w-full max-sm-w-1/2 bg-[url(/images/P1080694_more_expanded.JPG)] bg-cover bg-left content-center">
            <div className="flex content-center">
              <button
                onClick={() => handleHamburgerClick()}
                className="text-black focus:outline-none md:ml-3 md:hidden"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <div className="content-center pl-2 md:pl-20 heading text-white break-all">
                {title}
              </div>
            </div>
          </div>
          <img
            src={'/Cyril-methodius-small.jpg'}
            className="w-1/4 border-b-10 border-cambridge object-cover object-top max-sm:hidden"
            alt=""
          />
          <img
            src={'/images/P1030760.jpg'}
            className="w-1/4 border-b-10 border-cambridge object-cover max-sm:hidden"
            alt=""
          />
        </div>

        <section
          onClick={() => console.log('moin')}
          className={` py-3 md:py-6 px-5 sm:px-10 md:px-15 lg:px-20 xl:px-50 body-text `}
        >
          {children}
        </section>
      </div>
    </div>
  );
}
