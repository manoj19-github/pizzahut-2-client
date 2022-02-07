import React,{Fragment,useState} from 'react'
import {Formik,Form,Field,ErrorMessage,FieldArray} from "formik"
import * as Yup from "yup"
import {GrFormAdd} from "react-icons/gr"
import Image from "next/image"
import AdSidebar from "../../components/admin/AdSideBar"
import {useDispatch,useSelector} from "react-redux"
import {GiReceiveMoney,GiPayMoney,GiHamburgerMenu} from "react-icons/gi"
import TopNav from "../../components/admin/TopNav"
import {siteTypes} from "../../redux/types"
import {useRouter} from "next/router"
const addProduct = () => {
  const [selectedFile,setSelectedFile]=useState(null)
  const [fileData,setFileData]=useState(null)
  const dispatch=useDispatch()
  const Router=useRouter()
  const isAdminSidebarOpen=useSelector(state=>state.siteReducer.isAdminSidebarOpen)
  const toggleAdminSidebar=()=>{
    if(isAdminSidebarOpen){
      dispatch({type:siteTypes.HIDE_AD_SIDEBAR})
    }else{
      dispatch({type:siteTypes.DISPLAY_AD_SIDEBAR})
    }
  }


  const productSize=[
    {key:"Half",value:"half"},
    {key:"Small",value:"small"},
    {key:"Large",value:"large"}
  ]
  const checkExists=(index,push)=>{
    if(productSize.length>index+1){
      push({size:"",price:""})
    }else{
      alert("sorry you cant add more field")
    }

  }
  const editProduct={

  }
  const initFormData={
    name:"",
    base_price:"",
    sizes:[""],
    ingridients:[""]
  }
  const submitHandler=(values,onSubmitProps)=>{
    console.log("values",values)
    console.log(newProduct(values,fileData))
    onSubmitProps.resetForm()
    Router.push("/admin/product")
  }
  const changeEvent=(event)=>{
    setFileData(event.target.files[0])
    const reader=new FileReader()
    if(event.target.files[0]){
      reader.readAsDataURL(event.target.files[0])
    }
    reader.addEventListener("load",(readerEvent)=>{
      setSelectedFile(readerEvent.target.result)
    })
  }
  const validationSchema=Yup.object({
    name:Yup.string().min(6, 'Must minimum 6 digits')
      .max(20, 'Must be maximum 20 digits').required("productName is required"),
    base_price:Yup.number().positive("base price must be positive").required("base_price is required"),
    details:Yup.string().required("details Required"),

  })
    return (
      <div className="flex  w-full h-full ">
        <AdSidebar/>
        <div className="w-full w-[80vw] lg:ml-[22vw] mb-[10vh]  ">
            <TopNav/>
        <div className="block lg:hidden mb-4" onClick={toggleAdminSidebar}>
            <GiHamburgerMenu size={28} color="gray"/>
        </div>
        <div className="m-2 w-full  flex justify-between items-center  flex-wrap lg:flex-col">
          <div className="formContainer ">
            <Formik
              initialValues={editProduct||initFormData}
              validationSchema={validationSchema}
              onSubmit={submitHandler}
              enableReinitialize
            >
            {
              formik=>{
              return(
                <Form className="mx-1 w-[95%]">
                  <div className="formParentsGroup w-full">
                    <div className="childGroup w-full">
                      <label> Product Name</label>
                      <Field name="name" type='text'
                        className="formControl w-full"
                        />
                      <ErrorMessage name="name" >
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                    </div>
                    <div className="childGroup w-full">
                      <label>Base Price</label>
                      <Field name="base_price" type='text'
                          className="formControl w-full"
                      />
                      <ErrorMessage name="base_price">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="formParentsGroup mt-0 md:mt-2">
                  <div className="childGroup flex ">
                    <label>Product Size</label>
                    <FieldArray name="sizes">
                    {
                      FieldArrayProps=>{
                        const {push,remove,form}=FieldArrayProps
                        const {values}=form
                          const {sizes}=values
                        return(
                          <>
                            {
                              sizes && sizes.length >0 ?(
                              sizes.map((item,index)=>{

                                return(
                                <div key={index} >
                                  <div className="">
                                    <div className="sizes">

                                      <Field name={`sizes[${index}].size`} className="w-4 h-4 cursor-pointer mr-4"
                                         value={productSize[index].value} type="checkbox"/>
                                       <label htmlFor={productSize[index].value}>{productSize[index].key}</label>




                                    </div>
                                    <div  className="formGroup">
                                      <label className="mx-3">Price of sizes</label>
                                      <Field name={`sizes[${index}].price`} type="number" className="formControl"/>
                                    </div>
                                  </div>
                                  <div className="flex items-center ">
                                    <button type="button"
                                      onClick={()=>checkExists(index,push)} className="btn text-[#d1411e] mx-2"
                                    >
                                      Add</button>
                                    {
                                      index!==0?
                                      <button type="button" onClick={()=>remove(index)} className="btn mx-4">Remove</button>
                                      :null
                                    }
                                  </div>
                                </div>
                              )})
                            ):(
                            <>
                                <p className=" mt-2 md:ml-56 block lg:hidden text-gray-700 cursor-pointer " onClick={()=>push({size:"",price:""})}>Add</p>
                                <button type="button" onClick={()=>push({size:"",price:""})} className="firstBtn hidden lg:block md:ml-56" >Add</button>
                                </>
                            )

                            }
                          </>
                        )
                      }
                    }
                    </FieldArray>
                    </div>
                    <div className="childGroup my-12">
                     <label>Ingridients</label>
                     <FieldArray name="ingridients">
                     {
                       FieldArrayProps=>{
                         const {push,remove,form}=FieldArrayProps
                         const {values}=form
                           const {ingridients}=values
                         return(
                           <>
                             {
                               ingridients && ingridients.length >0 ?(
                               ingridients.map((item,index)=>(
                                 <div key={index} >
                                   <div>
                                     <div className="formGroup">
                                       <label className="mx-3">Name</label>
                                       <Field name={`ingridients[${index}].text`} type="text" className="formControl"/>
                                     </div>
                                     <div className="formGroup">
                                       <label className="mx-3">Price </label>
                                       <Field name={`ingridients[${index}].price`} type="number" className="formControl"/>
                                     </div>
                                   </div>
                                   <div>
                                     <button type="button" onClick={()=>push({text:"",price:""})} className="btn mr-4">Add</button>
                                     {
                                       index!==0?
                                       <button type="button" onClick={()=>remove(index)} className="btn mx-2">Remove</button>
                                       :null
                                     }
                                   </div>
                                 </div>
                               ))
                             ):(
                               <>
                                <p className=" mt-2 md:ml-56 block lg:hidden text-gray-700 cursor-pointer " onClick={()=>push({text:"",price:""})}>Add</p>
                                <button type="button" onClick={()=>push({text:"",price:""})}className="firstBtn hidden lg:block  md:ml-56 ">Add</button>
                              </>
                             )

                             }
                           </>
                         )
                       }
                     }
                     </FieldArray>
                     </div>
                  </div>
                  <div className="formGroup">
                      <label>Product Details</label>
                      <Field name="details">
                      {
                        ({field})=>{
                          return <textarea {...field} className="border-0 mt-3 border-b border-gray-700 min-w-[90%] outline-none"/>

                        }
                      }
                      </Field>
                      <ErrorMessage name="details">
                        {
                          errors=>{
                            return <span style={{color:"red"}}>{errors}</span>
                          }
                        }
                      </ErrorMessage>
                    </div>
                    <div className="formGroup ">
                      <label>Product Image</label>
                      <Field name="image" type="file" className="my-4" onChange={changeEvent} />
                      {
                        selectedFile &&(
                            <Image src={selectedFile} width="250" height="250"/>
                        )
                      }

                    </div>
                    <div className="flex justify-end">
                      <Field type="submit" value="submit"  className="btn hover:bg-[#d1411e] hover:text-white transition-all duration-100 ease-in mr-8 w-3/4 sm:w-auto sm:mr-0"/>
                    </div>





                </Form>
              )}
            }
            </Formik>
          </div>

        </div>
        </div>
      </div>
    )
}

export default addProduct

addProduct.getLayout=function PageLayout(page){
  return(
    <>
      {page}
    </>
  )
}
