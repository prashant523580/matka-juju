// // withAuthRedirect.js
// // "use client";
// import { getSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import { Suspense, useEffect } from 'react';

// const withAuthRedirect = (WrappedComponent :any, redirectTo = '/') => {
//   return (props :any) => {
//     const router = useRouter();
    
//     useEffect(() => {
//         const checkAuth = async () => {
//           const session = await getSession();

//         // If the user is not authenticated, redirect to the specified page
//         if (!session) {
//           router.replace(redirectTo);
//         }
//       };

//       checkAuth();
//     }, [router]);

//     return <Suspense fallback={<h1>Loading...</h1>}>

//         <WrappedComponent {...props} />
//     </Suspense>
//   };
// };

// export default withAuthRedirect;
