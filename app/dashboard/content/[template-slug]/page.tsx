import React from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Template from '@/app/(data)/Template'

interface PROPS{
    params : {
        'template-slug':string
    }
}

const CreateNewContent = (props: PROPS) => {
  const selectedTemplate:TEMPLATE|undefined=Template?.find((item)=>item.slug==props.params['template-slug']);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 p-5'>
        {/* Form Section */}
        <FormSection selectedTemplate={selectedTemplate}/>

        {/* Output Section */}
        <OutputSection/>
    </div>
  )
}

export default CreateNewContent