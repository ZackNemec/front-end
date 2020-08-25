import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button, ButtonGroup } from "reactstrap";

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
        <Link to={"/listing-page"}>
          <Button>Listings</Button>
        </Link>
        <ButtonGroup>
          <Link to={"/login"}>
            {/*Link to Sign In page */}
            <Button>Sign In</Button>
          </Link>

          <Link to={"/register"}>
            {/* Link to register page*/}
            <Button>Get Started</Button>
          </Link>
        </ButtonGroup>
      </Navbar>
    </>
  );
};

export default Navigation;
