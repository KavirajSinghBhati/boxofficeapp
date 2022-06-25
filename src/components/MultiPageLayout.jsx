import React from "react";
import Navigation from "./Navigation";

const MultiPageLayout = ({ children }) => {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
};

export default MultiPageLayout;
