import React, { useEffect, useState } from 'react';
import deleted from "./delete.svg";
import axios from 'axios';
import { MdDelete, MdEdit } from "react-icons/md";


const Students = ({ dataGroup }) => {
    const [studentData, setStudentData] = useState()
    const [studentData0, setStudentData0] = useState()
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [parents_name, setParents_name] = useState("")
    const [parents_phone, setParents_phone] = useState("")
    const [group, setGroup] = useState("")
    const [pupilId, setPupilId] = useState("")
    const [modal, setModal] = useState(false)
    const [apsent, setApsent] = useState(false)

    function addPupil(e) {
        const access_token = localStorage.getItem("token")

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
            axios.post('https://crm-system-beta.vercel.app/api/v1/pupil', formDataToJson, {
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
        const access_token = localStorage.getItem("token")

        try {
            const response = await axios.delete(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
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
        const access_token = localStorage.getItem("token")
        console.log(access_token);
        console.log(typeof (apsent))
        var numberValue = Number(apsent);

        try {
            const formData = new FormData();
            formData.append("name", `${name}`);
            formData.append("surname", `${parents_name}`);
            formData.append("phone", phone);
            formData.append("picture", "example.jpg"); // Rasm fayli
            formData.append("parents_phone", `${parents_phone}`);
            // formData.append("group", `${group}`);
            // formData.append("apsent", numberValue);

            const response = axios.patch(
                `https://crm-system-beta.vercel.app/api/v1/pupil/${pupilId}`,
                formData,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${access_token}`

                    }
                    // Tokenni 'Authorization' headeriga qo‘shish

                }
            );

            console.log("Yangilangan ma'lumot:", response.data);
            setName("")
            setPhone("")
            setParents_name("")
            setParents_phone("")
            setModal(false)
        } catch (error) {
            setModal(false)
            console.error("Xatolik yuz berdi:", error);
        }

    };
    const fetchData = async () => {
        const access_token = localStorage.getItem("token")

        try {
            const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/pupil/', {
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
        const access_token = localStorage.getItem("token")

        try {
            const response = await axios.get(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}` // Tokenni 'Authorization' headeriga qo‘shish
                }
            }); // API URL
            setName(response.data.name)
            setPhone(response.data.phone)
            setParents_name(response.data.surname)
            setParents_phone(response.data.parents_phone)
            setGroup(response.data.group[0]?._id)
            setApsent(response.data.apsent)

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
        <div className="p-4 md:p-6">
  {/* Modal */}
  {modal && (
    <div className='fixed z-50 w-full h-screen top-0 left-0 bg-black flex bg-opacity-80 justify-center items-center'>
      <p 
        onClick={() => { setModal(!modal) }} 
        className='text-white text-xl md:text-2xl absolute right-4 md:right-32 top-10 md:top-40 cursor-pointer'
      >
        ×
      </p>
      <form onSubmit={updatePupil} className="w-full mx-4 md:w-3/4 lg:w-2/3 bg-gray-50 p-4 md:p-6 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm md:text-base font-medium">O'quvchi ismi</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Ismni kiriting"
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium">Telefon raqam</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="+998 xx xxx xx xx"
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium">Ota-onasining ismi</label>
            <input
              value={parents_name}
              onChange={(e) => setParents_name(e.target.value)}
              type="text"
              placeholder='Ota-onasining ismi'
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium">Ota-onasining nomeri</label>
            <input
              value={parents_phone}
              onChange={(e) => setParents_phone(e.target.value)}
              type="text"
              placeholder="+998 xx xxx xx xx"
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>
        </div>
        <div className='flex justify-end mt-4'>
          <button 
            onClick={updatePupil} 
            className="bg-[#333333] text-white px-8 md:px-44 py-2 md:py-3 text-sm md:text-base rounded-md hover:bg-[#555555]"
          >
            O'zgartirish
          </button>
        </div>
      </form>
    </div>
  )}

  {/* Main Form */}
  <h2 className='text-xl md:text-2xl font-semibold text-[#333333]'>Yangi o'quvchi qo'shish</h2>
  <form onSubmit={addPupil} className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div>
        <label className="block text-sm md:text-base font-medium">O'quvchi ismi</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Ismni kiriting"
          className="w-full p-2 text-sm md:text-base border rounded"
        />
      </div>

      <div>
        <label className="block text-sm md:text-base font-medium">Telefon raqam</label>
        <input
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          type="text"
          placeholder="+998 xx xxx xx xx"
          className="w-full p-2 text-sm md:text-base border rounded"
        />
      </div>
      
      <div>
        <label className="block text-sm md:text-base font-medium">Yo'nalish</label>
        <select 
          onChange={(e) => setGroup(e.target.value)}
          className="w-full p-2 text-sm md:text-base border rounded"
        >
          {dataGroup && dataGroup.map((item, index) => (
            <option key={index} value={item._id}>{item.group_name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm md:text-base font-medium">Ota-onasining ismi</label>
        <input
          value={parents_name}
          onChange={(e) => setParents_name(e.target.value)}
          type="text"
          placeholder='Ota-onasining ismi'
          className="w-full p-2 text-sm md:text-base border rounded"
        />
      </div>

      <div>
        <label className="block text-sm md:text-base font-medium">Ota-onasining nomeri</label>
        <input
          value={parents_phone}
          onChange={(e) => setParents_phone(e.target.value)}
          type="text"
          placeholder="+998 xx xxx xx xx"
          className="w-full p-2 text-sm md:text-base border rounded"
        />
      </div>
    </div>
    <div className='flex justify-end'>
      <button 
        onClick={addPupil} 
        className="bg-[#333333] text-white px-8 md:px-44 py-2 md:py-3 text-sm md:text-base rounded-md hover:bg-[#555555]"
      >
        Qo'shish
      </button>
    </div>
  </form>

  {/* Student List */}
  <div className='flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 gap-4'>
    <h2 className="text-xl md:text-2xl font-semibold text-[#333333]">
      Bizning o'quvchilar
    </h2>
    <input 
      placeholder='Ismni kiriting...' 
      onChange={(e) => searchPupil(e.target.value)}
      className="px-4 py-2 md:py-3 w-full md:w-auto rounded-2xl outline-none shadow-md text-sm md:text-base"
      type="text" 
    />
  </div>
  
  <div className="mt-4 overflow-x-auto">
    <div className="bg-gray-50 p-4 rounded shadow min-w-full">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-[#333333] text-white">
            <th className="border border-gray-300 p-2 text-xs md:text-sm">№</th>
            <th className="border border-gray-300 p-2 text-xs md:text-sm">O'quvchi ismi</th>
            <th className="border border-gray-300 p-2 text-xs md:text-sm">Telefon nomer</th>
            <th className="border border-gray-300 p-2 text-xs md:text-sm hidden md:table-cell">Yo'nalish</th>
            <th className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">Ota-ona(F.I.SH)</th>
            <th className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">Ota-ona (Tel)</th>
            <th className="border border-gray-300 p-2 text-xs md:text-sm">/</th>
          </tr>
        </thead>
        <tbody>
          {studentData?.length > 0 ? studentData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="border border-gray-300 p-2 text-xs md:text-sm text-center">{index + 1}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-sm">{item.name}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-sm">{item.phone}</td>
              <td className="border border-gray-300 p-2 text-xs md:text-sm hidden md:table-cell">
                {item.group[0]?.group_name}
              </td>
              <td className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">
                {item.surname}
              </td>
              <td className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">
                {item.parents_phone}
              </td>
              <td className='p-2 flex justify-evenly items-center border border-gray-300'>
                <span 
                  onClick={() => deletePupil(item._id)} 
                  className='text-lg md:text-xl text-red-600 cursor-pointer'
                >
                  <MdDelete />
                </span>
                <span 
                  onClick={() => {
                    setModal(true)
                    getPupilById(item._id)
                    setPupilId(item._id)
                  }} 
                  className='text-blue-600 text-lg md:text-xl cursor-pointer'
                >
                  <MdEdit />
                </span>
              </td>
            </tr>
          )) : (
            <tr>
              <td colSpan="7" className="text-center text-red-600 p-2 font-semibold text-sm md:text-base">
                Ma'lumot yo'q.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
</div>
    )
}

export default Students