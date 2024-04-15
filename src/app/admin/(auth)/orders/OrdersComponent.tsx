"use client"
import CustomModal from '@/components/Modal'
import { get, post, update } from '@/libs/fetch'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React from 'react'

const Td = ({ children, className }: { children: any, className?: string }) => (
    <td className='p-2 m-2 border border-spacing-4 '>{children}</td>
)
const Th = ({ children, className, colSpan }: { children: any, className?: string, colSpan?: any }) => (
    <th className='p-2 m-2 border border-spacing-4 ' colSpan={colSpan} >{children}</th>
)
function OrdersComponent() {
    const [orders, setOrders] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        userId: "",
        addressId: ""
    });
    const [isPaid, setIsPaid] = React.useState(false);
    const [paymentStatus,setPaymentStatus] = React.useState("pending")
    const session = useSession();
    const [status,setStatus] = React.useState('');
    const [currentOrder, setCurrentOrder] = React.useState<any>({});
    const getOrders = async () => {
        const data = await get("/orders");
        console.log(data)
        setOrders(data)
    }
    React.useEffect(() => {
        getOrders()
    }, [])
    const handleStatusChange = async (e : any , orderID : any) => {
            setStatus(e.target.value)
            await post("orders", {type : e.target.value , order_Id : orderID } , session?.data?.token)
            getOrders()
    }
    const handlePaymentStatus =async (e : any , orderId : any) =>{
        setPaymentStatus(e.target.value)
        await update("orders", { status: e.target.value , order_Id : orderId } , session?.data?.token)
        getOrders()
        
    }  
    return (

        <div className='overflow-x-auto'>
            <table border={2} className='overflow-x-auto w-10/12 mx-auto'>
                <thead className='border border-spacing-3'>
                    <Th>S.N.</Th>
                    <Th>Id</Th>
                    <Th>Name</Th>
                    <Th>Status</Th>
                    <Th>Order</Th>
                    <Th>Products</Th>
                    <Th>Payment Method</Th>
                    <Th>Total Amount</Th>
                    <Th colSpan={1}>Action</Th>
                </thead>
                <tbody className='text-xs'>
                    {
                        orders.length > 0 ?
                            orders.map((order: any, ind: number) => (
                                <tr key={ind} className='border ' >


                                    <Td className='border text-center'>{ind + 1}</Td>
                                    <Td className='border'>#{order?.orderId}</Td>
                                    <Td> {order.user?.name}</Td>
                                    <Td className=' space-y-2  border '>

                                        <select onChange={ (e) =>  handleStatusChange(e,order?._id)} value={status} name="status" >
                                            <option value="">-select-here-</option>
                                            {
                                                order?.orderStatus?.map((status: any, ind: number) => (
                                                    <option value={status.type} disabled={status?.isCompleted} key={ind} className='flex items-center px-1'>
                                                        {/* <div> */}

                                                        {status.isCompleted ?
                                                            <span className='bg-green-400 w-2 p-1 rounded-full h-2'></span>
                                                            :
                                                            <span className='bg-gray-400 w-2     h-2 rounded-full'></span>}
                                                        <p>-{status.type} </p>
                                                        {/* </div> */}
                                                    </option>
                                                ))}
                                        </select>
                                    </Td>
                                    <Td>{order?.order ? order?.order : "pending"}</Td>
                                    <Td className='border'>
                                        {
                                            order?.items?.map((item: any, ind: number) => (
                                                <div key={item._id}>
                                                    -{item?.productId?.name}
                                                </div>
                                            ))
                                        }
                                    </Td>
                                    <Td>
                                        <span className='uppercase'> {order.paymentType}</span> |
                                                <span>{order?.paymentStatus}</span>
                                               
                                        <select className='p-1 cursor-pointer' onChange={ (e) => handlePaymentStatus(e,order._id)} value={paymentStatus}>
                                            {
                                                ["cancelled", "pending", "refund", "paid"].map((paymentstat) => (
                                                    <option key={paymentstat} >{paymentstat}</option>
                                                ))
                                            }
                                        </select>

                                    </Td>
                                    {/* <Td>{order?.addressId}</Td> */}
                                    <Td>Rs.{order.totalAmt}</Td>
                                    {/* <Td>edit</Td> */}
                                    <Td >
                                        <button onClick={() => {
                                            setOpen(true)
                                            setUserInfo({
                                                addressId: order.addressId,
                                                userId: order.user._id
                                            })
                                            setCurrentOrder(order)
                                        }}>view</button>
                                    </Td>
                                </tr>
                            ))
                            : <p>Loading</p>
                    }
                </tbody>
            </table>
            <CustomModal
                setOpen={setOpen}
                open={open}
            >
                <div className="buttons">
                    <button onClick={() => {
                        setOpen(false)

                    }}>close</button>
                </div>
                <div className="details">
                    <div className="head p-2 grid grid-cols-2">

                        <h2 className='font-bold text-3xl'>{currentOrder?.user?.name}</h2>
                        <p>Order ID : <strong>#{currentOrder?.orderId}</strong></p>
                        <p>Payment Status : {currentOrder?.paymentStatus}</p>
                        <p>Payment Type : {currentOrder?.paymentType}</p>
                        {/* <p>Total Amount : Rs.{currentOrder?.totalAmt}</p> */}
                    </div>
                    <div className="grid grid-cols-2">
                        <div className="address p-4">

                            <h2 className="font-bold text-2xl">Delivery Address</h2>
                            <address>
                                {currentOrder?.address?.name} <br />
                                {currentOrder?.address?.email} <br />
                                {currentOrder?.address?.phone} <br />
                                {currentOrder?.address?.street} <br />
                                {currentOrder?.address?.city} <br />
                                {currentOrder?.address?.state}
                            </address>
                        </div>
                        <div className="status p-4">
                        <h2 className="font-bold text-2xl">Status</h2>

                            {currentOrder?.orderStatus?.map((status: any, ind: number) => (
                                <div key={ind} className='flex items-center px-1'>
                                    {/* <div> */}
                                    {status.isCompleted ?
                                        <span className='bg-green-400 w-2 p-1 rounded-full h-2'></span>
                                        :
                                        <span className='bg-gray-400 w-2     h-2 rounded-full'></span>}
                                    <p>-{status.type} </p>
                                    {/* </div> */}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="items p-4">
                        <h2 className="font-bold text-2xl">Products</h2>

                        <div className="items p-2  grid grid-cols-3">
                            {
                                currentOrder?.items?.map((item: any, ind: number) => (
                                    <div key={item._id}>
                                        <Image src={item?.productId?.images[0].src} width={100} height={100} alt={'item ' + ind} />
                                        -{item?.productId?.name} <br />
                                        {/* -{item?.productId?.price} */}
                                        -Rs.{item?.payablePrice}<br />
                                        -{item?.purchasedQuantity}

                                    </div>
                                ))
                            }

                        </div>
                        <p>Total Amount : Rs.{currentOrder?.totalAmt}</p>
                    </div>

                </div>
            </CustomModal>
        </div>
    )
}

export default OrdersComponent