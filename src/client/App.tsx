import React from 'react';
import { BrowserRouter, Route, Routes, NavLink, useNavigate } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Home from './views/Home';
import BlogDetails from './views/BlogDetails';
import ComposeBlog from './views/ComposeBlog';
import EditBlog from './views/EditBlogs';
import ContactMe from './views/ContactMe';
import SaveBones from './views/SaveBones';
import Thanks from './views/Thanks';
import Login from './views/Login';
import Register from './views/Register';

interface AppProps { }

const App = (props: AppProps) => {

	const navigate = useNavigate()
	const logout = () => {
		localStorage.removeItem('token')
		navigate('/')
	}

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
							<Nav.Link as={NavLink} to="/donate">Save Bones!</Nav.Link>
							<Button onClick={logout} className="btn-secondary">Logout</Button>
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
				<Route path="/donate" element={<SaveBones />} />
				<Route path="/thank-you" element={<Thanks />} />
				<Route path="/login" element={<Login />}></Route>
				<Route path="/register" element={<Register />}></Route>
			</Routes>
		</BrowserRouter>

	);
};

export default App;