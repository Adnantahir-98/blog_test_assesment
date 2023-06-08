import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import { GetNews } from '../redux/newsSlice'
import SearchBox from './SearchBox'


const TabPanels = () => {

    const [UsData, setUsData] = useState([])
    const [GbData, setGbData] = useState([])

    const dispatch = useDispatch()
    const newsList = useSelector((state) => state.news)

    useEffect(() => {
        dispatch(GetNews())
    }, [dispatch])

    useEffect(() => {
        const fetchUSApi = async () => {
            const res = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b8fb4a48fea24491b78f1818e9f33ae8')
            // https://newsapi.org/v2/everything?domains=wsj.com&apiKey=b8fb4a48fea24491b78f1818e9f33ae8
            setUsData(res.data.articles.slice(0, 9))
        }
        fetchUSApi()
    }, [])

    useEffect(() => {
        const fetchGBApi = async () => {
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=gb&apiKey=b8fb4a48fea24491b78f1818e9f33ae8')
            setGbData(response.data.articles.slice(0, 9))
        }
        fetchGBApi()
    }, [])

    return (
        <Tabs
            defaultActiveKey="Home"
            id="tabs-home"
            className="my-2 border-primary"
            justify
        >
            <Tab eventKey="Home" title="Home" className='border p-3'>
                <h2 className='my-3'>Top news from US:</h2>
                <Row>
                    {Object.values(newsList.news)?.slice(0, 15).map((item) => {
                        return (
                            <Col sm={12} md={4} className="my-2" key={item.id}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Link to={`/post/${item.source.id}`} variant="outline-primary">
                                            Read More...
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Tab>
            <Tab eventKey="Categories" title="Categories" className='border'>
                Tab content for Categories
            </Tab>
            <Tab eventKey="Search" title="Search" className='me-auto border'>
                <SearchBox />
            </Tab>
            <Tab eventKey="GreatBritain" title="GB" className='border' style={{ marginLeft: '200px' }}>
                <Row>
                    {GbData?.slice(0, 9).map((item, index) => {
                        return (
                            <Col sm={12} md={4} className="my-2" key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Link to={`/post/${item.source.id}`} variant="outline-primary">
                                            Read More...
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Tab>
            <Tab eventKey="UnitedStates" title="US" className='ms-auto border p-2'>
                <Row>
                    {UsData?.slice(0, 9).map((item, index) => {
                        return (
                            <Col sm={12} md={4} className="my-2" key={index}>
                                <Card style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={item.urlToImage} />
                                    <Card.Body>
                                        <Card.Title>{item.title}</Card.Title>
                                        <Card.Text>
                                            {item.description}
                                        </Card.Text>
                                        <Link to={`/post/${item.id}`} variant="outline-primary">
                                            Read More...
                                        </Link>
                                    </Card.Body>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Tab>
            <button>US</button>
        </Tabs>
    );
}

export default TabPanels;
