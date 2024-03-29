import React from 'react'
export const FormLabel = ({ title }: { title: string }) => {
  return <label htmlFor={title} className="block mb-2 text-sm font-medium capitalize text-gray-900 dark:text-white">{title}</label>
}
interface PropsTypes {
    name:string,
    onChange: any,
    placeholder:string,
    type: string | "text" | "email"
    value:any
}
export function InputControl({name,onChange,placeholder,type,value}: PropsTypes) {
  return (

        
        <input
    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        type={type} name={name} placeholder={placeholder} onChange={onChange} value={value} />

  )
}


function FormGroup({children}:{children: React.ReactNode}) {
  return (
    <div className='my-1'>
          {children}
    </div>
  )
}

export default FormGroup