import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './page/Home/Home';
import Report from './page/Report/Report';
import Appeals from './page/Appeals/Appeals';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/report' element={<Report />} />
          <Route path='/appeals' element={<Appeals />} />
          <Route path='/payment' element={<Home />} />
          <Route path='/attandance' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App