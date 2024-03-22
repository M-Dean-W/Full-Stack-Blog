import React from 'react';
import { BrowserRouter, Route, Routes, NavLink } from 'react-router-dom';
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

interface AppProps { }

const App = (props: AppProps) => {


	return (
		
		<BrowserRouter>
			<Navbar bg="info" expand="lg" >
			<Container fluid>
				<Navbar.Brand href="/">The Williamson Nook</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Nav.Link as={NavLink} to="/">Home</Nav.Link>
						<Nav.Link as={NavLink} to="/blog">Write a Blog</Nav.Link>
						<Nav.Link as={NavLink} to="/edit">Edit Blogs(Admin)</Nav.Link>
					</Nav>
				</Navbar.Collapse>
				</Container>
			</Navbar>
			<Routes>
				<Route path="/" element={<Home />} />
				{/* <Route path="/blogs/:id" element={<BlogDetails />} />
				<Route path="/blog" element={<ComposeBlog />} />
				<Route path="/edit" element={<EditBlogs />} />
				<Route path="/blog_tags" element={<UserBlog_tags />} /> */}
			</Routes>
		</BrowserRouter>
		
	);
};

export default App;