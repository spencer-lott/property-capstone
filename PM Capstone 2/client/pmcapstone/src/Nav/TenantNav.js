import { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
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
    {/*Header.js was extremely touchy and would hardly let me edit the navbar without bugs. For this project I used the z-index to place the tenant navbar over top of the employee one when a tenant is logged in. I know it's not best practice, but for this project and my timeline I was able to adapt to the situation and no one noticed.*/}
    <Navbar  expand="md" style={{position: "fixed", top: "0", left: "0", width: "100%", zIndex: "3", backgroundColor: "#01CC74"}}>
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

