"use client"
import React from 'react'
import Link from "next/link";
import Image from 'next/image';
import { fugazone } from './Fonts';
let getSearchData = async (str: string) => {
  try {
    let res = await fetch(`${process.env.NEXT_PUBLIC_API}/product?search=${str}`, {
      method: "GET",
      cache: "no-store",
    })
    return res.json();
  } catch (error) {
    console.log(error)
    return []
  }
}
function SearchComponent() {
    const [searchQuery, setSearchQuery] = React.useState<any>("");
    const [searchData, setSearchData] = React.useState<any>([]);
    const [isShowSearch, setIsShowSearch] = React.useState(false);
    const [loading, setLoading] = React.useState(true);
    const searchRef = React.useRef<any>(null);
    React.useEffect(() => {
      if (typeof window !== undefined) {
        window.addEventListener("click", (e) => {
          const target = e.target as HTMLElement;
          if (!searchRef?.current?.contains(target)) {
            setIsShowSearch(false)
          }
        })
      }
    }, [searchRef.current])
    const handleSearch = async (e: any) => {
        setIsShowSearch(true)
        setLoading(true)
        setSearchQuery(e.target.value)
        // router.push(`?search=${e.target.value}`);
        try {
          let data = await getSearchData(e.target.value)
          // console.log(data)
          setLoading(false)
          setSearchData(data)
        } catch (err) {
          setLoading(true)
        }
      }
  return (
    // <div ref={searchRef} className='relative w-3.5/6 sm:w-4/6 md:w-3/6 lg:w-2/6 lg:mx-auto'>
 <div ref={searchRef}   className="  mx-auto relative  ">

    <input role='search' aria-label='search' spellCheck={false} onChange={handleSearch} onFocus={handleSearch} type="search" value={searchQuery} className={ ` w-full outline-none bg-white  dark:text-black text-black border shadow-sm focus:shadow-lg px-2 py-2 ${isShowSearch ? " rounded-none " : " rounded-full "}  transition-all duration-300`} placeholder='Search....' />

    <div role='searchbox' aria-label='search-box' className={`absolute  dark:bg-gray-800 bg-white mt-0 flex flex-col left-0 right-0 ${isShowSearch ? "h-56 overflow-y-auto " : "h-0 overflow-hidden "} transition-all duration-300 z-30 shadow-xl `}>
          {
            loading ?
              <div className='flex justify-center items-center h-full'>
                <div className='loading w-10 h-10 rounded-full animate-spin border-b-4 border-r-4 border-t-4 border-l-4 border-t-gray-400 bg-gray-300 flex justify-center items-center'>
                  {/* <div className="h-5 w-5 bg-gray-600 border-t-2 border-b-2 border-l-2 rounded-full"></div> */}
                </div>
              </div>
              :
              searchData && searchData?.map((data: any, ind: number) => (
                <Link onClick={() => {setIsShowSearch(false);
                  setSearchQuery(data.name)
                }} role='link' aria-label='search-link' href={`/product/${data.slug}`} key={ind} className='py-2 px-2 capitalize font-semibold border-b hover:text-gray-800 hover:bg-gray-50 flex'>
                  <Image src={data.images[0].src} width={50} height={50} alt={data.name} />
                  <span className='text-gray-900 dark:text-gray-200 text-xs ml-2'>{data.name}</span>
                  {/* <div className="artists flex"> */}
                  
                    {/* <span className='text-xs text-gray-500'>{data.artistname.name}</span> */}
                  {/* </div> */}
                </Link>
              ))
          }
        </div>
    </div>
  )
}

export default SearchComponent