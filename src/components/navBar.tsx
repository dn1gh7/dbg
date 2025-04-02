import svg from '../assets/logo_rund.svg';
import { Link, Outlet } from 'react-router';

interface NavItem {
  title: string;
  link: string;
}

interface NavBarProps {
  handleNavClick: (title: string) => void;
  navItems: NavItem[];
}

export default function NavBar({ navItems, handleNavClick }: NavBarProps) {
  return (
    <>
      <nav className="h-screen flex-shrink-0 min-w-[320px] flex-1 text-black px-5 shadow-md justify-items-center sticky top-0">
        <Link to="/">
          <img
            className="w-50 h-50"
            src={svg}
            alt="Logo der Deutsch-Bulgarischen Gesellschaft"
          ></img>
        </Link>

        <ul className="">
          {navItems.map((item, i) => (
            <li key={i} className=" ">
              <Link
                onClick={(e) => {
                  e.preventDefault;
                  handleNavClick(item.title);
                }}
                className="font-medium  text-l block p-3 hover:bg-blue-400 hover:text-white active:inset-2"
                to={item.link}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
        <Outlet></Outlet>
      </nav>
    </>
  );
}
