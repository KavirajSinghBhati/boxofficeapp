import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";

const Home = () => {
  const [input, setInput] = useState("");
  const onInputChange = event => {
    setInput(event.target.value);
  };
  const onSearch = () => {
    fetch(`https://api.tvmaze.com/search/shows?q=${input}`)
      .then(res => res.json())
      .then(data => console.log(data));
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  return (
    <MainPageLayout>
      <input
        type="text"
        value={input}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />
      <button onClick={onSearch} type="button">
        Search
      </button>
    </MainPageLayout>
  );
};

export default Home;
