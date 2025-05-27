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
  const [leftStudents, setLeftStudents] = useState([])
  const getReport = async () => {
    var access_token = localStorage.getItem("token")
    try {
      const response = await axios.get('https://crm-system-beta.vercel.app/api/v1/report', {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setLeftStudents(response.data);
      console.log(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getReport()
    console.log(dataTeacher);

    if (data && dataGroup && dataTeacher) {
      console.log(data, dataGroup, dataTeacher);
    } else {
      console.log("Data not loaded yet");
    }
  }, [data, dataGroup, dataTeacher]);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Calculate the percentage
  const totalStudents = data.length;
  const leftStudentsCount = leftStudents[1]?.romovedPupilsCount || 0;
  const retentionRate = totalStudents > 0
    ? Math.round(((totalStudents - leftStudentsCount) / totalStudents) * 100 * 100) / 100
    : 0;
  const percentageChange = 10;

  const retentionData = [
    {
      name: "Progress",
      value: retentionRate,
      fill: "#6366f1"
    }
  ];

  const statsData = [
    {
      title: "Total number of students",
      minTitle: "Students",
      num: 255,
    },
    {
      title: "Number of teachers",
      minTitle: "Teachers",
      num: 10,
    },
    {
      title: "Left this month",
      minTitle: "Left",
      num: 60,
    },
    {
      title: "Total number of groups",
      minTitle: "Groups",
      num: 26,
    }
  ]

  const chartData = {
    labels: ["February"],
    datasets: [
      {
        label: "Total students",
        data: [data.length],
        backgroundColor: "#2F49D1",
      },
      {
        label: "Left students",
        data: [leftStudentsCount],
        backgroundColor: "#E84393",
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
          display: false,
        },
        ticks: {
          color: "#333333",
          font: {
            size: isMobile ? 16 : 20,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          display: false,
        },
        ticks: {
          color: "#333333",
          font: {
            size: isMobile ? 16 : 20,
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
        {statsData.map((item, index) => (
          <div key={index} className="bg-white p-4 rounded-2xl shadow-md flex justify-between items-center">
            <div>
              <div className="text-gray-500 text-sm xl:text-xl lg:text-lg">{isMobile ? item.minTitle : item.title}</div>
              <div className="text-xl xl:text-2xl lg:text-lg font-bold">
                {item.title === "Total number of students" ? data.length :
                  item.title === "Number of teachers" ? dataTeacher.length :
                    item.title === "Total number of groups" ? dataGroup.length :
                      item.title === "Left this month" ? leftStudentsCount : ""}
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
            <h2 className="text-lg font-semibold">February 2025 Statistics</h2>
          </div>
          <div className="h-80 flex flex-col">
            {data.length === 0 && dataTeacher.length === 0 && dataGroup.length === 0 && leftStudentsCount === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-center">No data available for February 2025</p>
                <p className="text-sm text-center mt-1">Please check back later</p>
              </div>
            ) : (
              <>
                <div className="flex-1 min-h-0 relative">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: "Students", value: data.length, color: "#4f46e5" },
                          { name: "Teachers", value: dataTeacher.length, color: "#10b981" },
                          { name: "Groups", value: dataGroup.length, color: "#f59e0b" },
                          { name: "Left", value: leftStudentsCount, color: "#ef4444" }
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
                          { name: "Students", value: data.length, color: "#4f46e5" },
                          { name: "Teachers", value: dataTeacher.length, color: "#10b981" },
                          { name: "Groups", value: dataGroup.length, color: "#f59e0b" },
                          { name: "Left", value: leftStudentsCount, color: "#ef4444" }
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap justify-center gap-3 mt-4 px-2">
                  {[
                    { name: "Students", value: data.length, color: "#4f46e5" },
                    { name: "Teachers", value: dataTeacher.length, color: "#10b981" },
                    { name: "Groups", value: dataGroup.length, color: "#f59e0b" },
                    { name: "Left", value: leftStudentsCount, color: "#ef4444" }
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
              </>
            )}
          </div>
        </div>
      </div>

      {/* Retention Rate Panel */}
      <div className="flex-1 bg-white p-4 rounded-2xl shadow-md">
        <h2 className="text-center text-lg font-semibold mb-2">Student Retention Rate</h2>
        <p className="text-center text-sm text-gray-500 mb-4">Ratio of students who stayed vs left</p>
        <ResponsiveContainer width="100%" height={180}>
          <RadialBarChart
            cx="50%"
            cy="100%"
            innerRadius="80%"
            outerRadius="100%"
            barSize={10}
            startAngle={180}
            endAngle={0}
            data={retentionData}
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
            "Excellent result! High student retention rate." :
            "Measures should be taken to improve student retention."}
        </div>

        <div className="grid grid-cols-3 text-center text-sm mt-4">
          <div>
            <div className="text-gray-500">Students</div>
            <div className="font-bold text-blue-500">{data.length}</div>
          </div>
          <div>
            <div className="text-gray-500">Teachers</div>
            <div className="font-bold text-green-500">{dataTeacher.length}</div>
          </div>
          <div>
            <div className="text-gray-500">Groups</div>
            <div className="font-bold text-purple-500">{dataGroup.length}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report;