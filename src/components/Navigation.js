import React from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

const Navigation = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <img
                    alt=""
                    src="./icon.svg"
                    width="30"
                    height="30"
                    className="d-inline-block align-top"
                />
        Synth Nation
        </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink exact to="/" className="nav-link">Home</NavLink>
                    <NavLink to="/synths/1" className="nav-link">Synths</NavLink>
                    <NavLink to="/manufacturers" className="nav-link">Manufacturers</NavLink>
                    <NavLink to="/blog" className="nav-link">Blog</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation;