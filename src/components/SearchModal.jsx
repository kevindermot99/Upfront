import React from 'react'
import { LuSearch } from 'react-icons/lu'

function SearchModal() {
  return (
    <div className='w-[810px] h-[409px] p-4 flex flex-col'>
        <div className='flex items-center justify-start bg-orange-500 h-[45px] px-3'>
            <div><LuSearch className='text-2xl' /></div>
        </div>
    </div>
  )
}

export default SearchModal