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
    <nav
      className="h-screen w-150 flex flex-1 flex-col justify-between
     text-black px-5 shadow-md sticky top-0"
    >
      <div className="">
        <Link to="/">
          <img
            className="w-50 h-50 justify-self-center"
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
                className="font-medium  text-l block p-3 hover:bg-blue-500 hover:text-white active:inset-2"
                to={item.link}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <section className="self-center mb-5">
        <a href="" className="underline p-2">
          Impressum
        </a>
        <a href="" className="underline p-2">
          Kontakt
        </a>
      </section>

      <Outlet></Outlet>
    </nav>
  );
}
