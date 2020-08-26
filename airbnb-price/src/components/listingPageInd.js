import React, { useContext } from "react";
import { Card, Button } from "reactstrap";
import { ListingsContext } from "../ContextApi/listingsContext";
import { Link } from "react-router-dom";

const ListingPageInd = ({location}) => {
  const [ listing ] = location.state.listing

  return (
    <div className="single-listing">
      {/* {listings.map((listing, idx) => {
        return ( */}
          <div className="listing-card" key={listing.id}>
            <Card
              style={{
                backgroundColor: "lightgrey",
              }}
            >
              <p>{`${listing.room_type} in ${listing.neighbourhood_group_cleansed}`}</p>
              <p>{`${listing.bedrooms} bedroom(s) -- ${listing.bathrooms} bathroom(s)`}</p>
              <p>{`Minimum of ${listing.minimum_nights} night(s)`}</p>
              <p>{`Security deposit: ${listing.security_deposit}`}</p>
              <p>{`Cleaning fee: ${listing.cleaning_fee}`}</p>
              <Link to="/listing-page">
              <Button
                style={{
                  width: "25%",
                  backgroundColor: "lightcoral",
                }}
              >
                Back
              </Button>
              </Link>
            </Card>
          </div>
        {/* );
      })} */}
    </div>
  );
};

export default ListingPageInd;
