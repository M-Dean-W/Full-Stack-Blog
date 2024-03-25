import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/fetchData';
import { Card, Container } from 'react-bootstrap';
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
            <div className="row justify-content-around p-3">
                <div className='col-sm-3 col-md-6'>
                    {blogs.map(blog => (
                        <Card key={blog.id} className=" bg-light rounded-3 mb-3 mt-2">
                            <Card.Title className='text-center mt-3'>
                                {blog.title}
                            </Card.Title>
                            <Card.Subtitle className='text-center mt-2'>
                                by {blog.full_name}
                            </Card.Subtitle>
                            <Card.Body>
                                <Card.Text >
                                    <textarea className='form-control bg-light' value={blog.id === selectedBlog?.id ? selectedBlog?.content : blog.content} onChange={(e) => blog.id === selectedBlog?.id ? setSelectedBlog({ ...selectedBlog, content: e.target.value }) : null} readOnly={blog.id !== selectedBlog?.id} />
                                    {blog.id === selectedBlog?.id ? <button onClick={handleSubmitEdit} className='bg-primary'>Submit</button> : <button onClick={() => setupEdit(blog)}>Edit Content</button>}
                                </Card.Text>
                            </Card.Body>
                            <button onClick={() => handleDelete(blog.id)} className='bg-danger'>Delete Blog</button>
                        </Card>
                    ))};
                </div>
            </div>
        </Container>
    );
};

export default EditBlog;