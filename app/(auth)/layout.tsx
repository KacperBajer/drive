import { getUser } from '@/lib/action';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {

    const user = await getUser()
    if(user) {
      redirect('/')
    }

  return (
    <div className='h-screen max-h-screen flex '>
      
      <section className='w-1/2 xl:w-2/5 bg-red-100 px-5 lg:flex justify-center items-center text-white hidden'>
        <div className='flex flex-col gap-10 max-w-[450px] w-full'>
          <Image
            src="/assets/icons/logo-full.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto"
          />
          <div className='flex flex-col gap-3'>
            <p className='font-extrabold text-4xl'>Manage your files the best way</p>
            <p className='font-medium text-lg'>This is a place where you can store all your documents.</p>
          </div>
          <Image
            src="/assets/images/files.png"
            alt="Files"
            width={342}
            height={342}
            className='transition-all hover:scale-105 hover:rotate-3'
          />
        </div>
      </section>

      <section className='overflow-auto flex-1'>
        <div className='flex justify-center items-center p-5 h-full'>
          {children}
        </div>
      </section>

    </div>
  )
}

export default layout