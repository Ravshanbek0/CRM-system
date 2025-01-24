import React, { useEffect, useState } from 'react';
import deleted from "./delete.svg";
import axios from 'axios';

const Students = ({ dataGroup }) => {
    const [studentData, setStudentData] = useState()
    const [studentData0, setStudentData0] = useState()

    const [name, setName] = useState("")
    const [surname, setSurname] = useState("")
    const [phone, setPhone] = useState("")
    const [picture, setPicture] = useState("")
    const [parents_name, setParents_name] = useState("")
    const [parents_phone, setParents_phone] = useState("")
    const [group, setGroup] = useState("")
    const [payment_done, setPayment_done] = useState(false)
    function addPupil(e) {
        e.preventDefault()
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
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                console.log('Maʼlumot yuborildi:', response.data);
                setName("")
                setPhone("")
                setParents_name("")
                setParents_phone("")
            })
            .catch((error) => {
                console.error('Xato yuz berdi:', error);
            });
    }
    const fetchData = async () => {
        try {
            const response = await axios.get('https://crm-project.up.railway.app/api/v1/pupil/'); // API URL
            setStudentData(response.data); // Javobni saqlash
            setStudentData0(response.data); // Javobni saqlash
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
                    <button onClick={addPupil} className="bg-blue-600 text-white px-44 py-3 rounded-md mt-2  hover:bg-blue-700">
                        Qo’shish
                    </button>
                </div>
            </form>

            <div className='flex justify-between items-center'>
                <h2 className="text-2xl font-semibold text-blue-600 mt-8">
                    Bizning o’quvchilar
                </h2>
                <input placeholder='Ismni kiriting...' onChange={((e) => {
                    searchPupil(e.target.value)
                })} style={{ boxShadow: "0 4px 12px 0px rgba(#00000033)" }} className="px-4 py-3 rounded-2xl mt-8 outline-none min-w-80 " type="text" />



            </div>
            <div className="mt-4 bg-gray-50 p-4 rounded shadow">
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="border border-gray-300 p-2">№</th>
                            <th className="border border-gray-300 p-2">O'quvchi ismi</th>
                            <th className="border border-gray-300 p-2">Telefon nomer</th>
                            <th className="border border-gray-300 p-2">Yo'nalish</th>
                            <th className="border border-gray-300 p-2">Ota-ona(F.I.SH)</th>
                            <th className="border border-gray-300 p-2">Ota-ona (Tel)</th>
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
                            </tr>)
                        }) : <h1>Ma'lumot yo'q.</h1>}
                    </tbody>
                </table>
            </div>



        </div>
    )
}

export default Students