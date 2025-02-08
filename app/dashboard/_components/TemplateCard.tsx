import React from 'react'
import Image from 'next/image'
import { TEMPLATE } from './TemplateListSection'

const TemplateCard = (item: TEMPLATE) => {
  return (
    <div className='p-5 border rounded-md shadow-md bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all'>
        <Image src={item.icon} alt='icon' width={50} height={50}/>
        <h2 className='font-medium text-lg'>{item.name}</h2>
        <p className='text-gray-500 line-clamp-3'>{item.desc}</p>
    </div>
  )
}

export default TemplateCard