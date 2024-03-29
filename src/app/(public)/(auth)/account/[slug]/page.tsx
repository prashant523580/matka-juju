"use client"
import { getUserById } from '@/controllers/user'
import Link from 'next/link';
import React from 'react'
import AccountProfileComponent from './AccountProfileComponent';
import AddressComponent from './AddressComponent';

 function AccountPage({ params }: {
  params: {
    slug: string
  }
}) {
  const [currentComponent,setCurrentComponent] = React.useState('profile');
  React.useEffect(() => {
  },[])
  return (
    <div>
      <div className="flex max-w-screen-xl mx-auto gap-2">
        <div className="w-1/6  bg-gray-400 px-2 py-1">
            <h2>Manage Account</h2>
          <div className="flex flex-col">

            <button onClick={() => setCurrentComponent("profile")}>Profile</button>
            <button onClick={() => setCurrentComponent("address")}>Address</button>
          </div>
        </div>
        <div className="w-5/6  bg-gray-400 px-2 py-1">
          {/* {JSON.stringify(user)} */}
          {
            currentComponent === 'profile' ?

            <AccountProfileComponent slug={params.slug}/>
            :
            <AddressComponent/>
          }

        </div>
      </div>
    </div>
  )
}

export default AccountPage