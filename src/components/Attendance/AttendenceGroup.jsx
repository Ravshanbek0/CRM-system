import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import axios from 'axios';
import AttendanceStudent from './AttendanceStudent';
import { IoIosLogOut } from "react-icons/io";



function AttendenceGroup({ dataGroup, data, setLoading }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const { pathname } = useLocation()
  const [error, setError] = useState()
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(`${pathname}`); // Bosilgan menyu elementi
  const [attendenceGroup, setAttendanceGroup] = useState([])
  const [attendenceGroupPupil, setAttendanceGroupPupil] = useState([])
  const [apsentStudentId, setApsentStudentId] = useState([])

  const fetchDataGroup = async () => {
    try {
      setLoading(true)

      const response = await axios.get(`https://crm-project.up.railway.app/api/v1/group/${id}/`, {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU`
        }
      }); // API URL
      setAttendanceGroup(response.data); // Javobni saqlash
      setLoading(false); // Yuklashni to'xtatish

    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };
  const fetchDataPupil = async () => {
    try {
      const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil/', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU`
        }
      }); // API URL

      const obj = response.data.filter((item) => {
        return id == item.group[0]._id
      })
      setAttendanceGroupPupil(obj);
      setAttendance(obj)

      setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      setError(err.message); // Xatoni saqlash
      setLoading(false); // Yuklashni to'xtatish
    }
  };


  const [attendance, setAttendance] = useState([]);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Bosilgan menyu elementini belgilash
  };
  const toggleAttendance = (id) => {
    setAttendance((prev) =>
      prev.map((student) =>
        student.id === id ? { ...student, present: !student.present } : student
      )
    );
  };

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    fetchDataGroup()
    fetchDataPupil()
  }, [])
  // const absentStudents = attendance.filter((student) => !student.present);


  return (
    <div className="bg-gray-100 h-auto flex">
      {/* Sidebar */}
      <aside
        className={`${isMenuCollapsed ? "w-16" : "w-64"
          } bg-[#333333] text-white h-screen sticky top-0 transition-all duration-300`}
      >
        {/* Menu Button */}
        <div className='flex items-center pt-4'>
          {isMenuCollapsed ? "" : <h1 className='text-3xl font-bold px-4'>Ta'lim.uz</h1>}
          {/* <img className='max-w-[150px] object-contain' src="../imgs/logo.png" alt="" /> */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none hover:bg-[#555555] p-2 rounded-full"
          >
            {isMenuCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <nav className={`mt-6 space-y-4 px-4 ${isMenuCollapsed ? "hidden" : "block"}`}>
          {/* Xisobot */}
          <Link
            to={"/"}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Xisobot" ? "bg-[#333333]" : "hover:bg-[#555555]"
              }`}
            onClick={() => handleMenuClick("Xisobot")}
          >
            <FaHome className="text-xl" />
            <span className="font-medium">Xisobot</span>
          </Link>

          {/* O‘quvchilar */}
          <Link
            to={'/students'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "O‘quvchilar" ? "bg-[#333333]" : "hover:bg-[#555555]"
              }`}
            onClick={() => handleMenuClick("O‘quvchilar")}
          >
            <FaGraduationCap className="text-xl" />
            <span className="font-medium">O‘quvchilar</span>
          </Link>

          {/* Guruhlar */}
          <Link
            to={'/groups'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Guruhlar" ? "bg-[#333333]" : "hover:bg-[#555555]"
              }`}
            onClick={() => handleMenuClick("Guruhlar")}
          >
            <FaUsers className="text-xl" />
            <span className="font-medium">Guruhlar</span>
          </Link>

          {/* To‘lovlar */}
          <Link
            to={'/payment'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "To‘lovlar" ? "bg-[#333333]" : "hover:bg-[#555555]"
              }`}
            onClick={() => handleMenuClick("To‘lovlar")}
          >
            <FaCreditCard className="text-xl" />
            <span className="font-medium">To‘lovlar</span>
          </Link>

          {/* Davomat */}
          <Link
            to={'/attandance'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Davomat" ? "bg-[#333333]" : "hover:bg-[#555555]"
              }`}
            onClick={() => handleMenuClick("Davomat")}
          >
            <FaUser className="text-xl" />
            <span className="font-medium">Davomat</span>
          </Link>

          {/* Murojatlar */}
          <Link
            to={'/appeals'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Murojatlar" ? "bg-[#333333]" : "hover:bg-[#555555]"
              }`}
            onClick={() => handleMenuClick("Murojatlar")}
          >
            <FaComments className="text-xl" />
            <span className="font-medium">Murojatlar</span>
          </Link>
          <span onClick={() => {
            localStorage.clear()
            navigate('/')
            window.location.reload()
          }} className='absolute bottom-4 mt-8 flex items-center gap-1 cursor-pointer'><IoIosLogOut className='text-4xl' />chiqish</span>
        </nav>
      </aside>
      <div className=''>
        <div className="p-6 bg-gray-100 min-h-screen flex gap-2 w-full">

          <div className='min-w-[450px]'>
            <h2 className="text-2xl font-bold text-[#333333] mb-4">
              {attendenceGroup.group_name} guruhi ro'yhati
            </h2>
            <div className="flex flex-col min-w-[45%]">
              {/* Left Section */}
              <div className="bg-white shadow-md rounded p-4 w-full  mb-6 lg:mb-0">
                <h3 className="text-xl font-semibold text-[#333333] mb-4">{attendenceGroup.group_name}</h3>
                <p className="text-gray-700">
                  <strong>O'qituvchi:</strong> {attendenceGroup.name}
                </p>
                <p className="text-gray-700">
                  <strong>Tel raqam:</strong> {attendenceGroup.phone}
                </p>
                <p className="text-gray-700">
                  <strong>Dars kunlari:</strong> {attendenceGroup.lesson_dates}
                </p>
                <p className="text-gray-700">
                  <strong>Dars vaqti:</strong> 14:00-16:00
                </p>
                <p className="text-gray-700">
                  <strong>O'quvchilar soni:</strong> {attendenceGroup.group_pupils?.length}ta
                </p>
                <p className="text-gray-700">
                  <strong>To'lov qilganlar:</strong> {attendenceGroup.payment_done}ta
                </p>
                <div className="mt-6">
                  <h4 className="font-semibold text-[#333333]">{formattedDate}</h4>
                  <p className="text-gray-700 font-semibold mt-2">Darsga kelmaganlar:</p>
                  <p>{apsentStudentId.length ? apsentStudentId : apsentStudentId.map((item) => { item == null ? "" : item })}</p>
                  {/* <ul className="list-decimal list-inside text-gray-700 mt-2">
                                                {absentStudents.map((student) => (
                                                    <li key={student.id}>{student.name}</li>
                                                ))}
                                            </ul> */}
                </div>
              </div>
            </div>
          </div>
          {/* Right Section */}
          <div className="bg-white shadow-md rounded p-4 w-full min-w-[650px] mt-12">
            <table className="table-auto w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="border border-gray-300 p-2">№</th>
                  <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                  <th className="border border-gray-300 p-2">Davomat</th>
                </tr>
              </thead>
              {attendenceGroupPupil.length !== 0 ? (
                <tbody className=''>
                  {attendenceGroupPupil.map((student, index) => (
                    <AttendanceStudent student={student} index={index} apsentStudentId={apsentStudentId} setApsentStudentId={setApsentStudentId} />
                    // <tr
                    //   key={index}
                    //   className={index % 2 === 0 ? "bg-gray-100" : ""}
                    // >
                    //   <td className="border border-gray-300 p-2 text-center">
                    //     {index + 1}
                    //   </td>
                    //   <td className="border border-gray-300 p-2">{student.name} {student.surname}</td>
                    //   <td className="border border-gray-300 p-2 text-center">
                    //     <button
                    //       // onClick={() => toggleAttendance(student.id)}
                    //       onClick={() => {
                    //         absentStudents ? setAbsentStudents(false) : setAbsentStudents(true)
                    //       }}
                    //       className={`text-xl ${absentStudents ? "text-green-500" : "text-red-900"
                    //         }`}
                    //     >
                    //       {absentStudents ? "✔" : "✖"}
                    //     </button>
                    //   </td>
                    // </tr>
                  ))}
                </tbody>
              ) : (
                <h1 className="text-center">Guruhda o'quvchi mavjud emas.</h1>
              )}
            </table>
            <button className="bg-[#333333] text-white px-4 py-2 rounded mt-4 hover:bg-[#555555]">
              Saqlash
            </button>
          </div>
        </div>


      </div>

    </div>

  )
}

export default AttendenceGroup