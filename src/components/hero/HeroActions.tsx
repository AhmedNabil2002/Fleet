import React from 'react'

const HeroActions: React.FC = () => {
  return (
    <div className='flex flex-col sm:flex-row items-center justify-center gap-4 mt-8'>
      {/* Primary button */}
      <button 
      className='
      px-6 py-3
      rounded-xl
      bg-blue-600
      text-white
      text-sm font-medium
      hover:bg-blue-700 transition
      '
      >Get started</button>

      {/* Secondary button */}
      <button 
      className='
      px-6 py-3
      rounded-xl
      border border-gray-200
      bg-white
      text-gray-700
      text-sm font-medium
      flex items-center gap-2
      hover:bg-gray-50 transition
      '
      >Book Appointment</button>
    </div>
  )
}

export default HeroActions