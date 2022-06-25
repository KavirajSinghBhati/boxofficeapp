import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Page404 from "./pages/Page404";

import Navigation from "./components/Navigation";

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/starred" element={<Starred />} />
        <Route path="*" element={<Page404 />} /> {/* this is for a 404 page */}
      </Routes>
    </div>
  );
};

export default App;
