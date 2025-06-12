import React, { useState } from 'react'
import Logo1 from "../assets/Logo(1).png"
import Illustration from "../assets/illustration.png"
import AuthForm from '../components/AuthForm'

const SignIn = () => {
  const [formType, setFormType] = useState('signin');  //signin ot signup

  const handleChangeFormType = () => {
    if(formType==='signin'){
      setFormType('signup');
    }else{
      setFormType('signin');
    }
  }

  return (
    <div className='flex'>
      <section className='hidden bg-red-400 h-screen w-1/2 space-y-10 p-10 lg:flex lg:flex-col xl:w-2/5'>
        <img src={Logo1} alt="logo" width={224} height={82} className='h-auto' />
        <h2 className='font-semibold text-3xl'>
          Manage your files the best way
        </h2>
        <p className='font-medium'>This is a place where you can store all your documents</p>

        <img src={Illustration} alt="Files" width={342} height={342} className='transition-all hover:rotate-2 hover:scale-105' />
      </section>
      <section className='flex justify-center items-center w-full h-screen lg:flex lg:w-3/5'>
        <div>
          {formType==='signin'
          ? (
            <section className='flex flex-col space-y-7 border-2 border-amber-500 rounded-2xl p-10 justify-center items-center'>
              <p>Sign-In</p>
              <AuthForm formType={formType} />
              <p>Don't have an account ? 
                <button className='cursor-pointer' onClick=  {handleChangeFormType} >Sign-Up</button>
              </p>
            </section>
          )
          : (
            <section className='flex flex-col space-y-7 border-2 border-amber-500 rounded-2xl p-10 justify-center items-center'>
              <p>Sign-Up</p>
              <AuthForm formType={formType} />
              <p>Already have an account ?
              <button className='cursor-pointer' onClick={handleChangeFormType}>Sign-In</button>
            </p>
            </section>
          )}
        </div>
      </section>
    </div>
  )
}

export default SignIn
