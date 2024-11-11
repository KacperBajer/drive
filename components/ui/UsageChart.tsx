'use client'
import React from 'react'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'

const UsageChart = () => {
  return (
    <CircularProgressbarWithChildren value={66} strokeWidth={6} styles={{
        root: {
          transform: "rotate(114deg)",

        },
        path: {
          stroke: '#FFFFFF',
        },
        trail: {
          stroke: '#FFFFFF1A',

        }
      }}>
        <div className='flex flex-col items-center'>
          <p className='font-bold text-4xl text-white'>66%</p>
          <p className='text-white/50'>Space used</p>
        </div>
      </CircularProgressbarWithChildren>
  )
}

export default UsageChart