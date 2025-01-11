import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaGraduationCap, FaUsers, FaCreditCard, FaUser, FaComments } from "react-icons/fa";
import axios from 'axios';


function AttendenceGroup({ dataGroup, data, setLoading }) {
    const { id } = useParams()
    const { pathname } = useLocation()
    const [isMenuCollapsed, setMenuCollapsed] = useState(false);
    const [activeMenu, setActiveMenu] = useState(`${pathname}`); // Bosilgan menyu elementi
    const [attendenceGroup, setAttendanceGroup] = useState([])
    const [attendenceGroupPupil, setAttendanceGroupPupil] = useState([])

    const fetchData = async () => {
        try {
            setLoading(true)
            // API so'rovlarini parallel bajarish
            const [response1, response2] = await Promise.all([
                axios.get('https://crm-project.up.railway.app/api/v1/group/'), // Birinchi API URL
                axios.get('https://crm-project.up.railway.app/api/v1/teacher/'), // Ikkinchi API URL
            ]);


            // Key'larni noyob qilib obyektni birlashtirish
            const combined = [{
                ...Object.fromEntries(
                    Object.entries(response1.data).map(([key, value]) => [0, value])
                ),
                ...Object.fromEntries(
                    Object.entries(response2.data).map(([key, value]) => [1, value])
                ),
            }];

            const obj = combined.filter((item) => {
                return id == item[0]._id
            })
            setAttendanceGroup(obj);
            setLoading(false)
        } catch (err) {
            console.error(err);
            setLoading(false)
        } finally {
            setLoading(false)
        }
    };
    const fetchDataPupil = async () => {
        try {
            const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil/'); // API URL

            const obj = response.data.filter((item) => {
                return id == item.group[0]._id
            })                                                      
            console.log(response.data);                                                                    
            console.log(obj);

            setAttendanceGroupPupil(obj);
            setLoading(false); // Yuklashni to'xtatish
        } catch (err) {
            setError(err.message); // Xatoni saqlash
            setLoading(false); // Yuklashni to'xtatish
        }
    };


    const [attendance, setAttendance] = useState([
        { id: 1, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 2, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 3, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 4, name: "Muxamadaliyev Ibroxim", present: false },
        { id: 5, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 6, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 7, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 8, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 9, name: "Muxamadaliyev Ibroxim", present: true },
        { id: 10, name: "Muxamadaliyev Ibroxim", present: false },
    ]);

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
    useEffect(() => {
        fetchData()
        fetchDataPupil()
    }, [])
    const absentStudents = attendance.filter((student) => !student.present);


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
            <div className=''>
                <div className="p-6 bg-gray-100 min-h-screen flex gap-2 w-full">

                    {attendenceGroup.length != 0 ? attendenceGroup.map((item,index) => {
                        return (
                            <div className='min-w-[450px]' key={index}>
                                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                                    {item[0].group_name} guruhi ro'yhati
                                </h2>
                                <div className="flex flex-col min-w-[45%]">
                                    {/* Left Section */}
                                    <div className="bg-white shadow-md rounded p-4 w-full  mb-6 lg:mb-0">
                                        <h3 className="text-xl font-semibold text-blue-600 mb-4">{item[0].group_name}</h3>
                                        <p className="text-gray-700">
                                            <strong>O'qituvchi:</strong> {item[1].name}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Tel raqam:</strong> {item[1].phone}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Dars kunlari:</strong> {item[0].lesson_dates}
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>Dars vaqti:</strong> 14:00-16:00
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>O'quvchilar soni:</strong> {item[0].group_pupils.length}ta
                                        </p>
                                        <p className="text-gray-700">
                                            <strong>To'lov qilganlar:</strong> {item[0].payment_done}ta
                                        </p>
                                        <div className="mt-6">
                                            <h4 className="font-semibold text-blue-600">07.03.2022</h4>
                                            <p className="text-gray-700 font-semibold mt-2">Darsga kelmaganlar:</p>
                                            {/* <ul className="list-decimal list-inside text-gray-700 mt-2">
                                                {absentStudents.map((student) => (
                                                    <li key={student.id}>{student.name}</li>
                                                ))}
                                            </ul> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <h1>No malumot</h1>}
                    {/* Right Section */}
                    <div className="bg-white shadow-md rounded p-4 w-full min-w-[650px] mt-12">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-300 p-2">№</th>
                                    <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                                    <th className="border border-gray-300 p-2">Davomat</th>
                                </tr>
                            </thead>
                            {attendenceGroupPupil.length != 0 ? attendenceGroupPupil.map((item,index) => {
                                return (

                                    <tbody key={index}>
                                        {attendenceGroupPupil.map((student,index) => (
                                            <tr
                                                key={index}
                                                className={student.id % 2 === 0 ? "bg-gray-100" : ""}
                                            >
                                                <td className="border border-gray-300 p-2 text-center">
                                                    {index+1}
                                                </td>
                                                <td className="border border-gray-300 p-2">{student.name} {student.surname}</td>
                                                <td className="border border-gray-300 p-2 text-center">
                                                    <button
                                                        onClick={() => toggleAttendance(student.id)}
                                                        className={`text-xl ${student.present ? "text-green-500" : "text-red-500"
                                                            }`}
                                                    >
                                                        {student.present ? "✔" : "✖"}
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>

                                )
                            }) : <h1 className='text-center'>No ma'lumot</h1>}
                        </table>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700">
                            Saqlash
                        </button>
                    </div>
                </div>


            </div>

        </div>

    )
}

export default AttendenceGroup