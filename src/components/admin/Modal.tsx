// "use client";
// import * as React from 'react';
// // import Box from '@mui/material/Box';
// // import Button from '@mui/material/Button';
// // import Modal from '@mui/material/Modal';
// const style = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: "60%",
//     bgcolor: 'background.paper',
//     // border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     height:"100vh",
//     overflowY:"scroll"
//   };
// const style2 = {
//     position: 'absolute' as 'absolute',
//     top: '50%',
//     left: '50%',
//     transform: 'translate(-50%, -50%)',
//     width: 500,
//     height:"100vh",
//     bgcolor: 'background.paper',
//     // border: '2px solid #000',
//     boxShadow: 24,
//     p: 4,
//     overflowY:"auto"
//   };
// export  function CustomModal({ setOpen, open, children }: any) {
//     //   const [open, setOpen] = React.useState(false);
//     //   const handleOpen = () => setOpen(true);
//     //   const handleClose = () => setOpen(false);
  
//     return (
//       <div>
//         <Modal
//           open={open}
//           onClose={() => setOpen(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
           
//               <div className="flex justify-between text-black my-2 dark:text-white">
//                 <h1 className='text-black'>Modal</h1>
//                 <button className="flex p-2 bg-meta-1 float-right text-black dark:text-white" onClick={() => setOpen(false)}>close</button>
//               </div>
//                 {children}
           
            
//           </Box>
//         </Modal>
//       </div>
//     );
//   }

//   export const CustomPreviewModal = ({ setOpen, open, children }: any) => {
//     //   const [open, setOpen] = React.useState(false);
//     //   const handleOpen = () => setOpen(true);
//     //   const handleClose = () => setOpen(false);
  
//     return (
//       <div>
//         <Modal
//           open={open}
//           onClose={() => setOpen(false)}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style2}>
           
//             {/* <div className="flex justify-center items-center overflow-y-auto"> */}
//                 {children}
           
//               {/* </div> */}
//           </Box>
//         </Modal>
//       </div>
//     );
//   }