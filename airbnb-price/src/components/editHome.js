import React, { useEffect, useState, useContext } from "react";
import { Card, Button } from "reactstrap";
import { PropertyContext } from "../ContextApi/propertiesContext";
import { useParams, useHistory } from "react-router-dom";
import { axiosWithAuth as axios } from "../utils/axiosWithAuth";
import "../styling/editHome.css";

const EditHome = () => {
  const [editHome, setEditHome] = useState([]);
  const [setProperties] = useContext(PropertyContext);
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
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    push(`/userprofile/${userId}`);
  };

  const BackButton = () => {
    push(`/userprofile/${userId}`);
  };

  return (
    <div className="edit-container">
      <h4 className="edit-hosted">Edit hosted home</h4>
      <form onSubmit={handleSubmit}>
        <Card className="edit-card">
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
              style={{ width: "15%" }}
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
              style={{ width: "15%" }}
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
            Minimum nights required:{" "}
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
                House (shared with host)
              </option>
              <option value="Entire House">Entire house</option>
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
          <div className="edit-btns">
            <Button className="cancel-edit" onClick={BackButton}>
              Cancel
            </Button>
            <Button className="save-edit">Save changes</Button>
          </div>
        </Card>
      </form>
    </div>
  );
};

export default EditHome;
