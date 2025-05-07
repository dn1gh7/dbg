import './App.css';
import { Routes, Route, HashRouter, useLocation } from 'react-router';
import About from './components/about';
import ContentContainer from './components/contentContainer';
import NavBar from './components/navBar';
import Links from './components/links/links';
import Publications from './components/publications1/publications';
import Presented from './components/presented';
import BulgarianStudies from './components/bulgarianStudies';
import Membership from './components/membership';
import Events from './components/events';
import Home from './components/home';
import { useEffect, useLayoutEffect, useState } from 'react';
import Impressum from './components/impressum';

type TitleManagerProps = {
  setPageTitle: (title: string) => void;
};

function TitleManager({ setPageTitle }: TitleManagerProps) {
  const location = useLocation();
  useEffect(() => {
    const pathToTitleMap: Record<string, string> = {
      '/': 'Deutsch-Bulgarische Gesellschaft zur Förderung der Beziehungen zwischen Deutschland und Bulgarien e. V.',
      '/about': 'Über uns',
      '/events': 'Veranstaltungen',
      '/publications': 'Publikationen',
      '/links': 'Links',
      '/membership': 'Mitgliedschaft',
      '/presented': 'Vorgestellt',
      '/bulgarianStudies': 'Bulgaristik in Deutschland',
      '/impressum': 'Impressum',
    };
    const title = pathToTitleMap[location.pathname] || '';
    setPageTitle(title);
  }, [location, setPageTitle]);
  return null;
}

type WrapperProps = {
  children: React.ReactNode;
};

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the route changes
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return <>{children}</>;
};

function App() {
  const [pageTitle, setPageTitle] = useState('');
  const [mdNavOpen, setMdNavOpen] = useState(false);

  const navItems = [
    { title: 'Über uns', link: 'about' },
    { title: 'Veranstaltungen', link: 'events' },
    { title: 'Publikationen', link: 'publications' },
    { title: 'Links', link: 'links' },
    { title: 'Mitgliedschaft', link: 'membership' },
    { title: 'Vorgestellt', link: 'presented' },
    { title: 'Bulgaristik in Deutschland', link: 'bulgarianStudies' },
    { title: 'Kooperationspartner und Förderer', link: '/bulgarianStudies' },
  ];

  function setNavOpen() {
    console.log('open');
    setMdNavOpen(!mdNavOpen);
  }

  return (
    <>
      <HashRouter>
        <NavBar
          navItems={navItems}
          mdNavOpen={mdNavOpen}
          handleCloseClick={setNavOpen}
        />
        <TitleManager setPageTitle={setPageTitle} />
        <ContentContainer
          handleHamburgerClick={() => setNavOpen}
          title={pageTitle}
        >
          <Wrapper>
            <Routes>
              {/* <Route path="/" element={<Home />}></Route> */}
              <Route path="about" element={<About />} />
              <Route path="events" element={<Events />} />
              <Route path="publications" element={<Publications />} />
              <Route path="links" element={<Links />} />
              <Route path="membership" element={<Membership />} />
              <Route path="presented" element={<Presented />} />
              <Route path="bulgarianStudies" element={<BulgarianStudies />} />
              <Route path="impressum" element={<Impressum />} />
            </Routes>
          </Wrapper>
        </ContentContainer>
      </HashRouter>
    </>
  );
}

export default App;
