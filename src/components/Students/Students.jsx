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
  const [absent, setAbsent] = useState(false)
  const [loader, setLoader] = useState(false)
  const [deleteLoader, setDeleteLoader] = useState(false)
  const [addLoader, setAddLoader] = useState(false)
  const [updateLoader, setUpdateLoader] = useState(false)

  function addPupil(e) {
    const access_token = localStorage.getItem("token")
    e.preventDefault()

    if (name != "" && phone != "" && parents_name != "" && parents_phone != "") {
      if (group === "") {
        setGroup(dataGroup[0]._id)
      }

      setAddLoader(true)
      const formData = new FormData();
      formData.append('name', `${name}`);
      formData.append('phone', `${phone}`);
      formData.append('picture', 'https://example.com/image.jpg');
      formData.append('surname', `${parents_name}`);
      formData.append('parents_phone', `${parents_phone}`);
      formData.append('group', `${group}`);

      const formDataToJson = Object.fromEntries(formData.entries());

      axios.post('https://crm-system-beta.vercel.app/api/v1/pupil', formDataToJson, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
        .then((response) => {
          console.log('Data sent successfully:', response.data);
          setName("")
          setPhone("")
          setParents_name("")
          setParents_phone("")
          window.location.reload();
        })
        .catch((error) => {
          console.error('An error occurred:', error);
        })
        .finally(() => {
          setAddLoader(false)
        });
    } else {
      alert("Please fill in all fields!")
    }
  }

  const deletePupil = async (id) => {
    const access_token = localStorage.getItem("token")
    setDeleteLoader(true)

    try {
      const response = await axios.delete(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log("Item deleted successfully:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setDeleteLoader(false)
    }
  };

  const updatePupil = (e) => {
    e.preventDefault()
    const access_token = localStorage.getItem("token")
    setUpdateLoader(true)
    var numberValue = Number(absent);

    try {
      const formData = new FormData();
      formData.append("name", `${name}`);
      formData.append("surname", `${parents_name}`);
      formData.append("phone", phone);
      formData.append("picture", "example.jpg");
      formData.append("parents_phone", `${parents_phone}`);

      axios.patch(
        `https://crm-system-beta.vercel.app/api/v1/pupil/${pupilId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`
          }
        }
      )
        .then((response) => {
          console.log("Updated data:", response.data);
          setName("")
          setPhone("")
          setParents_name("")
          setParents_phone("")
          setModal(false)
        })
        .catch((error) => {
          console.error("An error occurred:", error);
          setModal(false)
        })
        .finally(() => {
          setUpdateLoader(false)
        });

    } catch (error) {
      setModal(false)
      console.error("An error occurred:", error);
      setUpdateLoader(false)
    }
  };

  const fetchData = async () => {
    const access_token = localStorage.getItem("token")
    setLoader(true)

    try {
      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/pupil/', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setStudentData(response.data);
      setStudentData0(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false)
    }
  };

  const getPupilById = async (id) => {
    const access_token = localStorage.getItem("token")
    setLoader(true)

    try {
      const response = await axios.get(`https://crm-system-beta.vercel.app/api/v1/pupil/${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setName(response.data.name)
      setPhone(response.data.phone)
      setParents_name(response.data.surname)
      setParents_phone(response.data.parents_phone)
      setGroup(response.data.group[0]?._id)
      setAbsent(response.data.absent)
    } catch (err) {
      console.log(err.message);
    } finally {
      setLoader(false)
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
    <div className="xl:p-4 p-1 md:p-6">
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
                <label className="block text-sm md:text-base font-medium">Student name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter name"
                  className="w-full p-2 text-sm md:text-base border rounded"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="+998 xx xxx xx xx"
                  className="w-full p-2 text-sm md:text-base border rounded"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium">Parent's name</label>
                <input
                  value={parents_name}
                  onChange={(e) => setParents_name(e.target.value)}
                  type="text"
                  placeholder="Parent's name"
                  className="w-full p-2 text-sm md:text-base border rounded"
                />
              </div>

              <div>
                <label className="block text-sm md:text-base font-medium">Parent's phone</label>
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
                type="submit"
                disabled={updateLoader}
                className="bg-[#333333] text-white px-8 md:px-44 py-2 md:py-3 text-sm md:text-base rounded-md hover:bg-[#555555] flex items-center justify-center gap-2"
              >
                {updateLoader ? (
                  <>
                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Wait...
                  </>
                ) : "Update"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Form */}
      <h2 className='text-xl md:text-2xl font-semibold text-[#333333]'>Add new student</h2>
      <form onSubmit={addPupil} className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm md:text-base font-medium">Student name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter name"
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium">Phone number</label>
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="text"
              placeholder="+998 xx xxx xx xx"
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium">Direction</label>
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
            <label className="block text-sm md:text-base font-medium">Parent's name</label>
            <input
              value={parents_name}
              onChange={(e) => setParents_name(e.target.value)}
              type="text"
              placeholder="Parent's name"
              className="w-full p-2 text-sm md:text-base border rounded"
            />
          </div>

          <div>
            <label className="block text-sm md:text-base font-medium">Parent's phone</label>
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
            type="submit"
            disabled={addLoader}
            className="bg-[#333333] text-white px-8 md:px-44 py-2 md:py-3 text-sm md:text-base rounded-md hover:bg-[#555555] flex items-center justify-center gap-2"
          >
            {addLoader ? (
              <>
                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Wait...
              </>
            ) : "Add"}
          </button>
        </div>
      </form>

      {/* Student List */}
      <div className='flex flex-col md:flex-row justify-between items-center mt-6 md:mt-8 gap-4'>
        <h2 className="text-xl md:text-2xl font-semibold text-[#333333]">
          Our students
        </h2>
        <input
          placeholder='Enter name...'
          onChange={(e) => searchPupil(e.target.value)}
          className="px-4 py-2 md:py-3 w-full md:w-auto rounded-2xl outline-none shadow-md text-sm md:text-base"
          type="text"
        />
      </div>

      <div className="mt-4 overflow-x-auto">
        <div className="bg-gray-50 p-4 rounded shadow min-w-full">
          {loader ? (
            <div className="flex justify-center items-center h-40">
              <span className="inline-block h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></span>
            </div>
          ) : (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#333333] text-white">
                  <th className="border border-gray-300 p-2 text-xs md:text-sm">#</th>
                  <th className="border border-gray-300 p-2 text-xs md:text-sm">Student name</th>
                  <th className="border border-gray-300 p-2 text-xs md:text-sm">Phone number</th>
                  <th className="border border-gray-300 p-2 text-xs md:text-sm hidden md:table-cell">Direction</th>
                  <th className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">Parent (Full name)</th>
                  <th className="border border-gray-300 p-2 text-xs md:text-sm hidden lg:table-cell">Parent (Phone)</th>
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
                        onClick={() => !deleteLoader && deletePupil(item._id)}
                        className='text-lg md:text-xl text-red-600 cursor-pointer'
                      >
                        {deleteLoader ? (
                          <span className="inline-block h-4 w-4 border-2 border-red-600 border-t-transparent rounded-full animate-spin"></span>
                        ) : <MdDelete />}
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
                      No data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}

export default Students