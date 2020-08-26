import React from "react";
import Navigation from "./components/navigation";
import Login from "./components/login";
import Register from "./components/register";
import Routes from "./components/Routes";
import UserProfile from "./components/userprofile";
import ListingPage from "./components/listingPage";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Routes>
        <Login />
        <Register />
        <UserProfile />
        <ListingPage />
      </Routes>
    </div>
  );
}

export default App;
