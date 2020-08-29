import React from "react";
import Navigation from "./components/navigation";
import Login from "./components/login";
import Register from "./components/register";
import Routes from "./components/Routes";
import UserProfile from "./components/userprofile";
import ListingPage from "./components/listingPage";
import {
  ListingsProvider,
  ListingsContext,
} from "./ContextApi/listingsContext";
import {withRouter} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <ListingsProvider value={ListingsContext}>
        <Navigation />
        <Routes>
          <Login />
          <Register />
          <UserProfile />
          <ListingPage />
        </Routes>
      </ListingsProvider>
    </div>
  );
}

export default withRouter(App);
