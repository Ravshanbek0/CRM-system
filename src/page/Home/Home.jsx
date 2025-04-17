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
        className={`
    ${isMenuCollapsed ? "xl:w-16" : "xl:w-64"}
    bg-[#333333] text-white
    transition-all duration-300
    xl:sticky xl:top-0 xl:h-screen xl:flex xl:flex-col
    fixed bottom-0 left-0 w-full h-16 
    z-50 xl:py-2
  `}
      >
        {/* Menu Button (faqat katta ekranlarda) */}
        <div className='hidden xl:flex items-center pt-4 relative'>
          {!isMenuCollapsed && <h1 className='text-2xl font-bold px-2'>Ta'lim.uz</h1>}
          <button
            onClick={toggleMenu}
            className="absolute top-0 right-2 text-white text-2xl hover:bg-[#555555] p-2 rounded-full"
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
      <span onClick={() => {
        localStorage.clear()
        navigate("/")
        window.location.reload()
      }} className='fixed z-50 top-0 right-0 text-white p-1 rounded bg-[#333333] xl:hidden cursor-pointer'>
        <IoIosLogOut className='text-3xl' />
      </span>

      {/* Main Content */}
      <main className="flex-1 p-6 xl:ml-4 pb-20">
        {pathname == "/" && <Report access_token={access_token} data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />}
        {pathname == "/appeals" && <Appeals access_token={access_token} dataAppeals={dataAppeals} />}
        {pathname == "/payment" && <Payment access_token={access_token} data={data} setLoading={setLoading} />}
        {pathname == "/attandance" && <Attendance access_token={access_token} setGroup_id={setGroup_id} setLoading={setLoading} dataGroup={dataGroup} />}
        {pathname == "/students" && <Students access_token={access_token} token={token} data={data} dataGroup={dataGroup} />}
        {pathname == "/groups" && <Groups access_token={access_token} dataGroup={dataGroup} setLoading={setLoading} />}
      </main>
    </div>
  )
}

export default Home