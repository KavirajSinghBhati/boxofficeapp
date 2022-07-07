import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGet } from "../misc/config";

const Show = () => {
  const { id } = useParams();

  const [show, setShow] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // when we switch b/w pages and data still loads, it removes err from console
    apiGet(`/shows/${id}?embed[]=seasons&embed[]=cast`)
      .then(result => {
        if (isMounted) {
          setShow(result);
          setIsLoading(false);
        }
      })
      .catch(err => {
        if (isMounted) {
          setError(err.message);
          setIsLoading(false);
        }
      });

    return () => {
      // cleanup function when component is unmounted
      isMounted = false;
    };
  }, [id]);

  console.log(show);

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
