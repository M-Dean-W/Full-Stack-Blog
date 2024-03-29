import React, { useEffect, useState } from 'react';
import { IBlogWithContext } from '../types';
import { Badge, Card, Container } from 'react-bootstrap';
import { fetchData } from '../services/fetchData';
import { useParams } from 'react-router-dom';


interface BlogDetailsProps { }

const BlogDetails = (props: BlogDetailsProps) => {

  const [blogs, setBlogs] = useState<IBlogWithContext[]>([])
  const { id } = useParams()

  useEffect(() => {
    fetchData(`/api/blogs/${id}`)
      .then(blogs => setBlogs(blogs))
  }, [id])

  return (
    <Container>
      {blogs.map(blog => (
        <Card key={blog.id} className=" bg-primary rounded-3 m-3">
          <Card.Title className='text-center mt-2'>
            {blog.title}
          </Card.Title>
          <Card.Subtitle className='text-center mt-2'>
            by {blog.full_name}
          </Card.Subtitle>
          <Card.Subtitle className='text-center mt-2'>
            {blog.tags.map(tag => (
              <Badge key={`blog-${blog.id}-tag-${tag.id}`} bg='danger'>{tag.name}</Badge>
            ))}
          </Card.Subtitle>
          <Card.Body>
            <Card.Text >
              {blog.content}
            </Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default BlogDetails;