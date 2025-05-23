import { BASE_URL } from '../globlas';

interface ContentContainerProps {
  children: React.ReactNode;
  handleHamburgerClick(): () => void;
  title?: string;
}

export default function ContentContainer({
  children,
  title,
  handleHamburgerClick,
}: ContentContainerProps) {
  return (
    <div className="w-full md:flex-8 min-w-0">
      <div className=" bg-white min-w-0">
        <div className="flex flex-row md:space-x-6   h-20 md:h-50 sticky top-0 md:static z-48">
          <div className="border-b-10 border-[#82C09A] w-full max-sm-w-1/2 bg-[url(/images/P1080694_more_expanded.JPG)] bg-cover bg-left content-center">
            <div className="flex content-center">
              <button
                onClick={handleHamburgerClick()}
                className="text-black focus:outline-none md:ml-3 md:hidden"
              >
                <svg
                  className="h-8 w-8"
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
              <div className="content-center pl-2 md:pl-20 heading text-white">
                {title}
              </div>
            </div>
          </div>
          <img
            src={BASE_URL + '/Cyril-methodius-small.jpg'}
            className="w-1/4 border-b-10 border-[#82C09A] object-cover object-top max-sm:hidden"
            alt=""
          />
          <img
            onClick={() => console.log(BASE_URL)}
            src={BASE_URL + '/images/P1030760.jpg'}
            className="w-1/4 border-b-10 border-[#82C09A] object-cover max-sm:hidden"
            alt=""
          />
        </div>
        <section className="py-6 px-1 md:px-80 text-xs md:text-base">
          {children}
        </section>
      </div>
    </div>
  );
}
