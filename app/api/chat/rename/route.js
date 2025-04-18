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

        const{chatId,name} = await req.json();
        await connectDB()
        await Chat.findOneAndUpdate({
            _id: chatId,
            userId
        },{name})

        return NextResponse.json({
            success: true,
            message: "chat renamed"
        })


    }catch(err){
        console.log(" Error in creating chat",err);
        return NextResponse.json({
            success: false,
            message: "Error in Renaming chat"
        })

    }
}