import React from 'react'

export default function ChipComponent({topicName}) {
  return (
    <div className='border border-secondary py-2 px-4 pointer'>
      {topicName}
    </div>
  )
}
