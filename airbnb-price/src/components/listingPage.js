import { React, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { Card, Button } from "reactstrap";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
import { ListingsContext } from "../ContextApi/listingsContext";

const ListingPage = () => {
  const [details, setDetails] = useState("");
  const [listings, setListings] = useContext(ListingsContext);
  const { id } = useParams();

  const viewListing = (id) => {
    axios()
      .get(`api/property/${id}`)
      .then((res) => {
        console.log("View Listing button clicked", res);
        setDetails(res.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="listings-container">
      <div className="listings-wrapper">
        Plan a different kind of getaway {listings.length}:
        {listings.map((listing) => {
          console.log(listing);
          return (
            <div className="listing-card" key={listing.id}>
              <Card
                style={{
                  backgroundColor: "fuchsia",
                }}
              >
                <p>Home Address/Neighborhood</p>
                <p>Type of house</p>
                <p># of beds/baths</p>
                <p>min nights</p>
                <p>Current total</p>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    viewListing(listing.id);
                  }}
                  style={{
                    width: "35%",
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
