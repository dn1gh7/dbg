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
import { useEffect, useState } from 'react';
import Impressum from './components/impressum';

type TitleManagerProps = {
  setPageTitle: (title: string) => void;
};

function TitleManager({ setPageTitle }: TitleManagerProps) {
  const location = useLocation();

  useEffect(() => {
    const pathToTitleMap: Record<string, string> = {
      '/': 'Startseite',
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

function App() {
  const [pageTitle, setPageTitle] = useState('');

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

  return (
    <>
      <HashRouter>
        <NavBar navItems={navItems} />
        <TitleManager setPageTitle={setPageTitle} />
        <ContentContainer title={pageTitle}>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="about" element={<About />} />
            <Route path="events" element={<Events />} />
            <Route path="publications" element={<Publications />} />
            <Route path="links" element={<Links />} />
            <Route path="membership" element={<Membership />} />
            <Route path="presented" element={<Presented />} />
            <Route path="bulgarianStudies" element={<BulgarianStudies />} />
            <Route path="impressum" element={<Impressum />} />
          </Routes>
        </ContentContainer>
      </HashRouter>
    </>
  );
}

export default App;
