import Card from 'react-bootstrap/Card'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { GetNews } from '../redux/newsSlice'
import { Link } from 'react-router-dom'
import SearchBox from './SearchBox'


const TabPanels = () => {

    const dispatch = useDispatch()
    const newsList = useSelector((state) => state.news)

    useEffect(() => {
        dispatch(GetNews())
    }, [dispatch])

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
                                            {item.body}
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
            <Tab eventKey="Categories" title="Categories" className='border'>
                Tab content for Categories
            </Tab>
            <Tab eventKey="Search" title="Search" className='me-auto border'>
                <SearchBox />
            </Tab>
            <Tab eventKey="GreatBritain" title="GB" className='border' style={{marginLeft: '200px'}}>
                Great Britain
            </Tab>
            <Tab eventKey="UnitedStates" title="US" className='ms-auto border'>
                United States
            </Tab>
        </Tabs>
    );
}

export default TabPanels;
