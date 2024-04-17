// import { getSession } from 'next-auth/react';
// import { redirect } from 'next/navigation';
import React from 'react'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css';

async function AdminLayout({children} : {children: React.ReactNode}) {
  // let session =await getSession()
  // if(session){
  //   redirect("/admin/dashboard")
  // }
  return (
    <>
        {/* <ToastContainer/> */}
        {children}
    </>
  )
}

export default AdminLayout