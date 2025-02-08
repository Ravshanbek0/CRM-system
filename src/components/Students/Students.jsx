import React, { useEffect, useState } from 'react';
import deleted from "./delete.svg";
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";


const Students = ({ dataGroup, token }) => {
    const [studentData, setStudentData] = useState()
    const [studentData0, setStudentData0] = useState()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [parents_name, setParents_name] = useState("")
    const [parents_phone, setParents_phone] = useState("")
    const [group, setGroup] = useState("")
    const [pupilId, setPupilId] = useState("")
    const [modal, setModal] = useState(false)

    function addPupil(e) {
        e.preventDefault()
        if (name != "" && phone != "" && parents_name != "" && parents_phone != "") {
            const formData = new FormData();
            formData.append('name', `${name}`);
            formData.append('phone', `${phone}`);
            formData.append('picture', 'https://example.com/image.jpg');
            formData.append('surname', `${parents_name}`);
            formData.append('parents_phone', `${parents_phone}`);
            formData.append('group', `${group}`);
            // formData.append("payment_done", false);

            // FormData obyektini JSON ga aylantirish
            const formDataToJson = Object.fromEntries(formData.entries());

            // POST so'rovni yuborish
            axios.post('https://crm-project.up.railway.app/api/v1/pupil', formDataToJson, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
                }
            })
                .then((response) => {
                    console.log('Maʼlumot yuborildi:', response.data);
                    setName("")
                    setPhone("")
                    setParents_name("")
                    setParents_phone("")
                    window.location.reload();
                })
                .catch((error) => {
                    console.error('Xato yuz berdi:', error);
                });
        } else {
            alert("Ma;lumotlar to'liq kiritilmagan!")
        }
    }
    const deletePupil = async (id) => {
        try {
            const response = await axios.delete(`https://crm-project.up.railway.app/api/v1/pupil/${id}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
                }
            });
            console.log("Element muvaffaqiyatli o‘chirildi:", response.data);
            window.location.reload();
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };
    const updatePupil = (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();
            formData.append("name", `${name}`);
            formData.append("surname", `${parents_name}`);
            formData.append("phone", phone);
            formData.append("picture", "example.jpg"); // Rasm fayli
            formData.append("parents_phone", `${parents_phone}`);
            formData.append("group", `${group}`);
            formData.append("apsent", 0);

            const response = axios.patch(
                `https://crm-project.up.railway.app/api/v1/pupil/${pupilId}`,
                formData,
                {
                    headers: { "Content-Type": "application/json" },
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish

                }
            );

            console.log("Yangilangan ma'lumot:", response.data);
            alert("O'quvchi ma'lumotlari yangilandi!");
            setName("")
            setPhone("")
            setParents_name("")
            setParents_phone("")
        } catch (error) {
            console.error("Xatolik yuz berdi:", error);
        }
    };
    const fetchData = async () => {
        try {
            const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil/', {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
                }
            }); // API URL
            setStudentData(response.data); // Javobni saqlash
            setStudentData0(response.data); // Javobni saqlash
        } catch (err) {
            console.log(err.massage);
        }
    };
    const getPupilById = async (id) => {
        try {
            const response = await axios.get(`https://crm-project.up.railway.app/api/v1/pupil/${id}`, {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU` // Tokenni 'Authorization' headeriga qo‘shish
                }
            }); // API URL

            setName(response.data.name)
            setPhone(response.data.phone)
            setParents_name(response.data.surname)
            setParents_phone(response.data.parents_phone)
            setGroup(response.data.group[0]?._id)
        } catch (err) {
            console.log(err.massage);
        }
    };
    function searchPupil(name) {
        const obj = studentData0.filter((item) => {
            return item.name.includes(name)
        })
        setStudentData(obj)
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div>
            <h2 className='text-2xl font-semibold text-blue-600'>Yangi o’quvchi qo’shish</h2>
            <form onSubmit={addPupil} className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                        <label className="block font-medium">O'quvchi ismi</label>
                        <input
                            value={name}

                            onChange={((e) => {
                                setName(e.target.value)
                            })}
                            type="text"
                            placeholder="Ismni kiriting"
                            className="w-full p-2 border rounded"
                        />
                    </div>

                    <div>
                        <label className="block font-medium">Telefon raqam</label>
                        <input
                            value={phone}
                            onChange={((e) => {
                                setPhone(e.target.value)
                            })}
                            type="text"
                            placeholder="+998 xx xxx xx xx"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Yo'nalish</label>
                        <select onChange={((e) => {
                            setGroup(e.target.value);

                        })} className="w-full p-2 border rounded">
                            {dataGroup && dataGroup.map((item, index) => {
                                return (<option key={index} value={item._id}>{item.group_name}</option>)
                            })}
                        </select>
                    </div>

                    <div>
                        <label className="block font-medium">Ota-onasining ismi</label>
                        <input
                            value={parents_name}
                            onChange={((e) => {
                                setParents_name(e.target.value)
                            })}
                            type="text"
                            placeholder='Ota-onasining ismi'
                            className="w-full p-2 border rounded"
                        />
                    </div>


                    <div>
                        <label className="block font-medium">Ota-onasining nomeri</label>
                        <input
                            value={parents_phone}
                            onChange={((e) => {
                                setParents_phone(e.target.value)
                            })}
                            type="text"
                            placeholder="+998 xx xxx xx xx"
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <div>
                        <label className="block font-medium">Rasm 3x4</label>
                        <input
                            type="file"
                            placeholder="Yuklash"
                            className="w-full p-2 border rounded"
                        />
                    </div>


                </div>
                <div className='flex justify-end'>
                    <button onClick={addPupil} className="bg-blue-600 text-white px-6 sm:px-10 md:px-20 lg:px-32 xl:px-44 py-3 rounded-md mt-2  hover:bg-blue-700">
                        Qo’shish
                    </button>
                </div>
            </form>

            <div className='flex justify-center sm:justify-between items-center flex-wrap'>
                <h2 className="text-2xl font-semibold text-blue-600 mt-8">
                    Bizning o’quvchilar
                </h2>
                <input style={{ boxShadow: "0 4px 12px 0px rgba(#00000033)" }} className="w-2/3 sm:w-64 md:w-80 lg:w-96 py-3 rounded-2xl mt-8 outline-none " type="text" />



            </div>
            <div className="overflow-x-auto mx-auto w-11/12 mt-4 bg-gray-50 p-4 rounded shadow">
                <table className="table-auto sm:w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-[#333333] text-white">
                            <th className="border border-gray-300 p-2">№</th>
                            <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                            <th className="border border-gray-300 p-2">Telefon nomer</th>
                            <th className="border border-gray-300 p-2">Yo'nalish</th>
                            <th className="border border-gray-300 p-2">Ota-ona(F.I.SH)</th>
                            <th className="border border-gray-300 p-2">Ota-ona (Tel)</th>
                            <th className="border border-gray-300 p-2">/</th>
                        </tr>
                    </thead>
                    <tbody>


                        {studentData ? studentData.map((item, index) => {
                            return (<tr>
                                <td className="border border-gray-300 p-2">{index + 1}</td>
                                <td className="border border-gray-300 p-2">{item.name} </td>
                                <td className="border border-gray-300 p-2">{item.phone}</td>
                                <td className="border border-gray-300 p-2">{item.group[0]?.group_name}</td>
                                <td className="border border-gray-300 p-2">{item.surname}</td>
                                <td className="border border-gray-300 p-2">{item.parents_phone}</td>
                                <td className='p-2 flex justify-evenly items-center'><span onClick={() => { deletePupil(item._id) }} className='text-[25px] text-red-600 cursor-pointer'><MdDelete /></span></td>
                                {/* <span onClick={() => {
                                    setModal(true)
                                    getPupilById(item._id)
                                    setPupilId(item._id)
                                }} className='text-[25px] text-blue-600 cursor-pointer'><MdEdit /></span> */}
                            </tr>)
                        }) : <h1>Ma'lumot yo'q.</h1>}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default Students