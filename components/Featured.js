import React,{useState,useRef} from 'react'
import Image from "next/image"
import {MdArrowBackIosNew,MdArrowForwardIos} from "react-icons/md"
import {banners} from "./banners"
import Carouesel from 'react-elastic-carousel';


const Featured = ({slidesData}) => {
  const  carouselRef=useRef(null)
  let resetTimeout;
  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 1200, itemsToShow: 1  }
  ];
  const myArrow=()=> {

      return <span></span>
  }
  const onNextStart=(currItem,nextItem)=>{
    if(currItem.index===nextItem.index){
      carouselRef.current.goTo(0)
    }
  }
  const onPrevStart=(currItem,nextItem)=>{
    if(currItem.index===nextItem.index){
      carouselRef.current.goTo(15)
    }
  }

  const onSlideChange=(direction)=>{
    if(direction==="l"){
      carouselRef.current.slidePrev()
    }
    if(direction==="r"){
      carouselRef.current.slideNext()
    }
  }
  const onNextEnd=({ index }) => {
    clearTimeout(resetTimeout)
    if (index + 1 === 14) {
      resetTimeout = setTimeout(() => {
        carouselRef.current.goTo(0)
        }, 1500)
      }
    }
    return (
        <div className="h-[88vh] relative bg-[#d1411e] overflow-hidden">
          <div className="arrow"

            onClick={()=>onSlideChange("l")}
            >
            <MdArrowBackIosNew size={36} color="#d1411e"/>

          </div>
          <div className="w-[100vw] h-auto flex p-0 m-0 transition-all duration-100 ease-in">
        <Carouesel
          ref={carouselRef}
          onNextEnd={onNextEnd}
          breakpoints={breakPoints}
          enableAutoPlay
          autoPlaySpeed={10000}
          disableArrowsOnEnd={true}
           renderArrow={myArrow}
           autoTabIndexVisibleItems={false}


        >
          {
            slidesData.map((item,index)=>(
                <img
                  src={item.slideImage}
                  alt="image"
                  key={index}
                  className="w-[100vw] h-[100vh] object-fill p-0 m-0"


                />

            ))
          }

        </Carouesel>
      </div>
        <div className="arrow" style={{right:0}}
          onClick={()=>onSlideChange("r")}
          >
            <MdArrowForwardIos size={36} color="#d1411e"/>
        </div>

      </div>
    )
}

export default Featured
