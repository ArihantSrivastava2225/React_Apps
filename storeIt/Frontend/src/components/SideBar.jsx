import React from 'react'
import Logo1 from "../assets/Logo(1).png"
import Illustration from "../assets/Illustration.png"
import { IoDocuments } from "react-icons/io5";
import { IoIosImages } from "react-icons/io";
import { TiVideo } from "react-icons/ti";
import { IoPieChart } from "react-icons/io5";
import { FaChalkboard } from "react-icons/fa";

const SideBar = () => {
  return (
    <div>
        <aside className='bg-red-400 flex flex-col justify-between h-screen w-full items-start p-7 rounded-tr-2xl rounded-br-2xl'>
            <img src={Logo1} width={170} height={40} alt="" />
            <ul className='flex flex-col gap-4 text-white text-md font-semibold w-full'>
                <li className='flex gap-4 items-center'><FaChalkboard /> Dashboard</li>
                <li className='flex gap-4 items-center'><IoDocuments /> Documents</li>
                <li className='flex gap-4 items-center'><IoIosImages /> Images</li>
                <li className='flex gap-4 items-center'><TiVideo /> Video, Audio</li>
                <li className='flex gap-4 items-center'><IoPieChart /> Others</li>
            </ul>
            <img className='transition-all hover:rotate-4' width={144} height={144} src={Illustration} alt="" />
        </aside>
    </div>
  )
}

export default SideBar
