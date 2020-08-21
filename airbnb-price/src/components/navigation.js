import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "reactstrap";

const Navigation = () => {
  return (
    <>
      <Navbar>
        <h1>Title</h1>
        {/*Link for home */}
        <Button>Home</Button>

        {/*Link to About*/}
        <Button>About</Button>

        {/* Link to listings */}
        <Button>Listings</Button>

        <Link to={"/login"}>
          {/*Link to Sign In page */}
          <Button>Sign In</Button>
        </Link>

        <Link to={"/register"}>
          {/* Link to register page*/}
          <Button>Get Started</Button>
        </Link>
      </Navbar>
    </>
  );
};

export default Navigation;
