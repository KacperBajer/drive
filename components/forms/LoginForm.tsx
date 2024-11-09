'use client'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import FormField from './FormField'
import { SignInUser, SignInUserOTP } from '@/lib/action'
import OTP from '../ui/OTP'
import { useRouter } from 'next/navigation'

const LoginForm = () => {
    
    const router = useRouter()
    const [showOTP, setShowOTP] = useState<boolean | string>(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setFormData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        const response = await SignInUser(formData.email, formData.password)
        if(response.isUser) {
            setShowOTP((response.otpID as string))
        }
    }

    const handleSubmitOTP = async (code: number ) => {
        const response = await SignInUserOTP(code, (showOTP as string))
        console.log(response)
        if(!response.isAuth) {
            const ans = {
                success: response.isAuth,
                error: response.error
            }
            return ans
        }

        document.cookie = `session=${response.session}; path=/`;
        
        router.push('/')

        const ans = {
            success: true,
        }

        return ans

    }

  return (
    <>
    {showOTP && <OTP handleSubmit={handleSubmitOTP} email={formData.email} setShowPopup={setShowOTP} />}
    <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className='flex flex-col gap-5'>
            <FormField required onChange={handleChange} value={formData.email} name='email' type='email' text={'Email'} placeholder='Enter your email' />
            <FormField required onChange={handleChange} value={formData.password} name='password' type='password' text={'Password'} placeholder='Enter your password' />
        </div>
        <button type='submit' className='text-sm font-bold p-6 my-7 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 w-full text-white'>Sign In</button>
    </form>
    </>
  )
}

export default LoginForm