import React, { useState } from 'react';

function Appeals() {

  const [dataToday, setDataToday] = useState([
    {
      id: 1,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    },
    {
      id: 2,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    },
    {
      id: 3,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    },
    {
      id: 4,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    }
  ]);

  const [dataYesterday, setDataYesterday] = useState([
    {
      id: 1,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    },
    {
      id: 2,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    },
    {
      id: 3,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    },
    {
      id: 4,
      name: "Muxamadaliyev Ibroxim",
      phoneNum: "+998900113861",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. "
    }
  ]);

  const onDeleteToday = (id) => {
    const newData = dataToday.filter((data) => {
      return data.id !== id
    });
    setDataToday(newData)
  };

  const onDeleteYesterday = (id) => {
    const newData = dataYesterday.filter((data) => {
      return data.id !== id
    });
    setDataYesterday(newData)
  };

  return (
    <div>
      <div className="p-4 bg-blue-100">
        <div className="border rounded-lg bg-white">
          <div className="p-4 border-b bg-blue-100 text-blue-700 text-2xl sm:text-4xl font-semibold">
            Bugungi murojaatlar
          </div>
          <div className="shadow-lg hover:shadow-xl transition">
            <div className='overflow-x-scroll max-w-full'>
              <table className="table-auto min-w-[860px] xl:min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">№</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">O'quvchi ismi</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">Telefon nomer</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">Izoh</th>
                    <th className="px-4 py-2 text-center">Amal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataToday.map(item => (
                    <tr className='odd:bg-white even:bg-indigo-100' key={item.id}>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.id}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.name}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.phoneNum}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.comment}</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => onDeleteToday(item.id)} className="text-red-500 hover:text-red-700">
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
          <div className="p-4 border-b bg-blue-100 text-blue-700 text-xl sm:text-3xl font-semibold">
            26.03.2022 kungi murojaatlar
          </div>
          <div className="shadow-lg hover:shadow-xl transition">
            <div className="overflow-x-scroll">
              <table className="table-auto min-w-[900px] xl:min-w-full divide-y divide-gray-200">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">№</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">O'quvchi ismi</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base w-1/12 lg:w-2/12">Telefon nomer</th>
                    <th className="px-4 py-2 text-left text-sm lg:text-base">Izoh</th>
                    <th className="px-4 py-2 text-center">Amal</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {dataYesterday.map(item => (
                    <tr className='odd:bg-white even:bg-indigo-100' key={item.id}>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.id}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.name}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.phoneNum}</td>
                      <td className="px-4 py-2 text-sm xl:text-base">{item.comment}</td>
                      <td className="px-4 py-2 text-center">
                        <button onClick={() => onDeleteYesterday(item.id)} className="text-red-500 hover:text-red-700">
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
