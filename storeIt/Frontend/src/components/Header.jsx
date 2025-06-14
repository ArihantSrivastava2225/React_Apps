import React from 'react'
import { IoIosSearch } from "react-icons/io";
import { FaCloudUploadAlt } from "react-icons/fa";
import { SignedIn, UserButton, SignedOut, SignInButton} from "@clerk/clerk-react";

const Header = () => {
  return (
    <div className='flex justify-between items-center h-20 gap-7'>
      <div className='flex items-center justify-start gap-3 w-full max-w-md px-4 py-2 rounded-full bg-white/70 backdrop-blur-md shadow-[0_10px_25px_rgba(0,0,0,0.08)] focus:outline-none'>
        <IoIosSearch />
        <input type="text" placeholder='Search...' className='w-full' />
      </div>
      <button className='flex items-center justify-center gap-3 bg-indigo-500 px-4 py-2 rounded-3xl text-white'>
        <FaCloudUploadAlt />
        <p>Upload</p>
      </button>
      <header>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <SignedOut>
              <SignInButton />
            </SignedOut>
          </header>
    </div>
  )
}

export default Header
