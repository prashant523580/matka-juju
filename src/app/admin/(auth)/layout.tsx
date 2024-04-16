import DashboardLayout from '@/components/admin/Layout/DashboardLayout'
import React from 'react'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/options'
import { redirect } from 'next/navigation';
import { signOut } from 'next-auth/react';
async function AdminLayout({children} : {children:React.ReactNode}) {
  const session = await getServerSession(authOptions);
  // if(!session){
  //   redirect("/api/auth/signin?callbackUrl=/admin/login")
  // }
  // console.log({session})
  if(session?.user?.role === "user"){
    // signOut()
    redirect("/")
  }
  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  )
}

export default AdminLayout