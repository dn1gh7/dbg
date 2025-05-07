import { useState } from 'react';
import svg from '../assets/logo_rund.svg';
import { Link, Outlet } from 'react-router';

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
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile Hamburger Button */}
      {/* <div className="md:hidden fixed z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none"
        >
          <svg
            className="h-8 w-8"
            fill="none"
            stroke={isOpen ? '#000000' : '#ffffff'}
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div> */}

      {/* Sidebar for Desktop & Responsive Drawer */}
      <nav
        className={`fixed top-0 z-49 h-screen bg-white shadow-md transform
        ${mdNavOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out md:translate-x-0 md:flex md:sticky md:flex-col md:w-64 text-xs md:font-medium md:text-lg`}
      >
        <div className="relative">
          <button
            onClick={handleCloseClick}
            className="text-black focus:outline-none md:hidden absolute top-0 right-0"
          >
            <svg
              className="h-8 w-8"
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
          <div className="md:p-4 w-full"></div>
          {/* <Link to="/">
            <img className="h-20 mx-auto" src={svg} alt="Logo" />
          </Link> */}
        </div>

        <ul className="mt-7">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link
                className="block p-1  md:p-3  hover:bg-[#82C09A] hover:text-white"
                to={item.link}
                onClick={() => setIsOpen(false)} // Close menu on click
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-auto mb-6 text-center underline decoration-cambridge decoration-2">
          <Link to={'impressum'} onClick={() => setIsOpen(false)}>
            Impressum
          </Link>
        </div>

        <Outlet />
      </nav>
    </>
  );
}
