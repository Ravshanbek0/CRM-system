import React from 'react';
import stat from '../../assets/icons/stats.svg';

function Report() {

  const data = [
    {
      title: "Jami o'quvchilar soni",
      num: 255,
    },
    {
      title: "O’qituvchilar soni",
      num: 10,
    },
    {
      title: "Shu oy tark etganlar",
      num: 60,
    },
    {
      title: "Jami guruhlar soni",
      num: 26,
    }
  ]

  return (
    <div>
      <div className="bg-main flex flex-wrap w-100 justify-center gap-5">
        {data.map((item, index) => (
          <div key={index} className="w-5/12 h-44 border p-3 rounded-xl bg-white relative shadow-md hover:shadow-lg transition-shadow">
            <h1 className='text-3xl font-medium'>{item.title}:</h1>
            <p className='text-4xl font-bold mt-1'>{item.num} ta</p>
            <div className="w-24 h-24 rounded-full flex justify-center content-center absolute right-5 bottom-5 hover:cursor-pointer bg-main-lg">
              <img className='w-8' src={stat} alt="" />
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default Report;
