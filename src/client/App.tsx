import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import BlogDetails from './views/BlogDetails';
import ComposeBlog from './views/ComposeBlog';
import EditBlog from './views/EditBlogs';
import ContactMe from './views/ContactMe';

interface AppProps { }

const App = (props: AppProps) => {


	return (
		
		<BrowserRouter>
			<Navbar bg="primary" expand="lg" >
			<Container fluid>
				<Navbar.Brand>The Williamson Nook</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/blog">Write a Blog</Nav.Link>
						<Nav.Link as={NavLink} to="/edit">Edit Blogs(Admin)</Nav.Link>
						<Nav.Link as={NavLink} to="/email">Contact Me</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/blogs/:id" element={<BlogDetails />} />
				<Route path="/blog" element={<ComposeBlog />} />
				<Route path="/edit" element={<EditBlog />} />
				<Route path="/email" element={<ContactMe />} />
			</Routes>
		</BrowserRouter>
		
	);
};

export default App;