import React,{useEffect} from 'react'
import Image from "next/image"
import {BiRupee} from "react-icons/bi"
import {FaEdit} from "react-icons/fa"
import {RiDeleteBack2Fill} from "react-icons/ri"
import {AiFillDelete} from "react-icons/ai"
import {useDispatch,useSelector} from "react-redux"
import {useRouter} from "next/router"
import CartRow from "./CartRow"
const CartTable = () =>{

  const tableData=useSelector(state=>state.cartReducer.cartItems)

    return (
      <div className="w-full lg:w-2/3 mx-auto">
        <table className="w-full flex flex-col items-center justify-center my-4 lg:mt-0 ">
          <thead className="hidden md:block bg-gray-600 w-full mb-3">
            <tr className="w-full flex justify-between items-center">
              <th className="flex-2">Product</th>
              <th className="flex-1">Name</th>
              <th className="flex-1">Size</th>
              <th className="flex-1">Extras</th>
              <th className="flex-1">Price</th>
              <th className="flex-1">Qty</th>
              <th className="flex-1">Total</th>
              <th className="flex-1">Remove</th>
            </tr>
          </thead>
          <tbody className="w-full">
          {

              tableData?.map((tData,index)=>(
                <CartRow key={index} tableData={tData}/>
              ))

          }


          </tbody>
        </table>
      </div>

    )
}

export default CartTable
