import React, { useState } from "react";
import ActorGrid from "../components/actor/ActorGrid";
import MainPageLayout from "../components/MainPageLayout";
import ShowGrid from "../components/show/ShowGrid";
import CustomRadio from "../components/CustomRadio";
import { apiGet } from "../misc/config";
import { useLastQuery } from "../misc/custom-hooks";

import {
  SearchInput,
  RadioInputsWrapper,
  SearchButtonWrapper,
} from "./Home.styled";

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
      <SearchInput
        type="text"
        value={input}
        onKeyDown={onKeyDown}
        onChange={onInputChange}
      />
      <RadioInputsWrapper>
        <div>
          <CustomRadio
            id="shows-search"
            label="Shows"
            value="shows"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </div>
        <div>
          <CustomRadio
            id="actors-search"
            label="Actors"
            value="people"
            onChange={onRadioChange}
            checked={isShowsSearch}
          />
        </div>
      </RadioInputsWrapper>
      <SearchButtonWrapper>
        <button onClick={onSearch} type="button">
          Search
        </button>
      </SearchButtonWrapper>
      {renderResult()}
    </MainPageLayout>
  );
};

export default Home;
