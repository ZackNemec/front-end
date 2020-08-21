import React from "react";

const UserProfile = () => {
  return (
    <div className="userprofile">
      <div className="NavBar">
        <h3>Welcome, (Username Here)</h3>
        <button className="button">Host your home</button>
        <button className="button">Sign Out</button>
      </div>
      <div>
        Your Hosted Homes:
        {/* Create a map of all the added homes here*/}
      </div>
    </div>
  );
};

export default UserProfile;
