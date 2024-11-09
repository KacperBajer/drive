import LoginForm from '@/components/forms/LoginForm'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='w-full max-w-[550px] flex flex-col'>
        <p className='text-dark-100 font-bold text-4xl mb-5'>Sign In</p>
        <LoginForm />
        <p className='text-center'>Don't have an account? <Link href={'/signup'} className='text-red-100 hover:cursor-pointer font-bold'>Sign Up</Link></p>
    </div>
  )
}

export default page