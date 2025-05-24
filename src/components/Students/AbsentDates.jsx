import { FaCalendarAlt, FaUserSlash, FaSearch, FaFilter } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AbsenceTracker = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterMonth, setFilterMonth] = useState('all');
    const navigate = useNavigate()

    // Namuna ma'lumotlar
    const students = [
        { id: 1, name: "Aliyev Ali", absentDates: ["2023-05-10", "2023-05-15"], totalAbsent: 2 },
        { id: 2, name: "Hasanova Zuhra", absentDates: ["2023-05-12"], totalAbsent: 1 },
        { id: 3, name: "Karimov Jahongir", absentDates: ["2023-05-08", "2023-05-17", "2023-05-22"], totalAbsent: 3 },
    ];

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Sarlavha va filtrlash */}
                <div className="p-6 border-b border-gray-200">
                    <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                        <FaUserSlash className="text-blue-500" />
                        O'quvchilarning Kelmagan Kunlari
                    </h1>

                    <div className="mt-4 flex flex-col md:flex-row gap-4">
                        <div className="relative flex-grow">
                            <FaSearch className="absolute left-3 top-3 text-gray-400" />
                            <input
                                type="text"
                                placeholder="O'quvchi ismi bo'yicha qidirish..."
                                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-lg">
                            <FaFilter className="text-black" />
                            <select
                                className="bg-transparent border-none focus:ring-0"
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(e.target.value)}
                            >
                                <option value="all">Barcha oylar</option>
                                <option value="may">May</option>
                                <option value="june">June</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Jadval */}
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-[#333]">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    №
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    O'quvchi
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Kelmagan Kunlar Soni
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Kelmagan Sanalar
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                                    Harakatlar
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredStudents.map((student, index) => (
                                <tr key={student.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                                        {index + 1}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">
                                            {student.name}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                            {student.totalAbsent} kun
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-black">
                                        <div className="flex flex-wrap gap-2">
                                            {student.absentDates.map((date, i) => (
                                                <span key={i} className="inline-flex items-center gap-1 bg-gray-100 px-2 py-1 rounded text-xs">
                                                    <FaCalendarAlt className="text-blue-400 text-xs" />
                                                    {new Date(date).toLocaleDateString()}
                                                </span>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button className="text-blue-600 hover:text-blue-900 mr-4">
                                            Tahrirlash
                                        </button>
                                        <button className="text-red-600 hover:text-red-900">
                                            O'chirish
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Jadval pastki qismi */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                    <div className="text-sm text-balck">
                        Jami: <span className="font-medium">{students.length}</span> ta o'quvchi
                    </div>
                    <div className="flex gap-2">
                        <button onClick={()=>{navigate("/")}} className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Back
                        </button>
                        <button className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                            Keyingi
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AbsenceTracker;