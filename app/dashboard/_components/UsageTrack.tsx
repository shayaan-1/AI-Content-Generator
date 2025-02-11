import { Button } from '@/components/ui/button'
import React from 'react'

const UsageTrack = () => {
  return (
    <div className='m-5'>
        <div className='bg-primary p-3 rounded-lg text-white'>
            <h2 className='font-medium'>Credits</h2>
            <div className='w-full rounded-full h2 mt-3 bg-[#9981f9]'>
                <div className='h-2 bg-white rounded-full' style={{width:'35%'}}></div>
            </div>
            <h2 className='text-sm my-2'>350/10,000 Credits used</h2>
        </div>
        <Button variant={'secondary'} className='w-full my-3 text-primary'>Upgrade</Button>
    </div>
  )
}

export default UsageTrack