"use client"
import React from 'react'
import { signIn, useSession } from "next-auth/react"
import { toast } from "react-toastify"
import { redirect, useRouter } from 'next/navigation'
function LoginPage() {
  const { data, status } = useSession();
  const [user, setUser] = React.useState({
    email: "",
    password: ""
  })
  const router = useRouter();
  const handleLoginUser = async (e: any) => {
    e.preventDefault();

    let result = await signIn("credentials", { ...user, redirect: false })
    // console.log(result)
    if (result?.error !== null) {
      toast.error(result?.error, {
        position: toast.POSITION.TOP_RIGHT
      })
    } else {
      return router.replace("/admin/dashboard")
    }

  }
  React.useEffect(() => {
    if (data?.user?.role != "user" && status === "authenticated") {
      router.replace("/admin/dashboard")
    }
  }, [data, status])
  return (
    <div>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-8 lg:text-3xl">Login</h2>

          <form className="mx-auto max-w-lg rounded-lg border" onSubmit={handleLoginUser}>
            <div className="flex flex-col gap-4 p-4 md:p-8">
              <div>
                <label htmlFor="email" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Email</label>
                <input value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} name="email" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 inline-block text-sm text-gray-800 sm:text-base">Password</label>
                <input type='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} name="password" className="w-full rounded border bg-gray-50 px-3 py-2 text-gray-800 outline-none ring-indigo-300 transition duration-100 focus:ring" />
              </div>

              <button className="block rounded-lg bg-gray-800 px-8 py-3 text-center text-sm font-semibold text-white outline-none ring-gray-300 transition duration-100 hover:bg-gray-700 focus-visible:ring active:bg-gray-600 md:text-base">Log in</button>

         
            </div>

            <div className="flex items-center justify-center bg-gray-100 p-4">
              {/* <p className="text-center text-sm text-gray-500">Don't have an account? <a href="#" className="text-indigo-500 transition duration-100 hover:text-indigo-600 active:text-indigo-700">Register</a></p> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage