import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";

const Home = () => {
  const [input, setInput] = useLastQuery();
  const [result, setResult] = useState(null);
  const [searchOption, setSearchOption] = useState("shows");

  const isShowsSearch = searchOption === "shows";

  const onInputChange = event => {
    setInput(event.target.value);
  };

  const onRadioChange = event => {
    setSearchOption(event.target.value);
  };

  const onSearch = () => {
    apiGet(`/search/${searchOption}?q=${input}`).then(result =>
      setResult(result)
    );
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
      return result[0].show ? (
        <ShowGrid data={result} />
      ) : (
        <ActorGrid data={result} />
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
      <div>
        <label htmlFor="shows-search">
          Shows
          <input
            type="radio"
            id="shows-search"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </label>
        <label htmlFor="actors-search">
          Actors
          <input
            type="radio"
            id="actors-search"
            value="people"
            onChange={onRadioChange}
            checked={!isShowsSearch}
          />
        </label>
      </div>
      <button onClick={onSearch} type="button">
        Search
      </button>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
