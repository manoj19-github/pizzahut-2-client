import React,{useState,useRef,useEffect} from 'react'
import AdSideBar from "../../components/admin/AdSideBar"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import {useDispatch,useSelector} from "react-redux"
import {siteTypes} from "../../redux/types"
import TopNav from "../../components/admin/TopNav"
import Image from "next/image"
import {IoIosCloseCircleOutline} from "react-icons/io"
import {slideTypes} from "../../redux/types"
import {addSlide,delSlide} from "../../redux/actions/admin/slideAction"
import Swal from "sweetalert2"
const slides = ({slidesData}) => {
  const [selectedFile,setSelectedFile]=useState(null)
  const [fileData,setFileData]=useState(null)
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  useEffect(()=>{
    dispatch({type:slideTypes.GET_SLIDES_REQ})
  },[])
  console.log("slidesData",slidesData)
  useEffect(()=>{
    dispatch({type:slideTypes.GET_SLIDES_DATA,payload:slidesData})
  },[])
  const allSlide=useSelector(state=>state.slideReducer.slides)
  const slideLoading=useSelector(state=>state.slideReducer.loading)

  const inputRef=useRef()
  const dispatch=useDispatch()

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
  const removeSlide=(slideId)=>{
    console.log("manoj")
    Swal.fire({
     title: 'Are you sure?',
     text: "You won't be able to revert this!",
     icon: 'warning',
     showCancelButton: true,
     confirmButtonColor: '#3085d6',
     cancelButtonColor: '#d33',
     confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
     if (result.isConfirmed) {
       dispatch(delSlide(slideId))
     }
    })
  }
  const setNewSlide=(event)=>{
    console.log("file",event.target.files[0])
    setFileData(event.target.files[0])

    const inputFile=event.target.files[0]
    const reader=new FileReader()
    if(inputFile){
      reader.readAsDataURL(inputFile)
    }
    reader.addEventListener("load",(readerEvent)=>{
      setSelectedFile(readerEvent.target.result)
    })

    console.log("formData",fileData)

  }
  const uploadSlide=()=>{
    // if(!imageFile) return
    dispatch(addSlide(fileData))
    setSelectedFile(null)
  }
    return (
      <div className="flex  h-full ">
        <AdSideBar/>
        <div className="w-full  lg:w-[75vw] lg:ml-[22vw] mb-[10vh]  ">
          <TopNav/>

          <div className="flex   mt-3 mb-8 flex flex-col px-4 w-full md:w-[77%]  fixed top-10 right-4 z-[100] bg-white">
            <div className="flex justify-between items-center">
              <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
                <GiHamburgerMenu size={28} color="gray" className="cursor-pointer"/>
              </div>

              <button
                onClick={addNewSlide}
                className="btn hover:bg-[#d1411e] hover:text-white transition-all ease duration-500 mb-5">
                Add new Banners
              </button>
            </div>
            <form>
            <input
              type="file"
              ref={inputRef}
              onChange={setNewSlide}
              className="hidden"
            />
          </form>
            {
              selectedFile && (
                <div className="flex relative justify-center w-[70%] left-[25vw]  min-h-[65vh]  bg-white z-[350] items-center">
                  <Image src={selectedFile} layout="fill" objectFit="contain" className="absolute transition-all duration-500  cursor-pointer"/>
                  <IoIosCloseCircleOutline
                    onClick={()=>setSelectedFile(null)}
                    size={32} color="red" className={` transition-all
                      duration-500 cursor-pointer absolute top-2 right-5 hover:scale-150`}/>
                    <button
                      onClick={uploadSlide}
                       className="btn absolute z-[70] hover:bg-gray-600 bg-white transition-all duration-500 ease bottom-5 right-30"
                    >Upload</button>
                </div>
              )
            }

          </div>
          <div className="grid grid-cols-1 grid-cols-2 grid-flow-row auto-rows-max gap-y-4 w-full mt-[14vh] ">
            {
              !slideLoading && allSlide?.map((slide,index)=>(
                <div key={index} className=" relative min-h-[65vh] w-[90%] group flex justify-center items-center">
                  <Image src={`${slide.slideImage}`} layout="fill" className="absolute rounded-md transition-all duration-500 hover:opacity-50 cursor-pointer"/>
                  <IoIosCloseCircleOutline
                    onClick={()=>removeSlide(slide._id)}
                    size={32} color="red" className={` absolute top-0 right-0
                     cursor-pointer`}/>
                </div>

              ))
            }
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

export async function getServerSideProps({req}){
  try{
    const Cookie=req.headers.cookie|| ""
    const config={
      credentials:"include",
      headers:{
        Accept:"application/json",
        "Content-Type":"application/json",
        Cookie
      }
    }
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/slides`,config)
    const slidesData=await rawData.json()
    if(!slidesData.status){
      return{
        props:{
          dashboardData:null,
          slidesData:null
        }
      }
    }
    return{
        props:{
          slidesData:slidesData.slides
        }

    }

  }catch(err){
    console.log("error occured in dashboard",err)
  }
}
