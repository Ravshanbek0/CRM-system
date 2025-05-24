import axios from 'axios';
import React, { useState } from 'react'
import Payment from '../../components/Payment/Payment';
import Attendance from '../../components/Attendance/Attendance';
import { FaBars, FaTimes, FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Report from '../../components/Report/Report';
import Appeals from '../../components/Appeals/Appeals';
import Students from '../../components/Students/Students';
import Groups from '../../components/Groups/Groups';
import { IoIosLogOut } from "react-icons/io";

function Home({ data, dataGroup, dataTeacher, group_id, setGroup_id, setLoading, dataAppeals, token }) {
  const { pathname } = useLocation()
  const navigate = useNavigate()
  const [access_token, setAccess_token] = useState(token)
  const [hasGroups, setHasGroups] = useState(localStorage.getItem("menuGroup") ? localStorage.getItem("menuGroup") : [])

  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState(pathname);

  const toggleMenu = () => {
    setMenuCollapsed(!isMenuCollapsed);
  };

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const fetchDataGroup = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(`https://crm-system-beta.vercel.app/api/v1/group/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setHasGroups(response.data);
      localStorage.setItem("menuGroup",response.data)
      console.log(response.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDataGroup()
  }, [])

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
          z-50 xl:py-2 px-0
        `}
      >
        {/* Menu Button (visible only on large screens) */}
        <div className='hidden xl:flex items-center pt-4 relative'>
          {!isMenuCollapsed && <h1 className='text-2xl font-bold px-2'>Education.uz</h1>}
          <button
            onClick={toggleMenu}
            className="absolute top-2 right-2 text-white text-2xl hover:bg-[#555555] p-2 rounded-full"
          >
            <FaBars />
          </button>
        </div>
        {!isMenuCollapsed && <hr className='mt-4 text-[#fff] xl:block hidden' />}

        {/* Menu for large screens */}
        <nav className={`mt-8 px-0 space-y-4 ${isMenuCollapsed ? "hidden" : "hidden xl:block"}`}>

          <Link
            to="/"
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "/" ? "bg-[#555555]" : "hover:bg-[#555555]"}`}
            onClick={() => handleMenuClick("/")}
          >
            <span className={`w-3 h-3 rounded-full border ${activeMenu === "/" ? "bg-white" : "border-white"}`} />
            <FaHome className="text-xl" />
            <span className="font-normal">Report</span>
          </Link>

          {/* Students Link - conditionally disabled */}
          {hasGroups.length > 0 ? (
            <Link
              to="/students"
              className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "/students" ? "bg-[#555555]" : "hover:bg-[#555555]"}`}
              onClick={() => handleMenuClick("/students")}
            >
              <span className={`w-3 h-3 rounded-full border ${activeMenu === "/students" ? "bg-white" : "border-white"}`} />

              <FaGraduationCap className="text-xl" />
              <span className="font-normal">Students</span>
            </Link>
          ) : (
            <div className="flex items-center p-2 space-x-2 rounded opacity-50 cursor-not-allowed">
              <FaGraduationCap className="text-xl" />
              <span className="font-normal">Students</span>
            </div>
          )}

          {/* Groups Link - with warning if no groups */}
          <Link
            to="/groups"
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "/groups" ? "bg-[#555555]" : "hover:bg-[#555555]"}`}
            onClick={() => handleMenuClick("/groups")}
          >
            <span className={`w-3 h-3 rounded-full border ${activeMenu === "/groups" ? "bg-white" : "border-white"}`} />

            <FaUsers className="text-xl" />
            <div className="flex flex-col">
              <span className="font-normal">Groups</span>
              {hasGroups.length == 0 && (
                <span className="text-xs text-yellow-300 mt-1">Avval guruh qo'shing!</span>
              )}
            </div>
          </Link>

          <Link
            to="/payment"
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "/payment" ? "bg-[#555555]" : "hover:bg-[#555555]"}`}
            onClick={() => handleMenuClick("/payment")}
          >
            <span className={`w-3 h-3 rounded-full border ${activeMenu === "/payment" ? "bg-white" : "border-white"}`} />

            <FaCreditCard className="text-xl" />
            <span className="font-normal">Payments</span>
          </Link>

          <Link
            to="/attandance"
            className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "/attandance" ? "bg-[#555555]" : "hover:bg-[#555555]"}`}
            onClick={() => handleMenuClick("/attandance")}
          >
            <span className={`w-3 h-3 rounded-full border ${activeMenu === "/attandance" ? "bg-white" : "border-white"}`} />

            <FaUser className="text-xl" />
            <span className="font-normal">Attendance</span>
          </Link>

          <span
            onClick={() => {
              localStorage.clear()
              navigate("/")
              window.location.reload()
            }}
            className='absolute bottom-4 mt-8 flex items-center gap-1 px-2 cursor-pointer hover:bg-[#555555] p-2 rounded'
          >
            <IoIosLogOut className='text-3xl' />Logout
          </span>
        </nav>

        {/* Mobile bottom navigation */}
        <div className="xl:hidden flex justify-around w-full h-full items-center">
          {[
            { to: "/", icon: <FaHome />, label: "Report", path: "/" },
            {
              to: !hasGroups.length == 0 ? "/students" : "#",
              icon: <FaGraduationCap />,
              label: "Students",
              disabled: !hasGroups.length == 0,
              path: "/students"
            },
            { to: "/groups", icon: <FaUsers />, label: "Groups", path: "/groups" },
            { to: "/payment", icon: <FaCreditCard />, label: "Payments", path: "/payment" },
            { to: "/attandance", icon: <FaUser />, label: "Attendance", path: "/attandance" },
          ].map(({ to, icon, label, disabled, path }) => (
            <Link
              key={label}
              to={to}
              className={`flex flex-col items-center text-xs ${disabled ? 'opacity-50 cursor-not-allowed text-red-500' : 'hover:text-gray-300'} ${activeMenu === path ? 'text-' : ''}`}
              onClick={disabled ? (e) => e.preventDefault() : () => handleMenuClick(path)}
            >
              <span className="text-lg">{icon}</span>
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </aside>

      <span
        onClick={() => {
          localStorage.clear()
          navigate("/")
          window.location.reload()
        }}
        className='fixed z-50 top-0 right-0 text-white p-1 rounded bg-[#333333] xl:hidden cursor-pointer'
      >
        <IoIosLogOut className='text-3xl' />
      </span>

      {/* Main Content */}
      <main className="flex-1 px-1 xl:p-6 xl:ml-4 pb-20">
        {pathname == "/" && <Report access_token={access_token} data={data} dataGroup={dataGroup} dataTeacher={dataTeacher} />}
        {pathname == "/appeals" && <Appeals access_token={access_token} dataAppeals={dataAppeals} />}
        {pathname == "/payment" && <Payment dataGroup={dataGroup} access_token={access_token} data={data} setLoading={setLoading} />}
        {pathname == "/attandance" && <Attendance access_token={access_token} setGroup_id={setGroup_id} setLoading={setLoading} dataGroup={dataGroup} />}
        {pathname == "/students" && <Students access_token={access_token} token={token} data={data} dataGroup={dataGroup} />}
        {pathname == "/groups" && <Groups access_token={access_token} dataGroup={dataGroup} setLoading={setLoading} />}
      </main>
    </div>
  )
}

export default Home