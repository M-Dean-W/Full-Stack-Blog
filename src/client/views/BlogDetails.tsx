import React, { useEffect, useState } from 'react';
import { IBlogJOIN } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetchData } from '../services/fetchData';
import { useParams } from 'react-router-dom';


interface BlogDetailsProps { }

const BlogDetails = (props: BlogDetailsProps) => {

  const [blogs, setBlogs] = useState<IBlogJOIN[]>([])
  const { id } = useParams()

  useEffect(() => {
    fetchData(`/api/blogs/${id}`)
      .then(blogs => setBlogs(blogs))
  }, [id])

  return (
    <Container>
      <div className="row justify-content-around p-3">
        <div className='col-sm-3 col-md-6'>
          {blogs.map(blog => (
            <Card key={blog.id} className=" bg-light rounded-3 mb-3 mt-2">
              <Card.Title className='text-center mt-2'>
                {blog.title}
              </Card.Title>
              <Card.Subtitle className='text-center mt-2'>
                by {blog.full_name}
              </Card.Subtitle>
              <Card.Body>
                <Card.Text >
                  {blog.content}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BlogDetails;