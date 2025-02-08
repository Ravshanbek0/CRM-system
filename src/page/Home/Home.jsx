import React, { useState } from 'react'
import Payment from '../../components/Payment/Payment';
import Attendance from '../../components/Attendance/Attendance';
import { FaBars, FaTimes, FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Report from '../../components/Report/Report';
// import AttendenceGroup from '../../components/Attendance/AttendenceGroup';
import Appeals from '../../components/Appeals/Appeals';
import Students from '../../components/Students/Students';
import Groups from '../../components/Groups/Groups';



function Home({ data, dataGroup, dataTeacher, group_id, setGroup_id, setLoading, dataAppeals,token }) {
  const { pathname } = useLocation()

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
          {isMenuCollapsed ? "" : <img className='max-w-[150px] object-contain' src="./imgs/logo.png" alt="" />}
          <button
            onClick={toggleMenu}
            className="absolute top-4 right-4 text-white text-2xl focus:outline-none hover:bg-[#555555] p-2 rounded-full"
          >
            {isMenuCollapsed ? <FaBars /> : <FaTimes />}
          </button>
        </div>

        <nav className={`mt-6 px-4 space-y-4 ${isMenuCollapsed ? "hidden" : "block"}`}>
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
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 ml-4">
        {pathname == "/" && <Report data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />}
        {pathname == "/appeals" && <Appeals dataAppeals={dataAppeals} />}
        {pathname == "/payment" && <Payment data={data} setLoading={setLoading} />}
        {pathname == "/attandance" && <Attendance setGroup_id={setGroup_id} setLoading={setLoading} dataGroup={dataGroup} />}
        {pathname == "/students" && <Students token={token} data={data} dataGroup={dataGroup} />}
        {pathname == "/groups" && <Groups dataGroup={dataGroup} setLoading={setLoading} />}
        {/* {pathname == `/attendenceGroup/${group_id}` && <AttendenceGroup dataGroup={dataGroup} />} */}
      </main>
    </div>
  )
}

export default Home