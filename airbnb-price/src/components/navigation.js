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
    window.localStorage.removeItem("user");
    push("/login");
  };
  const userProfile = () => {
    history.push(`/userprofile/${userID}`);
  };
  return (
    <>
      <Navbar className="NavBar">
        <div className={"divGroup"}>
          <Link className="link" to={"/listing-page"}>
            <NavbarText className="navText">Listings</NavbarText>
          </Link>

          <NavLink href={"https://airbnb-marketing.netlify.app/team.html"}>
            <NavbarText className="navText"> Meet The Team</NavbarText>
          </NavLink>
        </div>
        <div className="logodiv divGroup">
          <NavLink href="https://airbnb-marketing.netlify.app/index.html">
            <img className="logo" src={Logo} alt="Proxy Logo" />
          </NavLink>
        </div>
        {token ? (
          <div className="dropButtonDiv divGroup">
            <div className="hideThisDiv">
              <Link>
                <NavbarText className="logButton">Log In</NavbarText>
              </Link>
            </div>
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
          </div>
        ) : (
          <div className="loginDiv divGroup">
            <Link to={"/login"}>
              <NavbarText className="logButton">Login</NavbarText>
            </Link>
            <Link to={"/register"}>
              <Button className="startButton">Get Started</Button>
            </Link>
          </div>
        )}
      </Navbar>
      <div class="navBorder"></div>
    </>
  );
};

export default Navigation;
