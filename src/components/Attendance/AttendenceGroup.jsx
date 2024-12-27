import React, {useState} from 'react'

function AttendenceGroup() {

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

    const toggleAttendance = (id) => {
        setAttendance((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    const absentStudents = attendance.filter((student) => !student.present);


    return (
        <div>
            <div className="p-6 bg-gray-100 min-h-screen">
                <h2 className="text-2xl font-bold text-blue-600 mb-4">
                    Informatika guruhi ro'yhati
                </h2>
                <div className="flex flex-col lg:flex-row lg:space-x-8">
                    {/* Left Section */}
                    <div className="bg-white shadow-md rounded p-4 w-full lg:w-1/3 mb-6 lg:mb-0">
                        <h3 className="text-xl font-semibold text-blue-600 mb-4">Informatika</h3>
                        <p className="text-gray-700">
                            <strong>O'qituvchi:</strong> Muxamadaliyev Ibroxim
                        </p>
                        <p className="text-gray-700">
                            <strong>Tel raqam:</strong> +998900113861
                        </p>
                        <p className="text-gray-700">
                            <strong>Dars kunlari:</strong> DU-CHOR-JUMA
                        </p>
                        <p className="text-gray-700">
                            <strong>Dars vaqti:</strong> 14:00-16:00
                        </p>
                        <p className="text-gray-700">
                            <strong>O'quvchilar soni:</strong> 25ta
                        </p>
                        <p className="text-gray-700">
                            <strong>To'lov qilganlar:</strong> 10ta
                        </p>
                        <div className="mt-6">
                            <h4 className="font-semibold text-blue-600">07.03.2022</h4>
                            <p className="text-gray-700 font-semibold mt-2">Darsga kelmaganlar:</p>
                            <ul className="list-decimal list-inside text-gray-700 mt-2">
                                {absentStudents.map((student) => (
                                    <li key={student.id}>{student.name}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Right Section */}
                    <div className="bg-white shadow-md rounded p-4 w-full lg:w-2/3">
                        <table className="table-auto w-full border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-blue-600 text-white">
                                    <th className="border border-gray-300 p-2">№</th>
                                    <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                                    <th className="border border-gray-300 p-2">Davomat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendance.map((student) => (
                                    <tr
                                        key={student.id}
                                        className={student.id % 2 === 0 ? "bg-gray-100" : ""}
                                    >
                                        <td className="border border-gray-300 p-2 text-center">
                                            {student.id}
                                        </td>
                                        <td className="border border-gray-300 p-2">{student.name}</td>
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