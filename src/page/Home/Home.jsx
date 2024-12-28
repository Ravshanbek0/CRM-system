import React, { useState } from 'react'
import Payment from '../../components/Payment/Payment';
import Attendance from '../../components/Attendance/Attendance';
import { FaBars, FaTimes,  FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Report from '../../components/Report/Report';
import AttendenceGroup from '../../components/Attendance/AttendenceGroup';
import Appeals from '../../components/Appeals/Appeals';
import Students from '../../components/Students/Students';
import Groups from '../../components/Groups/gROUPS.JSX';



function Home() {
  const { pathname } = useLocation()

  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('Xisobot'); // Bosilgan menyu elementi

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu); // Bosilgan menyu elementini belgilash
  };
  useEffect(() => {
    console.log(pathname);

  }, [])
  return (
    <div className="bg-gray-100 h-auto flex">
      {/* Sidebar */}
      <aside
        className={`${isMenuCollapsed ? "w-16" : "w-64"
          } bg-blue-800 text-white h-screen sticky top-0 transition-all duration-300`}
      >
        {/* Menu Button */}
        <button
          onClick={toggleMenu}
          className="absolute top-4 right-4 text-white text-2xl focus:outline-none hover:bg-blue-600 p-2 rounded-full"
        >
          {isMenuCollapsed ? <FaBars /> : <FaTimes />}
        </button>

        <nav className={`mt-16 space-y-4 ${isMenuCollapsed ? "hidden" : "block"}`}>
          {/* Xisobot */}
          <Link
            to={"/"}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Xisobot" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            onClick={() => handleMenuClick("Xisobot")}
          >
            <FaHome className="text-xl" />
            <span className="font-medium">Xisobot</span>
          </Link>

          {/* O‘quvchilar */}
          <Link
            to={'/students'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "O‘quvchilar" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            onClick={() => handleMenuClick("O‘quvchilar")}
          >
            <FaGraduationCap className="text-xl" />
            <span className="font-medium">O‘quvchilar</span>
          </Link>

          {/* Guruhlar */}
          <Link
            to={'/groups'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Guruhlar" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            onClick={() => handleMenuClick("Guruhlar")}
          >
            <FaUsers className="text-xl" />
            <span className="font-medium">Guruhlar</span>
          </Link>

          {/* To‘lovlar */}
          <Link
            to={'/payment'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "To‘lovlar" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            onClick={() => handleMenuClick("To‘lovlar")}
          >
            <FaCreditCard className="text-xl" />
            <span className="font-medium">To‘lovlar</span>
          </Link>

          {/* Davomat */}
          <Link
            to={'/attandance'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Davomat" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            onClick={() => handleMenuClick("Davomat")}
          >
            <FaUser className="text-xl" />
            <span className="font-medium">Davomat</span>
          </Link>

          {/* Murojatlar */}
          <Link
            to={'/appeals'}
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Murojatlar" ? "bg-blue-600" : "hover:bg-blue-700"
              }`}
            onClick={() => handleMenuClick("Murojatlar")}
          >
            <FaComments className="text-xl" />
            <span className="font-medium">Murojatlar</span>
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {pathname == "/" && <Report />}
        {pathname == "/appeals" && <Appeals />}
        {pathname == "/payment" && <Payment />}
        {pathname == "/attandance" && <Attendance />}
        {pathname=="/students" && <Students/>}
        {pathname=="/groups" && <Groups/>}
        {pathname == "/attendenceGroup" && <AttendenceGroup />}
      </main>
    </div>
  )
}

export default Home