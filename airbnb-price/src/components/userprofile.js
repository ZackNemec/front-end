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
  }, [id]);

  return (
    <div className="userprofile">
      <div className="NavBar">
        <h3 className="greeting-msg">Hello, {username.username}!</h3>
        <Link to={`/userprofile/${id}/add-home`}>
          <Button className="new-listing">Host new home</Button>
        </Link>
      </div>
      <div>
        <h4 className="hosted-list">
          Your hosted home(s): {properties.length}
        </h4>
        {properties.map((property) => {
          return (
            <div key={property.id}>
              <Card className="hostHome-card">
                <p>Location: {property.neighbourhood_group_cleansed}</p>
                <p>Home type: {property.room_type}</p>
                <p>Bedrooms: {property.bedrooms}</p>
                <p>Bathrooms: {property.bathrooms}</p>
                <p>
                  Minimum nights required: {property.minimum_nights} night(s)
                </p>
                <p>Security deposit: ${property.security_deposit}</p>
                <p>Cleaning fee: ${property.cleaning_fee}</p>
                <p>
                  Current Total: $
                  {property.security_deposit + property.cleaning_fee}
                </p>
                <div className="hosted-btns">
                  <Link
                    className="editBtn-link"
                    to={`/userprofile/${property.id}/edit-home`}
                  >
                    <Button className="edit-listing">Edit home</Button>
                  </Link>

                  <Button
                    className="delete-listing"
                    onClick={(e) => {
                      e.preventDefault();
                      deleteHouse(property.id);
                    }}
                  >
                    Delete home
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
