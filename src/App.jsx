import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Attendance from './components/Attendance/Attendance';
import AttendenceGroup from './components/Attendance/AttendenceGroup';
import Loader from './components/Loader/Loader';


function App() {
  const [data, setData] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataGroup, setDataGroup] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataTeacher, setDataTeacher] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataAppeals, setDataAppeals] = useState([]); // Ma'lumotni saqlash uchun holat
  const [loading, setLoading] = useState(false); // Yuklanish holatini ko'rsatish uchun
  const [error, setError] = useState(null); // Xatolarni saqlash uchun

  const [group_id,setGroup_id] = useState("")


  const fetchData = async () => {
    try {
      setLoading(true)
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
      setLoading(true)

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
      setLoading(true)

      const response = await axios.get('https://crm-project.up.railway.app/api/v1/teacher/'); // API URL
      setDataTeacher(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  const fetchDataAppeals = async () => {
    try {
      setLoading(true)

      const response = await axios.get('https://crm-project.up.railway.app/api/v1/appeal'); // API URL
      setDataAppeals(response.data); // Javobni saqlash
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
    fetchDataAppeals()
    // console.log(dataGroup);
  },[])

  return (
    <>
    {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />} />
          <Route path='/report' element={<Home data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />} />
          <Route path='/appeals' element={<Home dataAppeals={dataAppeals} />} />
          <Route path='/payment' element={<Home data={data} setLoading={setLoading} />} />
          <Route path='/attandance' element={<Home  setLoading={setLoading} setGroup_id={setGroup_id} dataGroup={dataGroup}/>} />
          <Route path='/students' element={<Home data={data} setLoading={setLoading} dataGroup={dataGroup} />} />
          <Route path='/groups' element={<Home dataGroup={dataGroup} setLoading={setLoading} />} />
          <Route path='/attendenceGroup/:id' element={<AttendenceGroup setLoading={setLoading} dataGroup={dataGroup} group_id={group_id} data={data}/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App