import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button } from "reactstrap";
import { ListingsContext } from "../ContextApi/listingsContext";
import listingPage from "../styling/listingPage.css";
import ListingPageInd from "./listingPageInd";

const ListingPage = () => {
  const { listings, setListings } = useContext(ListingsContext);
  const history = useHistory();

  const viewListing = (id) => {
    console.log("single listing", id);
    let indivListing = listings.filter((listing) => listing.id === id);
    history.push(`/listing-page/${id}`, { listing: indivListing });
  };
  return (
    <div className="listings-container">
      <h1
        className="listings-title"
        style={{
          fontSize: "48px",
          marginTop: "3%",
        }}
      >
        Plan a different kind of getaway!
      </h1>{" "}
      <div className="listings-wrapper">
        {listings.map((listing) => {
          return (
            <div className="listing-card" key={listing.id}>
              <Card
                className="hover-style"
                style={{
                  backgroundColor: "#b9d2ec40",
                }}
              >
                <h4>{`${listing.room_type} in ${listing.neighbourhood_group_cleansed}`}</h4>
                <h6>{`${listing.bedrooms} bedroom(s) -- ${listing.bathrooms} bathroom(s)`}</h6>
                <p>{`Minimum of: ${listing.minimum_nights} night(s)`}</p>
                <p>{`Security deposit: ${listing.security_deposit}`}</p>
                <p>{`Cleaning fee: ${listing.cleaning_fee}`}</p>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    viewListing(listing.id);
                  }}
                  style={{
                    width: "50%",
                    backgroundColor: "lightcoral",
                  }}
                >
                  View listing
                </Button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListingPage;
