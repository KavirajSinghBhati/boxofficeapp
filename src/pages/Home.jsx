import React, { useState } from "react";
import MainPageLayout from "../components/MainPageLayout";
import { apiGet } from "../misc/config";

const Home = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const onInputChange = event => {
    setInput(event.target.value);
  };
  const onSearch = () => {
    apiGet(`/search/shows?q=${input}`).then(result => setResult(result));
  };
  const onKeyDown = ev => {
    if (ev.keyCode === 13) onSearch();
  };

  const renderResult = () => {
    // two conditions here
    if (result && result.length === 0) {
      // we searched and got an empty array
      return <div>No results</div>;
    }
    if (result && result.length > 0) {
      return (
        <div>
          {result.map(item => (
            <div key={item.show.id}>{item.show.name}</div>
          ))}
        </div>
      );
    }
    return null; // when no result is there
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
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
