import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { Button, Card, Container } from 'react-bootstrap';
import { IBlogJOIN } from '../types';



interface EditBlogProps { }

const EditBlog = (props: EditBlogProps) => {
    const [blogs, setBlogs] = useState<IBlogJOIN[]>([])
    

    const [selectedBlog, setSelectedBlog] = useState<IBlogJOIN | null>(null)

    function setupEdit(blog: IBlogJOIN) {
        setSelectedBlog(blog)

    }

    function handleSubmitEdit() {
        fetchData(`/api/blogs/${selectedBlog?.id}`, 'PUT', selectedBlog)
            .then(() => {
                getBlogs()
                setSelectedBlog(null)
            })
    }

    function getBlogs() {
        fetchData('/api/blogs')
            .then(blogs => setBlogs(blogs))
    }

    useEffect(() => {
        getBlogs()
    }, [])

    const handleDelete = (id: number) => {

        fetchData(`/api/blogs/${id}`, 'DELETE')
            .then(data => console.log(data.message))
            .then(getBlogs)
    }

    return (
        <Container>
                    {blogs.map(blog => (
                        <Card key={blog.id} className=" bg-primary rounded-3 m-3">
                            <Card.Title className='text-center mt-3'>
                                {blog.title}
                            </Card.Title>
                            <Card.Subtitle className='text-center mt-2'>
                                by {blog.full_name}
                            </Card.Subtitle>
                            <Card.Body>
                                <Card.Text >
                                    <textarea className='form-control bg-light' value={blog.id === selectedBlog?.id ? selectedBlog?.content : blog.content} onChange={(e) => blog.id === selectedBlog?.id ? setSelectedBlog({ ...selectedBlog, content: e.target.value }) : null} readOnly={blog.id !== selectedBlog?.id} />
                                    {blog.id === selectedBlog?.id ? <Button onClick={handleSubmitEdit} className='mt-2 bg-secondary'>Submit</Button> : <Button className='mt-2 bg-light' onClick={() => setupEdit(blog)}>Edit Content</Button>}
                                </Card.Text>
                            </Card.Body>
                            <Button onClick={() => handleDelete(blog.id)} className='bg-danger '>Delete Blog</Button>
                        </Card>
                    ))}
        </Container>
    );
};

export default EditBlog;