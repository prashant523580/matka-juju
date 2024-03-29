"use client"
import React from 'react'
import AddressForm from './AddessForm'
// import CheckoutComponent, { Address } from './CheckoutComponent'
// import ContactMailIcon from '@mui/icons-material/ContactMail';
// import Button from '@mui/material/Button';
// import RemoveIcon from '@mui/icons-material/Remove';
// import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { GiTakeMyMoney } from "react-icons/gi";
import { MdVerifiedUser, MdOutlineRateReview } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import { useCart } from '@/Context/cartContext';
import { useSession } from 'next-auth/react';
import { authGet, post } from '@/libs/fetch';
import { calculateDiscountedPrice } from '@/libs/calculator';
import { useOrder } from '@/Context/orderContext';
// import { generateImgUrl } from '../helpers/urlConfig';
export default function Checkout() {
    const router = useRouter();
    const [addresses, setAddresses] = React.useState<any>([]);
    const [newAddress, setNewAddress] = React.useState(false);
    const [selectedAddress, setSelectedAddress] = React.useState<any>();
    const [confirmAddress, setConfirmAddress] = React.useState<boolean>(false);
    const [confirmOrder, setConfirmOrder] = React.useState<boolean>(false);
    const [paymentMethod, setPaymentMethod] = React.useState<any>("COD");
    // const [address, setAddress] = React.useState({
    //     fullname: "",
    //     email: "",
    //     phone: "",
    //     city: "",
    //     street: ''
    // });
    const { data, status } = useSession();
    const [user, setUser] = React.useState<any>({
        email: "",
        password: ""
    })
    const { cart, getCarts, cartDecrement, updateAddress, getAddresses,subTotal, userAddresses, cartIncrement } = useCart();
    const { getOrders } = useOrder();
    // const getAddresses = async () => {
    //     let address = await authGet("address", data?.token);
    //     updateAddress(address)
    // }

    React.useEffect(() => {

        if (userAddresses?.length > 0) {

            let addresss = userAddresses?.map((adr: any) => ({
                ...adr, selected: false, edit: false
            }))
            setAddresses(addresss)
        }
    }, [userAddresses])


    const submitOrder = async () => {
        setConfirmOrder(true)
    }

    const onAddressSubmit = (addr: any) => {
        console.log(addr)
        setNewAddress(false)
        // setSelectedAddress(addr);
        // setConfirmAddress(true);
        // setOrderSummery(true);
    }
    const handleSelectedAddress = (addr: any) => {
        // setSelectedAddress(adr);
        const updateaddress: any = addresses.map((adr: any) =>
            adr._id === addr._id ?
                { ...adr, selected: true } : { ...adr, selected: false }
        )
        setAddresses(updateaddress);
    }
    const enableAddressEditForm = (addr: any) => {
        const updatedAddress = addresses.map((adr: any) =>
            adr._id === addr._id ? { ...adr, edit: true } : { ...adr, edit: false }
        )
        setAddresses(updatedAddress)
     
    }
    const confirmDeliveryAddress = (addr: any) => {
        setSelectedAddress(addr);
        setConfirmAddress(true);
        // setOrderSummery(true);
        // setOrderConfirmation(true)
    }

    const submitCOD = async () => {
        let orders = {
            address: selectedAddress._id,
            products: cart,
            amount: subTotal,
            paymentMethod: paymentMethod,
            orderId: Math.floor(Math.random() * Date.now())
        }
        // console.log(orders)
        // console.log(cart)
        //    const totalAmt = Object.keys(cart.cartItems).reduce((totalPrice,key) => {
        //     return totalPrice + cart.cartItems[key].qty * cart.cartItems[key].price
        // },0);
        const totalAmt = cart.reduce((totalPrice, crt) => {

            // console.log({totalPrice,key: crt.product})
            return totalPrice + crt.quantity * Number(calculateDiscountedPrice(crt.product.price, crt.product.discount).discountedPrice)
        }, 0)

        const items = cart.map((crt) => ({
            productId: crt.product._id,
            payablePrice: Number(calculateDiscountedPrice(crt.product.price, crt.product.discount).discountedPrice),
            purchasedQuantity: crt.quantity
        }))
        // console.log(items)


        const payload = {
            addressId: selectedAddress._id,
            totalAmt,
            items,
            paymentStatus: "pending",
            paymentType: "cod",
            orderId: Math.floor(Math.random() * Date.now())
        }
        // console.log(payload)
        // dispatch(addOrder(payload));
        // props.history.push("/account/orders")
        const resData: any = await post("order", payload, data?.token)
        if (resData.success) {
            toast.success(resData.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            getCarts()
            getOrders()
            router.push("/order-complete")
            // props.clearCart()
        } else if (resData.success === false) {
            // props.clearCart()
            toast.error(resData.message, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    // var path= process.env.NEXT_PUBLIC_EPAY;
    // var params= {
    //     amt: 200,
    //     psc: 0,
    //     pdc: 0,
    //     txAmt: 0,
    //     tAmt: 200,
    //     pid: process.env.NEXT_PUBLIC_PID,
    //     scd: "EPAYTEST",
    //     su: `${dev ? DEV_URL : PROD_URL}/esewa/success?q=su`,
    //     fu: `${dev ? DEV_URL : PROD_URL}/esewa/failure?q=su`
    // }

    function poste(path: any, params: any) {
        console.log(path, params)
        var form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", path);

        for (var key in params) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", params[key]);
            form.appendChild(hiddenField);
        }

        document.body.appendChild(form);
        form.submit();
    }
    const loggedIn = async () => {
        // e.preventDefault()
        console.log(user)
        let res = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        })
        let data = await res.json()
        if (data.success) {
            toast.success(data.success, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setUser({ email: "", password: "" })
            window.location.reload();
            localStorage.setItem("user", JSON.stringify(data.user));
            localStorage.setItem("token", JSON.stringify(data.token));
        } else {
            toast.error(data.error, {
                position: "bottom-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setUser({ email: "", password: "" })
        }

    }


    return (
        <section className="text-gray-600 body-font py-16">
            {/* <h1>Checkout</h1> */}
            <div className="container px-2 mx-auto flex flex-wrap flex-col">
                <CheckoutComponent

                    icon={<MdVerifiedUser className={``} />}
                    step={<h1>Step 1: User Info</h1>}
                    active={status === "authenticated"}
                >
                    {/* <!-- component --> */}
                    {
                        status === "authenticated" ? <h1>
                            {data?.user?.name}
                        </h1>
                            :
                            <div className="flex items-center  justify-center">

                                <div className=" flex-col border bg-white px-6 py-6 shadow-md rounded-[4px] ">

                                    {/* <div className="flex flex-col text-sm rounded-md">
                                        <input value={user.email} onChange={inputEvent} name='email' className="mb-5 rounded-[4px] border p-3 hover:outline-none focus:outline-none hover:border-yellow-500 " type="text" placeholder="Username or Email id" />
                                        <input onChange={inputEvent} name='password' className="border rounded-[4px] p-3 hover:outline-none focus:outline-none hover:border-yellow-500" type="password" placeholder="Password" />
                                    </div> */}
                                    <button onClick={loggedIn} className="mt-5 w-full border p-2 bg-gradient-to-r from-gray-800 bg-gray-500 text-white rounded-[4px] hover:bg-slate-400 scale-105 duration-300" type="submit">Sign in</button>

                                </div>
                            </div>

                    }
                </CheckoutComponent>
                <CheckoutComponent
                    icon={<FaRegAddressCard />}
                    step={<h1>Step 2: Delivery Address</h1>}
                    active={confirmAddress && status === "authenticated"}

                >
                    {confirmAddress == false &&
                        <button onClick={() => setNewAddress(!newAddress)} className='bg-blue-500 text-white p-2'> {!newAddress ? "Add " : "cancle"} </button>
                    }

                    <div className="address-container">
                        <div className={`address-body grid grid-cols-2 gap-2  md:grid-cols-3`}>
                            {confirmAddress ? (
                                <div className='col-span-full px-4 py-2'>

                                    <div className='flex flex-col text-base'>

                                        <span>Name : {selectedAddress?.name} </span>
                                        <span>Phone : {selectedAddress?.phone} </span>
                                        <span>State : {selectedAddress?.state} </span>
                                        <span>City : {selectedAddress?.city} </span>
                                        <span> Street :{selectedAddress?.street}</span>
                                    </div>
                                </div>) : (

                                addresses && addresses.map((adr: any, ind: any) => (

                                    <Address
                                        getAddresses={getAddresses}
                                        key={ind}
                                        adr={adr}
                                        addresses={userAddresses}
                                        onAddressSubmit={onAddressSubmit}
                                        handleSelectedAddress={handleSelectedAddress}
                                        index={ind}
                                        enableAddressEditForm={enableAddressEditForm}
                                        confirmDeliveryAddress={confirmDeliveryAddress}
                                    />
                                )
                                )

                            )}
                        </div>
                        {confirmAddress ? null : newAddress ?
                            (
                                <AddressForm withoutLayout={true} onSubmitForm={onAddressSubmit} getAddresses={getAddresses} addresses={userAddresses} />
                            ) : null
                        }

                    </div>

                    {
                        !confirmAddress &&
                        <>

                            {/* <button onClick={submitAddress} className='bg-green-500 text-white hover:bg-green-600 p-2 mt-3 '>Submit</button> */}

                        </>
                    }
                </CheckoutComponent>
                <CheckoutComponent
                    icon={<MdOutlineRateReview />}
                    step={<h1>Step 3: Cart Review</h1>}
                    active={confirmOrder}
                >
                    {confirmAddress &&
                        <>
                            <div className=" inset-0  ">
                                <div className="inset-0 ">
                                    <div className="pointer-events-none  inset-y-0  flex max-w-full">
                                        <div className="pointer-events-auto">
                                            <div className="flex h-full flex-col overflow-y-auto ">
                                                <div className="flex-1 overflow-y-auto py-6">
                                                    <div className="mt-8">
                                                        <div className="flow-root">
                                                            <ul role="list" className="-my-6 divide-y divide-gray-200 grid grid-col-1 md:grid-cols-3 gap-4 justify-center">


                                                                {
                                                                    cart?.length === 0 &&
                                                                    <li className='flex py-6'>no cart items.</li>
                                                                    // Object.keys(props.cart).length == 0 &&
                                                                }
                                                                {
                                                                    cart?.length > 0 &&
                                                                    cart?.map((crt, ind) => {
                                                                        return (
                                                                            <li className="flex bg-white  shadow-md py-3 px-2" key={ind}>
                                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                                    <Image src={crt.product.images[0].src} alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt." width={100} height={100} layout="responsive" className="h-full w-full object-cover object-center" />
                                                                                </div>

                                                                                <div className=" flex flex-1 flex-col px-2">
                                                                                    <div>
                                                                                        <div className="flex justify-between text-base font-medium text-gray-900">

                                                                                            <Link className='line-clamp-1' href={`/product/${crt.product.slug}`}>{crt.product.name}</Link>

                                                                                        </div>
                                                                                        <p className={`${crt.product.discount > 0 ? "line-through text-red-400" : ""}`}>Rs.{crt.product.price}</p>
                                                                                        <p>{crt.product.discount}%</p>
                                                                                        <p className="mt-1 text-sm text-gray-500 font-bold">{calculateDiscountedPrice(crt.product.price, crt.product.discount).discountedPrice}</p>
                                                                                    </div>
                                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                                        {/* <p className="text-gray-500">Qty {props.cart[key].qty}</p> */}

                                                                                        <div className="flex">

                                                                                            <div className="flex space-x-2 items-center ">
                                                                                                <button onClick={() => cartDecrement(crt)} className='p-2 bg-gray-200 rounded-full w-6 h-6 text-center flex justify-center items-center'>-</button>
                                                                                                <span className='p-2  w-8 text-center'>{crt.quantity}</span>
                                                                                                <button
                                                                                                    onClick={() => cartIncrement(crt)}
                                                                                                    className='p-2 bg-gray-200 rounded-full w-6 h-6 flex justify-center items-center'>+</button>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </li>
                                                                        )
                                                                    })
                                                                }
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='py-4'>
                                <h1 className='text-3xl'>Sub Total :Rs {subTotal?.toString()}</h1>
                                {
                                    cart?.length > 0 &&
                                    <button onClick={submitOrder} className='bg-green-500 text-white hover:bg-green-600 font-bold p-2'>Confirm </button>
                                }

                            </div></>
                    }
                </CheckoutComponent>
                <CheckoutComponent
                    icon={"icon"}
                    step={<h1>Step 4: Payment Method:</h1>}
                >

                    {
                        confirmOrder &&
                        <>
                            <div className="flex items-center space-x-2">

                                {/* <form action="https://uat.esewa.com.np/epay/main" method="POST">
                                    <input value={props.subTotal} name="tAmt" type="hidden" />
                                <input value={props.subTotal} name="amt" type="hidden" />
                                    <input value="0" name="txAmt" type="hidden" />
                                    <input value="0" name="psc" type="hidden" />
                                    <input value="0" name="pdc" type="hidden" />
                                    <input value="EPAYTEST" name="scd" type="hidden" />
                                    <input value="ee2c3ca1-696b-4cc5-a6be-2c40d929d452" name="pid" type="hidden" />
                                    <input value={`http://localhost:3000/esewa/success?q=su`} type="hidden" name="su" />
                                    <input value={`http://localhost:3000/esewa/failure?q=fu`} type="hidden" name="fu" />
                                    <button className='bg-green-500 space-x-2 px-2 py-2 text-white hover:shadow-lg  flex justify-center items-center' type='submit'>

                                        <Image src={"/icons/esewa.png"} alt="esewa" width={20} height={20} className='rounded-full' /> <span>E-Sewa</span>
                                    </button>
                                </form> */}

                                <button onClick={submitCOD} className='flex items-center justify-center bg-blue-500 p-2 text-white'><GiTakeMyMoney className="text-2xl" /> <span>Cash On Delivery</span></button>
                            </div>
                        </>
                    }

                </CheckoutComponent>
            </div>
        </section>
    )
}
export function CheckoutComponent(props: any) {
    return (
        <div className="checkout">
            <div className="header w-full border-b">
                <div className={` sm:px-3 flex px-3 w-full py-3 space-x-2  sm:justify-start border-b-2 title-font font-medium ${props.active ? 'bg-green-500 border-indigo-500 text-white' : 'bg-gray-100 border-indigo-500 text-indigo-500'} inline-flex items-center leading-none tracking-wider rounded-t`}>
                    {props.icon}{props.step}
                </div>
            </div>
            <div className="body  mx-auto  border-t">
                {props.children}
            </div>
        </div>
    )
}
export const Address = ({ getAddresses, index, addresses, adr, handleSelectedAddress, onAddressSubmit, enableAddressEditForm, confirmDeliveryAddress }: any) => {
    return (
        <>
            {
                !adr.edit ? (



                    <div className="address flex flex-col">

                        <label htmlFor={`address-${index}`} className='cursor-pointer'>
                            <input name="address" id={`address-${index}`} type="radio" onClick={() => handleSelectedAddress(adr)} />
                            <span> {adr.name}</span>
                            <span>{adr.email}</span>
                            <span> {adr.phone} </span>
                            <span>{adr.state}</span>
                            <span> {adr.city}</span>
                            <span> {adr.street}</span>
                        </label>
                        <div className="buttons space-x-1 text-white capitalize" >
                            {adr.selected &&
                                <>

                                    <button className="button p-2 bg-blue-500 capitalize" onClick={() => enableAddressEditForm(adr)}>edit</button>
                                    <button className="button p-2 bg-green-500 capitalize" onClick={() => confirmDeliveryAddress(adr)}>delivery here</button>
                                </>
                            }

                        </div>

                    </div>
                ) :
                    (
                        <AddressForm
                            withoutLayout={true}
                            onSubmitForm={onAddressSubmit}
                            initialData={adr}
                            addresses={addresses}
                            getAddresses={getAddresses}
                            onCancle={() => { }}
                        />
                    )

            }
        </>
    )
}