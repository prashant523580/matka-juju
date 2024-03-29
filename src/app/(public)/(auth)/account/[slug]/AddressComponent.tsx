import { useCart } from '@/Context/cartContext'
import { post } from "@/libs/fetch";
import { useSession } from "next-auth/react";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
const AddressForm = (props: any ) => {
    const { initialData } = props;
    // const dispatch = useDispatch();
    const [address, setAddress] = useState({
        name: initialData ? initialData.name : "",
        phone:initialData ? initialData.phone :"",
        city: initialData ? initialData.city :"",
        street:initialData ? initialData.street: "",
        state:initialData ? initialData.state : ""
    });
    const [id,setId] = useState(initialData ? initialData._id :  "");
    const session = useSession()
    const [submitFlag,setSubmitFlag] = useState(false);
    // const auth = useSelector(state => state.auth);
    const inputEvent = (e : any) =>{
        const {name,value} = e.target;
        setAddress((preval) => {
            return {...preval,
                    [name]  : value
                }
        })
    }
    useEffect(() => {
        if(submitFlag){
            let _address= {}
            if(id){
                _address ={
                    _id:id,
                    name: address.name,
                    phone: address.phone,
                    street: address.street,
                    city: address.city,
                    state:address.state
                }
            }else{
                _address = props.addresses.slice(props.addresses.length-1)[0];
            }
            props.onSubmitForm(_address )
        }
    },[submitFlag])
    const submitUserAddress = async () => {
            console.log(true)
            console.log(address)
            if(address.city === ""){
                return
            }
            const payload: any = {
                address
            }
            if(id){
                payload.address._id = id
            }
                console.log(payload)
            // dispatch(addAddress(payload))
            // let addAddress =  await post('address',payload,session?.data?.token)
            // console.log({addAddress})
            props.getAddresses()
            setSubmitFlag(true)
    }
    
    const renderAddressForm = () => {
        return(
            <div className="address-form">
                <div className="form" >
            
                      <div className="relative mb-4">
                                <label htmlFor="full-name" className="leading-7 text-sm text-gray-600">Full Name</label>
                                <input onChange={inputEvent} value={address.name} type="text" id="full-name" name="name" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="email" className="leading-7 text-sm text-gray-600">State</label>
                                <input onChange={inputEvent} value={address.state} type="text" id="state" name="state" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className="relative mb-4">
                                <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                                <input onChange={inputEvent} value={address.phone} type="phone" id="Phone" name="phone" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                            </div>
                            <div className=" flex justify-start space-x-2 items-center">

                                <div className="relative mb-4 w-half ml-2">
                                    <label htmlFor="city" className="leading-7 text-sm text-gray-600">city</label>
                                    <input onChange={inputEvent} value={address.city} type="text" id="city" name="city" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>
                                <div className="relative mb-4 w-half mr-2">
                                    <label htmlFor="City" className="leading-7 text-sm text-gray-600">street</label>
                                    <input onChange={inputEvent} value={address.street} type="text" id="City" name="street" className="w-full bg-white rounded border-b border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                                </div>

                            </div>
                            <button onClick={submitUserAddress} className="bg-green-500 p-2"> address</button>

                </div>
            </div>
        )
    }

    if(props.withoutLayout){
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

function AddressComponent() {
    const {userAddresses,updateAddress,getAddresses} = useCart();
    const [addresses,setAddresses] = React.useState(userAddresses)
    const onAddressSubmit = (addr: any) => {
        // setSelectedAddress(addr);

        // setConfirmAddress(true);
        // setOrderSummery(true);
    }
    const selectAddress = (addr: any) => {
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
        // setSelectedAddress(addr);
        // setConfirmAddress(true);
        console.log(addr)
        // setOrderSummery(true);
        // setOrderConfirmation(true)
    }
    const handleOnAddressSubmit = (addr: any) => {
        console.log(addr)
    }
  return (
    <div>
    {
        addresses.map((adr,ind) => (

            <Address
            key={ind}
            adr={adr}
            getAddresses={getAddresses}
            addresses={addresses}
            selectAddress={selectAddress}
            index={ind}
            enableAddressEditForm={enableAddressEditForm}
            confirmDeleteAddress={confirmDeliveryAddress}
            onAddressSubmit={handleOnAddressSubmit}
            />
        ))
    }
    </div>
  )
}

export default AddressComponent



export const Address = ({ getAddresses,index,addresses, adr, selectAddress, onAddressSubmit, enableAddressEditForm, confirmDeleteAddress } :any) => {
    return (
        <>
            {
                !adr.edit ? (
  
  
  
                    <div className="address flex flex-col">
                      
                        <label htmlFor={`address-${index}`} className='cursor-pointer'>
                        <input name="address" id={`address-${index}`} type="radio" onClick={() => selectAddress(adr)} />
                            <span> {adr.name}</span>
                            <span> {adr.phone} </span>
                            <span>{adr.state}</span>
                            <span> {adr.city}</span>
                            <span> {adr.street}</span>
                        </label>
                        <div className="buttons space-x-1 text-white capitalize" >
                            {adr.selected &&
                                <>
  
                                    <button className="button p-2 bg-blue-500 capitalize" onClick={() => enableAddressEditForm(adr)}>edit</button>
                                    <button className="button p-2 bg-red-500 capitalize" onClick={() => confirmDeleteAddress(adr)}>Remove</button>
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