"use client";
import * as React from 'react';
// import Header from '../components/Header';
import { useSession } from 'next-auth/react';
import {  useRouter } from 'next/navigation';
import Sidebar from './Sidebar';
import Header from './Header';
// import { ToastContainer } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { GetInitialData } from '@/GlobalRedux/actions/initial.action';
// import { useDispatch } from 'react-redux';
// import { getAllUser } from '@/GlobalRedux/actions/user.action';
// import { getAllCategory } from '@/GlobalRedux/actions/category.action';
// import Loading from '@/components/Loading';
// import { GetInitialData } from '@/GlobalRedux/actions/initial.action';


// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/app/api/auth/[...nextauth]/route';

interface DefaultLayoutProps {
  children: React.ReactNode
}

const DashboardLayout = ({ children }: DefaultLayoutProps) => {
  // const dispatch = useDispatch<any>();
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
  const session = useSession();
  const router = useRouter();

  // React.useEffect(() => {
  //   // console.log(status,data)
  //   // dispatch(getAllUser());
  //   // // dispatch(getAllCategory())
  //   dispatch(GetInitialData())

  // },[dispatch])

  if (session?.status === "loading") {
    // return <Loading/>
    return (
      <h1 className='h-[100vh] '>Loading...</h1>
    )
  }
  if (session?.status == "unauthenticated" || session?.data?.user?.role == "user" ) {

     router.replace("/");
  } 
  //  console.log(data?.user?.role)

  return (
    <>
      {/*<ToastContainer/>*/}
      <div className="dark:bg-boxdark-2 bg-white dark:text-bodydark">
        {/* <!-- ===== Page Wrapper Start ===== --> */}
        <div className="flex h-screen overflow-hidden">
          {/* <!-- ===== Sidebar Start ===== --> */}
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          {/* <!-- ===== Sidebar End ===== --> */}

          {/* <!-- ===== Content Area Start ===== --> */}
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            {/* <!-- ===== Header Start ===== --> */}
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            {/* <!-- ===== Header End ===== --> */}

            {/* <!-- ===== Main Content Start ===== --> */}
            <main className=''>
              <div className="mx-auto bg-white dark:bg-black w-full p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
            {/* <!-- ===== Main Content End ===== --> */}
          </div>
          {/* <!-- ===== Content Area End ===== --> */}
        </div>
        {/* <!-- ===== Page Wrapper End ===== --> */}
      </div>
    </>
  );

};

export default DashboardLayout;
