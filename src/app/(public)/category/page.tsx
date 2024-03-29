import { get } from '@/libs/fetch'
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'

async function CategoryPage() {
    let categoryData = await get('category');
    let [category] = await Promise.all([categoryData]);
    return (
        <div className='py-8 md:py-16'>
            <h1 className='text-center font-bold text-2xl md:text-4xl mb-6'>WHAT IS YOUR TYPE?</h1>


            <div className="categories grid grid-cols-2 md:grid-cols-3 gap-4 max-w-screen-xl mx-auto py-4 px-2 md:px-4">
                {
                    category && category?.map((cate: any, ind: any) => (
                        <Link className={`hover:underline cursor-pointer hover:scale-95 transition-all `} href={`/category/${cate.slug}`} key={ind}>

                                <Image className=' ' src={cate.image.src} alt={cate.name} width={300} height={300} />
                            <h2 className='uppercase text-lg lg:text-xl mt-1'>{cate.name}</h2>
                        </Link>
                    ))
                }
            </div>
        </div>
    )
}

export default CategoryPage