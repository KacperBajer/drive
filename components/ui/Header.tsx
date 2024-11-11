import Image from 'next/image'
import React from 'react'

const Header = () => {
  return (
    <div className='pl-4 pr-11 py-7 w-full flex justify-between'>
        <section className='rounded-full flex gap-3 px-4 py-2 shadow-custom'>
            <Image 
                alt=''
                src={'/assets/icons/search.svg'}
                width={20}
                height={20}
            />
            <input
                placeholder='Search'
                className='outline-none appearance-none'   
            />
        </section>

        <section className='flex gap-4'>
            <button className='flex gap-2 bg-red-100 transition-all duration-300 hover:bg-red-200 text-white font-bold rounded-full py-3 px-8'>
                <Image 
                    alt=''
                    src={'/assets/icons/upload.svg'}
                    width={24}
                    height={24}
                />
                <p>Upload</p>
            </button>
            <div className='rounded-full p-3 flex items-center justify-center transition-all duration-300 bg-red-200/15 hover:cursor-pointer hover:bg-red-200/25'>
                <Image 
                    alt=''
                    src={'/assets/icons/logout.svg'}
                    width={24}
                    height={24}
                />
            </div>
        </section>
    </div>
  )
}

export default Header