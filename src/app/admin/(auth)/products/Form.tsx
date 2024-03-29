import KeywordTags from '@/components/KeywordTags';
import CustomSpecification from '@/components/admin/CustomSpecification';
import DiscountCalculator from '@/components/admin/Discount';
import Editor from '@/components/admin/Editor';
import { calculateDiscountedPrice } from '@/libs/calculator';
// import { Input } from '@mui/material';
import Image from 'next/image';
import React from 'react'
import TextareaComponent from '../../TextareaComponent';

function Form({ keywords,setKeywords, colors, setColors, product, setProduct, categories, previewImages, handleFileChange, handleFormSubmit, isOffer, setIsOffer, editorValue, setEditorValue, handleImageDelete }: any) {

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setProduct((pre: any) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }
  // console.log(previewImages)
  return (

    <form action="#" onSubmit={handleFormSubmit} className=''>
      <div className="grid gap-4 mb-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
          <input onChange={handleInputChange} value={product.name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product Name" />
        </div>
        <div>
          <label htmlFor="size" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
          {/* <input onChange={handleInputChange} value={product.size} type="text" name="size" id="size" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Product Model" /> */}
          <select 
          name='size'
          id='size'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
          onChange={handleInputChange} value={product.size}>
            <option value="">--select-size--</option>
            <option value="cup">Cup</option>
            <option value="1/2">1/2 ltr</option>
            <option value="1">1 ltr</option>
          </select>
        </div>
        {/* <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
          <KeywordTags setTags={setColors} tags={colors} />
        </div> */}
        <div>
          <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
          <input onChange={handleInputChange} type="number" value={product.price} name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="$299" />
        </div>
        <div>
          <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
          <select onChange={handleInputChange} value={product.category} name='category' id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
            <option value="">--select-here</option>

            {

              categories.map((cate: any, ind: any) => {
                return (
                  <>
                    <option value={cate._id} className="cate" key={ind}>
                      {cate.name}
                    </option>

                  </>
                )
              })
            }
          </select>
        </div>
        <div>
          <label htmlFor="offer" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Offer</label>
          <input onChange={(e) => setIsOffer(e.target.checked ? true : false)} type="checkbox" name="offer" id="offer" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. Apple" /> is offer Product.
        </div>
        {
          isOffer &&
          <>
            <div>
              <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
              <input onChange={handleInputChange} type="number" name="discount" id="discount" value={product.discount} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex. Apple" />
            </div>
            <div className="div flex flex-col">
              <span>subtotal : Rs{product.price}</span>
              <span>discount :{product.discount}%</span>
              <span>
                discount Price : {calculateDiscountedPrice(product.price, product.discount).amountSaved}
              </span>
              <span>Total : {calculateDiscountedPrice(product.price, product.discount).discountedPrice}</span>
            </div>
          </>
        }
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Image</label>
          <input type='file' multiple onChange={handleFileChange} />
        </div>
        {previewImages &&
          previewImages.map((image: any, ind: number) => (

            <div className="div relative" key={ind}>
              <div className="absolute" onClick={() => handleImageDelete(ind)}>
                close
              </div>
              <Image src={image.src} height={300} width={300} alt="category image" />
            </div>
          ))
        }
      </div>
      {/* <CustomSpecification/> */}
      {/* <DiscountCalculator /> */}
      <Editor editorValue={editorValue} setEditorValue={setEditorValue} />
      <div className="py-1">
        <label htmlFor="keyword">Keyword</label>
        <TextareaComponent value={keywords} setValue={setKeywords} name='keyword' placeholder='write keyword in line' />
      </div>
      <div className="flex items-center space-x-4">
        <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
          add category
        </button>
        {/* <button type="button" className="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900">
        <svg className="mr-1 -ml-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
        Delete
      </button> */}
      </div>
    </form >
  )
}

export default Form