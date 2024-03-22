import React, { useEffect, useState } from 'react';
import { IBlogJOIN } from '../types';
import { Card, Container } from 'react-bootstrap';
import { fetchData } from '../services/fetchData';
import { Link } from 'react-router-dom';


interface HomeProps { }

const Home = (props: HomeProps) => {

  const [blogs, setBlogs] = useState<IBlogJOIN[]>([])

  useEffect(() => {
    fetchData('/api/blogs')
      .then(blogs => setBlogs(blogs))
  },[])

  return (
    <Container>
      <div className="row justify-content-around p-3">
        <div className='col-sm-3 col-md-6'>
          {blogs.map(blog => (
            <Card key={blog.id} className=" bg-light rounded-3 mb-3 mt-2">
              <Card.Title className='text-center mt-2'>
                {blog.title}
              </Card.Title>
              <Card.Body>
                <Card.Text >
                  {blog.content}
                </Card.Text>
                <Link to={`blogs/${blog.id}`} className='btn btn-danger'>Details</Link>
              </Card.Body>
            </Card>
          ))};
        </div>
      </div>
    </Container>
  );
};

export default Home;