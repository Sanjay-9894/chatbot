import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try{
        const {userId} = getAuth(req);

        if(!userId){
            return NextResponse.json({
                success:false,
                message: "User not authenticated"
            })
        }

        const chatData = {
            userId,
            messages: [],
            name : "New chat"
        }

        await connectDB();
        await Chat.create(chatData);
        return NextResponse.json({
            success: true,
            message: "chat created"
        })


    }catch(err){
        console.log(" Error in creating chat",err);
        return NextResponse.json({
            success: false,
            message: "Error in creating newchat"
        })

    }
}