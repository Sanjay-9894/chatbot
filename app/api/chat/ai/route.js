export const maxDuration = 60;
import connectDB from "@/config/db";
import Chat from "@/models/chat";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
    baseURL: 'https://api.deepseek.com',
    apiKey: process.env.DEEPSEEK_API_KEY
});

export async function POST(req) {
    try {
        const { userId } = getAuth(req);
        const { chatId, prompt } = await req.json();

        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "User not authenticated"
            });
        }

        await connectDB();
        let data = await Chat.findOne({ userId, _id: chatId });

        const userPrompt = {
            role: "user",
            content: prompt,
            timestamp: Date.now()
        };

        if (!data) {
            // Create a new chat document if it doesn't exist
            data = new Chat({
                _id: chatId,
                userId,
                name:'New Chat',
                messages: [userPrompt]
            });
        } else {
            // Append the new message to the existing chat
            data.messages.push(userPrompt);
        }

        const completion = await openai.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "deepseek-chat",
            store: true,
        });

        const message = completion.choices[0].message;
        message.timestamp = Date.now();

        data.messages.push(message);
        await data.save();

        return NextResponse.json({
            success: true,
            data: message
        });

    } catch (err) {
        console.log("error in ai", err);
        return NextResponse.json({
            success: false,
            data: err.message
        });
    }
}
