import React, { useContext } from "react";
import { Card, Button } from "reactstrap";
import { ListingsContext } from "../ContextApi/listingsContext";

const ListingPageInd = () => {
  const { listings, setListings } = useContext(ListingsContext);

  return (
    <div className="single-listing">
      {listings.map((listing, idx) => {
        return (
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

              <Button
                onClick={(e) => {
                  e.preventDefault();
                }}
                style={{
                  width: "25%",
                  backgroundColor: "lightcoral",
                }}
              >
                Back
              </Button>
            </Card>
          </div>
        );
      })}
    </div>
  );
};

export default ListingPageInd;
