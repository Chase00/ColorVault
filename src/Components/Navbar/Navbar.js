import React, { useState } from 'react';
import { MdColorLens, MdAccountCircle } from 'react-icons/md';
import './Navbar.css';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
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
        <Router>
        <NavbarBrand href="/"><MdColorLens size={32}/> Color Vault</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink><Link to="/">Colors</Link></NavLink>
            </NavItem>
            <NavItem>
              <NavLink><Link to="/">About</Link></NavLink>
            </NavItem>
          </Nav>
          <NavbarText onClick={props.clickLogout}><MdAccountCircle size={40}/> Sign Out</NavbarText>
        </Collapse>
        <Switch>
              <Route exact path="/home"></Route>
              <Route exact path="/colors"></Route>
              <Route exact path="/about"></Route>
      </Switch>
        </Router>
      </Navbar>
    </div>
  );
}

export default NavBar;