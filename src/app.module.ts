import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { socket } from './socket/socket.modules';
import { GatewayModule } from './getway/getway.module';

@Module({
  imports: [socket,GatewayModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
