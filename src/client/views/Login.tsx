import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../services/fetchData";

interface LoginProps { }

const Login = (props: LoginProps) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetchData('/auth/login','POST', {email, password})
            .then(token => {
                localStorage.setItem('token', token)
                navigate('/')
            })
            .catch(() => alert('Something went wrong or Invalid credentials'))
    }
   
    return (
        <Container>
           <Card className="m-3 bg-primary">
            <Card.Body>
                <Card.Title>Login to your Book Account</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button className="m-2 btn-secondary" type="submit">Login</Button>
                    <Link to={'/register'} className="btn btn-light">Register New Account</Link>
                </Form>
            </Card.Body>
           </Card>
        </Container>
    );
};

export default Login