import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home/Home'
import AttendenceGroup from './components/Attendance/AttendenceGroup'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/payment' element={<Home />} />
          <Route path='/attandance' element={<Home />} />
          <Route path='/attendenceGroup' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App