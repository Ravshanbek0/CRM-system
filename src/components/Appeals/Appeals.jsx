import React from 'react';

function Appeals() {

  const data = [
    {
      
    },
  ]

  return (
    <div>
      <div className="p-4 bg-gray-100">
        <div className="border rounded-lg shadow-lg bg-white">
          <div className="p-4 border-b bg-blue-100 text-blue-700 text-xl font-semibold">
            Bugungi murojaatlar
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">№</th>
                  <th className="px-4 py-2 text-left">O'quvchi ismi</th>
                  <th className="px-4 py-2 text-left">Telefon nomer</th>
                  <th className="px-4 py-2 text-left">Izoh</th>
                  <th className="px-4 py-2 text-center">Amal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 even:bg-white odd:bg-black">
                <tr>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Muxamadaliyev Ibroxim</td>
                  <td className="px-4 py-2">+998900113861</td>
                  <td className="px-4 py-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis. Etiam ultrices vel nisl nisl nec sed. 
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      🗑️
                    </button>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
        </div>

        {/* <!-- Ikkinchi jadval --> */}
        <div className="border rounded-lg shadow-lg bg-white mt-6">
          <div className="p-4 border-b bg-blue-100 text-blue-700 text-xl font-semibold">
            26.03.2022 kungi murojaatlar
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-4 py-2 text-left">№</th>
                  <th className="px-4 py-2 text-left">O'quvchi ismi</th>
                  <th className="px-4 py-2 text-left">Telefon nomer</th>
                  <th className="px-4 py-2 text-left">Izoh</th>
                  <th className="px-4 py-2 text-center">Amal</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 even:bg-black">
                <tr>
                  <td className="px-4 py-2">1</td>
                  <td className="px-4 py-2">Muxamadaliyev Ibroxim</td>
                  <td className="px-4 py-2">+998900113861</td>
                  <td className="px-4 py-2">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum nascetur faucibus quam nunc mattis.
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button className="text-red-500 hover:text-red-700">
                      🗑️
                    </button>
                  </td>
                </tr>
                {/* <!-- Yana qatorlarni qo'shish --> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Appeals;
