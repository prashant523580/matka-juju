"use client"
import React from 'react'
// import category from "@/libs/category.json";
import styles from "./navbar.module.scss";
import Link from 'next/link';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/GlobalRedux/store';
import { usePathname, useRouter } from 'next/navigation';

import { fugazone, rubikvinyl } from '../Fonts';
import Carts from '../Cart';
import { useSession } from 'next-auth/react';
import { authGet } from '@/libs/fetch';
import { useCart } from '@/Context/cartContext';
import Image from 'next/image';
import { IoIosMenu } from 'react-icons/io';
function Navbar() {
  // console.log(category[0])
  // const {category :{
  //   categories
  // }} = useSelector((state : RootState ) => state); 

  const ulRef = React.useRef<any>(null);
  const [IsShowMenu, setIsShowMenu] = React.useState(false);
  const [IsShowCategoryMenu, setIsShowCategoryMenu] = React.useState(false);
  const searchRef = React.useRef<any>();
  const router = useRouter();
  const pathname = usePathname();
  const scrollIndicatorRef = React.useRef<any>(null);
  const [showNav, setShowNav] = React.useState(true);
  const [scrolled, setScrolled] = React.useState(0);
  const [categories] = React.useState<any[]>([]);
  const [openCart, setOpenCart] = React.useState(false);
  let session = useSession();
  // const [carts,setCarts] = React.useState<any[]>([]);
  const { cart } = useCart();
  function ActiveLink({ children, href }: any) {



    const handleClick = (e: any) => {
      e.preventDefault()
      router.push(href)
      // console.log(pathname)
    }

    return (

      <Link className={` `} href={href} onClick={handleClick} >
        {children}
      </Link>
    )
  }
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("click", (e) => {
        if (ulRef.current) {
          // console.log(true)
          if ((!ulRef.current || !ulRef.current.contains(e.target as HTMLElement))) {
            // console.log(true, e.target)
            setIsShowCategoryMenu(false)
            setIsShowMenu(false)
          }
        }
        // if (ulCategoryRef.current) {
        //   // console.log(true)
        //   if ((!ulCategoryRef.current || !ulCategoryRef.current.contains(e.target as HTMLElement))) {
        //     // console.log(true, e.target)
        //     setIsShowCategoryMenu(false)
        //     // setIsShowMenu(false)
        //   }
        // }
        if (searchRef.current) {

          if (!searchRef.current || !searchRef.current.contains(e.target as HTMLElement)) {
            // console.log(e.target)
            // console.log(true)
            // setIsShowSearch(false)
          }
        }
      })
    }
  }, [])
  React.useEffect(() => {
    if (typeof window !== undefined) {
      let previousScroll = window.pageYOffset;
      window.addEventListener("scroll", () => {
        // this.setState({
        //     scroll: window.pageYOffset
        // })
        let currentScroll = window.pageYOffset;
        setScrolled(currentScroll)
        let windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        let scrolled = (windowScroll / height) * 100;
        if (scrollIndicatorRef?.current !== null) {

          scrollIndicatorRef.current.style.width = `${scrolled}%`
        }
        if (previousScroll > currentScroll) {
          setShowNav(true)
        } else {
          setShowNav(false)
        }
        previousScroll = currentScroll
      })
    }
  }, [])
  const className = `relative  group  group-hover:text-white  overflow  text-2xl text-black  hover:text-orange duration-200 ease-in-out  lg:hidden block`
  return (
    <>
      <nav
        style={{
          // background: specifiedColor !== "" ? specifiedColor : ' black ',
          transition: "all .4s ease"
        }}
        ref={ulRef}
        className={` bg-white px-2 py-3 lg:p-8 flex justify-between w-full  items-center sticky top-0 z-10 left-0  border-b  `}
      >
        <div className="links hidden md:flex  space-x-2">
          <Link role='link' aria-label='Home' href={"/"}>Home</Link>
          <Link role='link' aria-label='Products' href={"/products"}>Products</Link>
        </div>
       
        {/* <span className={`absolute text-white p-1 -z-10   bg-graydark transition-all duration-1000  ${scrolled > 100 ? " opacity-100 translate-x-0 " : " -translate-x-full opacity-0 "} -bottom-8  whitespace-nowrap  bg-opacity-90 `}>{getNepaliDate(Date.now())}</span> */}

        {/* media category start */}
        <Link role='link' aria-label='Logo Image' href={"/"} className={" absolute left-[50%] translate-x-[-50%] uppercase text-lg font-bold md:text-2xl lg:text-3xl text-black text-center  "}>
       
          <Image src={"/logo.png"} alt='Matka JUJU ' width={120} height={40} />
        </Link>

        {/* media category end */}
        {/* other category start */}
        <div className='md:hidden  flex relative items-center justify-center'>
          {/* <Link href={"/"}
              className={`${scrolled > 100 ? " w-30 " : " w-0 overflow-hidden "} transition-all duration-700 flex justify-center items-center`}
            >
              <h1 className='font-bold uppercase whitespace-nowrap text-white'>Website Name</h1>
              <Image
                 className={` ${scrolled > 100 ? "  " : "  "}  transition-all duration-700 `}
                 src="/icons/favicon.ico" width={40} height={40} alt='khabar logo' />
            </Link> */}
         
          <button aria-label='menu' className='md:hidden flex justify-center items-center' onClick={() => setIsShowMenu(true)}>
            <IoIosMenu className="font-bold text-3xl" />

          </button>

        
        </div>
        <div className="flex items-center">
        <div className="links hidden md:flex items-center   space-x-2 mr-1">
            <Link role='link' aria-label='About' href={"/pages/about"}>About</Link>
            <Link role='link' aria-label='Contact' href={"/pages/contact"}>Contact</Link>
          </div>
          <ul

            className={ ` uppercase navlist duration-500 md:bg-transparent md:dark:bg-transparent bg-white dark:bg-black  md:flex  justify-center items-center transition-transform  md:flex-row w-10/12 md:w-4/12 p-4 lg:p-0 lg:w-auto lg:translate-x-0   ${IsShowMenu ? "  translate-x-0 overflow-y-auto " : " -translate-x-full "} flex-col lg:relative lg:h-auto h-screen fixed left-0 top-0 shadow-1   dark:shadow-black lg:shadow-none lg:bg-none z-[9999] md:hidden block  `}

          >

            <li className='relative flex justify-center items-center border-b md:hidden  h-32'>
              <Link className='md:hidden block font-bold uppercase text-lg  ' href={"/"}>
                <Image src={"/logo.png"} width={120} height={50} alt='Matka juju Logo' />
              </Link>
              {/* <Image className='mx-auto' src={"/images/cover/khabarpati.png"} width={250} height={150} alt='khabarpati' /> */}
              <span className='absolute top-2 right-2 cursor-pointer  ' onClick={() => setIsShowMenu(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </span>
            </li>
            <li className={className}>
              <Link href={"/"} className="flex justify-start items-center">

                Home
              </Link>
            </li>
            <li className={className}>
              <Link href={"/products"} className="flex justify-start items-center">

                products
              </Link>
            </li>
            <li className={className}>
              <Link href={"/pages/about"} className="flex justify-start items-center">

                About
              </Link>
            </li>
            <li className={className}>
              <Link href={"/pages/contact"} className="flex justify-start items-center">

                Contact
              </Link>
            </li>


          </ul>
          <button onClick={() => setOpenCart(!openCart)} className='relative mr-2'>
            <span className='absolute w-5 h-5 -right-2 -top-1 bg-gray-500 text-white flex justify-center items-center text-xs rounded-full'>
              {cart?.length ? cart?.length : "0"}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>

          </button>
        </div>
        {/* other category  end*/}
      </nav >
      <Carts open={openCart} setOpen={setOpenCart} />
    </>
  )
}

export default Navbar