import React, { useEffect, useState } from 'react';
import deleted from "./delete.svg";
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";


const Students = ({ dataGroup}) => {
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
        const access_token=localStorage.getItem("token")

        e.preventDefault()
        if (name != "" && phone != "" && parents_name != "" && parents_phone != "") {
            if (group === "") {
                setGroup(dataGroup[0]._id)
                console.log(group);
                
            }
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
            axios.post('https://crm-project.up.railway.app/api/v1/pupil',  formDataToJson, {
                headers: {
                    Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish
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
        const access_token=localStorage.getItem("token")

        try {
            const response = await axios.delete(`https://crm-project.up.railway.app/api/v1/pupil/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish
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
        const access_token=localStorage.getItem("token")

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
                    Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish

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
        const access_token=localStorage.getItem("token")

        try {
            const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil/', {
                headers: {
                    Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish
                }
            }); // API URL
            setStudentData(response.data); // Javobni saqlash
            setStudentData0(response.data); // Javobni saqlash
        } catch (err) {
            console.log(err);
        }
    };
    const getPupilById = async (id) => {
        const access_token=localStorage.getItem("token")

        try {
            const response = await axios.get(`https://crm-project.up.railway.app/api/v1/pupil/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish
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
            {/* Modal */}
            {modal && <div className='fixed z-50 w-full h-screen top-0 left-0 bg-black flex bg-opacity-80 justify-center items-center'>
                <p onClick={() => { setModal(!modal) }} className='text-white text-2xl absolute right-32 top-40 cursor-pointer'>x</p>
                <form onSubmit={updatePupil} className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                    <div className="grid grid-cols-3 gap-4">
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
                        <button onClick={updatePupil} className="bg-[#333333] text-white px-44 py-3 rounded-md mt-2  hover:bg-[#555555]">
                            O'zgartirish
                        </button>
                    </div>
                </form>
            </div>}
            {/* Modal */}

            <h2 className='text-2xl font-semibold text-[#333333]'>Yangi o’quvchi qo’shish</h2>
            <form onSubmit={addPupil} className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                <div className="grid grid-cols-3 gap-4">
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
                            console.log(e.target.value);
                            

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
                    <button onClick={addPupil} className="bg-[#333333] text-white px-44 py-3 rounded-md mt-2  hover:bg-[#555555]">
                        Qo’shish
                    </button>
                </div>
            </form>

            <div className='flex justify-between items-center'>
                <h2 className="text-2xl font-semibold text-[#333333] mt-8">
                    Bizning o’quvchilar
                </h2>
                <input placeholder='Ismni kiriting...' onChange={((e) => {
                    searchPupil(e.target.value)
                })} style={{ boxShadow: "0 4px 12px 0px rgba(#00000033)" }} className="px-4 py-3 rounded-2xl mt-8 outline-none min-w-80 " type="text" />



            </div>
            <div className="mt-4 bg-gray-50 p-4 rounded shadow">
                <table className="table-auto w-full border-collapse border border-gray-300">
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


                        {studentData?.length > 0 ? studentData.map((item, index) => {
                            return (<tr key={index}>
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
                        }) : <h1 className='text-center text-red-600 p-2 font-semibold'>Ma'lumot yo'q.</h1>}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default Students