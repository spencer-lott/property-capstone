import { useState } from 'react';
import Container from 'react-bootstrap/Container';
import { NavLink as RRNavLink } from "react-router-dom";

// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
  } from 'reactstrap';
  
export const BootstrapNav = () => {

    const localPMUser = localStorage.getItem("userProfile")
    const PMUserObject = JSON.parse(localPMUser)
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
  
  return (
  <>
  <div>
    <Navbar color="light" light expand="md" style={{position: "fixed", top: "0", left: "0", width: "100%", zIndex: "3"}}>
        <NavbarBrand tag={RRNavLink} to="/">Property Manager</NavbarBrand>
          <NavbarToggler onClick={toggle} />
          <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
                <NavLink tag={RRNavLink} to={`/my-profile/${PMUserObject.id}`}>My Profile</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={RRNavLink} to={`/my-requests/${PMUserObject.id}`}>My Requests</NavLink>
            </NavItem>
          </Nav>
        </Collapse>
    </Navbar>
    </div>
  </>

  );
}

