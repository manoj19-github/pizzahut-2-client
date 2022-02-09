import {slideTypes} from "../../types"
import axios from "axios"
import Swal from 'sweetalert2'
export const delSlide=(slideId)=>async (dispatch,getState)=>{
  try{

    const config={
      headers:{
        "Content-Type":"application/json",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,

      }
    }
    const payload={slideId}
    const {data}=await axios.post("/api/admin/dashboard/delSlide",payload,config)
    dispatch({type:slideTypes.DEL_SLIDE_SUCCESS,payload:data.slides._id})
    Swal.fire({
      icon: 'success',
      title: 'successfull',
      text: 'slide deleted',
    })
  }catch(err){
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
    })
    console.log("error in delSlide",err)
  }
}
export const addSlide=(fileData)=>async (dispatch,getState)=>{
  try{
    if(fileData==null) return
    const formData=new FormData()
    formData.append("slide",fileData)
    const {data}=await axios({
      method:"post",
      data:formData,
      url:"/api/admin/dashboard/addSlide",
      headers:{
        "Content-Type":"multipart/form-data",
        Authorization:`bearer ${getState().authReducer.userToken || ""}`,
      },
    })
    console.log("data status",data)
    if(data.status){
      dispatch({type:slideTypes.ADD_SLIDE_SUCCESS,payload:data.slide})
      Swal.fire({
        icon: 'success',
        title: 'successfull',
        text: 'new Slide added',
      })
    }else{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      })
    }
  }catch(err){
    console.log(`error in addSlide action`,err)
  }
}
