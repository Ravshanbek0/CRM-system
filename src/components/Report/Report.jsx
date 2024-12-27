import React, { useEffect, useState } from 'react';
import stat from '../../assets/icons/stats.svg';
import { Bar } from 'react-chartjs-2';
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

function Report() {

  const [ismobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const data = [
    {
      title: "Jami o'quvchilar soni",
      minTitle: "Jami o'quvchilar",
      num: 255,
    },
    {
      title: "O’qituvchilar soni",
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
    labels: ["Yanvar", "Fevral", "Mart", "Aprel", "May", "Iyun", "Iyul"],
    datasets: [
      {
        label: "Jami o'quvchilar",
        data: [261, 296, 305, 255, 0, 0, 0], // Jami o'quvchilar ma'lumotlari
        backgroundColor: "#2F49D1", // Moviy rang
      },
      {
        label: "Tark etganlar",
        data: [46, 30, 46, 60, 0, 0, 0], // Tark etganlar ma'lumotlari
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
          color: "#2F327D", // Oylik nomlar rangini o'zgartirish
          font: {
            size: ismobile ? 16 : 24,
            weight: "bold",
          },
        },
      },
      y: {
        beginAtZero: true,
        max: 400, // Y o'qining maksimum qiymati
        grid: {
          display: false, // Y o'qidagi kataklarni o'chirish
        },
        ticks: {
          color: "#2F327D",
          font: {
            size: ismobile ? 16 : 24,
          },
        },
      },
    },
  };

  return (
    <div className='bg-main pt-6'>
      <div className="flex flex-wrap w-100 ml-5 sm:ml-16 xl:ml-36 gap-5">
        {data.map((item, index) => (
          <div key={index} className="w-5/12 h-28 sm:h-44 border p-3 lg:rounded-xl bg-white relative shadow-md hover:shadow-lg transition-shadow">
            <h1 className='text-sm sm:text-base md:text-xl lg:text-2xl xl:text-3xl font-medium'>{ismobile ? item.minTitle : item.title}:</h1>
            <p className='sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mt-1'>{item.num} ta</p>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-24 xl:h-24 rounded-full flex justify-center content-center absolute right-5 bottom-5 hover:cursor-pointer bg-main-lg">
              <img className='w-3 sm:w-4 lg:w-6 xl:w-8' src={stat} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className='w-100 h-auto ml-5 sm:ml-16 xl:ml-36 mt-5'>
        <div className='w-11/12 lg:w-10/12 h-auto bg-white relative'>
          <div className="flex gap-2 justify-center xl:block xl:w-4/12 xl:absolute xl:right-0 xl:top-3">
            <p className='text-xs sm:text-sm md:text-lg xl:text-3xl font-semibold'>2022-YIL</p>
            <p className='text-xs sm:text-sm md:text-lg xl:text-3xl font-semibold'><span className='text-blue-700'>Aprel</span> oyigacha bo’lgan statistika</p>
          </div>
          <div className='w-100 h-96 xl:w-10/12'>
            <Bar data={mainData} options={options} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report;
