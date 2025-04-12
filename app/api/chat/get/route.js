import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function GET(req){
    try{
        const {userId} = getAuth(req);

        if(!userId){
            return NextResponse.json({
                success:false,
                message: "User not authenticated"
            })
        }

        await connectDB();
        const messages = await Chat.find({userId});
        return NextResponse.json({
            success: false,
            messages
        });

    }catch(err){
         console.log(" Error in fetching chat",err);
            return NextResponse.json({
                success: false,
                message: "Error in fetching user's messages"
            })

    }
}