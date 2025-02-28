import React from 'react'
import axios from "axios";

function AttendanceStudent({ index, student, apsentStudentId, setApsentStudentId }) {
    

    return (
        <tr key={index} className={"bg-gray-100 w-full"}>
            <td className="border border-gray-300 p-2 text-center">
                {index + 1}
            </td>
            <td className="border border-gray-300 p-2">{student?.name} {student?.surname}</td>
            <td className="border border-gray-300 p-2 text-center">
                <input
                    onChange={(e) => {
                        if (e.target.value === "+" && !apsentStudentId.includes(student._id)) {
                            setApsentStudentId([...apsentStudentId, student._id])
                        } else if (e.target.value === "-" && apsentStudentId.includes(student._id)) {
                            setApsentStudentId(apsentStudentId.filter(id => id !== student._id));
                        }
                        console.log(apsentStudentId);

                    }}
                    type='text'
                    className="text-xl text-center max-w-12 outline-none"
                />
            </td>
        </tr>
    )
}

export default AttendanceStudent;
