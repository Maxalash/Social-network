import { useState, useEffect, React } from 'react';
import {Navbar, Container, Nav, NavDropdown, Navlink} from 'react-bootstrap';
import "./Header.css"
import {
    BrowserRouter,
    Navigate,
    Routes,
    Router,
    Route,
    Link, 
    NavLink as NavLink2
} from "react-router-dom";

import Cookies from 'universal-cookie';
const cookie = new Cookies()

function logout(){
  cookie.remove('token')
  window.location.reload();
}

function cookieGet(){
  return cookie.get('token');
}

function checkSession(){
  var toke = cookieGet('token')
  const requestOptions = {
      method:'GET',
      headers: { 
          'Content-Type': 'application/json',
          'Authorization':'Token '+toke
      }
  };
  fetch('http://127.0.0.1:8000/post/posts/', requestOptions)
  .then(res => {
      console.log(res.ok)
      if(res.ok) {
          return res.ok;
      }
      // else{
      //     <Navigate to="/login" ></Navigate>
      // }
      throw new Error('Network response was not ok.'+res.ok);
    })
    .catch(function(error) {
      console.log('There has been a problem with your fetch operation: ', 
      error.message);
     });
}

const Navdrop = ()=>{
  return(
    <Nav className="justify-content-end" >
      <NavDropdown title="My pfofile" id='basic-nav-dropdown'>
        <NavDropdown.Item href="#profile">My profile</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={() => logout("Polo Ralph Lauren")}>Log out</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  )
}

const Navln = ()=>{
  return(
    <Nav className="justify-content-end" >
      <Nav.Link className="navbar-item"
                activeClassName="is-active"
                href="/login"
                exact
                >Log in</Nav.Link>
      <Nav.Link className="navbar-item"
                activeClassName="is-active"
                href="/register"
                exact>Register</Nav.Link>
    </Nav>
  )
}

const Header = () =>{
  return(
    <Navbar expand="lg">
                  <Container>
                    <Navbar.Brand href="#home">Nigma Galaxy</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                      <Nav.Link to="/" >
                        Home
                      </Nav.Link>
                        <Nav.Link href="#">About us</Nav.Link>
                        {/* <Link to="/invoices">Invoices</Link> |{" "}
                        <Link to="/expenses">Expenses</Link> */}
                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                      </Nav>
                      
                        {cookieGet() === undefined ? <Navln />:<Navdrop />}
                        
                    </Navbar.Collapse>
                  </Container>
                </Navbar>
  );
}



export default Header;