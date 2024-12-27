import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/report' element={<Home />} />
          <Route path='/appeals' element={<Home />} />
          <Route path='/payment' element={<Home />} />
          <Route path='/attandance' element={<Home />} />

          <Route path='/students' element={<Home/>}/>
          <Route path='/groups' element={<Home/>}/>

          <Route path='/attendenceGroup' element={<Home />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App