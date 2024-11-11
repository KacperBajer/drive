import UsageChart from '@/components/ui/UsageChart'
import React from 'react'

const page = () => {
  return (
    <div className='flex w-full h-full gap-10'>
      
      <section className='flex-1'>
        
        <div className='w-full bg-red-100 py-10 px-5 flex items-center rounded-xl'>
          <div className='w-[180px] h-[180px] mx-14 my-4'>
            <UsageChart />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xl text-white font-semibold'>Available Storage</p>
            <p className='text-white/80 font-medium'>2GB / 2GB</p>
          </div>
        </div>

      </section>
      
      <section className='flex-1 bg-white h-full rounded-xl px-6 py-8 flex flex-col'>
        <p className='text-dark-100 font-bold text-2xl mb-10'>Recent files uploaded</p>
        <p className='text-center text-gray-300 font-medium'>No files uploaded</p>
      </section>
    </div>
  )
}

export default page