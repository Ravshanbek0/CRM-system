import React from 'react'
import home from "./Home.svg"
import education from "./education.svg"
import users from "./users.svg"
import payments from "./payments.svg"
import attendance from "./attendence.svg"
import requests from "./requests.svg"
import down from "./down.svg"
import sun from "./sun.svg"
import notification from "./Notification.svg"
function Navbar() {
  return (
    <div>
      <div className="flex h-screen">
    
    <aside className="w-64 bg-blue-700 text-white flex flex-col">
      <div className="px-6 py-4">
        <h2 className="text-2xl font-bold">CRM PANEL</h2>
      </div>
      <nav className="flex-grow">
        <ul className='ml-4'>
          <li className='flex hover:bg-[#01265F]'>
            <img src={home} alt="" />
            <a href="#" className="flex items-center px-6 py-3 text-lg ">
              <span>Xisobot</span>
            </a>
          </li>
          <li className='flex hover:bg-[#01265F]'>
            <img src={education} alt="" />
            <a href="#" className="flex items-center px-6 py-3 text-lg ">
              <span>O'quvchilar</span>
            </a>
          </li>
          <li className='flex hover:bg-[#01265F]'>
            <img src={users} alt="" />
            <a href="#" className="flex items-center px-6 py-3 text-lg ">
              <span>Guruhlar</span>
            </a>
          </li>
          <li className='flex hover:bg-[#01265F]'>
            <img src={payments} alt="" />

            <a href="#" className="flex items-center px-6 py-3 text-lg ">
              <span>To'lovlar</span>
            </a>
          </li>
          <li className='flex hover:bg-[#01265F]'>
            <img src={attendance} alt="" />
            <a href="#" className="flex items-center px-6 py-3 text-lg ">
              <span>Davomat</span>
            </a>
          </li>
          <li className='flex hover:bg-[#01265F]'>
            <img src={requests} alt="" />
            <a href="#" className="flex items-center px-6 py-3 text-lg ">
              <span>Murojaatlar <span class="ml-auto text-sm bg-red-500 px-2 py-1 rounded-full">7</span></span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>

   
    <div className="flex-grow">
    
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Home</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600 font-medium">UZ</span>
          <img src={down} alt="" />
          <button className='bg-[#C4C4C4] rounded-[50%] p-2'>
            <img src={sun} alt="" />
          </button>
         <button className='bg-[#C4C4C4] rounded-[50%] p-2'>
          <img src={notification} alt="" />

         </button>
        </div>
      </header>

      
      <div className="p-6">
        
        <p>Bu yerda asosiy kontent joylashtiriladi.</p>
      </div>
    </div>
  </div>
    </div>
  )
}

export default Navbar