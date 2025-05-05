import { useState } from 'react';
import svg from '../assets/logo_rund.svg';
import { Link, Outlet } from 'react-router';

interface NavItem {
  title: string;
  link: string;
}

interface NavBarProps {
  navItems: NavItem[];
}

export default function NavBar({ navItems }: NavBarProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="fixed md:hidden w-64 p-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black focus:outline-none"
        >
          <svg
            className="h-8 w-8"
            fill=""
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
      </div>

      {/* Sidebar for Desktop & Responsive Drawer */}
      <nav
        className={`fixed h-screen w-64 bg-white shadow-md transform 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        transition-transform duration-300 ease-in-out  md:translate-x-0 md:flex md:flex-col md:w-64 md:sticky`}
      >
        <div className="p-4">
          <Link to="/">
            <img className="h-30 mx-auto" src={svg} alt="Logo" />
          </Link>

          <ul className="mt-6">
            {navItems.map((item, i) => (
              <li key={i}>
                <Link
                  className="block p-3 font-medium text-lg hover:bg-[#82C09A] hover:text-white"
                  to={item.link}
                  onClick={() => setIsOpen(false)} // Close menu on click
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

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
