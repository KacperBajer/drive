import RegisterForm from '@/components/forms/RegisterForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full max-w-[550px] flex flex-col'>
        <p className='text-dark-100 font-bold text-4xl mb-5'>Sign Up</p>
        <RegisterForm />
        <p className='text-center'>Do you have an account? <Link href={'/signin'} className='text-red-100 hover:cursor-pointer font-semibold'>Sign In</Link></p>
    </div>
  )
}

export default page