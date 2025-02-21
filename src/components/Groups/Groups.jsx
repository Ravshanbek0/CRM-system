import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Groups = ({ setLoading, dataGroup }) => {
    const [group_name, setGroup_name] = useState("")
    const [lesson_dates, setLesson_dates] = useState("Du-Chor-Juma")
    const [lesson_time, setLesson_time] = useState("14:00 - 16:00")


    const [disable, setDisable] = useState(false)
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
    const DisableFunc = () => {
        setDisable(!disable)
    }



    const toggleAttendance = (id) => {
        setAttendance((prev) =>
            prev.map((student) =>
                student.id === id ? { ...student, present: !student.present } : student
            )
        );
    };

    function addGroup(e) {
        e.preventDefault()
        const access_token=localStorage.getItem("token")
        if (group_name != "") {
            const formData = new FormData();
            formData.append('group_name', `${group_name}`);
            formData.append('lesson_dates', `${lesson_dates}`);
            formData.append('lesson_time', `${lesson_time}`);
            // formData.append("payment_done", false);

            // FormData obyektini JSON ga aylantirish
            const formDataToJson = Object.fromEntries(formData.entries());

            // POST so'rovni yuborish
            axios.post('https://crm-project.up.railway.app/api/v1/group', formDataToJson, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`

                },
            })
                .then((response) => {
                    console.log('Maʼlumot yuborildi:', response.data);
                    window.location.reload();

                })
                .catch((error) => {
                    console.error('Xato yuz berdi:', error);
                });
            setGroup_name("")
        } else {
            alert("Ma'lumot to'liq kiritilmagan")
        }
    }
    const deleteGroup = async (id) => {
        const access_token=localStorage.getItem("token")

        try {
            const response = await axios.delete(`https://crm-project.up.railway.app/api/v1/group/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            console.log("Element muvaffaqiyatli o‘chirildi:", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };
    return (
        <div>


            <div className={disable == false ? 'block' : 'hidden'}>
                <h2 className='text-2xl font-semibold text-[#333333]'>Yangi guruh qo’shish</h2>
                <form className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <label className="block font-medium">Guruh yo’nalishi</label>
                            {/* <select onChange={(e) => {
                                setGroup_name(e.target.value)
                            }} className="w-full p-2 border rounded">
                                <option value={"Ona tili"}>Ona-tili</option>
                                <option value={'Biologiya'}>Biologiya</option>
                                <option value={'Fizika'}>Fizika</option>
                                <option value={'Kimyo'}>Kimyo</option>
                                <option value={'Tarix'}>Tarix</option>
                            </select> */}
                            <input value={group_name} type="text" onChange={(e) => {
                                setGroup_name(e.target.value)
                            }} className='w-full p-2 border rounded'
                                placeholder='Guruh nomini kiriting...'
                            />
                        </div>

                        <div>
                            <label className="block font-medium">Dars kunlari</label>
                            <select onChange={(e) => {
                                setLesson_dates(e.target.value)
                            }} className="w-full p-2 border rounded">
                                <option value={'Du-Chor-Juma'} >DU-CHOR-JUMA</option>
                                <option value={'Se-Pay-Shan'}>SE-PA-SHANBA</option>
                            </select>

                        </div>
                        <div>
                            <label className="block font-medium">Dars vaqti</label>
                            <select onChange={(e) => {
                                setLesson_time(e.target.value)
                            }} className="w-full p-2 border rounded">
                                <option value={'14:00 - 16:00'}>14:00-16:00</option>
                                <option value={'16:00 - 18:00'}>16:00-18:00</option>
                            </select>
                        </div>


                    </div>
                    <div className='flex justify-end'>
                        <button onClick={addGroup} className="bg-[#333333] text-white px-44 py-3 rounded-md mt-2  hover:bg-[#555555]">
                            Qo’shish
                        </button>
                    </div>
                </form>


                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-semibold text-[#333333] mt-8">
                        Mavjud guruhlar
                    </h2>
                    <input placeholder='Guruh nomini kiriting...' style={{ boxShadow: "0 4px 12px 0px rgba(#00000033)" }} className="px-4 min-w-80 py-3 rounded-2xl mt-8 outline-none placeholder:ml-[-170px] " type="text" />



                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {/* Card 1 */}
                    {dataGroup?.length > 0 ? dataGroup.map((item, index) => {
                        return (<div key={index} to={`/attendenceGroup/${item._id}`}>
                            <div className="bg-white cursor-pointer shadow rounded-lg  overflow-hidden border border-gray-200">
                                <h2 className="text-lg font-bold flex justify-center items-center bg-[#333333] p-2 text-white mb-2 text-center relative">{item.group_name}<span onClick={() => {
                                    deleteGroup(item._id)
                                }} className='absolute right-1 text-[22px]'><MdDelete /></span></h2>
                                <Link to={`/attendenceGroup/${item._id}`}>
                                    <div className='p-4'>
                                        <div className='flex items-center'>
                                            {/* <img src="./imgs/face.png" alt="" /> */}
                                            <div>
                                                {/* <p className="text-sm  text-[#333333] font-semibold mb-2">
                                            O'qituvchi: <span className="text-gray-800">Muxamadaliyev Ibroxim</span>
                                        </p>
                                        <p className="text-sm font-semibold text-[#333333] mb-2">
                                            Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-800"> +998900113861</span></a>
                                        </p> */}
                                            </div>
                                        </div>
                                        <p className="text-sm text-[#333333] font-semibold  mb-2">Dars kunlari: <span className="text-gray-500">{item.lesson_dates}</span></p>
                                        <p className="text-sm text-[#333333] font-semibold  mb-2">Dars vaqti: <span className="text-gray-500">{item.lesson_time}</span></p>
                                        <p className="text-sm text-[#333333] font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-500">{item.group_pupils.length}</span></p>
                                        <p className="text-sm text-[#333333] font-semibold ">To'lov qilganlar: <span className="text-gray-500">{item.payment_done}ta</span></p>
                                    </div>
                                </Link>
                            </div>
                        </div>)
                    }) : <h1 className='text-center text-red-600 p-2 font-semibold'>Ma'lumot yo'q!</h1>}

                </div>
            </div>


            {/* <div className={disable == false ? 'hidden' : 'block'}>
                <h2 className='text-2xl font-semibold text-[#333333]'>Informatika guruhi ro’yhati</h2>
                <br />
                <div className='flex gap-8'>
                    <div>
                        <div className="bg-white shadow w-fit rounded-lg  border border-gray-200">
                            <h2 className="text-lg font-bold bg-[#333333] p-2 text-white mb-2 text-center">Matematika</h2>
                            <div className='p-4'>
                                <div className='flex items-center'>
                                    <img src="./imgs/face.png" alt="" />
                                    <div>
                                        <p className="text-sm  text-[#333333] font-semibold mb-2">
                                            O'qituvchi: <span className="text-gray-800">Muxamadaliyev Ibroxim</span>
                                        </p>
                                        <p className="text-sm font-semibold text-[#333333] mb-2">
                                            Tel raqam: <a href="tel:+998900113861" className="text-blue-500 "><span className="text-gray-800"> +998900113861</span></a>
                                        </p>
                                    </div>
                                </div>
                                <p className="text-sm text-[#333333] font-semibold  mb-2">Dars kunlari: <span className="text-gray-800">DU-CHOR-JUMA</span></p>
                                <p className="text-sm text-[#333333] font-semibold  mb-2">Dars vaqti: <span className="text-gray-800">14:00-16:00</span></p>
                                <p className="text-sm text-[#333333] font-semibold  mb-2">O'quvchilar soni:  <span className="text-gray-800">5ta</span></p>
                                <p className="text-sm text-[#333333] font-semibold ">To'lov qilganlar: <span className="text-gray-800">10ta</span></p>
                            </div>

                        </div>


                        <br />
                        <div>
                            <h2 className='font-bold text-2xl text-black'>Shu oy bo’yicha to'lov qilmaganlar </h2>
                            <br />
                            <p className='font-medium'>1.Muxamadaliyev Ibroxim</p>
                            <p className='font-medium'>2.Muxamadaliyev Ibroxim</p>
                            <p className='font-medium'>3.Muxamadaliyev Ibroxim</p>
                            <p className='font-medium'>4.Muxamadaliyev Ibroxim</p>



                        </div>
                    </div>








                    <table className="table-auto w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-[#333333] text-white">
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

                </div>
            </div> */}




        </div>
    )
}

export default Groups