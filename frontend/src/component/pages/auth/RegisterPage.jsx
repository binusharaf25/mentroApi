import React from 'react'
import RegisterForm from '../../auth/RegisterForm'

const RegisterPage = () => {
  return (
        <div className='min-h-screen bg-background flex flex-col items-center justify-center '>
     <div className='absolute inset-0 bg-gradient-to-br from-secondary to-secondary/20 opacity-50 ' />


      <div className='z-10 w-full max-w-md px-4'>


       <div className='text-center mb-8'>
         <h2 className='text-foreground text-3xl font-bold'>Register to today !</h2>
        <p className='text-md text-gray-400'>To join us register today</p>
       </div>
       {/* Registeration section  */}
        <RegisterForm />
      </div>
      
     
     
    </div>
  )
}

export default RegisterPage