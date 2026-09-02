import {Button} from '@/components/ui/button'
import { QueryClient, queryOptions, useMutation, useQuery, useQueryClient, useQueryErrorResetBoundary } from '@tanstack/react-query'
import React, { useState } from 'react'
import { de } from 'zod/locales'


const createTask=async(newTask)=>{
    const response= await fetch('http://localhost:3000/api/tasks/create',{
        method:'POST',
        headers:{'Content-type':'application/json'},
        body:JSON.stringify(newTask)
    })
    if(!response.ok) throw new Error('Task createtion failed');
    return response.json()
}

const Task = () => {

    const queryClient=useQueryClient()  
    const [title,setTitle]=useState('')
    const [des,setDec]=useState('')
   const mutation= useMutation({
        mutationFn:createTask,
        onSuccess:()=>{
            queryClient.invalidateQueries({ queryKey:['task']})
            alert('Task succesful created');
            queryClient.va
        }
    })
    const handleAdd=()=>{
        mutation.mutate({
            title,
            description:des
        })
    }

  return (
    <div className='container  flex flex-col items-center'>
  
        {/*Input Form Haeder  */}
        <input 
        className='py-1 px-2 border rounded-lg block mb-2 w-[50%] outline-gray-200 border-gray-600'
        placeholder='Enter your title...'
        type="text" 
        value={title}
        onChange={(e)=>setTitle(e.target.value)}
        />
        <textarea 
        className='h-20 border py-2 px-4 mb-2 w-[50%] outline-gray-200 border-gray-600'
        name="" id=""
        placeholder='Enter your description'
        value={des}
        onChange={(e)=>setDec(e.target.value)}
        ></textarea>
        <button
        onClick={handleAdd}
        className='bg-black text-white text-lg py-2 px-4 rounded-lg shadow-lg hover:bg-blue-400 my-4'
        >Add new Task</button> 
        <Button variant={'secondary'} size={'xs'}>Second Button</Button>
        <button>ok true</button>
    </div>
  )
}

export default Task
