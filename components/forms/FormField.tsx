import React, { ChangeEvent } from 'react'

type Props = {
    name: string
    placeholder: string 
    text: string
    type: string
    value: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void
    required?: boolean
}

const FormField = ({name, placeholder, text, type, value, onChange, required = false}: Props) => {
  return (
    <div className='shadow-custom p-4 rounded-lg border border-gray-100 w-full'>
        <p className='font-normal'>{text}</p>
        <input required={required} value={value} onChange={onChange} type={type} name={name} placeholder={placeholder} className='outline-none w-full appearance-none' />
    </div>
  )
}

export default FormField