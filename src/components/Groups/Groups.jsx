import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MdDelete } from "react-icons/md";

const Groups = ({ setLoading, dataGroup }) => {
    const [group_name, setGroup_name] = useState("");
    const [lesson_dates, setLesson_dates] = useState("Du-Chor-Juma");
    const [lesson_time, setLesson_time] = useState("14:00 - 16:00");
    const [isOpen, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [phone, setPhone] = useState("");
    const [picture, setPicture] = useState(null);
    const [salary, setSalary] = useState("");
    const [groups, setGroups] = useState("");
    const [disable, setDisable] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGroups, setFilteredGroups] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [errorMessageT, setErrorMessageT] = useState(null);

    // Loader states
    const [addGroupLoader, setAddGroupLoader] = useState(false);
    const [deleteGroupLoader, setDeleteGroupLoader] = useState(false);
    const [addTeacherLoader, setAddTeacherLoader] = useState(false);
    const [deleteLoaderId, setDeleteLoaderId] = useState(null);

    // Search function
    const handleSearch = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);

        if (term === "") {
            setFilteredGroups(dataGroup);
        } else {
            const filtered = dataGroup.filter(group =>
                group.group_name.toLowerCase().includes(term)
            );
            setFilteredGroups(filtered);
        }
    };

    // Update filteredGroups when dataGroup changes
    useEffect(() => {
        setFilteredGroups(dataGroup);
    }, [dataGroup]);

    const clearError = () => {
        setErrorMessage(null);
    };

    const addGroup = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem("token");
        if (group_name !== "") {
            setAddGroupLoader(true);
            setErrorMessage(null);

            try {
                const response = await axios.post('https://crm-system-beta.vercel.app/api/v1/group', {
                    group_name,
                    lesson_dates,
                    lesson_time
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${access_token}`
                    },
                });
                window.location.reload();
            } catch (error) {
                const errorMsg = error.response?.data?.message?.[0]?.constraints?.matches ||
                    error.response?.data?.message ||
                    "Failed to add group";
                setErrorMessage(errorMsg);
            } finally {
                setAddGroupLoader(false);
                setGroup_name("");
            }
        } else {
            setErrorMessage("Please fill in all fields");
        }
    };

    const deleteGroup = async (id) => {
        const access_token = localStorage.getItem("token");
        setDeleteLoaderId(id);

        try {
            const response = await axios.delete(`https://crm-system-beta.vercel.app/api/v1/group/${id}`, {
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
            window.location.reload();
        } catch (error) {
            const errorMsg = error.response?.data?.message ||
                "Failed to delete group";
        } finally {
            setDeleteLoaderId(null);
        }
    };

    const addTeacher = async (e) => {
        e.preventDefault();
        const access_token = localStorage.getItem("token");
        setAddTeacherLoader(true);
        setErrorMessageT(null);

        try {
            await axios.post("https://crm-system-beta.vercel.app/api/v1/teacher/", {
                name,
                surname,
                phone: `+${phone}`,
                picture: "example.jpg",
                salary,
                groups: groups || (dataGroup.length > 0 ? dataGroup[0]._id : null)
            }, {
                headers: {
                    Authorization: `Bearer ${access_token}`,
                    "Content-Type": "application/json"
                },
            });
            setIsOpen(false);
            setName("");
            setSurname("");
            setPhone("");
            setSalary("");
            window.location.reload();
        } catch (error) {
            const errorMsg = error.response?.data?.message?.[0]?.constraints?.matches ||
                error.response?.data?.message ||
                "Failed to add teacher";
            setErrorMessageT(errorMsg);
        } finally {
            setAddTeacherLoader(false);
        }
    };

    return (
        <div className="p-4 md:p-6">
            {/* Error Message Display */}
            {errorMessage && (
                <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md transition-all duration-300 mb-4">
                    <svg onClick={clearError} className="w-5 h-5 text-red-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728" />
                    </svg>
                    <span className="text-sm font-medium">{errorMessage}</span>
                </div>
            )}

            {/* Rest of your component remains the same */}
            {/* Group Creation Section */}
            <div className={disable === false ? 'block' : 'hidden'}>
                {/* Group Creation Form */}
                <h2 className='text-2xl md:text-3xl font-semibold text-[#333333]'>Add New Group</h2>

                <form className="space-y-4 mt-4 bg-gray-50 p-4 rounded shadow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm md:text-base font-medium">Group Direction</label>
                            <input
                                value={group_name}
                                type="text"
                                onChange={(e) => setGroup_name(e.target.value)}
                                className='w-full p-2 text-sm md:text-base border rounded'
                                placeholder='Enter group name...'
                            />
                        </div>

                        <div>
                            <label className="block text-sm md:text-base font-medium">Lesson Days</label>
                            <select
                                onChange={(e) => setLesson_dates(e.target.value)}
                                className="w-full p-2 text-sm md:text-base border rounded"
                            >
                                <option value={'Du-Chor-Juma'}>MON-WED-FRI</option>
                                <option value={'Se-Pay-Shan'}>TUE-THU-SAT</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm md:text-base font-medium">Lesson Time</label>
                            <select
                                onChange={(e) => setLesson_time(e.target.value)}
                                className="w-full p-2 text-sm md:text-base border rounded"
                            >
                                <option value={'14:00 - 16:00'}>14:00-16:00</option>
                                <option value={'16:00 - 18:00'}>16:00-18:00</option>
                            </select>
                        </div>
                    </div>

                    <div className='flex justify-end'>
                        <button
                            onClick={addGroup}
                            disabled={addGroupLoader}
                            className="bg-[#333333] text-white px-8 md:px-16 lg:px-44 py-2 md:py-3 text-sm md:text-base rounded-md mt-2 hover:bg-[#555555] flex items-center justify-center gap-2"
                        >
                            {addGroupLoader ? (
                                <>
                                    <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                    Wait...
                                </>
                            ) : "Add"}
                        </button>
                    </div>
                </form>

                {/* Add Teacher Button */}
                <div className='w-full flex justify-end mt-4'>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="bg-blue-600 text-white px-4 py-2 text-sm md:text-base rounded hover:bg-blue-700"
                    >
                        Add Teacher
                    </button>
                </div>

                {/* Add Teacher Modal */}
                {isOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-[99999] p-4">
                        <div className="bg-white p-4 md:p-6 rounded shadow-lg w-full md:w-3/4 lg:w-1/2 relative max-h-[90vh] overflow-y-auto">
                            {errorMessageT && (
                                <div className="flex items-center gap-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md shadow-md transition-all duration-300 mb-4">
                                    <svg onClick={()=>{setErrorMessageT(null)}} className="w-5 h-5 text-red-600 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636L5.636 18.364M5.636 5.636l12.728 12.728" />
                                    </svg>
                                    <span className="text-sm font-medium">{errorMessageT}</span>
                                </div>
                            )}
                            <h2 className="text-xl md:text-2xl font-bold mb-4">Add New Teacher</h2>
                            <p
                                onClick={() => setIsOpen(false)}
                                className='absolute top-2 right-4 cursor-pointer text-xl'
                            >
                                ×
                            </p>

                            <form onSubmit={addTeacher} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    <div>
                                        <label className="block text-sm md:text-base font-medium">First Name</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full p-2 text-sm md:text-base border rounded"
                                            placeholder="Enter first name..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-base font-medium">Last Name</label>
                                        <input
                                            type="text"
                                            value={surname}
                                            onChange={(e) => setSurname(e.target.value)}
                                            className="w-full p-2 text-sm md:text-base border rounded"
                                            placeholder="Enter last name..."
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-base font-medium">Phone</label>
                                        <input
                                            type="number"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full p-2 text-sm md:text-base border rounded"
                                            placeholder="+998901234567"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm md:text-base font-medium">Salary</label>
                                        <input
                                            type="number"
                                            value={salary}
                                            onChange={(e) => setSalary(e.target.value)}
                                            className="w-full p-2 text-sm md:text-base border rounded"
                                            placeholder="$"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm md:text-base font-medium">Teaching Group</label>
                                        <select
                                            onChange={(e) => setGroups(e.target.value)}
                                            className="w-full p-2 text-sm md:text-base border rounded"
                                        >
                                            {dataGroup && dataGroup.map((item, index) => (
                                                <option key={index} value={item._id}>{item.group_name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="flex justify-end space-x-2 pt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(false)}
                                        className="bg-red-500 text-white px-4 py-2 text-sm md:text-base rounded hover:bg-red-600"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={addTeacherLoader}
                                        className="bg-[#333333] text-white px-4 py-2 text-sm md:text-base rounded hover:bg-[#555555] flex items-center justify-center gap-2"
                                    >
                                        {addTeacherLoader ? (
                                            <>
                                                <span className="inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                                                Wait...
                                            </>
                                        ) : "Add"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {/* Existing Groups Section */}
                <div className='flex flex-col md:flex-row justify-between items-center mt-8 gap-4'>
                    <h2 className="text-2xl md:text-3xl font-semibold text-[#333333]">
                        Existing Groups
                    </h2>
                    <input
                        placeholder='Search group...'
                        value={searchTerm}
                        onChange={handleSearch}
                        className="px-4 py-2 md:py-3 w-full md:w-64 rounded-2xl outline-none shadow-md text-sm md:text-base"
                        type="text"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mt-6">
                    {filteredGroups?.length > 0 ? filteredGroups.map((item, index) => (
                        <div key={index} className="bg-white cursor-pointer shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="flex justify-center items-center bg-[#333333] p-2 text-white relative">
                                <h2 className="text-lg md:text-xl font-bold text-center">
                                    <Link to={`/attendenceGroup/${item._id}`} className="block w-full">
                                        {item.group_name}
                                    </Link>
                                </h2>
                                <span
                                    onClick={() => deleteGroup(item._id)}
                                    className='absolute right-2 text-xl md:text-2xl hover:text-red-400 transition-colors'
                                >
                                    {deleteLoaderId === item._id ? (
                                        <span className="inline-block h-4 w-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></span>
                                    ) : <MdDelete />}
                                </span>
                            </div>

                            <Link to={`/attendenceGroup/${item._id}`}>
                                <div className='p-4'>
                                    <p className="text-sm md:text-base text-[#333333] font-semibold mb-2">
                                        Lesson Days: <span className="text-gray-500">{item.lesson_dates}</span>
                                    </p>
                                    <p className="text-sm md:text-base text-[#333333] font-semibold mb-2">
                                        Lesson Time: <span className="text-gray-500">{item.lesson_time}</span>
                                    </p>
                                    <p className="text-sm md:text-base text-[#333333] font-semibold mb-2">
                                        Number of Students: <span className="text-gray-500">{item.group_pupils.length}</span>
                                    </p>
                                    <p className="text-sm md:text-base text-[#333333] font-semibold">
                                        Paid Students: <span className="text-gray-500">{item.payment_done}</span>
                                    </p>
                                </div>
                            </Link>
                        </div>
                    )) : (
                        <div className="col-span-full text-center py-8">
                            <h1 className='text-red-600 font-semibold text-lg md:text-xl'>
                                {searchTerm ? "No results found" : "No data available!"}
                            </h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Groups;