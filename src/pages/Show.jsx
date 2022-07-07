import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

import ShowMainData from "../components/show/ShowMainData";
import Cast from "../components/show/Cast";
import Seasons from "../components/show/Seasons";
import Details from "../components/show/Details";

const initialState = {
  show: null,
  isLoading: true,
  error: null,
};

const reducer = (prevState, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS": {
      return { ...prevState, show: action.show, isLoading: false };
    }
    case "FETCH_FAILED": {
      return { ...prevState, error: action.error, isLoading: false };
    }
    default:
      return prevState;
  }
};

const Show = () => {
  const { id } = useParams();

  const [{ show, isLoading, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    let isMounted = true; // when we switch b/w pages and data still loads, it removes err from console
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          dispatch({
            type: "FETCH_SUCCESS",
            show: result,
          });
        }
      })
      .catch(err => {
        if (isMounted) {
          dispatch({
            type: "FETCH_FAILED",
            error: err.message,
          });
        }
      });

    return () => {
      // cleanup function when component is unmounted
      isMounted = false;
    };
  }, [id]);

  if (isLoading) {
    return <div>Data is being loaded</div>;
  }

  if (error) {
    return <div>Oops! Error occured ${error}</div>;
  }

  return (
    <div>
      <ShowMainData
        image={show.image}
        name={show.name}
        rating={show.rating}
        summary={show.summary}
        tags={show.genres}
      />
      <div>
        <h2>Details</h2>
        <Details
          status={show.status}
          network={show.network}
          premiered={show.premiered}
        />
      </div>
      <div>
        <h2>Seasons</h2>
        <Seasons seasons={show._embedded.seasons} />
      </div>
      <div>
        <h2>Cast</h2>
        <Cast cast={show._embedded.cast} />
      </div>
    </div>
  );
};

export default Show;
