import React, { Suspense } from 'react'
import Login from './LoginComponent'

function page() {
  return (
    <Suspense fallback={<p>Loading...</p>}><Login/></Suspense>
  )
}

export default page