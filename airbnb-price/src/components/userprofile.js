import React, { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, Button } from "reactstrap";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
import { PropertyContext } from "../ContextApi/propertiesContext";
import "../styling/userProfile.css";

const UserProfile = () => {
  const [username, setUsername] = useState({
    username: "",
  });

  const [properties, setProperties] = useContext(PropertyContext);

  const { id } = useParams();

  const deleteHouse = (id) => {
    axios()
      .delete(`/api/property/${id}`)
      .then((resp) => {
        console.log(resp);
        setProperties(properties.filter((property) => property.id !== id));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    axios()
      .get(`/api/users/${id}`)
      .then((resp) => {
        setUsername({
          username: resp.data.username,
        });
      })
      .catch((err) => console.log(err));

    axios()
      .get(`/api/users/${id}/property`)
      .then((resp) => {
        setProperties(resp.data);
      })
      .catch((err) => console.log(err));
  }, [id, properties, setProperties]);

  return (
    <div className="userprofile">
      <div className="NavBar">
        <h3 className="greeting-msg">Welcome back, {username.username}</h3>

        <Link to={`/userprofile/${id}/add-home`}>
          <Button className="new-listing">Add new listing</Button>
        </Link>
      </div>
      <div>
        <h4 className="hosted-list">
          Your Hosted Home(s): {properties.length}
        </h4>
        {properties.map((property) => {
          return (
            <div key={property.id}>
              <Card>
                <p>Location: {property.neighbourhood_group_cleansed}</p>
                <p>Type Of Housing: {property.room_type}</p>
                <p>Number of Bedrooms: {property.bedrooms}</p>
                <p>Number of Bathrooms: {property.bathrooms}</p>
                <p>
                  Minimum Amount of Nights Required for stay:{" "}
                  {property.minimum_nights} Day(s)
                </p>
                <p>Security Deposit Amount: ${property.security_deposit}</p>
                <p>Cleaning Fee Amount: ${property.cleaning_fee}</p>
                <p>
                  Current Total: $
                  {property.security_deposit + property.cleaning_fee}
                </p>
                <div className="hosted-card">
                  <Link to={`/userprofile/${property.id}/edit-home`}>
                    <Button className="edit-listing">Edit Housing</Button>
                  </Link>

                  <Button
                    className="delete-listing"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteHouse(property.id);
                    }}
                  >
                    Delete Housing
                  </Button>
                </div>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
