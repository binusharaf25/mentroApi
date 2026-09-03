import React, { useState } from 'react'
import {Card} from '@/components/ui/card'
import DashboardHeader from '../../dashboard/DashboardHeader'
import WelcomeSection from '../../dashboard/WelcomeSection'
import TaskForm from '../../tasks/TaskForm'
import TaskList from '../../tasks/TaskList'
import { useQuery } from '@tanstack/react-query'
import Api from '../../../lib/api/ApiClient'
import { LoaderCircle } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

const Dashboard = () => {

  const [showCreateForm,setShowCreateForm]=useState(false)
  const [editingTask,setEditingTask]=useState(null)



  const tasksQuery=useQuery({
    queryKey:['tasks'],
    queryFn:async()=>{
      const respone = await Api.get('/tasks');

      return respone.data
    }
  })
 

  const handleFormClose=()=>{
    
    setShowCreateForm(false)
    setEditingTask(null)
  }
  const handleCreateTaskClick=()=>{
    
    setEditingTask(null)
    setShowCreateForm(true)
  }
  const handleEditTask=(task)=>{
    setEditingTask(task)
    setShowCreateForm(true)
  }
  const handleDeleteTask=async(taskId)=>{

  }

const handleStatusChange=(task,newStatus)=>{
  
}


  if(tasksQuery.isLoading){
    return (
      <div className='flex h-screen items-center justify-center'>
        <LoaderCircle className='animate-spin' />
      </div>
    )
  }
  return (
   <duv className='flex '>
   
     <div className='bg-background min-h-screen w-full mx-auto space-y-4 basis-[83%]'>

      {/* Header section  */}
      <div className=''>
         <DashboardHeader />
      </div>

      {/* MMain section  */}
      <main className='space-y-4'>
        {/* Wecome section  */}
        <WelcomeSection
        showCreateForm={showCreateForm}
        onCreateTask={handleCreateTaskClick}
        />
        {/* Task section  */}
        <TaskList  
        tasks={tasksQuery.data || []}
        isLoading={tasksQuery.isLoading}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onStatusChange={handleStatusChange}
        />

      </main>

      {/* Task dailog form  */}
      <TaskForm 
      isLoading={tasksQuery.isLoading}
      tasks={editingTask}
    setShowCreateForm={setShowCreateForm}
    open={showCreateForm || !!editingTask}
    onOpenChange={handleFormClose}
      
      />
    </div>
   </duv>
  )
}

export default Dashboard
