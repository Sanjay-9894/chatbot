import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useContext, useState} from 'react'
import { useClerk,UserButton } from '@clerk/nextjs'
import { AppContext, useAppContext } from '@/context/AppContext'
import ChatLabel from './ChatLabel'

const SideBar = ({expand,setExpand}) => {

    const {openSignIn} = useClerk();
    //using the context information using usecontext hook
    const {user,chats,createNewChat} = useContext(AppContext)
    const [openMenu,setOpenMenu] = useState({id:0, open:false})

  return (
    <div className={`flex flex-col justify-between  bg-slate-700 pt-7 transition-all z-50 max-md:absolute max-md:h-screen ${expand?'p-4 w-64':'md:w-20 w-0 max-md:overflow-hidden' }`}>   
      <div>
        <div className={`flex ${expand ? "flex-row gap-10" : "flex-col items-cent gap-8"}`}>
            {/* <Image className= {expand?"w-36": "w-10"} src={expand ? assets.logo_text: assets.logo_icon} alt=""/> */}
            {expand ?<p className='text-3xl text-white'>Chatbot</p> : " " }

            <div onClick={()=>expand ? setExpand(false): setExpand(true)} 
            className='group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer'>

                <Image src={assets.menu_icon} alt='' className='md:hidden'/>
                <Image src={expand ? assets.sidebar_close_icon: assets.sidebar_icon} alt="" className='hidden md:block w-7'/>
                <div className={`absolute w-max ${expand? "left-1/2 -translate-x-1/2 top-12":"-top-12 left-0"} opacity-0 group-hover:opacity-100 transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none`}>
                    {expand? "close sidebar": "open sidebar"}
                    <div className={`w-3 h-3 absolute bg-black rotate-45 ${expand ? "left-1/2 -top-1.5 -translate-x-1/2": " left-4 -bottom-1.5"}`}>

                    </div>
                </div>
            </div>
        </div>

        <button onClick={createNewChat} className={`mt-8 flex items-center jsutify-center cursor-pointer ${expand? "  bg-amber-400 hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max":"group relative h-9 w-9 mx-auto hover:bg-gray-500/30 rounded-lg"}`}>
            <Image className={expand?'w-6':'w-7'} src={expand ? assets.chat_icon : assets.chat_icon_dull} alt=''/>
            <div className='absolute w-max -top-12 -right-12 opacity-0 group-hover transition bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none'> 
                New Chat
                <div className='w-3 h-3 absolute bg-black rotate-45 left-4 -bottom-1.5'></div>
            </div>
            {expand && <p className='text-white text font-medium'>New Chat</p>}
        </button>

        <div className={`mt-8 text-white/25 text-sm ${expand ? "block" : "hidden"}`}>
            <p className='my-1'>Recents</p>
            {chats.map((chat) =>
             <ChatLabel name={chat.name} id={chat._id} openMenu={openMenu} setOpenMenu = {setOpenMenu}/>
            )}
            
        </div>

      </div>

      <div onClick={user ? null : openSignIn}>
        <div className={`flex items-center ${expand ? "hover:bg-white/10 rounded-lg":"justify-center w-full"} gap-3 text-white/60 text-xl mt-2 cursor-pointer mb-2`}>
            {
                user ? <UserButton/> :   <Image src={assets.profile_icon} alt='' className='w-7'/>
            }

            {expand && <span>My Profile</span>}
              
        </div>

      </div>
    </div>
  )
}

export default SideBar
