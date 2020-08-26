import React, { useState, useEffect, useContext } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { Card, Button } from "reactstrap";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
import { PropertyContext } from "../ContextApi/propertiesContext";
const UserProfile = () => {
  const [username, setUsername] = useState({
    username: "",
  });

  const [properties, setProperties] = useContext(PropertyContext);

  const { push } = useHistory();
  const { id } = useParams();

  const signOut = () => {
    window.localStorage.removeItem("token");
    push("/login");
  };

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
        console.log(properties, "userProfile");
      })
      .catch((err) => console.log(err));
  }, [id]);

  console.log();

  return (
    <div className="userprofile">
      <div className="NavBar">
        <h3>Welcome, {username.username}</h3>

        <Link to={`/userprofile/${id}/add-home`}>
          <Button className="button">Host your home </Button>
        </Link>

        <Button className="button" onClick={signOut}>
          Sign Out
        </Button>
      </div>
      <div>
        Your Hosted Homes {properties.length}:
        {properties.map((property) => {
          return (
            <div key={property.id}>
              <Card
                style={{
                  textAlign: "center",
                  width: "40%",
                  marginLeft: "32%",
                  marginBottom: "15px",
                }}
              >
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
                <Link to={`/userprofile/${property.id}/edit-home`}>
                  <Button
                    style={{
                      width: "35%",
                      marginLeft: "10%",
                      marginBottom: "15px",
                    }}
                  >
                    Edit Housing
                  </Button>
                </Link>

                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    deleteHouse(property.id);
                  }}
                  style={{
                    width: "45%",
                    marginLeft: "30%",
                    marginBottom: "15px",
                  }}
                >
                  Delete Housing
                </Button>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserProfile;
