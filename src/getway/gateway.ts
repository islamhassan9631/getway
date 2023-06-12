import { socket } from './../socket/socket.modules';
import { OnModuleInit } from '@nestjs/common';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";

import { Server } from 'socket.io'
import { Socket } from 'socket.io-client';

@WebSocketGateway({
    cors: {
        origin: ["https://web-stor.vercel.app/"]
    }
})
export class mygatway implements OnModuleInit  {


    @WebSocketServer()
    server: Server
    senderid: any
    tiem = new Date().getHours() + 1;

    userList = new Map()
    tiemmnt = new Date().getMinutes()
    logger: any;
    onModuleInit() {
        this.server.on("connect", (socket) => {
            this.senderid = socket.id
           
            console.log("connected");
            let userName =socket.id 
            socket.handshake.query.userName
            console.log(userName + "ghgfghfhg");

          

        })
        
    }
    handleDisconnect(neam= socket.handshake.query.userName){
        
        this.removeuser(neam,socket.id)
      }
    

   
   
    @SubscribeMessage('newMessage')
   
    onNewMessage(@MessageBody() body: any,) {
        console.log(body);

        this.server.emit("onNewMessage", {
            userName: body.name,
            msg: 'new message',
            content: body,
            timeeee: new Date().getHours() + 1,
            tiemmnt: new Date().getMinutes()
        })
        this.adduser(body.name, this.senderid)
          


        this.server.emit('user-list', [...this.userList.keys()])
    }
    @SubscribeMessage('newconvers')
   
    onMessage(@MessageBody() body: any,) {
        console.log(body);

        this.server.emit("onMessage", {
         senedby: body.name,
            msg: 'new message',
            content: body,
            timeeee: new Date().getHours() + 1,
            tiemmnt: new Date().getMinutes()
        })

    }
    adduser(userName, id) {
        if (!this.userList.has(userName)) {
            this.userList.set(userName, new Set(id))
            
        } else {
            this.userList.get(userName).add(id)
        }
    }
    removeuser(userName, id) {
      
        
        if (this.userList.has(userName)) {
            console.log(this.userList);
            let userid=this.userList.get(userName)
            if(userid.size==0){
                this.userList.delete(userName)
            }
            
        } 
        
    }
}