import HeadTag from "../components/HeadTag"
import Featured from "../components/Featured"
import PizzaList from "../components/PizzaList"
import {useSelector,useDispatch} from "react-redux"
import {useEffect} from "react"
import {getAuthData} from "../redux/actions/auth"
import {clientProductTypes,authTypes} from "../redux/types"
import {useRouter} from "next/router"

export default function Home({data,slides}) {

  const Router=useRouter()
  const {query}=useRouter()
  const dispatch=useDispatch()
  const userToken=query?.token

  useEffect(()=>{
    if(userToken){
      document.cookie=`jwtToken=${userToken};expires=${1000*60*60*24}`
      dispatch({type:authTypes.GET_USER_TOKEN,payload:query.token})
      sessionStorage.
        setItem("pizzahut-user-token",
        JSON.stringify({userToken:query.token
      }))
    }

  },[userToken])

  useEffect(()=>{
    dispatch(getAuthData())
  },[userToken])

  useEffect(()=>{
    dispatch({type:clientProductTypes.GET_PRODUCTS_SUCCESS,payload:data?.products})
  },[])

  return (
    <div>
      <HeadTag headLine="PizzaHut"/>
      <Featured slidesData={slides}/>
      <PizzaList/>
    </div>
  )
}

export async function getStaticProps(){
  try{
    const config={
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              }
          }

    const aproducts=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/products`,config)
    const rawData=await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/slides`,config)
    const products=await aproducts.json()
    const slidesData=await rawData.json()
    return{
      props:{
        data:products,
        slides:slidesData.slides
      },
      revalidate:1000
    }

  }catch(err){
    console.log(`error occured`,err)

  }
}
