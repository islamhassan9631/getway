import { Injectable, OnModuleInit } from "@nestjs/common";
import { log } from "console";

import { io ,Socket} from "socket.io-client";
@Injectable()
export class socketClient implements OnModuleInit{
    public socketClient: Socket;
    constructor(){
        this.socketClient=io('http://localhost:3001')
    }
    onModuleInit() {
        this.socketClient.on('connect',()=>{
           console.log("ggg");
           
        })
    }
}
