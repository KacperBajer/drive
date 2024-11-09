import React, { FormEvent } from 'react'
import OTPForm from '../forms/OTPForm'
import { IoMdClose } from "react-icons/io";

type Props = {
    email: string
    setShowPopup: (state: boolean) => void
    handleSubmit: (code: number) => void
}

const OTP = ({email, setShowPopup, handleSubmit}: Props) => {
  return (
    <div className='fixed top-0 left-0 h-screen w-full flex justify-center items-center bg-black/50'>
        <div className='h-full w-full sm:h-fit sm:w-fit bg-white sm:rounded-xl relative flex flex-col px-5 py-8'>
            <IoMdClose onClick={() => setShowPopup(false)} className='absolute top-5 right-5 text-2xl text-gray-500 hover:cursor-pointer' />
            <p className='font-extrabold text-3xl text-center text-dark-200 mb-3'>Enter OTP</p>
            <p className='font-semibold text-dark-100 text-lg text-center'>We've send a code to <span className='text-red-100'>{email}</span></p>
            <div className='my-7 flex gap-2'>
              <OTPForm handleSubmit={handleSubmit} />
            </div>
            <p className='font-semibold text-dark-100 text-lg text-center'>Didn't get a code? <span className='text-red-100 hover:cursor-pointer'>Click to resend.</span></p>
        </div>
    </div>
  )
}

export default OTP