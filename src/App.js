import React from "react";
import { Routes, Route } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <h1>This is the homepage</h1>
    </div>
  );
};

const Starred = () => {
  return (
    <div>
      <h1>This is the starred page</h1>
    </div>
  );
};

const Page404 = () => {
  return (
    <div>
      <h1>404 Error</h1>
      <p>Page not found</p>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Homepage />} />
      <Route exact path="/starred" element={<Starred />} />
      <Route path="*" element={<Page404 />} /> {/* this is for a 404 page */}
    </Routes>
  );
};

export default App;
