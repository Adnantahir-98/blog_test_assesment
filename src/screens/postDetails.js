import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {BiArrowBack} from 'react-icons/bi'


const PostDetails = () => {

  const [product, setProduct] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        setProduct(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchById()
  }, [id])

  return (
    <Container>
      <Link to="/"><BiArrowBack /> Home</Link>
      <Row>
        <Col md={8} className="m-auto">
          <h2>{product.title}</h2>
          <img src="https://images.pexels.com/photos/1659437/pexels-photo-1659437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className='img-fluid w-75' alt="" />
          <p>{product.body}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default PostDetails
