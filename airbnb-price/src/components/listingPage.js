import React, { useContext } from "react";
import { Card } from "reactstrap";
import { ListingsContext } from "../ContextApi/listingsContext";
import listingPage from "../styling/listingPage.css";

const ListingPage = () => {
  const { listings, setListings } = useContext(ListingsContext);

  const addFavorite = (id) => {
    let favListing = listings.filter((listing) => listing.id === id)[0];
    let localStorageFavs = window.localStorage;
    let storedFavs = JSON.parse(localStorageFavs.getItem("favs"));

    storedFavs.push(favListing);
    localStorageFavs.setItem("favs", JSON.stringify(storedFavs));

    ////>> NOTES <<////

    // listings are saving but showing up as --null-- in the array

    // Finish logic for onClick on fav icon
    // --> change font weight to bold red for bgColor change
    // --> change icon size to 2x

    // NO Context API, could not find solve
    // NO CRUD operations, not supported on Back End

    // Deleted Favorites component related files and folders
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
                <span className="favIcon-container">
                  <i
                    className="far fa-heart fav-icon"
                    style={{ color: "lightcoral" }}
                    onClick={addFavorite}
                  ></i>
                </span>
                <h4>{`${listing.room_type} in ${listing.neighbourhood_group_cleansed}`}</h4>
                <h6>{`${listing.bedrooms} bedroom(s) -- ${listing.bathrooms} bathroom(s)`}</h6>
                <p>{`Minimum of: ${listing.minimum_nights} night(s)`}</p>
                <p>{`Security deposit: ${listing.security_deposit}`}</p>
                <p>{`Cleaning fee: ${listing.cleaning_fee}`}</p>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListingPage;
