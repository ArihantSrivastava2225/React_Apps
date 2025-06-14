import React from 'react'
import { IoMdAdd } from "react-icons/io";

const ContactBlock = () => {
  return (
    <div className='flex flex-col justify-center items-center gap-4 w-full max-w-md px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] focus:outline-none'>
      <header className='flex justify-between items-center w-full'>
        <p className='font-bold text-xl'>Contact</p>
        <button className='bg-indigo-500 text-white rounded-full w-8 h-8 flex justify-center items-center'>
          <IoMdAdd size={20} />
        </button>
      </header>
      <section className='w-full flex justify-start'>
        <ul>
            <li className='flex justify-center items-center'>
                <img src="https://static.vecteezy.com/system/resources/previews/025/869/585/non_2x/round-profile-image-of-man-avatar-for-social-networks-fashion-beauty-blue-and-black-bright-illustration-in-trendy-style-vector.jpg" width={80} height={80} alt="" />
                <div className='flex flex-col justify-center items-center'>
                    <p>Alice Emma</p>
                    <p>emmaart1234@gmail.com</p>
                </div>
            </li>
            <li className='flex justify-center items-center gap-10'>
                <img src="https://media.gettyimages.com/id/1572226742/vector/abstract-avatar-icon-profile-diverse-empty-face-for-social-network-and-applications-vector.jpg?s=612x612&w=gi&k=20&c=Xb9thV23uYSGPgcnZjKb1rE6io7GbAZkSXLmDlF2EYE=" width={52} height={52} alt="" />
                <div className='flex flex-col justify-center items-center'>
                    <p>Anne Jennifer</p>
                    <p>jennifer@gmail.com</p>
                </div>
            </li>
        </ul>
      </section>
    </div>
  )
}

export default ContactBlock
