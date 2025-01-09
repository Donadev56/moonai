
import { CommandContext, Context } from "grammy";

export interface MessageInterface {
    content : string
    role : "system" | "user" | "assistant"
    images ? : Uint8Array[] | string[] | undefined
}

export type Messages = MessageInterface []


export  interface  ChatRequest  { 
    
    model: string
    
    messages: Messages,
    
    stream: boolean

}

export interface UserBasicData {
    id: number; 
    is_bot: boolean; 
    first_name: string; 
    last_name?: string;
    username?: string;
    language_code?: string; 
    is_premium?: boolean; 
    
}

export type MessageContext  = CommandContext<Context>