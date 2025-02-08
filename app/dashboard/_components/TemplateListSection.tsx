import React, { useEffect, useState } from 'react'
import Template from '@/app/(data)/Template'
import TemplateCard from './TemplateCard'

export interface TEMPLATE{
    name:string,
    desc:string,
    icon:string,
    category:string,
    slug:string,
    aiPrompt:string,
    form?:FORM[]
}

export interface FORM{
    label:string,
    field:string,
    name:string,
    required?:boolean
}

const TemplateListSection = ({userSearchInput}:any) => {

  const [templateList, setTemplateList] = useState(Template)

  useEffect(() => {
    // console.log(userSearchInput)
    if(userSearchInput){
        const filteredTemplates = Template.filter((item:TEMPLATE) => item.name.toLowerCase().includes(userSearchInput.toLowerCase()))
        setTemplateList(filteredTemplates)
    }else{
        setTemplateList(Template)
    }
  },[userSearchInput])

  return (
    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 p-10'>
        {templateList.map((item:TEMPLATE, index:number) => (
            <TemplateCard key={item.slug || index} {...item}/>
        ))}
    </div>
  )
}

export default TemplateListSection