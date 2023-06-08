import { useState, useEffect } from 'react'
import axios from 'axios'

import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


const UsNews = () => {

    const [data, setData] = useState('')

    useEffect(() => {
        const fetchApi = async () => {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
            // https://newsapi.org/v2/top-headlines?country=us&apiKey=949d1u22cbffbrarjh182eig55721odj
            setData(res.data.articles)
        }
        fetchApi()
    }, [data])

    const FilterCategories = (data) => {
        const result = data.filter((catdata) => {
            return catdata.category === data
        })
        setData(result)
    }
    return (
        <Tabs
            defaultActiveKey="Home"
            id="tabs-home"
            className="my-2 border-primary"
            justify
        >
            <Tab eventKey="UnitedStates" title="US" className='ms-auto border' onClick={()=>FilterCategories('us')}>
                
            </Tab>
        </Tabs>
    )
}

export default UsNews