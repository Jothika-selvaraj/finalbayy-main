import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Sidebar = () => {
    return (
        <div className='flex flex-col bg-slate-100'>
            <div className='px-2 sm:pl-14 py-3 border border-black'>
                <Image src='/assests/Header/logo.jpg' width={120} height={90} alt='Bayyinah Logo' />
            </div>
            <div className='w-full sm:w-80 h-auto sm:h-[100vh] relative py-12 border border-black'>
                <div className='w-full sm:w-[80%] absolute right-0'>
                    <Link href='/admin/addBlog' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p className='inline-block sm:hidden'>Add</p>
                        <p className='hidden sm:inline-block'>Add blogs</p>
                    </Link>
                    <Link href='/admin/blogList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p className='inline-block sm:hidden'>List</p>
                        <p className='hidden sm:inline-block'>Blog lists</p>
                    </Link> <br />
                    <Link href='/admin/addCourse' className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p className='inline-block sm:hidden'>Add</p>
                        <p className='hidden sm:inline-block'>Add Course</p>
                    </Link>
                    <Link href='/admin/CourseList' className='mt-5 flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
                        <p className='inline-block sm:hidden'>List</p>
                        <p className='hidden sm:inline-block'>Course lists</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Sidebar
