"use client"
import { useCart } from "@/Context/cartContext";
import { post } from "@/libs/fetch";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect,useState } from "react";
// import { useState } from "react";
const AddressForm = (props: any) => {
    const { initialData } = props;
    // const dispatch = useDispatch();
    const [address, setAddress] = useState({
        name: initialData ? initialData.name : "",
        phone: initialData ? initialData.phone : "",
        city: initialData ? initialData.city : "",
        street: initialData ? initialData.street : "",
        state: initialData ? initialData.state : "",
        email: initialData ? initialData.email : "",

    });
    const [id, setId] = useState(initialData ? initialData._id : "");
    const session = useSession()
    const {handleAddAddress} = useCart();
    const [submitFlag, setSubmitFlag] = useState<boolean>(false);

   
    const inputEvent = (e: any) => {
        const { name, value } = e.target;
        setAddress((preval) => {
            return {
                ...preval,
                [name]: value
            }
        })
    }
    useEffect(() => {
        // getAddresses();
        if (submitFlag) {
            let _address = {}
            if (id) {
                _address = {
                    _id: id,
                    name: address.name,
                    phone: address.phone,
                    street: address.street,
                    city: address.city,
                    state: address.state,
                    email :address.email
                }
            } else {
             
                _address = props.addresses?.slice(props.addresses?.length - 1)[0];
            }
            console.log({_address,addresses : props.addresses})
            props.onSubmitForm(_address)
        }
    }, [submitFlag])
    const submitUserAddress = async () => {
        // console.log(true)
        // console.log(address)
        if (address.city === "") {
            return
        }
        const payload: any = {
            address
        }
        if (id) {
            payload.address._id = id
        }
        // console.log(payload)
         await  handleAddAddress(payload)
         setSubmitFlag(true)
        // submitFlag(true)
    }

    const renderAddressForm = () => {
        return (
            <div className="address-form">
                <div className="form grid grid-cols-1 md:grid-cols-2 gap-4" >

                    <div className="relative mb-4">
                        <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                        <input onChange={inputEvent} value={address.name} type="text" id="full-name" name="name" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input onChange={inputEvent} value={address.email} type="email" id="email" name="email" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input onChange={inputEvent} value={address.state} type="text" id="state" name="state" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className="relative mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input onChange={inputEvent} value={address.phone} type="phone" id="Phone" name="phone" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                    <div className=" col-span-full flex justify-start space-x-2 items-center">

                        <div className="relative mb-4 w-half ml-2">
                            <label htmlFor="city" className="leading-7 text-sm text-gray-600">city</label>
                            <input onChange={inputEvent} value={address.city} type="text" id="city" name="city" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>
                        <div className="relative mb-4 w-half mr-2">
                            <label htmlFor="City" className="leading-7 text-sm text-gray-600">street</label>
                            <input onChange={inputEvent} value={address.street} type="text" id="City" name="street" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                        </div>

                    </div>
                    <button onClick={submitUserAddress} className="bg-green-500 p-2 text-white">Add address</button>

                </div>
            </div>
        )
    }

    if (props.withoutLayout) {
        return <div>{renderAddressForm()}</div>
    }
    return (
        <>
            <div className="checkout">
                <div className={`checkout-header ${props.active && "active"}`}>
                    <div className="step-number">{props.step}</div>
                    <div className="title">{props.title}</div>
                </div>
                <div className="checkout-body">
                    {renderAddressForm()}
                </div>
                <div className="checkout-footer">

                </div>
            </div>
        </>
    )
}

export default AddressForm;