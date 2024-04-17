"use client"
import DashboardLayout from '@/components/admin/Layout/DashboardLayout'
import React from 'react'

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

 function AdminLayout({children} : {children:React.ReactNode}) {
  const session =  useSession();
 
  const router = useRouter();
  if(session?.data?.user?.role === "user"){

    router.replace("/")
  }
  return (
    <DashboardLayout>
        {children}
    </DashboardLayout>
  )
}

export default AdminLayout