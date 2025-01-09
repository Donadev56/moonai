
import { Bot } from "grammy";
import { GetUserData, SaveUserData } from "./user.js";
import { ChatWithModel } from "./chat.js";


const bot = new Bot("")

bot.command('start', (ctx)=> {
    ctx.reply(`Hello ${ctx.from?.first_name} , Welcome to Eternal protocol ! `)
})

bot.on('message', async (ctx)=> {
    try {
        const savedUser = await GetUserData(String(ctx.chatId))         
        if (!savedUser.success) {
           const saveResponse = await SaveUserData(String(ctx.chatId) , ctx.from )
           if (!saveResponse.success) {
            console.error(saveResponse.response)
            ctx.reply("An error occred during message generation!")
           }
        }
        if (typeof ctx.message !== "undefined") {
          const response =    await ChatWithModel(ctx)
          if (!response) {
            ctx.reply("An error occured during response generation")
          }

        }
        
    } catch (error) {
        console.error(error)
        ctx.reply(error as string)
        
    }
})

bot.start()