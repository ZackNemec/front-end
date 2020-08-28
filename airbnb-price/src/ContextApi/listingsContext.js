import React, { useState, createContext, useEffect } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

export const ListingsContext = createContext({});

export const ListingsProvider = (props) => {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("/api/property")
      .then((res) => {
        let list = res.data.map(listing=>{
          return {...listing, favorited: false}
        })
        setListings(list);
      })
      .catch((err) => console.log(err));
  }, [listings]);


  return (
    <ListingsContext.Provider value={{ listings, setListings }}>
      {props.children}
    </ListingsContext.Provider>
  );
};
