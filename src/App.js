// App.jsx
import React, { useRef, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PawStoriesHome from "./components/pages/PawStoriesHome";
import StoryShare from "./components/pages/storyShare";
import AllStoriesPage from "./components/pages/FunnyStories";
import Navbar from "./components/Navbar";

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
      </Routes>
    </>
  );
}

export default App;
