import React from "react";
import ReactPaginate from "react-paginate";
function Items({ currentItems, handleEditCategory, categories }: any) {
    // console.log(currentItems)
  
    return (
        <>
            {currentItems &&
                currentItems.map((item: any, ind: any) => (
                    <tr key={ind}>
                        <td className=' border p-2 lg:p-4'>{ind + 1}</td>
                        <td className=' border p-2 lg:p-4'>{item.name}</td>
                        <td className=' border p-2 lg:p-4'>{item.category.name}</td>
                        <td className=' border p-2 lg:p-4'>Rs.{item.price}</td>
                        <td className=' border p-2 lg:p-4'>
                            <button onClick={() => handleEditCategory(item)}>Edit</button>
                            <button onClick={handleEditCategory}>delete</button>
                        </td>
                    </tr>
                ))}
        </>
    );
}

export function PaginatedProductItems({  data, categories, handleEditCategory }: {  data: any[], categories: any, handleEditCategory: any }) {
    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = React.useState(0);
    const [itemsPerPage ,setItemPerPage] = React.useState(10)
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
                        <th className='border p-4'>category</th>
                        <th className='border p-4'>Price</th>
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
