import React, { useEffect, useState } from 'react';
import { IBlogJOIN } from '../types';
import { Container, Row, Col, Card, CardGroup, CardFooter } from 'react-bootstrap';
import { fetchData } from '../services/fetchData';
import { Link } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';

interface HomeProps { }

const Home = (props: HomeProps) => {

  const [blogs, setBlogs] = useState<IBlogJOIN[]>([])
  const [paginatedBlogs, setPaginatedBlogs] = useState<IBlogJOIN[]>([])
  const [offset, setOffset]= useState(0)
  const [count, setCount] = useState(0)

  useEffect(() => {
    fetchData('/api/blogs/latest').then((blogs) => {
      setBlogs(blogs)
    })
  }, [])

  useEffect(() => {
    fetchData(`/api/blogs?limit=10&offset=${offset}`)
      .then((data) => {
        if (offset === 0) {
          setPaginatedBlogs(data.blogs.slice(5))
        } else {
          setPaginatedBlogs(data.blogs)
        }
        setCount(data.count)
      })
  }, [offset])

  const handlePagination = (amount:number) => {
    if(offset + amount <0) return
    if(offset + amount > count) return
    
    setOffset(offset + amount)
  }

  return (
    <Container>
      <Row><h1>Most Recent Blogs:</h1></Row>
      <Row>
        <CardGroup>
          {blogs.slice(0,5).map(blog => (
            <Card key={blog.id} className=" bg-primary rounded-3 m-2 p-2 ">
              <Card.Title className='text-center mt-2'>
                {blog.title}
              </Card.Title>
              <Card.Subtitle className='text-center mt-2'>
                by {blog.full_name}
              </Card.Subtitle>
              <Card.Body>
                <Card.Text className='text-truncate' style={{ maxWidth: 150 }}>
                  {blog.content}
                </Card.Text>
              </Card.Body>
              <Link to={`blogs/${blog.id}`} className='text-center'> Full Blog </Link>
            </Card>
          ))}
        </CardGroup>
      </Row>
      <Row className='mt-2'>
        <h1>All Blogs:</h1>
        <h2>
          {offset !== 0 && (<span onClick={() => handlePagination(-10)} className='btn btn-primary m-2'>Previous Blogs</span>)}{""}
          {offset + 10 < count && (<span onClick={() => handlePagination(10)} className='btn btn-primary m-2'>More Blogs</span>)}
        </h2>
        </Row>
      <Row className='mt-2 mb-5'>
        {paginatedBlogs.map(blog => (
          <ListGroup key={blog.id}>
            <ListGroup.Item variant='primary' as="li" className="d-flex justify-content-between align-items-start">
              <div className="ms-2 me-auto">
                <div className="fw-bold">{blog.title} </div>
                by {blog.full_name}
              </div>
              <Link to={`blogs/${blog.id}`} className='btn btn-primary justify-content-end'>Details</Link>
            </ListGroup.Item>
          </ListGroup>
        ))}
      </Row>
    </Container >
  );
};

export default Home;