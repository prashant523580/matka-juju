"use client"
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';



const DropdownLink = ({ label, children, link, active }: any) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const trigger = useRef<any>(null);
    const dropdown = useRef<any>(null);

    // close on click outside
    useEffect(() => {
        const clickHandler = ({ target }: MouseEvent) => {
            if (!dropdown.current) return;
            if (
                !dropdownOpen ||
                dropdown.current.contains(target) ||
                trigger.current.contains(target)
            )
                return;
            setDropdownOpen(false);
        };
        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
    });

    // close if the esc key is pressed
    useEffect(() => {
        const keyHandler = ({ keyCode }: KeyboardEvent) => {
            if (!dropdownOpen || keyCode !== 27) return;
            setDropdownOpen(false);
        };
        document.addEventListener('keydown', keyHandler);
        return () => document.removeEventListener('keydown', keyHandler);
    });

    return (
        <div className="relative z-20 " x-data="{ dropdownOpen: false, notifying: true }"
        >

            <div
                ref={trigger}
                onClick={() => setDropdownOpen(!dropdownOpen)}
                // className='flex justify-between items-center'
                className={`relative group ${dropdownOpen ? "  text-orange-200  " : " text-white "}  ${active ? " text-green-500 " : " text-white "}  cursor-pointer hover:text-green-600  w-full flex  justify-between items-center px-1`}
            >
                {link}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`${dropdownOpen ? " rotate-90 " : " -rotate-90 "}  transition-all w-4 h-4   mx-1`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>


            </div>


            {/* <!-- Dropdown Start --> */}
            <ul

                style={{
                    height: dropdownOpen === true ? React.Children.count(children) * 40 : 0 + "px"
                }}
                ref={dropdown}
                onFocus={() => setDropdownOpen(true)}
                onBlur={() => setDropdownOpen(false)}
                className={`lg:absolute relative w-full lg:w-[200px] left-0 mt-2 flex transition-all overflow-hidden duration-700 flex-col rounded-sm borderborder-stroke bg-white  shadow-xl dark:border-strokedark dark:bg-boxdark px-2
                    `}
            >
                {children}




            </ul>
            {/* <!-- Dropdown End --> */}
        </div>
    );
};


export default DropdownLink;
