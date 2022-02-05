import React from 'react'
import Image from "next/image"
import {useRouter} from "next/router"
const Footer = () => {
  const Router=useRouter()
  const goToAdmin=()=>{
    Router.push("/auth/admin/login")
  }
    return (
        <div className="h-auto bg-[#222] flex">

          <div className="hidden flex-1 p-0 m-0 relative h-[111 vh] lg:flex ">
            <Image
              src="/img/bg.png"
              alt="footerimg"
              layout="fill"
            />
          </div>

        <div className="w-full lg:flex-1 flex flex-wrap flex-col  p-0 m-0 relative h-full mt-4 lg:mt-0 mx-4  ">
          <div className="text-[#d1411e] mx-auto">
            <h2 className="my-2 text-xl border-b border-white py-4 ">
              OH YES WE ARE THE PIZZA HUT , WELL BAKED SLICE OF PIZZA
            </h2>
          </div>
          <div className="flex-1 my-8  lg:mt-0 flex-wrap text-white flex flex-row  justofy-around   ">
            <div className="flex-1 mb-12 lg:mb-0 lg:text-sm">
            <h1 className=" text-lg text-gray-400 mt-2 mb-8 lg:mb-4  ">FIND OUR RESTURENTS</h1>
            <p className="mt-4">
              22, Camac Street Near Pantaloons Showroom,
              <br/>Kolkata,  India
              <br/>9051014938
            </p>
            <p className="mt-4">
              22, Camac Street Near Pantaloons Showroom,
              <br/>Kolkata,  India
                <br/>9051014938
            </p>
            <p className="mt-4">
              22, Camac Street Near Pantaloons Showroom,
              <br/>Kolkata,  India
                <br/>9051014938
            </p>
            <p className="mt-4">
              22, Camac Street Near Pantaloons Showroom,
              <br/>Kolkata,  India
                <br/>9051014938
            </p>
            <p className="mt-8 text-blue-600 text-sm cursor-pointer" onClick={goToAdmin}>
              Go to Admin Dashboard

            </p>
          </div>

          <div className="flex-1 mb-4 lg:mb-0 lg:text-sm">
            <h1 className="text-lg text-gray-400  mt-2 mb-8">WORKING HOURS</h1>
          <p className="">
            MONDAY TO FRIDAY
            <br/>9.00 am - 11.00 pm
          </p>
          <p className="">
            SATURDAY - SUNDAY
            <br/>11.00 am - 11.00 pm
          </p>

        </div>
      </div>
  </div>
</div>

    )
}

export default React.memo(Footer)
