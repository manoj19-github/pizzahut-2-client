import React from 'react'
import { Line,Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,

  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const SecondRecord = ({data,customers}) => {
    return (
      <div className="flex flex-col lg:flex-row  mt-8">
          <div className="w-[90%] lg:w-[50%] flex justify-center mt-4 lg:mt-0 lg:p-4 h-full">
            <Bar data={data} className="h-full"  />
          </div>
          <div className="w-[90%] lg:w-[50%] flex justify-center mt-4 ml-8 lg:mt-0 lg:ml-0 lg:p-2 h-full flex-col">
            <h1 className="text-gray-600 text-center mb-4 pb-2 border-b border-gray-600">Top 5 customer from Last Month</h1>
            <table className="flex flex-col">
                  <tr className=" flex w-[100%] border border-gray-600 justify-evenly items-center font-bold text-white bg-gray-700">
                  <th className="flex-1">Name</th>
                  <th className="flex-1">Email</th>
                  <th className="flex-1">Total Orders</th>
                </tr>
                {
                  customers?.map((customer,index)=>(
                    <tr key={index} className="flex  justify-between   w-[100%] border border-gray-600 items-center">
                      <td  className="text-center">{customer._id.name}</td>
                      <td  className="ml-2 text-right">{customer._id.email}</td>
                      <td  className=" text-right mr-2">{customer.count}</td>
                    </tr>

                  ))
                }

            </table>
          </div>
      </div>
    )
}

export default SecondRecord
