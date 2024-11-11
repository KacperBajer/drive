"use client"
import { SidebarLinks } from '@/lib/constants'
import classNames from 'classnames'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const path = usePathname()

  return (
    <div className='px-5 py-7 h-full flex flex-col w-[320px]'>
        <div className='flex flex-col justify-between flex-1'>
            <section className='flex flex-col'>
                <Image
                    src="/assets/icons/logo-full-brand.svg"
                    alt="logo"
                    width={160}
                    height={82}
                    className="h-auto"
                />

                <div className='flex flex-col gap-5 mt-10 text-lg text-dark-100'>
                    {SidebarLinks.map(item => (
                        <Link
                            key={item.id}
                            href={item.href}
                            className={`flex gap-4 py-3 px-7 w-full rounded-full font-medium  ${path === item.href && 'text-white bg-red-100'} `}
                        >
                            <Image 
                                alt=''
                                src={item.img}
                                width={20}
                                height={20}
                                className={classNames(`w-6 filter invert opacity-25`, path === item.href && 'nav-icon-active ')}
                            />
                            {item.name}
                        </Link>
                    ))}
                </div>

            </section>

            <section className='flex flex-col gap-4'>
                <Image
                    src="/assets/images/files-2.png"
                    alt="logo"
                    width={380}
                    height={314}
                    className="h-auto w-full"
                />

                <div className='bg-red-200/10 rounded-full p-2 gap-3 flex items-center'>
                    <Image 
                        alt=''
                        src={'/assets/images/avatar.png'}
                        width={40}
                        height={40}
                    />
                    
                    <div className='flex flex-col'>
                        <p className='font-medium text-sm leading-4'>Test</p>
                        <p className='text-xs text-gray-500'>kacper@pl.pl</p>
                    </div>

                </div>
                
            </section>


        </div>
    </div>
  )
}

export default Sidebar