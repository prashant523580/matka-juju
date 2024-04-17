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
const Select = ({ handleStatusChange, orderId, order, status }: { handleStatusChange: any, orderId: string, order: any, status: any }) => {
    return (
        <select onChange={(e) => handleStatusChange(e, orderId)} value={status} name="status" >
            <option value="">-select-here-</option>
            {
                order?.orderStatus?.map((status: any, ind: number) => (
                    <option value={status.type} disabled={status?.isCompleted} key={status + "order"} className='flex items-center px-1'>
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
    )
}
function OrdersComponent() {
    const [orders, setOrders] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [userInfo, setUserInfo] = React.useState({
        userId: "",
        addressId: ""
    });
    const [modelType, setModelType] = React.useState("view");
    const [isPaid, setIsPaid] = React.useState(false);
    const [paymentStatus, setPaymentStatus] = React.useState("pending")
    const session = useSession();
    const [status, setStatus] = React.useState('');
    const [currentOrder, setCurrentOrder] = React.useState<any>({});
    const getOrders = async () => {
        const data = await get("/orders");
        console.log(data)
        setOrders(data)
    }
    React.useEffect(() => {
        getOrders()
    }, [])
    const handleStatusChange = async (e: any, orderID: any) => {
        setStatus(e.target.value)
        await post("orders", { type: e.target.value, order_Id: orderID }, session?.data?.token)
        getOrders()
    }
    const handlePaymentStatus = async (e: any, orderId: any) => {
        if( (paymentStatus == "paid" || paymentStatus == "cancelled" ||  paymentStatus == "pending"  || paymentStatus == "refund") ){

            setPaymentStatus(e.target.value)
            await update("orders", { status: e.target.value, order_Id: orderId }, session?.data?.token)
            getOrders()
        }

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
                    <Th colSpan={2}>Action</Th>
                </thead>
                <tbody className='text-xs'>
                    {
                        orders.length > 0 ?
                            orders.map((order: any, ind: number) => (
                                <tr key={order._id} className='border ' >


                                    <Td className='border text-center'>{ind + 1}</Td>
                                    <Td className='border'>#{order?.orderId}</Td>
                                    <Td> {order.user?.name}</Td>
                                    <Td className=' space-y-2  border w-36 '>

                                        {order?.orderStatus?.map((status: any, ind: number) => (
                                            <div key={ind} className='flex items-center px-1 flex-row'>
                                                {/* <div> */}
                                                {status.isCompleted ?
                                                    <span className='bg-green-400 w-2 p-1 rounded-full h-2'></span>
                                                    :
                                                    <span className='bg-gray-400 w-2     h-2 rounded-full'></span>}
                                                <span className='ml-0.5'>{status.type} </span>
                                                {/* </div> */}
                                            </div>
                                        ))}
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



                                    </Td>
                                    {/* <Td>{order?.addressId}</Td> */}
                                    <Td>Rs.{order.totalAmt}</Td>
                                    <Td>
                                        <button onClick={() => {
                                            setOpen(true)
                                            setModelType("edit")
                                            setUserInfo({
                                                addressId: order.addressId,
                                                userId: order.user._id
                                            })
                                            setCurrentOrder(order)
                                        }}>Edit</button>
                                    </Td>
                                    <Td >
                                        <button onClick={() => {
                                            setOpen(true)
                                            setModelType("view")
                                            setUserInfo({
                                                addressId: order.addressId,
                                                userId: order.user._id
                                            })
                                            setCurrentOrder(order)
                                        }}>View</button>
                                    </Td>
                                </tr>
                            ))
                            : <tr> <td><p>Loading</p></td> </tr>
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
                {
                    modelType == "edit" ?
                        <div className="edit">
                            <h2>Edit Order</h2>
                            <select className='p-1 cursor-pointer' onChange={(e) => handlePaymentStatus(e, currentOrder?._id)} value={paymentStatus}>
                               <option >--select-status--</option>
                                {
                                    ["cancelled", "pending", "refund", "paid"].map((paymentstat) => (
                                        <option key={paymentstat} >{paymentstat}</option>
                                    ))
                                }
                            </select>
                            <Select
                            handleStatusChange={handleStatusChange}
                            order={currentOrder}
                            orderId={currentOrder?._id}
                            status={status}
                            key={currentOrder?.id}
                            />
                        </div>
                        :

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
                }
            </CustomModal>
        </div>
    )
}

export default OrdersComponent