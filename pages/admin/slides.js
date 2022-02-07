import React,{useState,useRef} from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {useDispatch,useSelector} from "react-redux"
import {siteTypes} from "../../redux/types"
import TopNav from "../../components/admin/TopNav"
import Image from "next/image"
import {IoIosCloseCircleOutline} from "react-icons/io"
const slides = () => {
  const inputRef=useRef()
  const dispatch=useDispatch()
  const [selectedFile,setSelectedFile]=useState(null)
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }
  const addNewSlide=()=>{
    inputRef.current.click()
  }
  const setNewSlide=(e)=>{
    const inputFile=e.target.files[0]
    const reader=new FileReader()
    if(inputFile){
      reader.readAsDataURL(inputFile)
    }
    reader.addEventListener("load",(readerEvent)=>{
      setSelectedFile(readerEvent.target.result)
    })

  }
    return (
      <div className="flex  h-full ">
        <AdSideBar/>
        <div className="w-full  lg:w-[75vw] lg:ml-[22vw] mb-[10vh] h-[400vh] ">
          <TopNav/>
          <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
            <GiHamburgerMenu size={28} color="gray"/>
          </div>
          <div className="flex  mr-2 mt-3 mb-8 flex flex-col w-full  fixed top-10 right-4 z-[100] bg-white">
            <div className="flex justify-end items-center">
              <button
                onClick={addNewSlide}
                className="btn hover:bg-[#d1411e] hover:text-white transition-all ease duration-500 mb-5">
                Add new Slides
              </button>
            </div>
            <input
              type="file"
              className="hidden"
              ref={inputRef}
              accept='image/*'
              onChange={setNewSlide}
            />
            {
              selectedFile && (
                <div className="flex relative justify-center w-[70%] left-[25vw]  min-h-[65vh]  bg-white z-[350] items-center">
                  <Image src={selectedFile} layout="fill" objectFit="contain" className="absolute transition-all duration-500  cursor-pointer"/>
                  <IoIosCloseCircleOutline
                    onClick={()=>setSelectedFile(null)}
                    size={32} color="red" className={` transition-all
                      duration-500 cursor-pointer absolute top-2 right-5 hover:scale-150`}/>
                    <button className="btn absolute z-[70] hover:bg-gray-600 bg-white transition-all duration-500 ease bottom-5 right-30">
                      Upload
                    </button>
                </div>
              )
            }

          </div>
          <div className="grid grid-cols-1 grid-cols-2 grid-flow-row auto-rows-max gap-y-4 w-full mt-[14vh] ">
            <div className=" relative min-h-[65vh] w-[90%] group flex justify-center items-center">
              <Image src="/img/pizza.png" layout="fill" className="absolute transition-all duration-500 hover:opacity-50 cursor-pointer"/>
              <IoIosCloseCircleOutline size={32} color="red" className={`group-hover:block hidden transition-all
                duration-500 hover:opacity-70 cursor-pointer`}/>
            </div>
            <div className=" relative min-h-[65vh] w-[90%] group flex justify-center items-center">
              <Image src="/img/pizza.png" layout="fill" className="absolute transition-all duration-500 hover:opacity-50 cursor-pointer"/>
              <IoIosCloseCircleOutline size={32} color="red" className={`group-hover:block hidden transition-all
                duration-500 hover:opacity-70 cursor-pointer`}/>
            </div>
          </div>
        </div>

      </div>
    )
}

export default slides
slides.getLayout=function pageLayout(page){
  return(
    <>
    {page}
    </>
  )
}
