import React from 'react'
import { FaFacebookMessenger } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

const Invite = () => {
  return (
    <section className='flex flex-col justify-center items-start w-full max-w-md px-4 py-2 rounded-2xl bg-white/70 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] focus:outline-none'>
        <p>Invite a Friend</p>
        <div className='flex justify-between border-2 border-dotted w-full max-w-md px-4 py-2 rounded-full bg-white backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] focus:outline-none'>
            <input type="text" placeholder='HKP1098HU5TH12' />
            <button className='bg-indigo-500 rounded-xl px-3 py-1 text-white'>Copy</button>
        </div>
        <div className='flex gap-4 w-full justify-center items-center'>
            <button className='w-7 h-7 bg-gray-100 rounded-full'>
                <FaFacebookMessenger />
            </button>
            <button className='bg-gray-100 rounded-full'>
                <FaFacebook />
            </button>
            <button className='bg-gray-100 rounded-full'>
                <FaTwitter />
            </button>
            <button className='bg-gray-100 rounded-full'>
                <FaInstagram />
            </button>
        </div>
    </section>
  )
}

export default Invite
