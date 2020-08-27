import React, { useEffect, useState, useContext } from "react";
import { Card, Button } from "reactstrap";
import { PropertyContext } from "../ContextApi/propertiesContext";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
const EditHome = () => {
  const [editHome, setEditHome] = useState([]);
  const [properties, setProperties] = useContext(PropertyContext);
  const { push } = useHistory();
  const { id } = useParams();
  const [userId, setUserId] = useState("");
  const {
    neighbourhood_group_cleansed,
    bedrooms,
    bathrooms,
    security_deposit,
    cleaning_fee,
    room_type,
    minimum_nights,
  } = editHome;

  useEffect(() => {
    axios()
      .get(`/api/property/${id}`)
      .then((resp) => {
        console.log(resp, "response");
        setEditHome(resp.data);
        setUserId(resp.data.user_id);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleChange = (e) => {
    setEditHome({
      ...editHome,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios()
      .put(`/api/property/${id}`, editHome)
      .then((resp) => {
        console.log(resp);
        axios()
          .get(`/api/users/${userId}/property`)
          .then((resp) => {
            setProperties(resp.data);
            console.log(resp, "response");
          })
          .catch((err) => console.log(err));
        console.log(userId);
      })
      .catch((err) => console.log(err));
    push(`/userProfile/${userId}`);
  };

  const BackButton = () => {
    push(`/userProfile/${userId}`);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Card style={{ textAlign: "center", width: "40%", marginLeft: "32%" }}>
          <label style={{ marginTop: "15px" }}>
            Location:
            <input
              style={{ marginLeft: "10px" }}
              name="neighbourhood_group_cleansed"
              value={neighbourhood_group_cleansed || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label style={{ marginRight: "50px" }}>
            Number of Bedrooms:
            <select
              style={{ marginLeft: "10px" }}
              name="bedrooms"
              value={bedrooms || ""}
              onChange={handleChange}
              required
            >
              <option value="none">Select Number of Bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>

          <label style={{ marginRight: "50px" }}>
            Number of Bathrooms:
            <select
              style={{ marginLeft: "10px" }}
              name="bathrooms"
              value={bathrooms || ""}
              onChange={handleChange}
              required
            >
              <option value="none">Select Number of Bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>

          <label style={{ marginRight: "40px" }}>
            Minimum Stay:
            <input
              style={{ marginLeft: "10px" }}
              name="minimum_nights"
              value={minimum_nights || ""}
              min="0"
              onChange={handleChange}
              required
            />
          </label>

          <label style={{ marginRight: "35px" }}>
            Type Of Housing:
            <select
              style={{ marginLeft: "10px" }}
              name="room_type"
              value={room_type || ""}
              onChange={handleChange}
              required
            >
              <option value="none">Select Housing Type</option>
              <option value="Apartment">Apartment</option>
              <option value="House (Shared with host)">
                House (Shared with host)
              </option>
              <option value="Entire House">Entire House</option>
            </select>
          </label>

          <label style={{ marginRight: "115px" }}>
            Security Deposit Amount: $
            <input
              name="security_deposit"
              value={security_deposit || ""}
              min="0"
              onChange={handleChange}
              required
            />
          </label>

          <label style={{ marginRight: "90px" }}>
            Cleaning Fee Amount: $
            <input
              name="cleaning_fee"
              value={cleaning_fee || ""}
              min="0"
              onChange={handleChange}
              required
            />
          </label>
          <Button
            style={{ width: "20%", marginLeft: "45%", marginBottom: "15px" }}
          >
            Edit Home
          </Button>
        </Card>
      </form>
      <Button onClick={BackButton}>Cancel</Button>
    </div>
  );
};

export default EditHome;
