import React, { useEffect, useState } from 'react';
import stat from '../../assets/icons/stats.svg';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import { RadialBarChart, RadialBar, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

function Report({ data, dataGroup, dataTeacher, access_token }) {
  const [tarkPupil, setTarkPupil] = useState([])
  const getReport = async () => {
    var access_token = localStorage.getItem("token")
    try {
      // setLoading(true)

      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/report', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      }); // API URL
      // setDataGroup(response.data); // Javobni saqlash
      console.log(response.data);
      setTarkPupil(response.data)
      // setLoading(false); // Yuklashni to'xtatish
    } catch (err) {
      console.error(err.message); // Xatoni saqlash
      // setLoading(false); // Yuklashni to'xtatish
    }
  };


  useEffect(() => {
    getReport()
    console.log(dataTeacher);

    if (data && dataGroup && dataTeacher) {
      console.log(data, dataGroup, dataTeacher);
    } else {
      console.log("Ma'lumotlar hali yuklanmagan");
    }
  }, [data, dataGroup, dataTeacher]);


  const [ismobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])
  // Calculate the percentage
  const totalStudents = data.length;
  const leftStudents = tarkPupil[1]?.romovedPupilsCount || 0;
  const retentionRate = totalStudents > 0
    ? Math.round(((totalStudents - leftStudents) / totalStudents) * 100 * 100) / 100
    : 0;
  const percentageChange = 10; // You can calculate this based on previous data if available

  const dataFoiz = [
    {
      name: "Progress",
      value: retentionRate,
      fill: "#6366f1" // Purple color
    }
  ];
  const data1 = [
    {
      title: "Jami o'quvchilar soni",
      minTitle: "Jami o'quvchilar",
      num: 255,
    },
    {
      title: "O'qituvchilar soni",
      minTitle: "O'qituvchilar",
      num: 10,
    },
    {
      title: "Shu oy tark etganlar",
      minTitle: "Ketganlar",
      num: 60,
    },
    {
      title: "Jami guruhlar soni",
      minTitle: "Guruhlar",
      num: 26,
    }
  ]

  const mainData = {
    labels: ["Fevral"],
    datasets: [
      {
        label: "Jami o'quvchilar",
        data: [data.length], // Jami o'quvchilar ma'lumotlari
        backgroundColor: "#2F49D1", // Moviy rang
      },
      {
        label: "Tark etganlar",
        data: [tarkPupil[1]?.romovedPupilsCount], // Tark etganlar ma'lumotlari
        backgroundColor: "#E84393", // Qizil rang
      }
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
    scales: {
      x: {
        grid: {
          display: false, // X o'qidagi kataklarni o'chirish
        },
        ticks: {
          color: "#333333", // Oylik nomlar rangini o'zgartirish
          font: {
            size: ismobile ? 16 : 20,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // Y o'qining maksimum qiymati
        grid: {
          display: false, // Y o'qidagi kataklarni o'chirish
        },
        ticks: {
          color: "#333333",
          font: {
            size: ismobile ? 16 : 20,
          },
          padding: 15
        },
      },
    },
  };

  return (
    <div className="p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:col-span-2 gap-4">
        {/* Stats Cards */}
        {data1.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm xl:text-xl lg:text-lg">{ismobile ? item.minTitle : item.title}</div>
              <div className="text-xl  xl:text-2xl lg:text-lg font-bold">
                {item.title === "Jami o'quvchilar soni" ? data.length :
                  item.title === "O'qituvchilar soni" ? dataTeacher.length :
                    item.title === "Jami guruhlar soni" ? dataGroup.length :
                      item.title === "Shu oy tark etganlar" ? leftStudents : ""} ta
              </div>
            </div>
            <div
              className="w-10 h-10 rounded-full flex justify-center items-center bg-blue-100 hover:cursor-pointer"
              onClick={() => console.log(data)}
            >
              <img className='w-4' src={stat} alt="Statistics" />
            </div>
          </div>
        ))}

        {/* Pie Chart for February Statistics */}
        <div className="bg-white p-4 rounded-2xl shadow-md col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">2025-YIL Fevral oyi statistikasi</h2>
          </div>
          <div className="h-80 flex flex-col">
            {/* Chart Container */}
            <div className="flex-1 min-h-0 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: "O'quvchilar", value: data.length, color: "#4f46e5" },
                      { name: "O'qituvchilar", value: dataTeacher.length, color: "#10b981" },
                      { name: "Guruhlar", value: dataGroup.length, color: "#f59e0b" },
                      { name: "Tark etganlar", value: leftStudents, color: "#ef4444" }
                    ]}
                    cx="50%"
                    cy="50%"
                    innerRadius={20}
                    outerRadius={110}
                    paddingAngle={1}
                    dataKey="value"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="white"
                          textAnchor="middle"
                          dominantBaseline="central"
                          className="text-xs font-bold"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {[
                      { name: "O'quvchilar", value: data.length, color: "#4f46e5" },
                      { name: "O'qituvchilar", value: dataTeacher.length, color: "#10b981" },
                      { name: "Guruhlar", value: dataGroup.length, color: "#f59e0b" },
                      { name: "Tark etganlar", value: leftStudents, color: "#ef4444" }
                    ].map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value, name) => [`${value} ta`, name]}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Custom Legend */}
            <div className="flex flex-wrap justify-center gap-3 mt-4 px-2">
              {[
                { name: "O'quvchilar", value: data.length, color: "#4f46e5" },
                { name: "O'qituvchilar", value: dataTeacher.length, color: "#10b981" },
                { name: "Guruhlar", value: dataGroup.length, color: "#f59e0b" },
                { name: "Tark etganlar", value: leftStudents, color: "#ef4444" }
              ].map((item, index) => (
                <div key={index} className="flex items-center text-xs sm:text-sm">
                  <div
                    className="w-3 h-3 rounded-full mr-2 flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span>{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Retention Rate Panel */}
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-center text-lg font-semibold mb-2">O'quvchilarni Saqlash Darajasi</h2>
        <p className="text-center text-sm text-gray-500 mb-4">Tark etgan va qolgan o'quvchilar nisbati</p>
        <ResponsiveContainer width="100%" height={180}>
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="80%"
            outerRadius="100%"
            barSize={10}
            startAngle={180}
            endAngle={0}
            data={dataFoiz}
          >
            <RadialBar
              clockWise
              dataKey="value"
              cornerRadius={10}
              fill="#6366f1"
            />
          </RadialBarChart>
        </ResponsiveContainer>
        <div className="text-center mt-[-40px]">
          <div className="text-2xl font-bold">{retentionRate}%</div>
          <div className={`text-${percentageChange >= 0 ? 'green' : 'red'}-500 text-sm bg-${percentageChange >= 0 ? 'green' : 'red'}-100 px-2 py-1 inline-block rounded-full`}>
            {percentageChange >= 0 ? '↑' : '↓'} {Math.abs(percentageChange)}%
          </div>
        </div>
        <div className="text-center mt-4 text-sm text-gray-600">
          {retentionRate >= 80 ?
            "Ajoyib natija! O'quvchilarni saqlab qolish darajasi yuqori." :
            "O'quvchilarni saqlab qolish darajasini oshirish uchun choralar ko'rilishi kerak."}
        </div>

        <div className="grid grid-cols-3 text-center text-sm mt-4">
          <div>
            <div className="text-gray-500">O'quvchilar</div>
            <div className="font-bold text-blue-500">{data.length} ta</div>
          </div>
          <div>
            <div className="text-gray-500">O'qituvchilar</div>
            <div className="font-bold text-green-500">{dataTeacher.length} ta</div>
          </div>
          <div>
            <div className="text-gray-500">Guruhlar</div>
            <div className="font-bold text-purple-500">{dataGroup.length} ta</div>
          </div>

        </div>
      </div>
    </div >

  )
}

export default Report;


