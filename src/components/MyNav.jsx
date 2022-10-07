import React, { useState } from 'react';
import { Nav, Container, Navbar, Offcanvas } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CarSidebar from './CarSidebar';

const MyNav = () => {

    const logout = () => {
        localStorage.setItem('token', '')
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
            <Navbar bg="light" variant="light" expand="lg">
                <Container>
                    <Navbar.Brand to="/" href='/#/'>E-commerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/#/login">Login</Nav.Link>
                            {/* <Nav.Link href="/#/products">Products</Nav.Link> */}
                            <Nav.Link onClick={handleShow}>Cart</Nav.Link>
                            <Nav.Link onClick={logout} href="/#/login">Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <CarSidebar show={show} handleClose={handleClose} />
        </>
    );
};

export default MyNav;