import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';

interface props{
  aiOutput:string
}

const OutputSection = ({aiOutput}:props) => {
  const editorRef:any = useRef(null);

  useEffect(() => {
    const editorInstance = editorRef.current.getInstance();
    editorInstance.setMarkdown(aiOutput);
  },[aiOutput])


  return (
    <div className='bg-white shadow lg-border rounded-lg'>
      <div className='p-5 flex justify-between items-center'>
        <h2 className='font-medium text-lg'>Your result</h2>
        <Button className='flex gap-2'
        onClick={()=>navigator.clipboard.writeText(aiOutput)}>
           <Copy className='w-4 h-4'/> Copy</Button>
      </div>
      <Editor
        ref={editorRef}
        initialValue="Your resukt will appear here"
        initialEditType="wysiwyg"
        height="600px"
        useCommandShortcut={true}
        onChange={() => {console.log(editorRef.current.getInstance().getMarkdown())}}
      />
    </div>
  )
}

export default OutputSection