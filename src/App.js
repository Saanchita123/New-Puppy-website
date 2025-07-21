// App.jsx
import React, { useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PawStoriesHome from "./components/pages/PawStoriesHome";
import StoryShare from "./components/pages/storyShare";
import AllStoriesPage from "./components/pages/FunnyStories";
import Navbar from "./components/Navbar";
import ContactPetCenterPage from "./components/pages/ContactpetCenters";
import DiseaseDetailPage from "./components/pages/DiseasesDetailsPge";
import AnimalDiseaseSearchPage from "./components/pages/AnimalHealth";
import AnimalNewsPage from "./components/pages/DailyUpdates";
function App() {
  const location = useLocation();
  const [scrollToSection, setScrollToSection] = useState(null);

  // Show Navbar only on home page
  const showNavbar = location.pathname === "/";

  return (
    <>
      {showNavbar && <Navbar scrollToSection={scrollToSection} />}
      <Routes>
        <Route
          path="/"
          element={<PawStoriesHome setScrollToSectionFn={setScrollToSection} />}
        />
        <Route path="/share-story" element={<StoryShare />} />
        <Route path="/all-stories" element={<AllStoriesPage />} />
          <Route path="/pet-centers" element={<ContactPetCenterPage />}/>
      <Route path="/search-diseases" element={<AnimalDiseaseSearchPage />} />
  <Route path="/disease/:name" element={<DiseaseDetailPage />} />
<Route path="/animal-news" element={<AnimalNewsPage />} />

      </Routes>
    </>
  );
}

export default App;
