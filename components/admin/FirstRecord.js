import React from 'react'
import {useDispatch,useSelector}  from "react-redux"
import CountUp from "react-countup"
import { Line } from 'react-chartjs-2';
import {BsBell,BsHandbag,BsCartCheck} from "react-icons/bs"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {BiRupee} from "react-icons/bi"
import {RiBillLine} from "react-icons/ri"

import {
  Chart as ChartJS,
  CategoryScale,
  BarElement,
  ArcElement,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const FirstRecord = ({data,dashboardData}) => {
    return (
      <div className="flex flex-col w-full">
        <p className="text-gray-600">Dashboard</p>
        <p className="text-teal-700 mt-2 text-sm">Buisness in Last Month</p>
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="mt-2 mx-auto  w-[90%] lg:w-[50%] lg:mx-0 grid grid-flow-row auto-rows-max grid-cols-1 lg:grid-cols-2 gap-y-8 gap-x-2 ">
            <div className="flex flex-col py-4 px-4  text-white rounded-md bg-blue-500 ">
              <div className="flex flex-row items-center ">
                <div className="ml-2">
                  <BsHandbag size={25} color="white" className="cursor-pointer"/>
                </div>
                <div className="ml-4 text-white   text-lg flex items-center ">
                  <BiRupee size={32} color="white"/>
                  <CountUp end={dashboardData.orderTotal} decimals={2} className="text-xl text-white" duration={5} />
                </div>
              </div>
              <p className="mt-2 text-sm  text-center">Total Orders</p>
            </div>
            <div className="flex flex-col py-4 px-4  bg-[#87CE1D] rounded-md">
              <div className="flex flex-row items-center">
                <div className="ml-2">
                  <BsCartCheck size={25} color="white"/>
                </div>
                <div className="ml-4 text-lg flex items-center ">
                  <BiRupee size={32} color="white"/>
                  <CountUp end={dashboardData.cartTotal} decimals={2} className="text-xl text-white" duration={5} />
                </div>
              </div>
              <p className="mt-2 text-sm text-white text-center">Total Cart</p>
            </div>
            <div className="flex flex-col py-4 px-4 bg-[#E74C3C] rounded-md">
              <div className="flex flex-row items-center">
                <div className="ml-2">
                  <GiReceiveMoney size={25} color="white"/>
                </div>
                <div className="ml-4 text-lg flex items-center ">
                  <BiRupee size={32} color="white"/>
                  <CountUp end={dashboardData.codTotal} decimals={2} className="text-xl text-white" duration={5} />
                </div>
              </div>
              <p className="mt-2 text-sm text-white text-center">Total COD</p>
            </div>
            <div className="flex flex-col py-4 px-4  bg-[#34495E] rounded-md">
              <div className="flex flex-row items-center">
                <div className="ml-2">
                  <RiBillLine size={25} color="white"/>
                </div>
                <div className="ml-4 text-lg flex items-center ">
                  <BiRupee size={32} color="white"/>
                  <CountUp end={dashboardData.paidTotal} decimals={2} className="text-xl text-white" duration={5} />
                </div>
              </div>
              <p className="mt-2 text-sm text-white text-center">Total Payment</p>
            </div>
          </div>
          <div className="w-[90%] lg:w-[50%] flex justify-center mt-4 lg:mt-0 lg:p-4 h-full">
            <Line data={data}  />

          </div>

      </div>
    </div>
    )
}

export default FirstRecord
