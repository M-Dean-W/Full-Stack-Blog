import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Navbar, Nav, Button } from "react-bootstrap";


interface CompleteNavProps { }

const CompleteNav = (props: CompleteNavProps) => {

        const navigate = useNavigate()
        const logout = () => {
            localStorage.removeItem('token')
            navigate('/')
        }

return (
<Navbar bg="primary" expand="lg" >
    
        <Navbar.Brand>The Williamson Nook</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/blog">Write a Blog</Nav.Link>
                <Nav.Link as={NavLink} to="/edit">Edit Blogs(Admin)</Nav.Link>
                <Nav.Link as={NavLink} to="/email">Contact Me</Nav.Link>
                <Nav.Link as={NavLink} to="/donate">Save Bones!</Nav.Link>
                <Button onClick={logout} className="btn-secondary">Logout</Button>
            </Nav>
        </Navbar.Collapse>
    
</Navbar>
)
}

export default CompleteNav