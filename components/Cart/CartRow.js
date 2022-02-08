import React,{useEffect} from 'react'
import Image from "next/image"
import {BiRupee} from "react-icons/bi"
import {FaEdit} from "react-icons/fa"
import {RiDeleteBack2Fill} from "react-icons/ri"
import {AiFillDelete} from "react-icons/ai"
import {useDispatch,useSelector} from "react-redux"
import {useRouter} from "next/router"
import {editCartQty} from "../../redux/actions/cart/editCartQty"
import {deleteCart} from "../../redux/actions/cart/deleteCart"
const CartRow = ({tableData}) => {
  const Router=useRouter()
  const server=true
  const csr=typeof window !=="undefined"
    const dispatch=useDispatch()
    const handleCartQtyChange=(e,productId)=>{
      server=false
      if(e.target.value<1) return
      const status=dispatch(editCartQty(productId,e.target.value,Router))
      switch(status){
        case 1:
          return
        case -1:
          Router.push("/")
          break;
        default: return
      }
    }
    const handleDelete=(cartId)=>{
      server=false
      const status=dispatch(deleteCart(cartId,Router))
      switch(status){
        case 1:
          return
        case -1:
          Router.push("/")
          break;
        default: return
      }
    }

    if(server ||csr){
    return (

      <tr className="sm:w-3/4  md:w-full mx-auto flex flex-col md:flex-row justify-between items-center">
        <td className="flex-1 my-4 lg:my-0">
            <div className="w-32 h-32 md:w-16 md:h-16 relative flex flex-col items-center justify-center ">
            <Image
              src={tableData.product.image}
              layout="fill"
              objectFit="cover"
              alt="pizza"
            />
          </div>
        </td>
        <td className="flex-1 flex justify-around items-center w-full">
          <p className="mx-4 flex-1 text-center lg:mx-0 md:hidden block font-bold ">Name : </p>
          <p className="font-bold flex-1 text-[#d1411e] font-base">{tableData.product.name}</p>
        </td>
        <td className="flex-1 flex justify-around items-center w-full mt-3">
          <p className="mx-4 flex-1 text-center lg:mx-0 md:hidden block font-bold ">size : </p>
        <p className="flex-1 mb-2">{tableData.size}</p>
        </td>
        <td className="flex-1 flex justify-around items-center w-full mt-3">
          <p className=" flex-1 text-center md:hidden block font-bold ">Extras : </p>
        <p className=" flex-1">
        {
          tableData?.ingridients?.map((ingri,index)=>(
            <span key={index}>{ingri.text} ,</span> 
          ))
        }
        </p>
        </td>
        <td className="flex-1 flex justify-around items-center w-full mt-3">
          <p className=" flex-1 text-center md:hidden block font-bold ">Price : </p>
          <div className="flex flex-1">
            <BiRupee size={26}/> {tableData.total}
          </div>
        </td>
        <td className="flex-1 flex justify-around items-center w-full mt-3 text-black">
          <p className=" flex-1 text-center md:hidden block font-bold ">Qty : </p>
          <div className="flex-1">
            <input type="number" name="qty" value={tableData.quantity} className="w-10 cursor-pointer outline-none"
              onChange={(e)=>handleCartQtyChange(e,tableData.product._id)}
            />
          </div>

        </td>
        <td className="flex-1 flex justify-around items-center w-full mt-3 text-black">
          <p className=" flex-1 text-center md:hidden block font-bold ">Total : </p>
          <div className="flex items-center font-bold font-lg flex-1">
            <BiRupee size={26}/> {tableData.total*tableData.quantity}
          </div>
        </td>

        <td className="flex-1 flex justify-around items-center w-full mt-3 text-black" onClick={()=>handleDelete(tableData._id)}>
          <p className="block lg:hidden mx-5 cursor-pointer"><AiFillDelete size={28} color="red"/></p>
          <RiDeleteBack2Fill size={20} color="red" className="hidden lg:block" />
        </td>
      </tr>
    )
  }else{
    return ""
  }
}

export default CartRow
