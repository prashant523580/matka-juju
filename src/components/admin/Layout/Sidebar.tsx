"use client";
import React, { useEffect, useRef, useState } from 'react';
import SidebarLinkGroup from './SidebarLinkGroup';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import SidebarDropdown from './SidebarDropdown';

const navlink =
  [

    // {
    //   label: "Adminstration Control",
    //   children: [
    //     {
    //       label: "Dashboard",
    //       icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
    //       </svg>
    //       ,
    //       href: '/admin/dashboard'
    //     },
    //     {
    //       label: "Users",
    //       // href:'/admin/users',
    //       icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //         <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
    //       </svg>,
    //       children: [
    //         {
    //           label: "Users",
    //           href: "/admin/user/all",
    //           icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    //           </svg>
    //         },
    //         {
    //           label: "Add user",
    //           href: "/admin/user/add-user",
    //           icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    //             <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
    //           </svg>

    //         }
    //       ]
    //     }
    //   ]
    // },
    {
      label: "Dashboard",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 01-1.125-1.125v-3.75zM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-8.25zM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 01-1.125-1.125v-2.25z" />
      </svg>
      ,
      href: '/admin/dashboard'
    },
    {
      label: "Category",
      href: "/admin/category",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.098 19.902a3.75 3.75 0 005.304 0l6.401-6.402M6.75 21A3.75 3.75 0 013 17.25V4.125C3 3.504 3.504 3 4.125 3h5.25c.621 0 1.125.504 1.125 1.125v4.072M6.75 21a3.75 3.75 0 003.75-3.75V8.197M6.75 21h13.125c.621 0 1.125-.504 1.125-1.125v-5.25c0-.621-.504-1.125-1.125-1.125h-4.072M10.5 8.197l2.88-2.88c.438-.439 1.15-.439 1.59 0l3.712 3.713c.44.44.44 1.152 0 1.59l-2.879 2.88M6.75 17.25h.008v.008H6.75v-.008z" />
      </svg>

    },
    {
      label: "Product",
      href: "/admin/products",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>

    }
  ]

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {

  function ActiveLink({ children, href }: any) {
    const router = useRouter();
    const pathname = usePathname();


    const handleClick = (e: any) => {
      e.preventDefault()
      router.push(href)
      // console.log(pathname)
    }

    return (
      <a className={` ${pathname === href ? " bg-black text-white " : " text-black bg-none"}  group relative flex items-center capitalize rounded-sm py-2 px-4 font-medium    dark:text-gray-500 hover:text-white duration-300 ease-in-out hover:bg-black dark:hover:bg-meta-4`} href={href} onClick={handleClick} >
        {children}
      </a>
    )
  }

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded: any;

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    storedSidebarExpanded = localStorage.getItem('sidebar-expanded');
  }
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  );

  // close on click outside
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {

      const clickHandler = ({ target }: MouseEvent) => {
        if (!sidebar.current || !trigger.current) return;
        if (
          !sidebarOpen ||
          sidebar.current.contains(target) ||
          trigger.current.contains(target)
        )
          return;
        setSidebarOpen(false);
      };
      document.addEventListener('click', clickHandler);
      return () => document.removeEventListener('click', clickHandler);
    }

  });

  // close if the esc key is pressed
  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {

      const keyHandler = ({ keyCode }: KeyboardEvent) => {
        if (!sidebarOpen || keyCode !== 27) return;
        setSidebarOpen(false);
      };
      if (typeof window != "undefined") return
      document.addEventListener('keydown', keyHandler);
      return () => document.removeEventListener('keydown', keyHandler);
    }

  });

  useEffect(() => {
    if (typeof window !== "undefined" && typeof document !== "undefined") {

      localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
      if (sidebarExpanded) {
        document.querySelector('body')?.classList.add('sidebar-expanded');
      } else {
        document.querySelector('body')?.classList.remove('sidebar-expanded');
      }
    }
  }, [sidebarExpanded]);

  return (
    <>
      <aside
        ref={sidebar}
        className={`aside shadow-xl absolute left-0 top-0  flex h-screen w-72 flex-col overflow-y-auto overflow-x-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } z-10 space-y-2`}
      >

        <div className="flex items-center justify-between gap-2 dark:text-white px-4 py-5.5 lg:py-6.5 z-[99999] border-b  ">
          <Link href="/admin/dashboard">
            <h1 className='text-center font-extrabold text-2xl  py-16 '> Admin Panel </h1>
            {/* <Image height={150} width={250} priority src={"/images/print.jpg"} alt="Logo" /> */}
          </Link>

          <button
            ref={trigger}
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
            className="block lg:hidden"
          >
            <svg
              className="fill-current"
              width="20"
              height="18"
              viewBox="0 0 20 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
                fill=""
              />
            </svg>
          </button>
        </div>
        {
          navlink.map((nav: any, ind: number) => {

            return (
            <ActiveLink key={ind} href={nav.href}>
              {nav.icon}
              {nav.label}</ActiveLink>
            )
          })
        }

      </aside>
      <style jsx>
        {
          `
          .aside::-webkit-scrollbar{
              width:5px;
              height:5px;
              background: white;
          }
          .aside::-webkit-scrollbar-thumb{
            background: #813488;
          }
          `
        }
      </style>
    </>
  )
}

export default Sidebar;