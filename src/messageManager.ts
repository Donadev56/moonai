import { CommandContext, Context } from "grammy";
import { MessageInterface, Messages } from "./interface.js";
import { Prompt } from "./prompt.js";


class MessageManager {
   private messagesSaved : Map<number , Messages > = new Map()

    async updateMessages (newMessages : MessageInterface[] , ctx : CommandContext<Context> ) {
        try {
            const id = ctx.chatId
            if (this.messagesSaved.has(id)) {
                this.messagesSaved.set(id, newMessages)
                console.log("New message saved from :", id)
                return true
            } else {
                const systemMessage : MessageInterface = {
                    role : "system",
                    content : Prompt
                }
                const userDataMessageFromSys : MessageInterface = {
                    role : "system",
                    content : `Here is the information you will need to create logical and friendly conversations with the user.
                     This is user data available on Telegram, always be smiling and respond with emoji to make the conversation enjoyable : ${JSON.stringify(ctx.from)}`
                }
                const messageListInit =  [userDataMessageFromSys , systemMessage, newMessages[0]]
                this.messagesSaved.set(id , messageListInit)
                console.log("Initial messages updated")
                return true
            }

            
        } catch (error) {
            console.error(error)
            return false

        }
    }

 
    async getMessageWithID (chatID : number) {

        try {
            if (this.messagesSaved.has(chatID)) {
                return this.messagesSaved.get(chatID)
            } else {
                return []
            }
            
        } catch (error) {
            console.error(error)
            return []
            
        }
    
    }
    
}


export const MessageManagerInstance = new MessageManager()