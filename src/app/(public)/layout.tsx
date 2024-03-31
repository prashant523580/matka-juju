import type { Metadata } from 'next'

import PageLayout from '@/components/layout/Layout'




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <>
      {/* <Header/>
    <Navbar/> */}

      <PageLayout>
        {children}
      </PageLayout>
      
    </>
  )
}
