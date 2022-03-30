import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../../store/user/selectors";
// import NavbarItem from "./NavbarItem";
import LoggedIn from "./LoggedIn";
import LoggedOut from "./LoggedOut";
import("./style.css");

export default function Navigation() {
  const token = useSelector(selectToken);

  const loginLogoutControls = token ? <LoggedIn /> : <LoggedOut />;

  return (
    <Navbar expand="lg" className="NavBar">
      <Navbar.Brand
        as={NavLink}
        to="/"
        style={{ color: "white", marginLeft: 20 }}
      >
        Where should I go?
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav style={{ width: "100%" }} fill>
          <Nav.Link href="/" className="NavBarLink">
            Home
          </Nav.Link>
          <Nav.Link href="/experience" className="NavBarLink">
            Experiences
          </Nav.Link>
          {token ? (
            <Nav.Link href="/profile" className="NavBarLink">
              Profile👀
            </Nav.Link>
          ) : (
            ""
          )}
          {loginLogoutControls}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
