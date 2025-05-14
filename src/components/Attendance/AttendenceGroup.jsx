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
  const [activeMenu, setActiveMenu] = useState(`${pathname}`);
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
      });
      setAttendanceGroup(response.data);
      setLoading(false);

    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const fetchDataPupil = async () => {
    const access_token = localStorage.getItem('token')

    try {
      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/pupil/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log(response.data);

      const obj = response.data.filter((item) => {
        console.log(item);
        return id == item.group[0]._id
      })

      setAttendanceGroupPupil(obj);
      setAttendance(obj)
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const updateApsentCount = async () => {
    const access_token = localStorage.getItem('token')

    try {
      const requests = apsentStudentId.map(async (id) => {
        const studentResponse = await axios.get(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });
        const currentApsent = studentResponse.data.apsent || 0;

        await axios.patch(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
          apsent: currentApsent + 1,
        }, {
          headers: {
            Authorization: `Bearer ${access_token}`
          }
        });

        console.log(`Student ${id} updated ✅`);
      });

      await Promise.all(requests);
      console.log("All student absences updated ✅");
    } catch (error) {
      console.error("Error occurred ❌", error.response?.data || error.message);
    }
  };

  const fetchDataTeacher = async () => {
    const access_token = localStorage.getItem('token')

    try {
      setLoading(true)

      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/teacher/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
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
    setActiveMenu(menu);
  };

  const today = new Date();
  const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  useEffect(() => {
    fetchDataGroup()
    fetchDataPupil()
    fetchDataTeacher()
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
          z-50
        `}
      >
        {/* Menu Button (visible only on large screens) */}
        <div className='hidden xl:flex items-center pt-4 relative'>
          {!isMenuCollapsed && <h1 className='text-2xl font-bold px-2'>Education.uz</h1>}
          <button
            onClick={toggleMenu}
            className="absolute right-2 text-white text-2xl hover:bg-[#555555] p-2 rounded-full"
          >
            <FaBars />
          </button>
        </div>
        {!isMenuCollapsed && <hr className='mt-4 text-[#fff] xl:block hidden' />}

        {/* Menu for large screens */}
        <nav className={`mt-8 px-0 space-y-4 ${isMenuCollapsed ? "hidden" : "hidden xl:block"}`}>
          <Link to="/" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Report" ? "bg-[#33333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Report")}>
            <FaHome className="text-xl" />
            <span className="font-medium">Report</span>
          </Link>
          <Link to="/students" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Students" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Students")}>
            <FaGraduationCap className="text-xl" />
            <span className="font-medium">Students</span>
          </Link>
          <Link to="/groups" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Groups" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Groups")}>
            <FaUsers className="text-xl" />
            <span className="font-medium">Groups</span>
          </Link>
          <Link to="/payment" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Payments" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Payments")}>
            <FaCreditCard className="text-xl" />
            <span className="font-medium">Payments</span>
          </Link>
          <Link to="/attandance" className={`flex items-center p-2 space-x-2 rounded ${activeMenu === "Attendance" ? "bg-[#333333]" : "hover:bg-[#555555]"}`} onClick={() => handleMenuClick("Attendance")}>
            <FaUser className="text-xl" />
            <span className="font-medium">Attendance</span>
          </Link>
          <span onClick={() => {
            localStorage.clear()
            navigate("/")
            window.location.reload()
          }} className='absolute bottom-4 mt-8 flex items-center gap-1 px-2 cursor-pointer'>
            <IoIosLogOut className='text-3xl' />Logout
          </span>
        </nav>

        {/* Mobile bottom navigation */}
        <div className="xl:hidden flex justify-around w-full h-full items-center">
          {[
            { to: "/", icon: <FaHome />, label: "Report" },
            { to: "/students", icon: <FaGraduationCap />, label: "Students" },
            { to: "/groups", icon: <FaUsers />, label: "Groups" },
            { to: "/payment", icon: <FaCreditCard />, label: "Payments" },
            { to: "/attandance", icon: <FaUser />, label: "Attendance" },
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
            {attendenceGroup.group_name} group roster
          </h2>
          <div className="bg-white shadow-md rounded p-4 w-full mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-[#333333] mb-3">{attendenceGroup.group_name}</h3>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Teacher:</strong> {attendenceGroup.name}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Phone:</strong> {attendenceGroup.phone}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Lesson Days:</strong> {attendenceGroup.lesson_dates}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Lesson Time:</strong> 14:00-16:00
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Number of Students:</strong> {attendenceGroup.group_pupils?.length}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Paid Students:</strong> {attendenceGroup.payment_done}
            </p>
          </div>
        </div>

        {/* Right Section - Attendance Table */}
        <div className="bg-white shadow-md rounded p-3 md:p-4 w-full">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="border border-gray-300 p-1 md:p-2 text-sm md:text-base">#</th>
                  <th className="border border-gray-300 p-1 md:p-2 text-sm md:text-base">Student Name</th>
                  <th className="border border-gray-300 p-1 md:p-2 text-sm md:text-base">Attendance</th>
                </tr>
              </thead>
              {attendenceGroupPupil.length != 0 ? (
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
                      No students in this group.
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
            Save
          </button>
        </div>
      </div>
    </div>
  )
}

export default AttendenceGroup