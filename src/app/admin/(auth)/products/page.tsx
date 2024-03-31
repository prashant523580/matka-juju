"use client"
// import { CustomModal } from '@/components/Modal'

import React from 'react'
import Form from './Form';
// import { useAppSelector } from '@/GlobalRedux/hooks/hooks';
// import { ICategoryChild } from '@/types/type';
import { PaginatedItems } from '@/components/admin/paginate/Pagination';
import { uploadImage, uploadMultipleImage } from '@/libs/imageUpload';
import { toast } from 'react-toastify';
// import { useDispatch } from 'react-redux';
// import { addCategoryAction } from '@/GlobalRedux/actions/category.action';
// import { addProductAciton } from '@/GlobalRedux/actions/product.action';
import { PaginatedProductItems } from '@/components/admin/paginate/PaginateProduct';
import CustomModal from '@/components/Modal';
import { get, post, update } from '@/libs/fetch';
import { useSession } from 'next-auth/react';

function ProductPage() {
  // const dispatch : any = useDispatch();
  //   const { 
  //     products:{
  //     products,success,message
  //   },
  //   category:{
  //     categories
  //   } 
  // } = useAppSelector((state) => state)
  const [product, setProduct] = React.useState({
    name: "",
    category: "",
    price: 0,
    discount: 0,
    size: ""
  })
  const [isOffer, setIsOffer] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [currentModel, setCurrentModal] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<any>();
  const [editorValue, setEditorValue] = React.useState<any>();
  const [productImages, setProductImages] = React.useState<any>([]);
  const [previewProductImage, setPreviewProductImage] = React.useState<any>([]);
  const [categories, setCategories] = React.useState<any[]>([]);
  const [products, setProducts] = React.useState<any[]>([]);
  const [colors, setColors] = React.useState([]);
  const [keywords, setKeywords] = React.useState([]);
  const session: {
    data: any, update: any, status: string
  } = useSession();

  const handleFileChange = (e: any) => {
    const files = e.target.files;

    let newImages: any = [];
    // console.log(copyFiles)
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const url = URL.createObjectURL(file);
        newImages.push({
          src: url
        })
      }
      setProductImages([...productImages, ...e.target.files])
      setPreviewProductImage(previewProductImage.concat(newImages))
    }
  }
  const handleAddProduct = async (e: any) => {
    e.preventDefault();

    // console.log(productImages)
    let images = []
    let upload: any = await Promise.all(uploadMultipleImage(productImages, "qoulht0q"))
    //  if (upload) console.log(upload)
    if (upload) {
      let payload: any = {
        ...product,
        images: upload,
        description: editorValue,
        isOffer: isOffer,
        // colors
        keywords
      }
      // console.log(editorValue)
      // dispatch(addProductAciton(payload))
      let newProduct = await post('product', payload, session.data.token);
      if (newProduct.success === true) {
        toast.success(newProduct.message, {
          position: toast.POSITION.TOP_RIGHT
        })
        getAllPrdoucts()
        reset()
      }
    } else {
      toast.error("file upload failed.")
    }
  }
  const handleEditCategory = async (e: any) => {
    e.preventDefault()
    let newImages = productImages.filter((img: any) => !img.src);
    let oldImage = productImages.filter((img: any) => img.src);
    let upload: any;
    let payload: any = {
      ...product,
      images: oldImage,
      description: editorValue,
      isOffer: isOffer,
      // colors
      keywords
    }
    if (newImages.length > 0) {
      upload = await Promise.all(uploadMultipleImage(newImages, "qoulht0q"))
      //  if (upload) console.log(upload)
      if (upload.length > 0) {
        payload = {
          ...payload,
          images: [...oldImage, ...upload]
        }
        // console.log(editorValue)
        // dispatch(addProductAciton(payload))
        let newProduct: any = await update('product', payload, session.data.token);
        if (newProduct.success === true) {
          toast.success(newProduct.message, {
            position: toast.POSITION.TOP_RIGHT
          })
          getAllPrdoucts()
          reset()
        } else {
          toast.error("file upload failed.")
        }
      }
    } else {
      let newProduct = await update('product', payload, session.data.token);
      if (newProduct.success === true) {
        toast.success(newProduct.message, {
          position: toast.POSITION.TOP_RIGHT
        })
        getAllPrdoucts()
        reset()
      }
      else {
        toast.error("file upload failed.")
      }
    }
  }
  const handleEditCategoryModal = (product: any) => {
    // console.log(cate)
    // selectedCategory(cate);
    console.log(product)
    setProduct({
      ...product,
      category: product.category._id
    })
    // setColors(product?.colors ? product?.colors : [])
    setProductImages(product.images);
    setKeywords(product?.keywords)
    setPreviewProductImage(product.images)
    setCurrentModal("edit");
    setEditorValue(product.description)
    setOpen(true)
  }

  const handleImageDelete = (index: any) => {
    let newImages = [...previewProductImage];
    let productImagesCopy = [...productImages]
    productImagesCopy.splice(index, 1)
    newImages.splice(index, 1)
    setPreviewProductImage(newImages)
    setProductImages(productImagesCopy)
  }
  React.useEffect(() => {
    let getData = async () => {
      let category = await get("category");
      setCategories(category)
    }
    getData()
    getAllPrdoucts()
  }, [])
  const getAllPrdoucts = async () => {
    let products = await get("product");
    setProducts(products)
  }
  const reset = () => {
    setCurrentModal("");
    setOpen(false)
    setEditorValue("")
    setPreviewProductImage([])
    setIsOffer(false)
    setKeywords([])
    setProduct({
      category:"",
      discount:0,
      name:"",
      price:0,
      size:''
    })
    // setColors([]);
  }
  React.useEffect(() => {
    console.log({
      productImages, previewProductImage
    })
  }, [previewProductImage, productImages])
  return (
    <div>
      <div className="headers flex justify-between items-center border-b p-2">
        <h1>Products</h1>
        <button onClick={() => {
          setCurrentModal("add");
          setOpen(true)
        }} className='p-2 bg-gray-900 text-white'>Add Product</button>
      </div>
      {/* <!-- Main modal --> */}
      <CustomModal
        open={open}
        setOpen={reset}
      >
        {currentModel === "add" ?
          <Form
            product={product}
            setProduct={setProduct}
            colors={colors}
            setColors={setColors}
            categories={categories}
            handleFileChange={handleFileChange}
            previewImages={previewProductImage}
            handleFormSubmit={handleAddProduct}
            isOffer={isOffer}
            setIsOffer={setIsOffer}
            editorValue={editorValue}
            setEditorValue={setEditorValue}
            handleImageDelete={handleImageDelete}
            keywords={keywords}
            setKeywords={setKeywords}
          />
          : currentModel === "edit" ?
            <Form
              product={product}
              setProduct={setProduct}
              colors={colors}
              setColors={setColors}
              categories={categories}
              handleFileChange={handleFileChange}
              previewImages={previewProductImage}
              handleFormSubmit={handleEditCategory}
              isOffer={isOffer}
              setIsOffer={setIsOffer}
              editorValue={editorValue}
              setEditorValue={setEditorValue}
              handleImageDelete={handleImageDelete}
              keywords={keywords}
              setKeywords={setKeywords}
            />
            : null

        }

      </CustomModal>
      <div className="table w-full">

        <PaginatedProductItems data={products} categories={categories}
          handleEditCategory={handleEditCategoryModal}
        />

        {/* <PaginatedItems itemsPerPage={10} data={getSubCategory()} categories={categories}
          handleEditCategory={handleEditCategoryModal}
        /> */}
      </div>
    </div>
  )
}

export default ProductPage