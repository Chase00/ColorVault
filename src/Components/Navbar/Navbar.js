import React, { useState } from 'react';
import { MdColorLens, MdAccountCircle } from 'react-icons/md';
import './Navbar.css';
import {
  Link,
  Redirect
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
        <Link to="/"><NavbarBrand href="/"><MdColorLens size={32}/>Color Vault</NavbarBrand></Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>

         { props.token === localStorage.getItem('token') ?
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

        { props.token === localStorage.getItem('token') ?

                  <NavbarText onClick={props.clickLogout}><MdAccountCircle size={40}/> Sign Out</NavbarText>
                 :
                 <Link to="/login"><NavbarText><MdAccountCircle size={40}/> Log in</NavbarText></Link>
        }

        </Collapse>
        </Navbar>
    </div>
  );
}

export default NavBar;