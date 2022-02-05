import React from 'react'
import PizzaCard from "./PizzaCard"
import {useSelector,useDispatch} from "react-redux"
const PizzaList = () => {
  const products=useSelector(state=>state.clientProductReducer.products)
    return (
        <div className="mx-4 md:py-10 sm:px-8 flex-col flex-wrap items-center max-h-full md:flex-row md:flex-wrap sm:flex-col sm:items-center sm:justify-center">
          <h1 className="text-center font-['Raleway'] text-2xl text-[#d1411e]">THE BEST PIZZA IN INDIA</h1>
          <p className="text-lg text-gray-500 w-full mb-4 text-center">
          world best pizza is here for you and you can missed you
          </p>
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 grid-flow-row auto-rows-[minmax(17rem,auto)] gap-2.5 h-full w-full  justify-between">
            {
              products?.map((product,index)=>(
                <PizzaCard key={index} product={product}/>

              ))
            }
          </div>
        </div>
    )
}

export default PizzaList
