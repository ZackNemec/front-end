import React, { useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
import { Card, Button } from "reactstrap";
import { PropertyContext } from "../ContextApi/propertiesContext";
import "../styling/hostHome.css";

const HostHome = () => {
  const [properties, setProperties] = useContext(PropertyContext);
  const { id } = useParams();
  const { push } = useHistory();
  const [host, setHost] = useState({
    bedrooms: 0,
    bathrooms: 0,
    beds: 0,
    bed_type: "",
    security_deposit: 0,
    cleaning_fee: 0,
    minimum_nights: 0,
    room_type: "",
    neighbourhood_group_cleansed: "",
    amenities: "null",
  });

  const handleChange = (e) => {
    setHost({
      ...host,
      [e.target.name]: e.target.value,
    });
  };
  const {
    neighbourhood_group_cleansed,
    bedrooms,
    bathrooms,
    security_deposit,
    cleaning_fee,
    room_type,
    minimum_nights,
  } = host;

  const handleSubmit = (e) => {
    e.preventDefault();
    axios()
      .post(`/api/users/${id}/property`, host)
      .then((resp) => {
        setProperties([...properties, resp.data]);
      })
      .catch((err) => console.log(err));

    push(`/userprofile/${id}`);
  };

  const BackButton = () => {
    push(`/userprofile/${id}`);
  };

  return (
    <div className="hostHome-container">
      <h4 className="newHome-title">Host new Home</h4>
      <form onSubmit={handleSubmit}>
        <Card className="newHome-card">
          <label style={{ marginTop: "15px" }}>
            Location:{" "}
            <input
              style={{ width: "45%" }}
              name="neighbourhood_group_cleansed"
              value={neighbourhood_group_cleansed || ""}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Bedrooms:{" "}
            <select
              style={{ width: "70%" }}
              name="bedrooms"
              value={bedrooms || ""}
              onChange={handleChange}
              required
            >
              <option value="none">Select number of bedrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>

          <label>
            Bathrooms:{" "}
            <select
              style={{ width: "72%" }}
              name="bathrooms"
              value={bathrooms || ""}
              onChange={handleChange}
              required
            >
              <option value="none">Select number of bathrooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </label>

          <label>
            Minimum nights required:
            <input
              style={{ width: "15%" }}
              name="minimum_nights"
              value={minimum_nights || ""}
              min="0"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Home type:{" "}
            <select
              style={{ width: "50%" }}
              name="room_type"
              value={room_type || ""}
              onChange={handleChange}
              required
            >
              <option value="none">Select home type</option>
              <option value="Apartment">Apartment</option>
              <option value="House (Shared with host)">
                House (Shared with host)
              </option>
              <option value="Entire House">Entire House</option>
            </select>
          </label>

          <label>
            Security deposit: $
            <input
              style={{ width: "15%" }}
              name="security_deposit"
              value={security_deposit || ""}
              min="0"
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Cleaning fee: $
            <input
              style={{ width: "15%" }}
              name="cleaning_fee"
              value={cleaning_fee || ""}
              min="0"
              onChange={handleChange}
              required
            />
          </label>
          <div className="newHome-btns">
            <Button className="cancel-newHome" onClick={BackButton}>
              Cancel
            </Button>
            <Button className="add-newHome">Add home</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default HostHome;
