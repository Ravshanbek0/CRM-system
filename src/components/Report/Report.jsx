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

function Report({ data, dataGroup, dataTeacher }) {
  const [tarkPupil, setTarkPupil] = useState([])
  const getReport = async () => {
    try {
      // setLoading(true)

      const response = await axios.get('https://crm-project.up.railway.app/api/v1/report', {
        headers: {
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2N2E0ZGRlYzA4NWUxZWE0ODE5NTFjY2YiLCJ1c2VybmFtZSI6InVzZXJfbmFtZTIiLCJpYXQiOjE3Mzg5MjAxNDEsImV4cCI6MTczOTUyNDk0MX0.CrHCQ3c81tGPteUCznpxeUlPn6rmS3Dfq1Gevrqs9mU`
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

  const data1 = [
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
    labels: ["Yanvar"],
    datasets: [
      {
        label: "Jami o'quvchilar",
        data: [data.length], // Jami o'quvchilar ma'lumotlari
        backgroundColor: "#2F49D1", // Moviy rang
      },
      {
        label: "Tark etganlar",
        data: [tarkPupil[0]?.romovedPupilsCount], // Tark etganlar ma'lumotlari
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
    <div className='bg-main pt-6'>
      <div className="flex flex-wrap w-100 ml-5 sm:ml-16 xl:ml-36 gap-5">
        {data1.map((item, index) => (
          <div key={index} className="w-5/12 h-28 sm:h-44 border p-3 lg:rounded-xl bg-white relative shadow-md hover:shadow-lg transition-shadow">
            <h1 className='text-xs sm:text-base lg:text-xl xl:text-2xl font-medium'>{ismobile ? item.minTitle : item.title}:</h1>
            <p className='sm:text-xl lg:text-2xl xl:text-3xl font-bold mt-1'>{item.title === "Jami o'quvchilar soni" ? data.length : item.title === "O’qituvchilar soni" ? dataTeacher.length : item.title === "Jami guruhlar soni" ? dataGroup.length : item.title === "Shu oy tark etganlar" ? tarkPupil[0]?.romovedPupilsCount : ""} ta</p>
            <div className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 xl:w-24 xl:h-24 rounded-full flex justify-center content-center absolute right-5 bottom-5 hover:cursor-pointer bg-main-lg">
              <img onClick={() => console.log(data)} className='w-3 sm:w-4 lg:w-6 xl:w-8' src={stat} alt="" />
            </div>
          </div>
        ))}
      </div>
      <div className='w-100 h-auto ml-5 sm:ml-16 xl:ml-36 mt-5'>
        <div className='w-11/12 lg:w-10/12 h-auto bg-white relative shadow-md hover:shadow-lg transition'>
          <div className="flex gap-2 justify-center xl:block xl:w-4/12 xl:absolute xl:right-0 xl:top-3">
            <p className='text-xs sm:text-sm md:text-lg xl:text-2xl font-semibold'>2025-YIL</p>
            <p className='text-xs sm:text-sm md:text-lg xl:text-2xl font-semibold'><span className='text-[#ffc100]'>Yanvar</span> oyigacha bo’lgan statistika</p>
          </div>
          <div className='h-96 xl:w-10/12'>
            <Bar data={mainData} options={options} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report;
