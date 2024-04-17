"use client"
// import { CustomModal } from '@/components/admin/Modal'


import React from 'react'
import Form from './Form';
// import { useAppSelector } from '@/GlobalRedux/hooks/hooks';
// import { ICategoryChild } from '@/types/type';
// import { PaginatedItems } from '@/components/admin/paginate/Pagination';
import { uploadImage } from '@/libs/imageUpload';
import { toast } from 'react-toastify';
import CustomModal from '@/components/Modal';
import { get, post } from '@/libs/fetch';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
// import { useDispatch } from 'react-redux';
// import { addCategoryAction, updateCategoryAction } from '@/GlobalRedux/actions/category.action';
// import { resetMessage } from '@/GlobalRedux/actions/initial.action';

function CategoryPage() {
  // const dispatch: any = useDispatch();
  // const { categories, message, success } = useAppSelector((state) => state.category)
  const [category, setCategory] = React.useState({
    name: ""
  })
  const [categories, setCategories] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentModel, setCurrentModal] = React.useState('');
  const [selectedCategory, setSelectedCategory] = React.useState<any>();

  const [categoryImage, setCategoryImage] = React.useState<any>();
  const [previewCategoryImage, setPreviewCategoryImage] = React.useState<any>(null);
  const session: {
    data: any, update: any, status: string
  } = useSession();
  // console.log(session)
  const handleFileChange = (e: any) => {
    setCategoryImage(e.target.files[0])
    setPreviewCategoryImage(URL.createObjectURL(e.target.files[0]))
  }
  const handleAddCategory = async (e: any) => {
    e.preventDefault();
    let addedCategory: any;
    if (categoryImage) {
      // if (currentModel === "add") {

      let upload = await uploadImage(categoryImage, "qoulht0q");
      // console.log(category)
      if (upload.success !== true) {
        toast.error("file upload failed.")
      }
      let payload = {
        ...category,
        image: upload.imageUrl
      }
      // console.log(payload)
      // console.log(payload);
      addedCategory = await post("category", payload, session?.data.token)
      // dispatch(addCategoryAction(payload))

      console.log(addedCategory)
    } else {
      let payload = {
        ...category
      }

      addedCategory = await post("category", payload, session?.data.token)
      // dispatch(addCategoryAction(payload))

    }
    if (addedCategory.success == true) {
      toast.success(addedCategory.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      getData()
      reset()
    } else {
      toast.error(addedCategory.message, {
        position: toast.POSITION.TOP_RIGHT
      })
      reset()
    }
  }
  const handleEditCategory = async (e: any) => {
    e.preventDefault();
    if (categoryImage) {

      let upload = await uploadImage(categoryImage, "qoulht0q");
      // console.log(category)
      if (upload.success !== true) {
        toast.error("file upload failed.")
      }
      let payload = {
        ...category,
        image: upload.imageUrl
      }

      // console.log(payload);
      // dispatch(updateCategoryAction(payload))
      return
    } else {

      let payload = {
        ...category
      }

      console.log(payload);
      // dispatch(updateCategoryAction(payload))
    }
  }
  const handleEditCategoryModal = (cate: any) => {
    console.log(cate)
    // selectedCategory(cate);
    setCategory(cate);
    setCurrentModal("edit");
    setOpen(true)

  }

  let getData = async () => {
    let category = await get("category");
    setCategories(category)
  }
  React.useEffect(() => {
    getData()
  }, [])

  // const getSubCategory = () => {
  //   let subcategory: Array<ICategoryChild> = [];
  //   categories.map((cate: ICategoryChild) => {
  //     cate.children.filter((subcate: ICategoryChild) => {
  //       subcategory.push(subcate)
  //     })
  //   })
  //   return subcategory
  // }
  // React.useEffect(() => {
  //   if (message !== "") {
  //     if (success === true) {
  //       toast.success(message)
  //     } else {
  //       toast.error(message)
  //     }
  //   }
  //   console.log(message)
  //   setTimeout(() => {
  //     dispatch(resetMessage())
  //   }, 3000)
  //   //  if(interval){
  //   //   clearInterval(interval)
  //   //  }
  // }, [success, message])
  const reset = () => {
    setCategory({
      name: ""
    })
    setCurrentModal("")
    setOpen(false)
    setCategoryImage("")
  }
  return (
    <div>
      <div className="headers flex justify-between items-center border-b p-2">
        <h1>Category</h1>
        <button onClick={() => {
          setCurrentModal("add");
          setOpen(true)
        }} className='p-2 bg-gray-900 text-white'>Add Category</button>
      </div>

      <div className="tables">

      </div>
      {/* <!-- Main modal --> */}
      <CustomModal
        open={open}
        setOpen={setOpen}
      >
        {currentModel === "add" ?
          <Form
            category={category}
            setCategory={setCategory}
            categories={[]}
            // categories={categories}
            handleFileChange={handleFileChange}
            previewCategoryImage={previewCategoryImage}
            handleFormSubmit={handleAddCategory}
          />
          : currentModel === "edit" ?
            <Form
              category={category}
              setCategory={setCategory}
              // categories={categories}
              categories={[]}
              handleFileChange={handleFileChange}
              previewCategoryImage={previewCategoryImage}
              handleFormSubmit={handleEditCategory}
            />
            : currentModel === "delete" && <div>

              <h2>Are you sure want to Delete?</h2>
              <h3>{category.name}</h3>
              <Image src={previewCategoryImage} alt={category.name} width={300} height={300} />
              <div className="buttons space-x-3">
                <button className="cancle">Cancle</button>
                <button className="delete text-red-500">Delete</button>
              </div>

            </div>

        }

      </CustomModal>
      <div className="categories py-8 px-2 grid grid-cols-2 md:gap-6 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cate: any, ind) => (
          <div className="cate border p-2" key={ind}>
            <h2>{cate.name}</h2>
            <Image src={cate.image.src} width={200} height={200} alt={cate.name} />
            <div className="buttons flex justify-center items-center space-x-2 border ">
              <button className='text-gray-700'>
                <div className="sr-only">View</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>

              </button>
              <button
                onClick={() => {
                  setCurrentModal("edit");
                  setCategory({
                    name: cate.name
                  })
                  setPreviewCategoryImage(cate.image.src);
                  setOpen(true)
                }}
                className='text-blue-500'>
                <div className="sr-only">Edit</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>

              </button>
              <button
                onClick={() => {
                  setCurrentModal("delete");
                  setCategory({
                    name: cate.name
                  })
                  setPreviewCategoryImage(cate.image.src);
                  setOpen(true)
                }}
                className='text-red-600'>
                <div className="sr-only">Delete</div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                </svg>

              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoryPage