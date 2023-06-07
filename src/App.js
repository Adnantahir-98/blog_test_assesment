import { Routes, Route } from 'react-router-dom'

import PostDetails from './screens/postDetails'
import Home from './screens/Home'


const App = () => {

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/post/:id" element={<PostDetails />} />
      </Routes>
    </>
  );
}

export default App;
