import React, { useState } from 'react';
import { NavLink as RRNavLink } from "react-router-dom";
import { logout } from '../APIManagers/UserProfileManager';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

export default function Header({isLoggedIn, setIsLoggedIn}) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (<>
    <div>
      <Navbar expand="md" style={{backgroundColor: "#57BBFA"}}>
        <NavbarBrand tag={RRNavLink} to="/">Property Manager</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            { /* When isLoggedIn === true, we will render the Home link */ }
            {/* {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/">Home</NavLink>
              </NavItem>
            } */}
            
              {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/properties">Properties</NavLink>
              </NavItem>
            }

               {isLoggedIn &&
              <NavItem>
                <NavLink tag={RRNavLink} to="/users/tenants">Tenants</NavLink>
              </NavItem>
            }
            
            {isLoggedIn &&
            <NavItem>
              <NavLink tag={RRNavLink} to="/requests">Requests</NavLink>
            </NavItem>
            }

            {isLoggedIn &&
            <NavItem>
              <NavLink tag={RRNavLink} to="/users">User Profiles</NavLink>
            </NavItem>}
          </Nav>
          <Nav navbar>
            
            {isLoggedIn &&
              <>
                <NavItem style={{zIndex: "5"}}>
                  <a aria-current="page" className="nav-link"
                    style={{ cursor: "pointer" }} onClick={() => {
                      logout()
                      setIsLoggedIn(false)
                    }}>Logout</a>
                </NavItem>
              </>
            }
            
            {!isLoggedIn &&
              <>
                <NavItem>
                  <NavLink tag={RRNavLink} to="/login">Login</NavLink>
                </NavItem>
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>

    </>
  );
}
