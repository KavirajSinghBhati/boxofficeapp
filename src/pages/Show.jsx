import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

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
      <h1>Show page</h1>
    </div>
  );
};

export default Show;
