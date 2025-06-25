// import { useState } from 'react';
// import svg from '../assets/logo_rund.svg';
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
        transition-transform duration-300 ease-in-out md:translate-x-0 flex flex-col justify-between  w-40 md:w-70 md:sticky  px-1.5 md:px-3 text-xs md:font-medium md:text-lg overflow-y-auto`}
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
          <Link to="/" className="">
            <img
              className="w-20 sm:w-30 md:w-50 mx-auto "
              src={'logo_rund.svg'}
              alt="Logo"
            />
          </Link>

          <ul className="mt-2 md:mt-20">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link
                  className=" block p-0.5 py-1 body-text underline decoration-cambridge md:decoration-0 sm:p-2 md:p-3  hover:bg-cambridge hover:text-white"
                  to={item.link}
                  onClick={handleCloseClick} // Close menu on click
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-2 text-center underline decoration-cambridge decoration-2">
          {/* <Link to={'impressum'} onClick={() => setIsOpen(false)}>
              Impressum
            </Link> */}
          <Link to={'impressum'} onClick={handleCloseClick}>
            Impressum
          </Link>
        </div>

        <Outlet />
      </nav>
    </>
  );
}
