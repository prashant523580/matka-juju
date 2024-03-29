"use client"
import React from 'react'
// import category from "@/libs/category.json";
import styles from "./nestednavbar.module.scss";
import Link from 'next/link';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/GlobalRedux/store';
function NestedNavbar() {
  // console.log(category[0])
  const [categories] = React.useState<any[]>([]);
  // const {category :{
  //   categories
  // }} = useSelector((state: RootState ) => state); 
  // console.log(categories)
  return (
    <div className={styles.nav}>
      {
        categories.map((cate: any, ind: any) => {
          return (
            <div key={ind} className={styles.cate}>
              <div className=" flex justify-between items-center font-extrabold py-1 text-xl cursor-pointer  ">

                <Link href={`/category/${cate.slug}`} >

                  <span className=' transition-all duration-500' >{cate.name}</span>
                </Link>
                <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                </span>
              </div>
              <div className={styles.catedropdown}>
                {
                  cate.children.map((subcate: any, ind: any) => (
                    <div className={styles.subcate} key={ind}>
                      <div className="div flex justify-between items-center font-bold px-2 py-1 text-lg cursor-pointer  transition-all duration-500">

                        <Link href={`/category/${cate.slug}/${subcate.slug}`} >

                          <span className=' transition-all duration-500' >{subcate.name}</span>
                        </Link>
                        <span><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                        </svg>
                        </span>
                      </div>

                      <div className={styles.subcatedropdown}>
                        {/* {
                          subcate.products.map((prod: any) => (
                            <div className="prodlist hover:ml-2 transition-all duration-500  font-bold px-2 py-1 text-lg cursor-pointer" key={prod.name}>
                              <Link href={`/product/${prod.name}`}>
                              {prod.name}
                              </Link>
                            </div>
                          ))
                        } */}
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default NestedNavbar