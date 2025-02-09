'use client'

import React, { use, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Template from '@/app/(data)/Template'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'

interface PROPS {
    params: Promise<{ 'template-slug': string }>
}

const CreateNewContent = ({ params }: PROPS) => {
  const resolvedParams = use(params); // Unwrap the params Promise
  const selectedTemplate: TEMPLATE | undefined = Template?.find(
    (item) => item.slug === resolvedParams['template-slug']
  );

  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<string>('');

  const GenerateAIContent = async (formData: any) => {
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalPrompt = JSON.stringify(formData) + ', ' + selectedPrompt;
    
    const result = await chatSession.sendMessage(finalPrompt);
    console.log(result.response.text());
    setOutput(result.response.text());
    setLoading(false);
  }

  return (
    <div className='p-10'>
      <Link href='/dashboard'><Button><ArrowLeft/> Back</Button>
      </Link>
      
      <div className='grid grid-cols-1 md:grid-cols-3 gap-5 py-5'>
        {/* Form Section */}
        <FormSection selectedTemplate={selectedTemplate} 
        loading={loading}
        userFormInput={(v: any) => GenerateAIContent(v)} />

        {/* Output Section */}
        <div className='col-span-2'>
          <OutputSection aiOutput={output}/>
        </div>
      </div>
    </div>
  )
}

export default CreateNewContent;
