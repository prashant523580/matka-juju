import Image from 'next/image';
import React from 'react'

function Form({category,setCategory,categories,previewCategoryImage,handleFileChange,handleFormSubmit} : any) {
   
    const handleInputChange = (e: any) => {
        const {name,value} = e.target;
        setCategory((pre :any) => {
            return{
                ...pre,
                [name]:value
            }
        })
    }
    
  return (
     
    <form action="#" className='max-w-screen-2xl overflow-hidden p-2' onSubmit={handleFormSubmit}>
      <div className="group">

      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
        <input onChange={handleInputChange} value={category.name} type="text" name="name" id="name"
        // className='' 
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full  p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder="Ex. Apple iMac 27&ldquo;" />
        </div>
      <div className=''>
      {/* <div>
        <label htmlFor="brand" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Brand</label>
        <input type="text" name="brand" id="brand" value="Google" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. Apple" />
      </div> */}
      {/* <div>
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
        <input  type="number" value="399" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" />
      </div> */}
      {/* <div>
        <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
        <select onChange={handleInputChange} value={category.parentId} name='parentId' id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
          <option value="">--select-here</option>
          
          {
            categories.map((cate : any, ind:any) => {
                return(
                    <>
                    <option value={cate._id} className="cate" key={ind}>
                        {cate.name}
                    </option>
                    {
                        cate.children.length>0 &&
                        cate.children.map((subchild : any) => {
                            return(
                                <option value={subchild._id} > {"-->"}  {subchild.name} </option>
                            )
                        })
                    }
                    </>
                )
            })
          }
        </select>
      </div> */}
      <div className="sm:col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
         <input type='file' onChange={handleFileChange} />                    
      </div>
      {previewCategoryImage && 
        <div className="div">
            <Image src={previewCategoryImage} height={300} width={300} alt="category image" />
        </div>
      }
    </div>
    <div className="flex items-center space-x-4 mt-2">
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
       add category
      </button>
      {/* <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        Delete
      </button> */}
    </div>
  </form>
  )
}

export default Form