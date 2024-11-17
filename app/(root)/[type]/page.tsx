'use client'
import { capitalizeFirstLetter } from '@/lib/func'
import { usePathname } from 'next/navigation'
import React from 'react'


const page = () => {

  const path = usePathname()


  return (
    <div className='w-full flex flex-col h-full'>
      <p className='text-3xl font-bold mb-5'>{capitalizeFirstLetter(path.replace('/', ''))}</p>
      <div className='flex justify-between'>
        <p>Total: <span className='font-semibold'>0 MB</span></p>
      </div>
    </div>
  )
}

export default page