import React from 'react'
import Logo1 from "../assets/Logo(1).png"
import Illustration from "../assets/illustration.png"

//You can use this now for testing things for signin/signup as now signin page is set to handle both signin and signup requirements

const SignUp = () => {
  return (
    <div className='flex'>
          <section className='hidden bg-red-400 h-screen w-1/2 space-y-10 p-10 lg:flex lg:flex-col lg:w-2/5'>
            <img src={Logo1} alt="logo" width={224} height={82} className='h-auto' />
            <h2 className='font-semibold text-3xl'>
              Manage your files the best way
            </h2>
            <p className='font-medium'>This is a place where you can store all your documents</p>
    
            <img src={Illustration} alt="Files" width={342} height={342} className='transition-all hover:rotate-2 hover:scale-105' />
          </section>
          <section className='flex justify-center items-center w-full h-screen lg:flex lg:w-3/5'>
            <div>
              Sign-Up
            </div>
          </section>
        </div>
  )
}

export default SignUp
