import React, { useState } from 'react';
import { MdColorLens, MdAccountCircle } from 'react-icons/md';
import './Navbar.css';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText
} from 'reactstrap';
import {
  Link,
  Redirect
} from 'react-router-dom'

const NavBar = ({token, clickLogout}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="sm" class="navbar">
        <Link to="/"><NavbarBrand href="/"><MdColorLens size={32} />Color Vault</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

          {token === localStorage.getItem('token') ?
            <Nav className="mr-auto" navbar>
              <Redirect to="/colors" />
              <NavItem>
                <NavLink><Link to="/colors">Colors</Link></NavLink>
              </NavItem>
            </Nav>
            :
            <Nav className="mr-auto" navbar>
              <Redirect to="/" />
            </Nav>
          }

          {token === localStorage.getItem('token') ?

            <NavbarText onClick={clickLogout}><MdAccountCircle size={40} /> Sign Out</NavbarText>
            :
            <Link to="/login"><NavbarText><MdAccountCircle size={40} /> Log in</NavbarText></Link>
          }

        </Collapse>
      </Navbar>
    </div>
  );
}

export default NavBar;