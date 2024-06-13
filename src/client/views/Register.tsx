import React, { useState } from "react";
import { Button, Card, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../services/fetchData";

interface RegisterProps { }

const Register = (props: RegisterProps) => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        fetchData('/auth/register','POST', { email, password })
            .then(token => {
                localStorage.setItem('token', token)
                navigate('/')
            })
            .catch(() => alert('Something went wrong or Invalid credentials'))
    }
   
    return (
        <Container>
           <Card className="m-3">
            <Card.Body>
                <Card.Title>Register a new Book Account</Card.Title>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={email} onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Button type="submit" className="mt-2 btn-secondary">Register</Button>
                </Form>
            </Card.Body>
           </Card>
        </Container>
    );
};

export default Register