import React from 'react'
import {ClipboardCheck} from 'lucide-react' 
import useAuthStore from '../../lib/stores/authStore'
import {Button} from '@/components/ui/button'
import { useQueryClient } from '@tanstack/react-query'

import {replace, useNavigate} from 'react-router'

const DashboardHeader = () => {

   const {user,clearAuth}= useAuthStore()
   const queryClient=useQueryClient()
   const navigate = useNavigate()

const handleLogout=()=>{
    if(confirm('are you sure to logout')){
        clearAuth()
        queryClient.clear();
        navigate('/login',{replace:true})
    }
}

  return (
    <header className='bg-card border-b border-border shadow-sm'>
        <div className='w-full px-4 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-3 '>
                <div className='flex items-center justify-center rounded-lg bg-primary h-8 w-8'>
                    <ClipboardCheck  className='text-secondary h-4 w-4'/>
                </div>
                <h1 className='text-xl text-foreground font-bold'>Task Dashboard</h1>
            </div>

            {/* user section  */}

            <div className='flex items-center gap-4'>
                <span className='text-sm text-muted-foreground'>
                    welcome,<span className='font-medium text-foreground ml-1'>{user?.name || 'user'} -{user.role}</span>
                </span>
                <Button 
                onClick={handleLogout}
                variant={'outline'} 
                className='cursor-pointer shadow-sm'>Logout</Button>
            </div>
        </div>
    </header>
  )
}

export default DashboardHeader
