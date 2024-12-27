import React from 'react'
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Chart.js konfiguratsiyasi
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Report() {
  const stats = [
    { title: "Jami o‘quvchilar soni", value: "255 ta" },
    { title: "Shu oy tark etganlar", value: "60 ta" },
    { title: "O‘qituvchilar", value: "10 ta" },
    { title: "Jami guruhlar soni", value: "26 ta" },
  ];
  const data = {
    labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun"],
    datasets: [
      {
        label: "O‘quvchilar",
        data: [261, 296, 305, 255, 210, 185],
        backgroundColor: "rgba(29, 78, 216, 0.7)", // Blue-700
        borderColor: "rgba(29, 78, 216, 1)", // Blue-700
        borderWidth: 1,
      },
      {
        label: "O‘qituvchilar",
        data: [46, 50, 30, 26, 20, 15],
        backgroundColor: "rgba(220, 38, 38, 0.7)", // Red-700
        borderColor: "rgba(220, 38, 38, 1)", // Red-700
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "2022-YIL Aprel oyida bo‘lgan statistika",
      },
    },
  };
  return (
    <div>
      <main className="bg-gray-100 p-4 min-h-screen">
        {/* Header qismi */}
        <header className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-800">Xisobot</h1>
          <div className="text-gray-500 text-sm">27.01.2022</div>
        </header>

        {/* Statistik ma'lumotlar */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-lg p-4 flex flex-col items-start"
            >
              <h3 className="text-gray-500 text-sm font-semibold">{stat.title}</h3>
              <p className="text-xl font-bold text-blue-800 mt-2">{stat.value}</p>
              <div className="ml-auto mt-4 text-blue-600 cursor-pointer hover:opacity-80">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 10h11m0 0l-4-4m4 4l-4 4m12 4h-7m0 0l4-4m-4 4l4-4"
                  />
                </svg>
              </div>
            </div>
          ))}
        </section>

        {/* Diagram qismi */}
        <section className="bg-white shadow-md rounded-lg p-6 mt-6">
          <div className="w-full md:w-2/3 lg:w-1/2 mx-auto">
            <Bar options={options} data={data} />
          </div>
        </section>
      </main>
    </div>
  )
}

export default Report;
