'use client'

import { assets } from "@/assets/assets";
import Message from "@/components/Message";
import PromptBox from "@/components/PromptBox";
import SideBar from "@/components/sidebar";
import { AppContext } from "@/context/AppContext";
import Image from "next/image";
import { useContext, useEffect, useRef, useState } from "react";

export default function Home() {
  const [expand,setExpand] = useState(false);
  const [messages,setMessages] = useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const {selectedChat} = useContext(AppContext);
  const containerRef = useRef(null);

  useEffect(() =>{
    if(selectedChat){
      setMessages(selectedChat.messages)
    }
  },[selectedChat])

  useEffect(() =>{
    if(containerRef.current){
      containerRef.current.scrollTo({
      top: containerRef.current.scrollheight,
      behavior: "smooth"
    })
  }

  },[messages])
  

  return (
    <div>
      <div className="flex h-screen">

        <SideBar expand={expand} setExpand={setExpand}/>

        <div className="flex-1 flex flex-col items-center justify-center px-4 pb-8 bg-black text-white relative">
          <div className="md:hidden absolute px-4 top-6 flex items-center justify-between w-full">
            <Image onClick = {()=>(expand? setExpand(false): setExpand(true))} className="rotate-180" src={assets.menu_icon} alt=""/>
            <Image className="opacity-70" src={assets.chat_icon} alt=""/>
          </div>

          {messages.length  === 0 ? 
            (<>
              <div className="flex items-center gap-3">
                {/* <Image src={assets.logo_icon} alt="" className="h-16"/> */}
                <p className="text-2xl font-medium">Hi, Im chatbot</p>
              </div>
              <p>How can I help you today?</p>
            </>) 
            :
            (<div ref={containerRef}
              className="relative flex flex-col items-center justify-start w-full mt-20 max-h-screen overflow-y-auto"
            >
              <p className="fixed top-8 border border-transparent hover:border-gray-500/ 50 py-1 px-2 rounded-lg font-semibold mb-6">{selectedChat.name}</p>
              {messages.map((msg,index) =>(
                 <div key={messages._id || index}>
                  <Message role={msg.role} content={msg.content}/>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-4 max-w-3xl w-full py-3">
                  {/* <Image className="h-9 w-9 p-1 border border-white/15 rouned-full" src={assets.logo_icon} alt= "logo"/> */}
                  <div className="loader flex justify-center items-center gap-1">
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                    </div>
                    <div className="w-1 h-1 rounded-full bg-white animate-bounce">
                    </div>
                  </div>
                </div>
              )}
              
            </div>)
          }

          <PromptBox isLoading={isLoading} setIsLoading={setIsLoading}/>
          
          <p className="text-xs absolute bottom-1 text-gray-500">AI-generated for reference only</p>

        </div>
      </div>
    </div> 
  );
}
