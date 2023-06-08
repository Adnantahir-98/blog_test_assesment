import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import axios from 'axios'
import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import {BiArrowBack} from 'react-icons/bi'


const PostDetails = () => {

  const [article, setArticle] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const fetchById = async () => {
      try {
        const response = await axios.get(`https://newsapi.org/v2/top-headlines/sources?id=${id}apiKey=API_KEY=b8fb4a48fea24491b78f1818e9f33ae8`)
        setArticle(response.data)
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
          <h2>{article.title}</h2>
          <img src={article.urlToImage} className='img-fluid w-75' alt="" />
          <p>{article.body}</p>
        </Col>
      </Row>
    </Container>
  )
}

export default PostDetails
