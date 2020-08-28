import React from "react";
import "../styling/navigation.css";
import { Link } from "react-router-dom";
import {
  NavbarText,
  NavLink,
  Navbar,
  Button,
  ButtonGroup,
  ButtonDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { useHistory } from "react-router-dom";
import Logo from "./assets/logo.PNG";
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
      <Navbar className="navbar">
        <Link to={"/listing-page"}>
          <NavbarText className="navText">Listings</NavbarText>
        </Link>
        <NavLink href={"https://airbnb-marketing.netlify.app/team.html"}>
          <NavbarText className="navText"> Meet The Team</NavbarText>
        </NavLink>
        <NavLink href="https://airbnb-marketing.netlify.app/index.html">
          <img className="logo" src={Logo} />
        </NavLink>

        {token ? (
          <ButtonDropdown
            isOpen={button}
            toggle={toggle}
            className="buttonDrop"
          >
            <DropdownToggle caret>User</DropdownToggle>
            <DropdownMenu>
              <DropdownItem onClick={userProfile}>Profile</DropdownItem>
              <DropdownItem onClick={signOut}>Log Out</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>
        ) : (
          <ButtonGroup className="buttonGroup">
            <Link to={"/login"}>
              <Button className="logButton">Log In</Button>
            </Link>
            <Link to={"/register"}>
              <Button className="startButton">Get Started</Button>
            </Link>
          </ButtonGroup>
        )}
      </Navbar>
    </>
  );
};

export default Navigation;
