import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home';
import Attendance from './components/Attendance/Attendance';
import AttendenceGroup from './components/Attendance/AttendenceGroup';
import Loader from './components/Loader/Loader';
import Register from './components/Register/Register';


function App() {
  const [data, setData] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataGroup, setDataGroup] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataTeacher, setDataTeacher] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataAppeals, setDataAppeals] = useState([]); // Ma'lumotni saqlash uchun holat
  const [loading, setLoading] = useState(false); // Yuklanish holatini ko'rsatish uchun
  const [error, setError] = useState(null); // Xatolarni saqlash uchun

  const [group_id, setGroup_id] = useState("")

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : null)


  const fetchData = async () => {
    console.log(token);

    if (token != null) {
      try {

        setLoading(true)
        const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil', {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
          }
        }); // API URL
        setData(response.data); // Javobni saqlash
        console.log(response.data);

        setLoading(false); // Yuklashni to'xtatish
      } catch (err) {
        setError(err.message); // Xatoni saqlash
        setLoading(false); // Yuklashni to'xtatish
      }
    }
  };
  const fetchDataGroup = async () => {
    try {
      setLoading(true)

      const response = await axios.get('https://crm-project.up.railway.app/api/v1/group/', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
        }
      }); // API URL
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

      const response = await axios.get('https://crm-project.up.railway.app/api/v1/teacher/', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
        }
      }); // API URL
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

      const response = await axios.get('https://crm-project.up.railway.app/api/v1/appeal', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
        }
      }); // API URL
      setDataAppeals(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };

  useEffect(() => {

    fetchData()
    fetchDataGroup()
    fetchDataTeacher()
    fetchDataAppeals()
  }, [token])

  return (
    <>
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          {/* {token == null && <Route path='/' element={<Register toke={token} setToken={setToken} />} />} */}
          <Route path='/' element={<Home data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />} />
          <Route path='/report' element={<Home data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />} />
          <Route path='/appeals' element={<Home dataAppeals={dataAppeals} />} />
          <Route path='/payment' element={<Home data={data} setLoading={setLoading} />} />
          <Route path='/attandance' element={<Home setLoading={setLoading} setGroup_id={setGroup_id} dataGroup={dataGroup} />} />
          <Route path='/students' element={<Home token={token} data={data} setLoading={setLoading} dataGroup={dataGroup} />} />
          <Route path='/groups' element={<Home dataGroup={dataGroup} setLoading={setLoading} />} />
          <Route path='/attendenceGroup/:id' element={<AttendenceGroup setLoading={setLoading} dataGroup={dataGroup} group_id={group_id} data={data} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App