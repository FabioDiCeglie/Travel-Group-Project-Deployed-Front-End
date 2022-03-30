import React from "react";
// import { NavLink } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

export default function LoggedOut() {
  return (
    <Nav>
      <Nav.Link
        href="/login"
        className="NavBarLink"
        style={{ marginRight: 300 }}
      >
        Login
      </Nav.Link>
    </Nav>
  );
}
