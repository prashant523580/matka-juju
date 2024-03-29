import Link from 'next/link'
import React from 'react'

function Card({data , link }:any) {
    // console.log(data)
    return (
        
            <Link href={link} className="group relative flex h-60 items-end overflow-hidden bg-gray-400 p-4 shadow-lg"
                data-aos="zoom-in" data-aos-duration="700"
            >
                {
                    data?.image?.src ? 
                    <img src={data?.image?.src} loading="lazy" alt="Photo by Austin Wade" className="absolute inset-0 h-full w-full object-cover object-center transition duration-200 group-hover:scale-110" />
                    : null
                }

                <div className="relative flex w-full flex-col bg-white p-4 text-center">
                    {/* <span className="text-gray-500">Men</span> */}
                    <span className="text-lg font-bold text-gray-800 lg:text-xl">{data.name}</span>
                </div>
            </Link>
        
    )
}

export default Card