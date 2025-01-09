import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';


function App() {
  const [data, setData] = useState([]); // Ma'lumotni saqlash uchun holat
  const [loading, setLoading] = useState(true); // Yuklanish holatini ko'rsatish uchun
  const [error, setError] = useState(null); // Xatolarni saqlash uchun


  const fetchData = async () => {
    try {
      const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil/'); // API URL
      setData(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  useEffect(()=>{
    fetchData()
    console.log(data);
    
  },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home data={data}/>} />
          <Route path='/report' element={<Home data={data} />} />
          <Route path='/appeals' element={<Home />} />
          <Route path='/payment' element={<Home data={data} />} />
          <Route path='/attandance' element={<Home />} />
          <Route path='/students' element={<Home />} />
          <Route path='/groups' element={<Home />} />
          <Route path='/attendenceGroup' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App