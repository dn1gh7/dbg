import { Link, Outlet, NavLink } from 'react-router';

interface NavItem {
  title: string;
  link: string;
}

interface NavBarProps {
  mdNavOpen: boolean;
  navItems: NavItem[];
  handleCloseClick: () => void;
}

export default function NavBar({
  navItems,
  mdNavOpen,
  handleCloseClick,
}: NavBarProps) {
  return (
    <>
      {/* Sidebar for Desktop & Responsive Drawer */}
      <nav
        className={`fixed top-0 left-0 z-49 h-screen bg-white shadow-md transform 
        ${mdNavOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between  w-40 md:w-70   px-1.5 md:px-3 text-xs md:font-medium md:text-lg overflow-y-auto`}
      >
        <button
          onClick={handleCloseClick}
          className="text-black focus:outline-none md:hidden absolute top-0 right-0 p-1"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke={'#000000'}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={'M6 18L18 6M6 6l12 12'}
            />
          </svg>
        </button>

        <div className="mt-2 md:mt-15">
          <Link to="/">
            <img
              className="w-20 sm:w-30 md:w-50 mx-auto "
              src="/logo_rund.svg"
              alt="Deutsch-Bulgarische Gesellschaft e. V."
            />
          </Link>

          <ul className="mt-2 md:mt-20 space-y-2">
            {navItems.map((item, i) => (
              <li key={i}>
                <NavLink
                  className={({ isActive }) =>
                    `block rounded-r-md border-l-4 px-2 py-2 md:px-3 md:py-2.5 transition-colors
                     hover:bg-brand-100 hover:text-brand-900
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 ${
                       isActive
                         ? 'border-brand-600 bg-brand-50 font-semibold text-brand-900'
                         : 'border-transparent text-ink'
                     }`
                  }
                  to={item.link}
                  onClick={handleCloseClick} // Close menu on click
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-2 text-center underline decoration-cambridge decoration-2">
          <Link to={'impressum'} onClick={handleCloseClick}>
            Impressum
          </Link>
        </div>

        <Outlet />
      </nav>
    </>
  );
}
