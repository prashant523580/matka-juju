import ProductCard from '@/components/ui/Card/ProductCard';
import { getCategoryBySlug } from '@/controllers/category';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react'

interface PageProps {
    params: { slug: "string" },
    searchParams: {
        [key: string]: string | string[] | undefined,
    }
}
async function getPostByCategry(slug: any) {

    try {

        let res = await fetch(`${process.env.NEXT_PUBLIC_API}/product?category=${JSON.stringify([slug])}`, {
            cache: "no-store",
            method: "GET",
            headers: {
                "Content-Type": "application"
            }
        });
        let data = await res.json() || [];

        return data;
    } catch (err) {
        return null
    }

}
export async function generateMetadata({ params: { slug } }: PageProps) {
    try {

        let category = await getCategoryBySlug(slug);
        // console.log(category)
        return {
            title: category.name,
            // title: categorySlug.replace("-",'').toUpperCase(),
            openGraph: {
                images: category.image.src,
                title: category.name,
                description: category.name,
                url: `${process.env.NEXT_PUBLIC_URL}/category/${category.slug}`,
                type: "website"
            },
            icons: {
                icon: "/favicon.ico",
                shortcut: "/favicon.ico",
                apple: "/icons/apple-touch-icon.png",
                other: {
                    rel: "apple-touch-icon-precomposed",
                    url: "/icons/apple-touch-icon.png"
                }
            },
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_URL}/category/${category.slug}`
            }
        }
    } catch (err) {
        return {
            title: "Page Not Found",
            description: "page you looking for doesn't exists."
        }
    }
}

async function CategoryProduct({ params }: any) {
    // console.log(params)
    let products: any[] = await getPostByCategry(params.slug);
    let category = await getCategoryBySlug(params.slug);
    // console.log({
    //     products, category
    // })
    if (category === null && products === null) notFound();
    const breadcrumbs = [
        { id: 1, name: 'Home', href: '/' },
        // {id:2, name:""}
        // { id: 2, name: category?.name, href: `/category/${category?.slug}` },
      ]
    return (
        <div className='bg-white dark:bg-black  py-8   mx-auto'>
            <nav aria-label="Breadcrumb">
            <ol role="list" className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              {breadcrumbs.map((breadcrumb: any) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center">
                    <Link href={breadcrumb.href} className="mr-2 text-sm font-medium text-gray-900">
                      {breadcrumb.name}
                    </Link>
                    <svg
                      width={16}
                      height={20}
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      className="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
              ))}
              <li className="text-sm">
                <a href={"#"} aria-current="page" className="font-medium text-gray-500 hover:text-gray-600">
                  {category.name}
                </a>
              </li>
            </ol>
          </nav>

            <div className={`cover md:h-[380px] relative flex justify-center items-center`}>
                <h2 className='text-center text-2xl md:text-4xl uppercase font-bold'>{category.name}</h2>
                <div className="">

                <Image className='' width={100} height={100} src={category?.image?.src}  alt={category.name} title={category.name}/>
                </div>
            </div>
            {
                products && products.length > 0 ?

                    <div className='p-2 lg:p-4 '>

                       
                            <div className="product grid grid-cols-1 md:grid-cols-4 gap-4">
                                {
                                    products.map((prod: any) => (
                                        <ProductCard key={prod._id} product={prod} />

                                    ))
                                }
                            </div>


                    </div>
                    :
                    <div className='h-[100vh] flex justify-center items-center'>
                        <h2 className='text-3xl font-bold'>Product Not Available</h2>
                    </div>
            }
        </div>
    )
}

export default CategoryProduct