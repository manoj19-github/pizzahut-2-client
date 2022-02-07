import {
  slideTypes
} from "../types"
const initState={
  slides:null,
  error:null,
  loading:false
}
export const slideReducer=(state=initState,action)=>{
  try{
    const {type,payload}=action
    switch(type){
      case slideTypes.GET_SLIDES_REQ:
        return{
          ...state,
          loading:true
        }
      case slideTypes.GET_SLIDES_DATA:
        return{
          ...state,
          slides:payload,
          loading:false
        }
      case slideTypes.ADD_SLIDE_SUCCESS:
      if(state.slides)
        return{
          ...state,
          slides:[...state.slides,payload]
        }
      return{
        ...state,
        slides:payload
      }
      case slideTypes.DEL_SLIDE_REQ:
        return{
          ...state,
          loading:true
        }
      case slideTypes.DEL_SLIDE_SUCCESS:
        const newSlide=state.slides.filter((slide,index)=>{
          return slide._id!=payload
        })
        return{
          ...state,
          slides:newSlide,
          loading:false
        }
      default:return state
    }
  }catch(err){
    console.log(`error in slideReducer`,err)
  }
}
