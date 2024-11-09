'use client'
import React, { ChangeEvent, KeyboardEvent, ClipboardEvent, useRef, useState, FormEvent } from 'react'

type Props = {
    handleSubmit: (code: number) => void
}

const OTPForm = ({handleSubmit}: Props) => {
    const [otpCode, setOtpCode] = useState(Array(6).fill(""));
    const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const { value } = e.target;
        if (!isNaN(Number(value)) && value.length <= 2) {
          const newOtp = [...otpCode];
          newOtp[index] = value.charAt(value.length - 1);
          setOtpCode(newOtp);
    
          if (value && index < inputsRef.current.length - 1) {
            inputsRef.current[index + 1]?.focus();
          }
        }
    };

    const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
        const pasteData = e.clipboardData.getData("Text");
        
        if (!isNaN(Number(pasteData))) {
            e.preventDefault();
            
            const newOtp = [...otpCode];
            let startIdx = newOtp.findIndex(char => char === "");

            if (startIdx === -1) {
                startIdx = inputsRef.current.findIndex(input => document.activeElement === input);
            }

            for (let i = 0; i < pasteData.length && startIdx + i < inputsRef.current.length; i++) {
                newOtp[startIdx + i] = pasteData[i];
                if (inputsRef.current[startIdx + i]) {
                    inputsRef.current[startIdx + i]!.value = pasteData[i];
                }
            }
            setOtpCode(newOtp);

            const nextIndex = startIdx + pasteData.length < inputsRef.current.length ? startIdx + pasteData.length : inputsRef.current.length - 1;
            inputsRef.current[nextIndex]?.focus();
        }
    };

    const handleBackspace = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && index > 0 && !otpCode[index]) {
          inputsRef.current[index - 1]?.focus();
        }
    };

    const handleSub = async (e: FormEvent) => {
        e.preventDefault()
        const number = parseInt(otpCode.join(""))
        const ans = await handleSubmit(number)
    }

    return (
        <form onSubmit={handleSub} className=''>
            <div className='flex gap-2'>
                {otpCode.map((item, index) => (
                    <input 
                        autoFocus={index === 0}
                        key={index} 
                        type='text' 
                        value={otpCode[index]} 
                        maxLength={2}
                        onChange={(e) => handleChange(e, index)} 
                        onKeyDown={(e) => handleBackspace(e, index)} 
                        onPaste={handlePaste} 
                        ref={(el) => (inputsRef.current[index] = el)} 
                        className={`p-4 shadow-custom appearance-none outline-none rounded-md w-16 text-2xl text-center font-bold focus:bg-red-100/50 caret-transparent hover:cursor-pointer`} 
                    />
                ))}
            </div>
            <button type='submit' className='text-sm font-bold p-4 mt-7 rounded-full bg-red-100 hover:bg-red-200 transition-all duration-300 w-full text-white'>Submit</button>
        </form>
    );
}

export default OTPForm;
