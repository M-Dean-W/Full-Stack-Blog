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
            <div className="row justify-content-around p-3">
                <div className='col-sm-3'>
                    <Card className='bg-info' id='blog-box'>
                        <Card.Body>
                            <Card.Title className='p-2'>
                            </Card.Title>
                            <Form onSubmit={handleFormSubmit}>
                                <Form.Select size='lg' className='bg-danger' value={authorID ?? ''} onChange={(e) => setAuthorID(Number(e.target.value) || null)}>
                                    <option>Select Author</option>
                                    {authors.map(author => (
                                        <option key={author.id} value={author.id}>{author.full_name}</option>))}
                                </Form.Select>
                                <Form.Group className="mb-3 mt-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Blog Title:</Form.Label>
                                    <Form.Control type='text' value={title} onChange={(e) => setTitle(e.target.value)} />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ fontSize: '1.5em' }}>Blog Content:</Form.Label>
                                    <Form.Control
                                        className='bg-light'
                                        as="textarea"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        rows={3} />
                                </Form.Group>
                                <Button type='submit' variant='danger'>Blog it!</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </Container>
    );
};

export default ComposeBlog;