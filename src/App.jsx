import React, { useEffect, useState } from 'react';
import axios from 'axios'
import { BrowserRouter, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Home from './page/Home/Home';
import Attendance from './components/Attendance/Attendance';
import AttendenceGroup from './components/Attendance/AttendenceGroup';
import Loader from './components/Loader/Loader';
import Register from './components/Register/Register';
import PasswordVerify from './components/PasswordVerify/PasswordVerify';


function App() {
  const href = useParams()
  const [data, setData] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataGroup, setDataGroup] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataTeacher, setDataTeacher] = useState([]); // Ma'lumotni saqlash uchun holat
  const [dataAppeals, setDataAppeals] = useState([]); // Ma'lumotni saqlash uchun holat
  const [loading, setLoading] = useState(false); // Yuklanish holatini ko'rsatish uchun
  const [error, setError] = useState(null); // Xatolarni saqlash uchun

  const [group_id, setGroup_id] = useState("")

  const [token, setToken] = useState(localStorage.getItem("token") ? localStorage.getItem("token") : false)




  const fetchData = async () => {

    if (token != null) {
      try {

        setLoading(true)
        const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/pupil', {
          headers: {
            Authorization: `Bearer ${token}` // Tokenni 'Authorization' headeriga qo‘shish
          }
        }); // API URL
        setData(response.data); // Javobni saqlash
        console.log(response.data);

        setLoading(false); // Yuklashni to'xtatish
      } catch (err) {
        setError(err.message); // Xatoni saqlash
        if (err.message) {
          localStorage.clear()
          window.location.reload()
        }
        setLoading(false); // Yuklashni to'xtatish
      }
    }
  };
  const fetchDataGroup = async () => {
    try {
      setLoading(true)

      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/group/', {
        headers: {
          Authorization: `Bearer ${token}` // Tokenni 'Authorization' headeriga qo‘shish
        }
      }); // API URL
      setDataGroup(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
      console.log(response.data);

    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  const fetchDataTeacher = async () => {
    try {
      setLoading(true)

      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/teacher/', {
        headers: {
          Authorization: `Bearer ${token}` // Tokenni 'Authorization' headeriga qo‘shish
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

      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/appeal', {
        headers: {
          Authorization: `Bearer ${token}` // Tokenni 'Authorization' headeriga qo‘shish
        }
      }); // API URL
      setDataAppeals(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  const refToken = async () => {
    const token2 = localStorage.getItem("token");

    if (!token2) {
      return;

    }

    try {
      const response = await axios.post(
        "https://crm-system-beta.vercel.app/api/v1/auth/refresh-token/",
        null,
        {
          headers: {
            Authorization: `Bearer ${token2}`,
            Accept: "application/json",
          },
        }
      );

      console.log("✅ Server javobi:", response);
      console.log("✅ Serverdan kelgan data:", response.data);

      if (response.data) {
        localStorage.setItem("token", response.data.access_token);

      }
    } catch (error) {
      console.error("❌ Xatolik:", error.response?.data || error.message);
      console.error("❌ Server xatosi:", error.response);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData()
      fetchDataGroup()
      fetchDataTeacher()
      fetchDataAppeals()
    }
    // refToken()
    const checkAndRefreshToken = async () => {
      const lastRefresh = localStorage.getItem("lastRefresh");
      const now = Date.now();

      if (!lastRefresh || now - Number(lastRefresh) >= 420000) {
        await refToken();
      }
    };

    checkAndRefreshToken(); // Dastlab yuklanganda tekshiramiz

    const interval = setInterval(refToken, 420000); // 7 daqiqada bir ishga tushadi

    return () => clearInterval(interval);
  }, [token])



  return (
    <>
      {/* {loading && <Loader />} */}
      <BrowserRouter>
        {token == false ? <Routes>
          <Route path='/' element={<Register toke={token} setToken={setToken} />} />
          <Route path='/password' element={<PasswordVerify setToken={setToken} />} />
          <Route path='/report' element={<Register setToken={setToken} />} />
          <Route path='/appeals' element={<Register setToken={setToken} />} />
          <Route path='/payment' element={<Register setToken={setToken} />} />
          <Route path='/attandance' element={<Register setToken={setToken} />} />
          <Route path='/students' element={<Register setToken={setToken} />} />
          <Route path='/groups' element={<Register setToken={setToken} />} />
          <Route path='/attendenceGroup/:id' element={<Register setToken={setToken} />} />


        </Routes> : <Routes>

          <Route path='/' element={<Home data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />} />
          <Route path='/report' element={<Home data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />} />
          <Route path='/appeals' element={<Home dataAppeals={dataAppeals} />} />
          <Route path='/payment' element={<Home data={data} setLoading={setLoading} />} />
          <Route path='/attandance' element={<Home setLoading={setLoading} setGroup_id={setGroup_id} dataGroup={dataGroup} />} />
          <Route path='/students' element={<Home token={token} data={data} setLoading={setLoading} dataGroup={dataGroup} />} />
          <Route path='/groups' element={<Home dataGroup={dataGroup} setLoading={setLoading} />} />
          <Route path='/attendenceGroup/:id' element={<AttendenceGroup setLoading={setLoading} dataGroup={dataGroup} group_id={group_id} data={data} />} />
        </Routes>}


      </BrowserRouter>
    </>
  )
}

export default App