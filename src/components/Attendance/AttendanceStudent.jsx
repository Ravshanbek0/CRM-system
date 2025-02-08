import React, { useState } from 'react'

function AttendanceStudent({ index, student, apsentStudentId, setApsentStudentId }) {
    const [absentStudents, setAbsentStudents] = useState(false)

    return (
        <tr
            key={index}
            className={"bg-gray-100 w-full"}
        >
            <td className="border border-gray-300 p-2 text-center">
                {index + 1}
            </td>
            <td className="border border-gray-300 p-2">{student?.name} {student?.surname}</td>
            <td className="border border-gray-300 p-2 text-center">
                <button
                    // onClick={() => toggleAttendance(student.id)}
                    onClick={() => {
                        if(!absentStudents && !apsentStudentId.includes(student._id)){
                            setApsentStudentId([...apsentStudentId,student._id])
                            
                        }else if(absentStudents && apsentStudentId.includes(student._id)){
                            setApsentStudentId([...apsentStudentId,null])

                        }
                        console.log(absentStudents);
                        console.log(apsentStudentId)
                    }}
                    className={`text-xl ${absentStudents ? "text-green-500" : "text-red-900"
                        }`}
                >
                    {absentStudents ? "✔" : "✖"}
                </button>
            </td>
        </tr>
    )
}

export default AttendanceStudent