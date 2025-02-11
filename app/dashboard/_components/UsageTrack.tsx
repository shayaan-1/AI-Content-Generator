'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs';
import React, { useContext, useEffect, useState } from 'react'
import { HISTORY } from '../history/page';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext';

const UsageTrack = () => {

  const user = useUser();
  const {totalUsage, setTotalUsage} = useContext(TotalUsageContext);

  useEffect(()=>{
    user&&GetData();
  },[user]);

  const GetData=async()=>{
    {/* @ts-ignore */}
   const result:HISTORY[]=await db.select().from(AIOutput).where(eq(AIOutput.createdBy,user?.user?.primaryEmailAddress?.emailAddress));
   GetTotalUsage(result)
}

const GetTotalUsage=(result:HISTORY[])=>{
  let total:number=0;
  result.forEach(element => {
      total=total+Number(element.aiResponse?.length) 
  });
  setTotalUsage(total);
}

  return (
    <div className='m-5'>
        <div className='bg-primary p-3 rounded-lg text-white'>
            <h2 className='font-medium'>Credits</h2>
            <div className='w-full rounded-full h2 mt-3 bg-[#9981f9]'>
                <div className='h-2 bg-white rounded-full' 
                style={{width: (totalUsage/10000)*100 + '%'}}></div>
            </div>
            <h2 className='text-sm my-2'>{totalUsage}/10,000 Credits used</h2>
        </div>
        <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}

export default UsageTrack