import React, { useContext } from "react";
import { Card, Col } from "reactstrap";
import { ListingsContext } from "../ContextApi/listingsContext";
import "../styling/listingPage.css";
import HeroImage from "./assets/airbnbHero.jpg";

let localFavsList = window.localStorage.getItem("favs")
  ? JSON.parse(window.localStorage.getItem("favs"))
  : [];

window.localStorage.setItem("favs", JSON.stringify(localFavsList));

const ListingPage = () => {
  const { listings } = useContext(ListingsContext);

  const addFavorite = (id) => {
    let favListing = listings.filter((listing) => listing.id === id)[0];
    favListing.favorited = true;

    let possibleDup = localFavsList.find((el) => el.id === favListing.id);

    const heartIcon = document.getElementsByClassName(
      `card-${favListing.id}`
    )[0];

    if (possibleDup) {
      favListing.favorited = false;
      localFavsList = localFavsList.filter((el) => el.id !== possibleDup.id);
      window.localStorage.setItem("favs", JSON.stringify(localFavsList));
    } else {
      favListing.favorited = true;
      localFavsList.push(favListing);
      window.localStorage.setItem("favs", JSON.stringify(localFavsList));
    }

    if (favListing.favorited) {
      heartIcon.style.fontWeight = "bold";
    } else {
      heartIcon.style.fontWeight = "normal";
    }
  };

  return (
    <div className="listings-container">
      <div className="title-container">
        <h1 className="listings-title">Explore near and far from ordinary</h1>
        <img className="hero-image" src={HeroImage} alt="modern house" />
      </div>
      <div className="listings-wrapper">
        {listings.map((listing) => {
          return (
            <Col xs="12" sm="12" md="6" lg="4">
              <div className="listing-card" key={listing.id}>
                <Card className="hover-style">
                  <span className="favIcon-container">
                    <i
                      className={`far fa-heart fav-icon fa-2x card-${listing.id}`}
                      style={{
                        color: "lightcoral",
                        fontWeight: `${listing.favorited ? "bold" : "normal"}`,
                      }}
                      onClick={() => addFavorite(listing.id)}
                    ></i>
                  </span>
                  <h4>{`${listing.room_type} in ${listing.neighbourhood_group_cleansed}`}</h4>
                  <h6>{`${listing.bedrooms} bedroom(s) -- ${listing.bathrooms} bathroom(s)`}</h6>
                  <p>{`Minimum of: ${listing.minimum_nights} night(s)`}</p>
                  <p>{`Security deposit: $${listing.security_deposit}`}</p>
                  <p>{`Cleaning fee: $${listing.cleaning_fee}`}</p>
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
