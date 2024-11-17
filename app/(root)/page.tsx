import UsageChart from '@/components/ui/UsageChart'
import { getUsageSummary } from '@/lib/action'
import { formatDateTime } from '@/lib/func'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = async () => {

  const usageSummary = await getUsageSummary()


  return (
    <div className='flex w-full h-full gap-10'>
      
      <section className='flex-1 flex flex-col gap-20'>
        
        <div className='w-full bg-red-100 py-10 px-5 flex items-center rounded-xl'>
          <div className='w-[180px] h-[180px] mx-14 my-4 flex items-center'>
            <UsageChart />
          </div>
          <div className='flex flex-col gap-3'>
            <p className='text-xl text-white font-semibold'>Available Storage</p>
            <p className='text-white/80 font-medium'>2GB / 2GB</p>
          </div>
        </div>

        <div className='gap-10 grid grid-cols-2 h-full'>
          {usageSummary.map(item => (
            <Link href={item.href} key={item.id} className='rounded-lg p-5 relative bg-white hover:scale-105 hover:cursor-pointer transition-all duration-300 flex flex-col'>
              <Image 
                alt=''
                src={item.image}
                width={100}
                height={100}
                className='z-10 w-[190px] object-contain absolute top-[-25px] -left-3'
              />
              <p className='font-medium text-end text-lg z-[11]'>0 Bytes</p>
              <div className='flex-1 flex flex-col justify-end z-[11]'>
                <p className='text-center font-medium text-lg'>{item.name}</p>
                <div className='w-full h-0.5 bg-gray-100 rounded-lg my-4'></div>
                <p className='text-center text-gray-400'>{item.lastUpload ? formatDateTime(item.lastUpload) : '-'}</p>
              </div>

            </Link>
          ))}
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