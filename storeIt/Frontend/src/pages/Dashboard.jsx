import React from 'react'
import SideBar from '../components/SideBar'
import Header from '../components/Header'
import AvStorage from '../components/AvStorage'
import ContactBlock from '../components/ContactBlock'
import Invite from '../components/Invite'

const Dashboard = () => {
    return (
        <main className='flex'>
            <section className='w-1/5'>
                <SideBar />
            </section>
            <section className='flex flex-col w-4/5 ml-7 mr-7'>
                <Header />
                <section className='grid grid-cols-4 grid-rows-3 gap-10'>
                    <div className='col-span-2'><AvStorage /></div>
                    <div className='col-start-3 col-span-2 row-span-2'><ContactBlock /></div>
                    <div>Documents</div>
                    <div>Images</div>
                    <div>Video, Audio</div>
                    <div>Others</div>
                    <div className='col-start-3 col-span-2'><Invite /></div>
                </section>
            </section>
        </main>
    )
}

export default Dashboard
