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
          {/* <Link to="/appeals" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Murojatlar" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Murojatlar")}>
            <FaComments className="text-xl" />
            <span className="font-medium">Murojatlar</span>
          </Link> */}
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
          ].map(({ to, icon, label }) => (
            <Link key={label} to={to} className="flex flex-col items-center text-xs hover:text-gray-300">
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </aside>

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen flex flex-col lg:flex-row gap-4 w-full">
  {/* Left Section - Group Info */}
  <div className='w-full lg:min-w-[350px] xl:min-w-[450px]'>
    <h2 className="text-xl md:text-2xl font-bold text-[#333333] mb-4">
      {attendenceGroup.group_name} guruhi ro'yhati
    </h2>
    <div className="bg-white shadow-md rounded p-4 w-full mb-4">
      <h3 className="text-lg md:text-xl font-semibold text-[#333333] mb-3">{attendenceGroup.group_name}</h3>
      <p className="text-sm md:text-base text-gray-700">
        <strong>O'qituvchi:</strong> {attendenceGroup.name}
      </p>
      <p className="text-sm md:text-base text-gray-700">
        <strong>Tel raqam:</strong> {attendenceGroup.phone}
      </p>
      <p className="text-sm md:text-base text-gray-700">
        <strong>Dars kunlari:</strong> {attendenceGroup.lesson_dates}
      </p>
      <p className="text-sm md:text-base text-gray-700">
        <strong>Dars vaqti:</strong> 14:00-16:00
      </p>
      <p className="text-sm md:text-base text-gray-700">
        <strong>O'quvchilar soni:</strong> {attendenceGroup.group_pupils?.length}ta
      </p>
      <p className="text-sm md:text-base text-gray-700">
        <strong>To'lov qilganlar:</strong> {attendenceGroup.payment_done}ta
      </p>
    </div>
  </div>

  {/* Right Section - Attendance Table */}
  <div className="bg-white shadow-md rounded p-3 md:p-4 w-full">
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-[#333333] text-white">
            <th className="border border-gray-300 p-1 md:p-2 text-sm md:text-base">№</th>
            <th className="border border-gray-300 p-1 md:p-2 text-sm md:text-base">O'quvchi ismi</th>
            <th className="border border-gray-300 p-1 md:p-2 text-sm md:text-base">Davomat</th>
          </tr>
        </thead>
        {attendenceGroupPupil.length !== 0 ? (
          <tbody>
            {attendenceGroupPupil.map((student, index) => (
              <AttendanceStudent 
                student={student} 
                index={index} 
                apsentStudentId={apsentStudentId} 
                setApsentStudentId={setApsentStudentId} 
              />
            ))}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td colSpan="3" className="text-center p-4 text-sm md:text-base">
                Guruhda o'quvchi mavjud emas.
              </td>
            </tr>
          </tbody>
        )}
      </table>
    </div>
    <button 
      onClick={updateApsentCount} 
      className="bg-[#333333] text-white px-3 py-1 md:px-4 md:py-2 rounded mt-3 md:mt-4 hover:bg-[#555555] text-sm md:text-base"
    >
      Saqlash
    </button>
  </div>
</div>



    </div>

  )
}

export default AttendenceGroup