import React, { useState } from 'react';
import { MdColorLens, MdAccountCircle } from 'react-icons/md';
import './Navbar.css';
import {
  Link,
} from 'react-router-dom'
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

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar expand="sm" class="navbar">
        <NavbarBrand href="/"><MdColorLens size={32}/> Color Vault</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

         { props.token === localStorage.getItem('token') ?
                   <Nav className="mr-auto" navbar>
                   <NavItem>
                     <NavLink><Link to="/colors">Colors</Link></NavLink>
                   </NavItem>
                   <NavItem>
                     <NavLink><Link to="/home">About</Link></NavLink>
                   </NavItem>
                 </Nav>
                 :
                 <Nav className="mr-auto" navbar>
                 <NavItem>
                   <NavLink><Link to="/colors">Colors</Link></NavLink>
                 </NavItem>
                 <NavItem>
                   <NavLink><Link to="/home">About</Link></NavLink>
                 </NavItem>
               </Nav>
        }


          <NavbarText onClick={props.clickLogout}><MdAccountCircle size={40}/> Sign Out</NavbarText>
        </Collapse>
        </Navbar>
    </div>
  );
}

export default NavBar;