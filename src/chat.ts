import ollama from 'ollama'
import { CommandContext, Context } from "grammy";
import {  MessageInterface } from './interface.js';
import { MessageManagerInstance } from './messageManager.js';
import { Prompt } from './prompt.js';

export const ChatWithModel = async ( ctx : CommandContext<Context>)=> {
    try {
        if (typeof ctx.message === "undefined") {
            console.error("No message found")
            return false
        }
        const newMessages : MessageInterface = {
            role: "user",
            content : ctx.message.text
        }
        const systemMessage : MessageInterface = {
            role : "system",
            content : Prompt
        }
        const userDataMessageFromSys : MessageInterface = {
            role : "system",
            content : `Here is the information you will need to create logical and friendly conversations with the user.
             This is user data available on Telegram, always be smiling and respond with emoji to make the conversation enjoyable : ${JSON.stringify(ctx.from)}`
        }
        let savedMessages = await MessageManagerInstance.getMessageWithID(ctx.chatId)
            if (savedMessages?.length === 0) {
                savedMessages = [...savedMessages, systemMessage , userDataMessageFromSys]
            }
            console.log("Saved message found .")
            console.log("Saved messages length :", savedMessages?.length)
            const newMessageList = [...savedMessages! , newMessages]
            console.log("Message list length :", newMessageList.length)
            await MessageManagerInstance.updateMessages(newMessageList, ctx)
            await ctx.api.sendChatAction(ctx.chatId , "typing")

            const reply = await ctx.reply("Thinking...")
            console.log("Sending the message to the model")
            const messageId = reply.message_id

            const chatResponse = await ollama.chat({
            
            model : "llama3.2:1b",
            messages : newMessageList, 
            stream : false,
            options : {
                temperature : 0.2
            }
        
            })
            console.log("response received")

        await ctx.api.editMessageText(ctx.chatId , messageId , "Building a response...")
        if (chatResponse.message) {
            const aiMessage = chatResponse.message
            const aiResponse : MessageInterface = {
                content :aiMessage.content,
                role : aiMessage.role as "assistant"

            }
            console.log("Replying and sending the response")
            await MessageManagerInstance.updateMessages([...newMessageList, aiResponse], ctx)
            await ctx.api.editMessageText(ctx.chatId , messageId , aiResponse.content)
            console.log("Data saved and response sent")

            return true
        } else {
            return false
        }
 
    } catch (error) {
        console.error(error)
        return false
        
    }
}