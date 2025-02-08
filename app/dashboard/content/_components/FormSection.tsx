import React from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

interface PROPS{
  selectedTemplate?:TEMPLATE
}
const FormSection = ({selectedTemplate}:PROPS) => {
  return (
    <div className='p-5 shadow-md border rounded-lg'>
      <Image src={selectedTemplate?.icon || '/default-icon.png'} alt='icon' width={70} height={70}/>
      <h2 className='font-bold text-2xl mb-2 text-primary'>{selectedTemplate?.name}</h2>
      <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

      <form>
        {selectedTemplate?.form?.map((item, index) => (
            <div>
              <label>{item?.label}</label>
              {item.field=='input' ? <Input /> : item.field=='textarea' ? <Textarea/>:null}
            </div>
        ))}
      </form>
    </div>
  )
}

export default FormSection