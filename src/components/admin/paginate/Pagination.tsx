"use client"
import { ICategoryChild } from '@/types/type';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';

// Example items, to simulate fetching from another resources.
const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function Items({ currentItems, handleEditCategory, categories }: any) {
    // console.log(currentItems)
    const getCategoryById = (id: any) => {
        let currentCategory: ICategoryChild = {};
        categories.filter((cate: ICategoryChild) => {
            if (cate._id === id) {
                currentCategory = cate
                return
            }
            cate?.children.length > 0 &&
                cate?.children.filter((subcate: ICategoryChild) => {
                    if (subcate._id === id) {
                        currentCategory = subcate
                        return
                    }
                })
        })
        return currentCategory
    }
    return (
        <>
            {currentItems &&
                currentItems.map((item: any, ind: any) => (
                    <tr key={ind}>
                        <td className=' border p-2 lg:p-4'>{ind + 1}</td>
                        <td className=' border p-2 lg:p-4'>{item.name}</td>
                        <td className=' border p-2 lg:p-4'>{getCategoryById(item.parentId).name}</td>
                        <td className=' border p-2 lg:p-4'>
                            <button onClick={() => handleEditCategory(item)}>Edit</button>
                            <button onClick={handleEditCategory}>delete</button>
                        </td>
                    </tr>
                ))}
        </>
    );
}

export function PaginatedItems({ itemsPerPage, data, categories, handleEditCategory }: { itemsPerPage: any, data: any[], categories: any, handleEditCategory: any }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);
    // Simulate fetching items from another resources.
    // (This could be items from props; or items loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = data.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(data.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event: any) => {
        const newOffset = (event.selected * itemsPerPage) % data.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    return (
        <div className='shadow-xl my-2 '>
            <table className='w-full text-center'>
                <thead className='uppercase  '>
                    <tr className=''>
                        <th className='border p-4'>S.N</th>
                        <th className='border p-4'>Name</th>
                        <th className='border p-4'>Parent Category</th>
                        <th className='border p-4'>Actions</th>
                    </tr>
                </thead>
                <tbody className='border'>
                    <Items currentItems={currentItems} handleEditCategory={handleEditCategory} categories={categories} />
                </tbody>
            </table>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
                }
                onPageChange={handlePageClick}
                pageRangeDisplayed={10}
                pageCount={pageCount}
                previousLabel={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
                }
                renderOnZeroPageCount={null}
                containerClassName='list flex justify-center bg-blue-300'
                activeClassName='bg-green-500 text-white p-4 '
                nextClassName='w-10 h-10  text-center rounded-full mx-2 bg-green-800 text-white'
                previousClassName='w-10 h-10  text-center rounded-full mx-2 bg-green-800 text-white'
            // breakClassName='bg-red-500 text-white'
            // className='flex bg-gray-900 text-white'
            //  disabledLinkClassName='p-4'
            />
        </div>
    );
}
