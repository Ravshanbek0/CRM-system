import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function Attendance({ setGroup_id, setLoading, dataGroup }) {
    const [combinedData, setCombinedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredGroups, setFilteredGroups] = useState([]);

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

    // Update filtered groups when dataGroup changes
    useEffect(() => {
        setFilteredGroups(dataGroup);
    }, [dataGroup]);

    const fetchData = async () => {
        const access_token = localStorage.getItem('token')
        try {
            // Parallel API requests
            const [teachersResponse, groupResponse] = await Promise.all([
                axios.get('https://crm-system-beta.vercel.app/api/v1/teacher/', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }),
                axios.get('https://crm-system-beta.vercel.app/api/v1/group/', {
                    headers: {
                        Authorization: `Bearer ${access_token}`
                    }
                }),
            ]);

            // Combine data by arrays
            const combinedData = teachersResponse.data.map((teacher, index) => ({
                teacher,
                group: groupResponse.data[index] || null,
            }));

            setCombinedData(combinedData);
            console.log(combinedData);

        } catch (err) {
            console.error(err);
            setError('Error occurred while fetching data.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // fetchData()
    }, [])

    return (
        <div>
            <main className="flex-1 p-6 bg-gray-50">
                <div className='flex justify-between items-center xl:flex-row flex-col pb-8'>
                    <h1 className="text-2xl font-semibold text-[#333333] mb-6">Select group for attendance</h1>
                    <input
                        className='py-2 px-4 w-full shadow rounded-lg outline-none border-none xl:w-1/4'
                        type="text"
                        placeholder='Search group...'
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredGroups.length > 0 ? filteredGroups.map((item, index) => (
                        <Link
                            key={index}
                            onClick={() => {
                                // setGroup_id(item.group._id)
                            }}
                            to={`/attendenceGroup/${item._id}`}
                        >
                            <div className="bg-white shadow rounded-lg overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
                                <h2 className="text-lg font-bold bg-[#333333] p-2 text-white mb-2 text-center">{item.group_name}</h2>
                                <div className='p-4'>
                                    <p className="text-sm text-[#333333] font-semibold mb-2">
                                        Lesson Days: <span className="text-gray-500">{item.lesson_dates}</span>
                                    </p>
                                    <p className="text-sm text-[#333333] font-semibold mb-2">
                                        Lesson Time: <span className="text-gray-500">{item.lesson_time}</span>
                                    </p>
                                    <p className="text-sm text-[#333333] font-semibold mb-2">
                                        Number of Students: <span className="text-gray-500">{item.group_pupils.length}</span>
                                    </p>
                                    <p className="text-sm text-[#333333] font-semibold">
                                        Paid Students: <span className="text-gray-500">{item.payment_done}</span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    )) : (
                        <div className="col-span-full text-center py-8">
                            <h1 className='text-red-600 font-semibold text-lg'>
                                {searchTerm ? "No results found" : "No data available!"}
                            </h1>
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default Attendance