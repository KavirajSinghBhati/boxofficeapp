import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import Page404 from "./pages/Page404";

const App = () => {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/starred" element={<Starred />} />
        <Route exact path="/show/:id" element={<Show />} />
        <Route path="*" element={<Page404 />} /> {/* this is for a 404 page */}
      </Routes>
    </div>
  );
};

export default App;
