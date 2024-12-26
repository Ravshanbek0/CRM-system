import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Home from './page/Home/Home';
import Xisobot from './page/Xisobot/Xisobot';
import Murojaatlar from './page/Murojaatlar/Murojaatlar';

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Xisobot' element={<Xisobot />} />
          <Route path='/Murojaatlar' element={<Murojaatlar />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App