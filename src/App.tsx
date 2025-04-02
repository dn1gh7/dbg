import './App.css';
import { Routes, Route, HashRouter } from 'react-router';
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
import { useState } from 'react';

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
        <NavBar
          handleNavClick={(title) => setPageTitle(title)}
          navItems={navItems}
        />
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
          </Routes>
        </ContentContainer>
      </HashRouter>
    </>
  );
}

export default App;
