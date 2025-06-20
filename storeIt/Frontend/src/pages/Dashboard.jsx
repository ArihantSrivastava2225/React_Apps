import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AvStorage from '../components/AvStorage'
import ContactBlock from '../components/ContactBlock'
import Invite from '../components/Invite'
import DocsCard from '../components/DocsCard'
import { FaFileAlt, FaImage, FaVideo, FaChartPie } from "react-icons/fa";

const Dashboard = () => {
    const cards = [
        {
            title: "Document", 
            space_filled: "12GB", 
            last_update: "10:15am, 10Oct",
            icon: <FaFileAlt/>,
            iconBgColor: "bg-red-400"
        },
        {
            title: "Images",
            space_filled: "20GB",
            last_update: "10:15am, 10Oct",
            icon: <FaImage/>,
            iconBgColor: "bg-blue-400"
        },
        {
            title: "Video, Audio",
            space_filled: "20GB",
            last_update: "10:15am, 10Oct",
            icon: <FaVideo/>,
            iconBgColor: "bg-green-400"
        },
        {
            title: "Others",
            space_filled: "38GB",
            last_update: "10:15am, 10Oct",
            icon: <FaChartPie/>,
            iconBgColor: "bg-purple-400"
        },
    ];

    return (
        <main className='flex'>
            <section className='hidden lg:block w-1/5'>
                <SideBar />
            </section>
            <section className='flex flex-col w-4/5 ml-7 mr-7'>
                <Header />
                <section className='grid grid-cols-4 grid-rows-3 gap-10 bg-gray-100 p-7 rounded-2xl overflow-hidden'>
                    <div className='col-span-2'><AvStorage /></div>
                    <div className='col-start-3 col-span-2 row-span-2'><ContactBlock /></div>
                    {cards.map((card) => {
                        return (
                            <DocsCard title={card.title} space_filled={card.space_filled} last_update={card.last_update} icon={card.icon} iconBgColor={card.iconBgColor} />
                        )
                    })}
                    <div className='col-start-3 col-span-2'><Invite /></div>
                </section>
            </section>
            <section>

            </section>
        </main>
    )
}

export default Dashboard
