import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import axios from 'axios';
import AttendanceStudent from './AttendanceStudent';
import { IoArrowBackSharp } from "react-icons/io5";
import { FaMoneyBillWave } from "react-icons/fa";
import { FaCalendarTimes, FaCalendarAlt } from "react-icons/fa";

function AttendenceGroup({ dataGroup, data, setLoading }) {
  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState()
  const [isMenuCollapsed, setMenuCollapsed] = useState(false);
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
      const obj = response.data.filter((item) => {
        return id == item.group[0]._id
      })
      console.log(obj);

      setAttendanceGroupPupil(obj);
      console.log(attendenceGroup);

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
      const teacherRes = response.data.filter((item) => {
        return item.groups.includes(id)
      })
      setTeacher(teacherRes)
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
      <div className="p-4 md:p-6 min-h-screen flex flex-col lg:flex-row gap-4 w-full">


        {/* Left Section - Group Info */}
        <div className='xl:w-1/3 lg:min-w-[350px] xl:min-w-[450px]'>
          <h2 className="text-xl md:text-2xl font-bold text-[#333333] mb-4">
            {attendenceGroup.group_name} group roster
          </h2>
          <div className="bg-white shadow-md rounded-lg p-4 w-full mb-4">
            <h3 className="text-lg md:text-xl font-semibold text-[#333333] mb-3">{attendenceGroup.group_name}</h3>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong>Teacher:</strong> {attendenceGroup.name}
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong>Phone:</strong> {attendenceGroup.phone}
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong>Lesson Days:</strong> {attendenceGroup.lesson_dates}
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong>Lesson Time:</strong> 14:00-16:00
            </p>
            <p className="text-sm md:text-base text-gray-700 mb-2">
              <strong>Number of Students:</strong> {attendenceGroup.group_pupils?.length}
            </p>
            <p className="text-sm md:text-base text-gray-700">
              <strong>Paid Students:</strong> {attendenceGroup.payment_done}
            </p>
          </div>
        </div>

        {/* Right Section - Attendance Table */}
        <div className="bg-white shadow-md rounded-lg p-3 md:p-4 xl:w-2/3">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="border border-gray-300 p-2 text-sm md:text-base">#</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Student Name</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Payment Status</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Actions</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Missed classes</th>
                  <th className="border border-gray-300 p-2 text-sm md:text-base">Attendance</th>
                </tr>
              </thead>
              {attendenceGroupPupil.length !== 0 ? (
                <tbody>
                  {attendenceGroupPupil.map((student, index) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="border border-gray-300 p-2 text-center">{index + 1}</td>
                      <td className="border border-gray-300 p-2">
                        {student.name}
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <span
                          className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${student.payment_status === 'paid'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {student.payment_status || 'unpaid'}
                        </span>
                      </td>
                      <td className="border border-gray-300 p-2 text-center">
                        <button
                          onClick={() => navigate(`/payment`)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center justify-center gap-1 mx-auto"
                        >
                          <FaMoneyBillWave />
                          <span>Payment</span>
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 w-full">
                          <div className="flex text-lg items-center gap-2 text-red-600 font-semibold">
                            <span>{student.apsent}</span>
                          </div>
                          <button
                            onClick={() => navigate(`/absentDates/${attendenceGroup._id}`)}
                            className="bg-[#333333] hover:bg-[#555555] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 shadow-sm transition duration-200"
                          >
                            <FaCalendarAlt className="text-lg" />
                            <span className="text-sm font-semibold">View</span>
                          </button>
                        </div>
                      </td>

                      <td className="border border-gray-300 p-2 text-center">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setApsentStudentId([...apsentStudentId, student._id]);
                            } else {
                              setApsentStudentId(apsentStudentId.filter(id => id !== student._id));
                            }
                          }}
                          className="w-5 h-5"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <tbody>
                  <tr>
                    <td colSpan="5" className="text-center p-4 text-sm md:text-base">
                      No students in this group.
                    </td>
                  </tr>
                </tbody>
              )}
            </table>
          </div>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => navigate('/attandance')}
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Back
            </button>
            <button
              onClick={updateApsentCount}
              className="bg-[#333333] hover:bg-[#555555] text-white px-4 py-2 rounded"
            >
              Save Attendance
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AttendenceGroup