'use client'

import React, { use, useContext, useState } from 'react'
import FormSection from '../_components/FormSection'
import OutputSection from '../_components/OutputSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Template from '@/app/(data)/Template'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { chatSession } from '@/utils/AiModal'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import { AIOutput } from '@/utils/schema'
import moment from 'moment'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/router'

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
  const user = useUser();
  const [totalUsage, setTotalUsage] = useContext(TotalUsageContext);
  const router =  useRouter();

  const GenerateAIContent = async (formData: any) => {
    if(totalUsage>=10000){
      console.log('Usage limit reached');
      router.push('/dashboard/billing');
      return;
    }
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalPrompt = JSON.stringify(formData) + ', ' + selectedPrompt;
    
    const result = await chatSession.sendMessage(finalPrompt);
    console.log(result.response.text());
    setOutput(result.response.text());
    await SaveInDb(JSON.stringify(formData),selectedTemplate?.slug,result?.response.text())
    setLoading(false);
  }

  const SaveInDb=async(formData:any,slug:any,aiResp:string)=>{
    const result=await db.insert(AIOutput).values({
        formData:formData,
        templateSlug:slug,
        aiResponse:aiResp,
        createdBy: user?.user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD/MM/yyyy'),
    });

    console.log(result);
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
