"use client"
// pages/auth/register.js

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { FaGoogle } from "react-icons/fa";

const Register = () => {
  const session = useSession();
  const router = useRouter();
    const googleSignIn =async () => {
        let result = await signIn('google',{callbackUrl:process.env.NEXTAUTH_URL});
        console.log(result)
        if(result?.ok){

          router.replace("/")
        }
    }
    if(session.status === "authenticated"){
            router.replace("/")
     }
    React.useEffect(() => {
      console.log(session.status)
    
    },[session.status])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    // Implement your registration logic here
    // Example: Create a new user in your database

    // After successful registration, sign in the user
    await signIn('credentials', { email, password, callbackUrl: '/' });

    // Redirect to the dashboard or another page after sign-in
    router.push('/');
  };

  return (
    <div>
   
                                    
<div className="relative py-16">
  <div className="container relative m-auto px-6 text-gray-500 md:px-12 xl:px-40">
    <div className="m-auto space-y-8 md:w-8/12 lg:w-6/12 xl:w-6/12">
      <div className="rounded-3xl border border-gray-100 bg-white dark:bg-gray-800 dark:border-gray-700 shadow-2xl shadow-gray-600/10 backdrop-blur-2xl">
        <div className="p-8 py-12 sm:p-16">
          <h2 className="mb-8 text-2xl font-bold text-gray-800 dark:text-white">Sign in to your account</h2>
          {/* <form action="" className="space-y-8">
            <div className="space-y-2">
              <label htmlFor="email" className="text-gray-600 dark:text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="username"
                className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="pwd" className="text-gray-600 dark:text-gray-300">Password</label>
                <button className="-mr-2 p-2" type="reset">
                  <span className="text-sm text-primary">Forgot your password ?</span>
                </button>
              </div>
              <input
                type="password"
                name="pwd"
                id="pwd"
                autoComplete="current-password"
                className="focus:outline-none block w-full rounded-md border border-gray-200 dark:border-gray-600 bg-transparent px-4 py-3 text-gray-600 transition duration-300 invalid:ring-2 invalid:ring-red-400 focus:ring-2 focus:ring-cyan-300"
              />
            </div>

            <button type="submit" className="relative flex h-11 w-full items-center justify-center px-6 before:absolute before:inset-0 before:rounded-full before:bg-primary before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95">
              <span className="relative text-base font-semibold text-white dark:text-dark">Connect</span>
            </button>

            <p className="border-t border-gray-100 dark:border-gray-700 pt-6 text-sm text-gray-500 dark:text-gray-400">
              Don't have an account ?
              <a href="#" className="text-primary">Sign up</a>
            </p>
          </form> */}
          <div className="mt-16 grid ">
            <button onClick={googleSignIn} className="group relative flex  items-center px-6 py-2 before:absolute before:inset-0 before:rounded-full before:bg-white dark:before:bg-gray-700 dark:before:border-gray-600 before:border before:border-gray-200 before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95 disabled:before:bg-gray-300 disabled:before:scale-100">
              <span className="w-full relative flex justify-center items-center gap-3 text-sm md:text-base font-medium text-gray-600 dark:text-gray-200">
               <FaGoogle/>
                <span>Continue with Google</span>
              </span>
            </button>
          
          </div>
        </div>
      </div>
      {/* <div className="space-x-4 text-center text-gray-500">
        <span>&copy; tailus</span>
        <a href="#" className="text-sm hover:text-primary">Contact</a>
        <a href="#" className="text-sm hover:text-primary">Privacy & Terms</a>
      </div> */}
    </div>
  </div>
</div>
    </div>
  );
};

export default Register;
