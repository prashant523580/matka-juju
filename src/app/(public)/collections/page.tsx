import { get } from '@/libs/fetch'
import React from 'react'
import ProductsComponent from './ProductsComponent';

async function ProductsPage({ searchParams }: {
  searchParams?: {
    category?: string,
    price?: string,
    sort?:string
  }
}) {
  // console.log(searchParams?.category)
  // let productData;
  const searchParamsObject = {
    category: searchParams?.category,
    price: searchParams?.price,
    sort: searchParams?.sort,
    // Add more parameters as needed
  };
  
  const queryParams = Object.entries(searchParamsObject)
    .filter(([key, value]) => value !== undefined)
    .map(([key, value] : any) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  console.log({queryParams})
  // if (searchParams?.category) {
  //   productData = await get(`product?category=${searchParams?.category}`);
  // } else if (searchParams?.price) {
  //   productData = await get(`product?price=${searchParams?.price}`);
  // } else if (searchParams?.category && searchParams?.price) {
  //   productData = await get(`product?category=${searchParams?.category}&&price=${searchParams?.price}`)
  // }
  // else if(searchParams?.sort){
  //   productData = await get(`product?category=${searchParams.sort}`)
  // }
  // else {
  //   productData = await get(`product`)
  // }
  const productData = await get(`product${queryParams ? `?${queryParams}` : ''}`);

  let categoryData = await get("category");
  let [products, category] = await Promise.all([productData, categoryData])
  // console.log({ products })
  return (
    <div>
      <ProductsComponent products={products} category={category} />
    </div>
  )
}

export default ProductsPage