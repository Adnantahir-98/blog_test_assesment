import { useEffect, useState } from 'react'
import axios from 'axios'

import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { Link } from 'react-router-dom'


const SearchBox = () => {

    const [query, setQuery] = useState("")
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchNews = async () => {
            const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`)
            // https://newsapi.org/v2/everything?q=${query}&apiKey=b8fb4a48fea24491b78f1818e9f33ae8
            // setData(res.data.articles)
            setData(res.data.slice(0, 6))
        }
        if (query.length === 0 || query.length > 2) fetchNews()
    }, [query])

    return (
        <Container>
            <Row>
                <Col md={10} className="m-auto my-3">
                    <Form>
                        <Form.Group className="mb-3" controlId="search">
                            <Form.Control
                                type="text"
                                placeholder='Search...'
                                className='search'
                                onChange={e => setQuery(e.target.value.toLowerCase())} />
                        </Form.Group>
                    </Form>
                    <hr />
                    <small className='my-0 py-0' style={{ color: "grey", textAlign: "left" }}>Type more than 2 characters to see the final result</small>
                </Col>

                {data.map((item) => (
                    <Col md={4} className="m-auto my-2">
                        <Card style={{ width: '18rem' }} key={item.id}>
                            <Card.Img variant="top" src={item.urlToImage} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text>
                                    {item.body}
                                </Card.Text>
                                <Link to={`/post/${item.id}`} variant="outline-primary">
                                    Read More...
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    )
}

export default SearchBox;
