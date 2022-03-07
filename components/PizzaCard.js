import React from 'react'
import Image from "next/image"
import {BiRupee} from "react-icons/bi"
import {IoMdAdd} from "react-icons/io"
import {useRouter} from "next/router"
import Link from "next/link"
const PizzaCard = ({product}) => {
  const Router=useRouter()
  const clickHandler=()=>{
    Router.push(`/product/${product._id}`)
  }
    return (
        <Link href={`/product/${product._id}`} passHref>
        <div
          className="pizzaCart my-4 "
          style={{boxShadow:"0px 0px 3px 1px rgba(0,0,0,0.5),0px 0px 3px 1px rgba(0,0,0,0.5)"}}
          onClick={clickHandler}
        >
          <Image src={product.image} width="300" height="300" className="sm:my-3 lg:my-0"/>
        <h2 className="text-lg   font-bold text-[#d1411e] my-2">{product.name}</h2>
        <div className="my-2 flex w-full justify-evenly">
          <div className="font-bold text-[#666] flex items-center"><BiRupee size={20}   />{product.base_price.toFixed(2)}</div>
        <button className="priceBtn rounded-md flex items-center text-[#d1411e]">

          <IoMdAdd size={20} /> Add</button>
        </div>
          <p className="text-center text-[#777]">
              {product.details.slice(0,30)}
          </p>

        </div>
        </Link>
    )
}

export default PizzaCard
