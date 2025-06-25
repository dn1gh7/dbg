import './App.css';
import { Routes, Route, HashRouter, useLocation } from 'react-router';
import { useEffect, useLayoutEffect, useState } from 'react';

import Home from './components/home';
import About from './components/about';
import Events from './components/events';
import EventDetail from './components/eventDetail';
import Publications from './components/publications1/publications';
import Links from './components/links/links';
import Membership from './components/membership';
import Presented from './components/presented';
import BulgarianStudies from './components/bulgarianStudies';
import Collaborations from './components/collaborations';
import Impressum from './components/impressum';

import NavBar from './components/navBar';
import ContentContainer from './components/contentContainer';

const TitleManager = ({
  setPageTitle,
}: {
  setPageTitle: (title: string) => void;
}) => {
  const location = useLocation();

  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      '/': 'DBG',
      '/about': 'Über uns',
      '/events': 'Veranstaltungen',
      '/publications': 'Publikationen',
      '/links': 'Links',
      '/membership': 'Mitgliedschaft',
      '/presented': 'Vorgestellt',
      '/bulgarianStudies': 'Bulgaristik in Deutschland',
      '/collaborations': 'Kooperationspartner und Förderer',
      '/impressum': 'Impressum',
    };

    setPageTitle(pathToTitle[location.pathname] || '');
  }, [location, setPageTitle]);

  return null;
};

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname]);

  return <>{children}</>;
};

function App() {
  const [pageTitle, setPageTitle] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

  const navItems = [
    { title: 'Über uns', link: 'about' },
    { title: 'Veranstaltungen', link: 'events' },
    { title: 'Publikationen', link: 'publications' },
    { title: 'Links', link: 'links' },
    { title: 'Mitgliedschaft', link: 'membership' },
    { title: 'Vorgestellt', link: 'presented' },
    { title: 'Bulgaristik in Deutschland', link: 'bulgarianStudies' },
    { title: 'Kooperationspartner und Förderer', link: 'collaborations' },
  ];

  const toggleNav = () => setIsNavOpen((prev) => !prev);
  const closeNav = () => setIsNavOpen(false);

  // Lock body scroll when nav is open
  useEffect(() => {
    const overflowValue = isNavOpen ? 'clip' : '';
    document.documentElement.style.overflow = overflowValue;
    document.body.style.overflow = overflowValue;
  }, [isNavOpen]);

  // Auto-close nav on resize above md (768px)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        closeNav();
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <HashRouter>
      <NavBar
        navItems={navItems}
        mdNavOpen={isNavOpen}
        handleCloseClick={closeNav}
      />
      <TitleManager setPageTitle={setPageTitle} />
      <ContentContainer handleHamburgerClick={toggleNav} title={pageTitle}>
        <ScrollToTop>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="events" element={<Events />} />
            <Route path="events/:eventId" element={<EventDetail />} />
            <Route path="publications" element={<Publications />} />
            <Route path="links" element={<Links />} />
            <Route path="membership" element={<Membership />} />
            <Route path="presented" element={<Presented />} />
            <Route path="bulgarianStudies" element={<BulgarianStudies />} />
            <Route path="collaborations" element={<Collaborations />} />
            <Route path="impressum" element={<Impressum />} />
          </Routes>
        </ScrollToTop>
      </ContentContainer>
    </HashRouter>
  );
}

export default App;
