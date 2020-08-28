import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar,
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const userID = window.localStorage.getItem("user");
  const { push } = useHistory();
  const history = useHistory();
  const [button, setButton] = React.useState(false);
  const toggle = () => setButton(!button);
  const token = window.localStorage.getItem("token");
  const signOut = () => {
    window.localStorage.removeItem("token");
    push("/login");
  };
  const userProfile = () => {
    history.push(`/userprofile/${userID}`);
  };
  return (
    <>
      <Navbar color="light">
        <h1>Title</h1>
        {/*Link for home */}
        <Button>Home</Button>

        {/*Link to About*/}
        <Button>About</Button>

        {/* Link to listings */}
        <Link to={"/listing-page"}>
          <Button>Listings</Button>
        </Link>
        {token ? (
          <ButtonDropdown isOpen={button} toggle={toggle}>
            <DropdownToggle caret>User</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={userProfile}>Profile</DropdownItem>
              <DropdownItem onClick={signOut}>Log Out</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        ) : (
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
        )}
      </Navbar>
    </>
  );
};

export default Navigation;
