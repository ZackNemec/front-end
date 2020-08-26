import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Col } from "reactstrap";
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
      <div
        className="listings-wrapper"
        style={{ width: "80%", margin: "0 auto" }}
      >
        {listings.map((listing) => {
          return (
            <Col xs="12" sm="12" md="6" lg="4">
              <div className="listing-card" key={listing.id}>
                <Card
                  className="hover-style"
                  style={{
                    backgroundColor: "#b9d2ec40",
                  }}
                >
                  <h4
                    style={{ margin: "0 auto" }}
                  >{`${listing.room_type} in ${listing.neighbourhood_group_cleansed}`}</h4>
                  <h6
                    style={{ margin: "0 auto" }}
                  >{`${listing.bedrooms} bedroom(s) -- ${listing.bathrooms} bathroom(s)`}</h6>
                  <p
                    style={{ margin: "0 auto" }}
                  >{`Minimum of: ${listing.minimum_nights} night(s)`}</p>
                  <p
                    style={{ margin: "0 auto" }}
                  >{`Security deposit: ${listing.security_deposit}`}</p>
                  <p
                    style={{ margin: "0 auto" }}
                  >{`Cleaning fee: ${listing.cleaning_fee}`}</p>

                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      viewListing(listing.id);
                    }}
                    style={{
                      width: "50%",
                      backgroundColor: "lightcoral",
                      margin: "5% auto",
                    }}
                  >
                    View listing
                  </Button>
                </Card>
              </div>
            </Col>
          );
        })}
      </div>
    </div>
  );
};

export default ListingPage;
