import React from 'react'
import { Sparkle } from 'lucide-react'

/*
 * HeroBadge
 * --------- 
 * Small badge shown above hero title
*/
const HeroBadge: React.FC = () => {
  return (
    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-black text-xs font-medium mb-6'>
        <Sparkle className='w-4 h-4 bg-blue-500' /> Upgrade your account
    </div>
  )
}

export default HeroBadge