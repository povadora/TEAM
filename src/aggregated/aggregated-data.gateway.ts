import {
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { HouseholdsService } from 'src/barangay-service/households.service';
import { forwardRef, Inject } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
    credentials: true,
  },
})
export class AggregatedDataGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject(forwardRef(() => HouseholdsService))
    private readonly householdsService: HouseholdsService,
  ) {}

  async handleConnection(client: Socket) {
    console.log('Client connected:', client.id);
    const data = await this.householdsService.getAggregatedData();
    client.emit('initialData', data);
  }

  handleDisconnect(client: Socket) {
    console.log('Client disconnected:', client.id);
  }

  sendUpdatedData(event: string, data: any) {
    this.server.emit(event, data);
  }
}
