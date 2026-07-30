import { ChatMessage, SocketEvents } from '@mars-colony/my-types';
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*', // В продакшене укажите конкретный URL вашего Angular приложения
    credentials: true,
  },
})
export class ChatGateway {
  @WebSocketServer()
  server: Server;

  // Срабатывает при подключении клиента
  handleConnection(client: Socket) {
    console.log(`Клиент подключен: ${client.id}`);
  }

  // Срабатывает при отключении клиента
  handleDisconnect(client: Socket) {
    console.log(`Клиент отключен: ${client.id}`);
  }

  // Слушаем события от клиента
  @SubscribeMessage(SocketEvents.SendMessage)
  handleMessage(
    @MessageBody() data: ChatMessage,
    @ConnectedSocket() client: Socket
  ): void {
    console.log(`Получено сообщение от ${data.sender}: ${data.message}`);

    // Рассылаем сообщение ВСЕМ подключенным клиентам
    this.server.emit(SocketEvents.ReceiveMessage, data);
  }
}
