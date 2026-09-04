import './App.css';
import { Routes, Route, BrowserRouter, useLocation } from 'react-router';
import { useEffect, useLayoutEffect, useState } from 'react';

import Home from './components/home';
import About from './components/about';
import Events from './components/events';
import EventDetail from './components/eventDetail';
import Publications from './components/publications/publications';
import Links from './components/links/links';
import Membership from './components/membership';
import Impressum from './components/impressum';
import Contact from './components/contact';
import NotFound from './components/notFound';

import NavBar from './components/navBar';
import ContentContainer from './components/contentContainer';

const navItems = [
  { title: 'Über uns', link: 'about' },
  { title: 'Veranstaltungen', link: 'events' },
  { title: 'Publikationen', link: 'publications' },
  { title: 'Links', link: 'links' },
  { title: 'Mitgliedschaft', link: 'membership' },
  { title: 'Kontakt', link: 'contact' },
];

const TitleManager = ({
  setPageTitle,
}: {
  setPageTitle: (title: string) => void;
}) => {
  const location = useLocation();

  useEffect(() => {
    const pathToTitle: Record<string, string> = {
      // The landing page has no title of its own, so the header bar shows just the
      // society name there.
      '/': '',
      '/about': 'Über uns',
      '/events': 'Veranstaltungen',
      '/publications': 'Publikationen',
      '/links': 'Links',
      '/membership': 'Mitgliedschaft',
      '/contact': 'Kontakt',
      '/impressum': 'Impressum',
    };

    // The router treats /about and /about/ as the same route, so the header has to
    // as well. An event detail page carries the event's own name as its heading, so
    // the bar stays on the society name there; anything else unknown is the 404 page.
    const path = location.pathname.replace(/\/+$/, '') || '/';

    if (path in pathToTitle) {
      setPageTitle(pathToTitle[path]);
    } else if (path.startsWith('/events/')) {
      setPageTitle('');
    } else {
      setPageTitle('Seite nicht gefunden');
    }
  }, [location, setPageTitle]);

  return null;
};

const ScrollToTop = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  useLayoutEffect(() => {
    // A link that carries a hash (e.g. /publications#bulgarica-7) is asking for a
    // spot inside the page; the target route scrolls there itself.
    if (location.hash) return;
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [location.pathname, location.hash]);

  return <>{children}</>;
};

function App() {
  const [pageTitle, setPageTitle] = useState('');
  const [isNavOpen, setIsNavOpen] = useState(false);

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
    <BrowserRouter>
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
            <Route path="impressum" element={<Impressum />} />
            <Route path="contact" element={<Contact />} />
            {/* nginx serves index.html for unknown paths (docker/nginx.conf), so
                deep links land here rather than on the web server's own 404. */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ScrollToTop>
      </ContentContainer>
    </BrowserRouter>
  );
}

export default App;
