import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Attendance from './components/Attendance/Attendance';
import AttendenceGroup from './components/Attendance/AttendenceGroup';


function App() {
  const [data, setData] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataGroup, setDataGroup] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataTeacher, setDataTeacher] = useState([]); // Ma'lumotni saqlash uchun holat
  const [loading, setLoading] = useState(true); // Yuklanish holatini ko'rsatish uchun
  const [error, setError] = useState(null); // Xatolarni saqlash uchun

  const [group_id,setGroup_id] = useState("")


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
  const fetchDataGroup = async () => {
    try {
      const response = await axios.get('https://crm-project.up.railway.app/api/v1/group/'); // API URL
      setDataGroup(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  const fetchDataTeacher = async () => {
    try {
      const response = await axios.get('https://crm-project.up.railway.app/api/v1/teacher/'); // API URL
      setDataTeacher(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  useEffect(()=>{
    fetchData()
    fetchDataGroup()
    fetchDataTeacher()
    console.log(data);
    
  },[])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home data={data}/>} />
          <Route path='/report' element={<Home data={data} />} />
          <Route path='/appeals' element={<Home />} />
          <Route path='/payment' element={<Home data={data}  />} />
          <Route path='/attandance' element={<Home  dataGroup={dataGroup} dataTeacher={dataTeacher} setGroup_id={setGroup_id}/>} />
          <Route path='/students' element={<Home data={data} />} />
          <Route path='/groups' element={<Home dataGroup={dataGroup} />} />
          <Route path='/attendenceGroup/:id' element={<AttendenceGroup dataGroup={dataGroup} group_id={group_id} data={data}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App