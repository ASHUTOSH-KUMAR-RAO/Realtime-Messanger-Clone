import React from 'react'

const EmptyState = () => {
  return (
    <div
    className='
    px-4
    py-10
    sm:px-6
    lg:px-8
    h-full
    flex
    items-center
    justify-center
    bg-gray-300'>

        <div className='text-center flex items-center flex-col'>
            <h3 className='mt-2 text-2xl font-semibold text-gray-900'>Select a chat or start a new conversation</h3>
        </div>
    </div>
  )
}

export default EmptyState