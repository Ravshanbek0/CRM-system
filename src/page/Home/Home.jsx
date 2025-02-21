import React, { useState } from 'react'
import Payment from '../../components/Payment/Payment';
import Attendance from '../../components/Attendance/Attendance';
import { FaBars, FaTimes, FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Report from '../../components/Report/Report';
// import AttendenceGroup from '../../components/Attendance/AttendenceGroup';
import Appeals from '../../components/Appeals/Appeals';
import Students from '../../components/Students/Students';
import Groups from '../../components/Groups/Groups';
import { IoIosLogOut } from "react-icons/io";


function Home({ data, dataGroup, dataTeacher, group_id, setGroup_id, setLoading, dataAppeals, token }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [access_token, setAccess_token] = useState(token)

  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(`${pathname}`); // Bosilgan menyu elementi

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Bosilgan menyu elementini belgilash
  };

  return (
    <div className="bg-gray-100 h-auto flex">
      {/* Sidebar */}
      <aside
        className={`${isMenuCollapsed ? "w-16" : "w-64"
          } bg-[#333333] text-white h-screen sticky top-0 transition-all duration-300`}
      >
        {/* Menu Button */}
        <div className='flex items-center pt-4'>
          {isMenuCollapsed ? "" : <h1 className='text-2xl font-bold px-2'>Ta'lim.uz</h1>}
          {/* <img className='max-w-[150px] object-contain' src="./imgs/logo.png" alt="" /> */}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none hover:bg-[#555555] p-2 rounded-full"
          >
            <FaBars />
          </button>
        </div>

        <nav className={`mt-8 px-0 space-y-4 ${isMenuCollapsed ? "hidden" : "block"}`}>
          {/* Xisobot */}
          <Link
            to={"/"}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Xisobot" ? "bg-[#33333333]" : "hover:bg-[#555555]"
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
            navigate("/")
            window.location.reload()
          }} className='absolute bottom-4 mt-8 flex items-center gap-1 cursor-pointer'><IoIosLogOut className='text-3xl' />Chiqish</span>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-4">
        {pathname == "/" && <Report access_token={access_token} data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />}
        {pathname == "/appeals" && <Appeals access_token={access_token} dataAppeals={dataAppeals} />}
        {pathname == "/payment" && <Payment access_token={access_token} data={data} setLoading={setLoading} />}
        {pathname == "/attandance" && <Attendance access_token={access_token} setGroup_id={setGroup_id} setLoading={setLoading} dataGroup={dataGroup} />}
        {pathname == "/students" && <Students access_token={access_token} token={token} data={data} dataGroup={dataGroup} />}
        {pathname == "/groups" && <Groups access_token={access_token} dataGroup={dataGroup} setLoading={setLoading} />}
        {/* {pathname == `/attendenceGroup/${group_id}` && <AttendenceGroup dataGroup={dataGroup} />} */}
      </main>
    </div>
  )
}

export default Home