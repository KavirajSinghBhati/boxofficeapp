import React from "react";
import { Routes, Route } from "react-router-dom";

import { ThemeProvider } from "styled-components";

import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";
import Page404 from "./pages/Page404";

const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c6c6c6",
    dark: "#353535",
  },
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/starred" element={<Starred />} />
        <Route exact path="/show/:id" element={<Show />} />
        <Route path="*" element={<Page404 />} /> {/* this is for a 404 page */}
      </Routes>
    </ThemeProvider>
  );
};

export default App;
