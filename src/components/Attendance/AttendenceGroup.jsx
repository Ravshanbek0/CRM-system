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
  const [teacher, setTeacher] = useState([])

  const fetchDataGroup = async () => {
    const access_token = localStorage.getItem('token')

    try {
      setLoading(true)

      const response = await axios.get(`https://crm-system-beta.vercel.app/api/v1/group/${id}/`, {
        headers: {
          Authorization: `Bearer ${access_token}`
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
    const access_token = localStorage.getItem('token')

    try {
      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/pupil/', {
        headers: {
          Authorization: `Bearer ${access_token}`
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
  const updateApsentCount = async () => {
    const access_token = localStorage.getItem('token')

    try {
      const requests = apsentStudentId.map(async (id) => {
        // 1️⃣ Avval eski ma’lumotlarni olish
        const studentResponse = await axios.get(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        const currentApsent = studentResponse.data.apsent || 0; // Agar 'apsent' mavjud bo'lmasa, 0 bo‘lsin

        // 2️⃣ PATCH orqali yangilash (apsent + 1)
        await axios.patch(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
          apsent: currentApsent + 1, // Yangi qiymat
        }, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        }
        );

        console.log(`O‘quvchi ${id} yangilandi ✅`);
      });

      await Promise.all(requests); // Barcha so‘rovlarni parallel bajarish
      console.log("Barcha o‘quvchilar apsent yangilandi ✅");
    } catch (error) {
      console.error("Xatolik yuz berdi ❌", error.response?.data || error.message);
    }
  };
  const fetchDataTeacher = async () => {
    const access_token = localStorage.getItem('token')

    try {
      setLoading(true)

      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/teacher/', {
        headers: {
          Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish
        }
      }); // API URL
      console.log(response.data);
      const teacherRes = response.data.filter((item) => {
        return item.groups.includes(id)
      })
      setTeacher(teacherRes)
      console.log(teacherRes);


    } catch (err) {
      console.log(err);

    }
  };


  const [attendance, setAttendance] = useState([]);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Bosilgan menyu elementini belgilash
  };


  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    fetchDataGroup()
    fetchDataPupil()
    fetchDataTeacher()
  }, [])
  // const absentStudents = attendance.filter((student) => !student.present);


  return (
    <div className="bg-gray-100 h-auto flex">
      {/* Sidebar */}
      <aside
        className={`
    ${isMenuCollapsed ? "xl:w-16" : "xl:w-64"}
    bg-[#333333] text-white
    transition-all duration-300
    xl:sticky xl:top-0 xl:h-screen xl:flex xl:flex-col
    fixed bottom-0 left-0 w-full h-16 
    z-50
  `}
      >
        {/* Menu Button (faqat katta ekranlarda) */}
        <div className='hidden xl:flex items-center pt-4 relative'>
          {!isMenuCollapsed && <h1 className='text-2xl font-bold px-2'>Ta'lim.uz</h1>}
          <button
            onClick={toggleMenu}
            className="absolute  right-2 text-white text-2xl hover:bg-[#555555] p-2 rounded-full"
          >
            <FaBars />
          </button>
        </div>
        {!isMenuCollapsed && <hr className='mt-4 text-[#fff] xl:block hidden' />}

        {/* Katta ekranlar uchun menu */}
        <nav className={`mt-8 px-0 space-y-4 ${isMenuCollapsed ? "hidden" : "hidden xl:block"}`}>
          <Link to="/" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Xisobot" ? "bg-[#33333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Xisobot")}>
            <FaHome className="text-xl" />
            <span className="font-medium">Xisobot</span>
          </Link>
          <Link to="/students" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "O‘quvchilar" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("O‘quvchilar")}>
            <FaGraduationCap className="text-xl" />
            <span className="font-medium">O‘quvchilar</span>
          </Link>
          <Link to="/groups" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Guruhlar" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Guruhlar")}>
            <FaUsers className="text-xl" />
            <span className="font-medium">Guruhlar</span>
          </Link>
          <Link to="/payment" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "To‘lovlar" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("To‘lovlar")}>
            <FaCreditCard className="text-xl" />
            <span className="font-medium">To‘lovlar</span>
          </Link>
          <Link to="/attandance" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Davomat" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Davomat")}>
            <FaUser className="text-xl" />
            <span className="font-medium">Davomat</span>
          </Link>
          <Link to="/appeals" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Murojatlar" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Murojatlar")}>
            <FaComments className="text-xl" />
            <span className="font-medium">Murojatlar</span>
          </Link>
          <span onClick={() => {
            localStorage.clear()
            navigate("/")
            window.location.reload()
          }} className='absolute bottom-4 mt-8 flex items-center gap-1 px-2 cursor-pointer'>
            <IoIosLogOut className='text-3xl' />Chiqish
          </span>
        </nav>

        {/* Mobil uchun pastki nav */}
        <div className="xl:hidden flex justify-around w-full h-full items-center">
          {[
            { to: "/", icon: <FaHome />, label: "Xisobot" },
            { to: "/students", icon: <FaGraduationCap />, label: "O‘quvchilar" },
            { to: "/groups", icon: <FaUsers />, label: "Guruhlar" },
            { to: "/payment", icon: <FaCreditCard />, label: "To‘lovlar" },
            { to: "/attandance", icon: <FaUser />, label: "Davomat" },
            { to: "/appeals", icon: <FaComments />, label: "Murojatlar" },
          ].map(({ to, icon, label }) => (
            <Link key={label} to={to} className="flex flex-col items-center text-xs hover:text-gray-300">
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
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
                {/* <div className="mt-6">
                  <h4 className="font-semibold text-[#333333]">{formattedDate}</h4>
                  <p className="text-gray-700 font-semibold mt-2">Darsga kelmaganlar:</p>
                  <p>{apsentStudentId.length ? apsentStudentId : apsentStudentId.map((item) => { item == null ? "" : item })},</p>
                  <ul className="list-decimal list-inside text-gray-700 mt-2">
                                                {absentStudents.map((student) => (
                                                    <li key={student.id}>{student.name}</li>
                                                ))}
                                            </ul>
                </div> */}
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
            <button onClick={updateApsentCount} className="bg-[#333333] text-white px-4 py-2 rounded mt-4 hover:bg-[#555555]">
              Saqlash
            </button>
          </div>
        </div>


      </div>

    </div>

  )
}

export default AttendenceGroup