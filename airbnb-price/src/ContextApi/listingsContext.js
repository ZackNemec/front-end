import React, { useState, createContext, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const ListingsContext = createContext({});

export const ListingsProvider = (props) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/property")
      .then((res) => {
        setListings(res.data);
      });
  }, [listings]);


  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      {props.children}
    </ListingsContext.Provider>
  );
};
