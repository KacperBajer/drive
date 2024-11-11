import Header from '@/components/ui/Header';
import Sidebar from '@/components/ui/Sidebar';
import { getUser } from '@/lib/action';
import { redirect } from 'next/navigation';
import React from 'react'

const layout = async ({children}: Readonly<{
    children: React.ReactNode;
  }>) => {

    const user = await getUser()
    console.log(user)
    if(!user) {
      redirect('/signin')
    }

  return (
    <div className='flex w-full h-screen max-h-screen'>
      <Sidebar />
      <div className='flex flex-col flex-1'>
        <Header />
        <div className='w-full h-full pr-7 pb-7'>
          <div className='w-full h-full bg-gray-50 rounded-3xl px-9 py-10 flex justify-center'>
            <div className='overflow-auto max-w-[1280px] w-full'>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default layout