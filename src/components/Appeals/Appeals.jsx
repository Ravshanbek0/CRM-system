import React, { useEffect, useState } from 'react';

function Appeals({ dataAppeals,access_token }) {
  const [dataToday, setDataToday] = useState([]);
  const [dataYesterday, setDataYesterday] = useState([]);

  useEffect(()=>{
    setDataToday(dataAppeals);
    setDataYesterday(dataAppeals);
  },[dataAppeals])

  const onDeleteToday = (id) => {
    const newData = dataToday.filter((data) => {
      return data._id !== id
    });
    setDataToday(newData);
  };

  const onDeleteYesterday = (id) => {
    const newData = dataYesterday.filter((data) => {
      return data._id !== id
    });
    setDataYesterday(newData);
  };

  return (
    <div>
      <div className="p-4 bg-gray">
        <div className="border rounded-lg bg-white">
          <div className="p-4 border-b  text-[#333333] text-2xl sm:text-4xl font-semibold">
            Bugungi murojaatlar
          </div>
          <div className="shadow-lg hover:shadow-xl transition">
            <div className='overflow-x-scroll xl:overflow-hidden'>
              <table className="table-auto min-w-[900px] xl:min-w-full divide-y divide-gray-200">
                <thead className="bg-[#333333] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">№</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">O'quvchi ismi</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">Telefon nomer</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">Izoh</th>
                    <th className="px-4 py-2 text-center">Amal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataAppeals && dataToday.map((item, index) => (
                    <tr className='odd:bg-white even:bg-indigo-100' key={index}>
                      <td className="px-4 py-2 text-sm xl:text-base">{index+1}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.full_name}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.phone}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.description}</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => onDeleteToday(item._id)} className="text-red-500 hover:text-red-700">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* <!-- Ikkinchi jadval --> */}
        <div className="border rounded-lg bg-white mt-6">
          <div className="p-4 border-b  text-[#333333] text-xl sm:text-3xl font-semibold">
            26.03.2022 kungi murojaatlar
          </div>
          <div className="shadow-lg hover:shadow-xl transition">
            <div className="overflow-x-scroll xl:overflow-hidden">
              <table className="table-auto min-w-[900px] xl:min-w-full divide-y divide-gray-200">
                <thead className="bg-[#333333] text-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">№</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">O'quvchi ismi</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">Telefon nomer</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">Izoh</th>
                    <th className="px-4 py-2 text-center">Amal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataAppeals && dataYesterday.map((item, index) => (
                    <tr className='odd:bg-white even:bg-indigo-100' key={index}>
                      <td className="px-4 py-2 text-sm xl:text-base">{index+1}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.full_name}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.phone}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.description}</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => onDeleteYesterday(item._id)} className="text-red-500 hover:text-red-700">
                          🗑️
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Appeals;
