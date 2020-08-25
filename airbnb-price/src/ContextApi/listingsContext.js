import React, { useState, createContext } from "react";

export const ListingsContext = createContext();

export const ListingsProvider = (props) => {
  const [listings, setListings] = useState([]);
  return (
    <ListingsContext.Provider value={[listings, setListings]}>
      {props.children}
    </ListingsContext.Provider>
  );
};
