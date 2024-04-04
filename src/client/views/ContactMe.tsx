import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { fetchData } from '../services/fetchData';
import { IEmail } from '../types';


interface ContactMeProps { }

const ContactMe = (props: ContactMeProps) => {

    const [content, setContent] = useState('');
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')


    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailData: IEmail = {
            from: email,
            subject: subject,
            message: content
        };

        fetchData('/api/email', 'POST', emailData)

        alert("form submitted")
        setEmail('')
        setSubject('')
        setContent('')
    };


    return (
        <Container>
            <Card className='m-4 bg-primary' id='blog-box'>
                <Card.Body>
                    <Card.Title style={{ fontSize: '1.8em' }} className='p-2 text-center'>
                        Contact Me
                    </Card.Title>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group className="mb-3 mt-3" controlId="emailForm.ControlInput1">
                            <Form.Label style={{ fontSize: '1.5em' }}>Your Email:</Form.Label>
                            <Form.Control className='bg-light' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ fontSize: '1.5em' }}>Subject:</Form.Label>
                            <Form.Control className='bg-light' type='text' value={subject} onChange={(e) => setSubject(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label style={{ fontSize: '1.5em' }}>Message:</Form.Label>
                            <Form.Control
                                className='bg-light'
                                as="textarea"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={20} />
                        </Form.Group>
                        <Button type='submit' variant='secondary'>Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default ContactMe;