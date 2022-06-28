import React from "react";
import Navigation from "./Navigation";
import Title from "./Title";

const MainPageLayout = ({ children }) => {
  return (
    <div>
      <Title
        title="Box Office"
        subtitle="Are you looking for a movie or an actor?"
      />
      <Navigation />
      {children}
    </div>
  );
};

export default MainPageLayout;
