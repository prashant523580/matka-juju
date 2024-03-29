'use client'
import React from 'react'
import ReactCarousel from "react-multi-carousel";

import "react-multi-carousel/lib/styles.css";

const responsive = {
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4
    },
    tablet: {

        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {

        breakpoint: { max: 464, min: 0 },
        items: 1
    }
}
function MultiCarousel({children}: any) {
  return (
   
    <ReactCarousel
    responsive={responsive}
    ssr
    showDots={false}
    slidesToSlide={2}
    containerClass='container-with-dots'
    itemClass='mx-2'
    deviceType=''
    centerMode={true}
    swipeable={true}
    className=''
// customLeftArrow={<> <h2>lefy</h2> </>}
>




    {

       children
    }


</ReactCarousel>
  )
}


export default MultiCarousel