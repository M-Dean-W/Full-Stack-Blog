import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../services/fetchData';
import { IBlog } from '../types';


interface ComposeBlogProps { }

const ComposeBlog = (props: ComposeBlogProps) => {

    const [content, setContent] = useState('');
    const [title, setTitle] = useState('')
    const [authorID, setAuthorID] = useState<number | null>(null);
    const [authors, setAuthors] = useState<{ id: number; full_name: string }[]>([]);
    const navigate = useNavigate()
    const token = localStorage.getItem('token')

    if (!token) {
        navigate('/login')
    }

    useEffect(() => {
        fetchData('/api/authors')
            .then(authors => setAuthors(authors))
    }, [])

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!authorID) {
            console.error('Please select an author to mention.');
            return;
        }

        const blogData: Omit<IBlog, 'id' | 'createdAt'> = {
            author_id: authorID,
            content: content,
            title: title
        };

        fetchData('/api/blogs', 'POST', blogData)
            .then(data => navigate(`/blogs/${data.id}`))
    };


    return (
        <Container>
                    <Card className='m-4 bg-primary' id='blog-box'>
                        <Card.Body>
                            <Card.Title className='p-2'>
                            </Card.Title>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Select size='lg' className='bg-light' value={authorID ?? ''} onChange={(e) => setAuthorID(Number(e.target.value) || null)}>
                                    <option>Select Author</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.full_name}</option>))}
                                </Form.Select>
                                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label style={{ fontSize: '1.5em' }}>Blog Title:</Form.Label>
                                    <Form.Control className='bg-light' type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontSize: '1.5em' }}>Blog Content:</Form.Label>
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

export default ComposeBlog;