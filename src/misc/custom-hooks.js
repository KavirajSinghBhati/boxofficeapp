import { useReducer, useEffect, useState } from "react";
import { apiGet } from "./config";

const showsReducer = (prevState, action) => {
  switch (action.type) {
    case "ADD": {
      return [...prevState, action.showId];
    }
    case "REMOVE": {
      return prevState.filter(showId => showId !== action.showId);
    }
    default:
      return prevState;
  }
};

const usePersistedReducer = (reducer, initialState, key) => {
  const [state, dispatch] = useReducer(reducer, initialState, initial => {
    const persisted = localStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  return [state, dispatch];
};

export function useShows(key = "shows") {
  return usePersistedReducer(showsReducer, [], key);
}

export function useLastQuery(key = "lastQuery") {
  const [input, setInput] = useState(() => {
    const persisted = sessionStorage.getItem(key);
    return persisted ? JSON.parse(persisted) : "";
  });

  const setPersistedInput = newState => {
    setInput(newState);
    sessionStorage.setItem(key, JSON.stringify(newState));
  };

  return [input, setPersistedInput];
}

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

export function useShow(showId) {
  const [state, dispatch] = useReducer(reducer, {
    show: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true; // when we switch b/w pages and data still loads, it removes err from console
    apiGet(`/shows/${showId}?embed[]=seasons&embed[]=cast`)
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
  }, [showId]);

  return state;
}

// useReducer takes a 3 argument, that returns our initial state
// in this case, we get that from local storage
