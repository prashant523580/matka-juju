import React from 'react'

function CustomModal({open,setOpen,children} : {open: boolean, setOpen: any, children:React.ReactNode}) {
  return (
    <div className={` ${open ? " translate-y-0 " : " translate-y-full -z-10"}  fixed z-[999999] top-0 left-0 right-0 bottom-0 bg-black bg-opacity-90 transition-all duration-300 overflow-y-auto p-4`}>
      <div className="absolute top-4 right-4 text-white font-bold cursor-pointer" onClick={() => setOpen(false)}>
        X
      </div>
      <div className="bg-white  p-8  rounded-md overflow-y-auto max-w-screen-lg mx-auto">

        {children}
      </div>
    </div>
  )
}

export default CustomModal