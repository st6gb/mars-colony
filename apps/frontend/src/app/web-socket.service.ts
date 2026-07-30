import { Injectable, OnDestroy } from '@angular/core';
import { ChatMessage, SocketEvents } from '@mars-colony/my-types';
import { Observable, Subscriber } from 'rxjs';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socket: Socket;

  constructor() {
    // Укажите URL вашего NestJS сервера
    this.socket = io('http://localhost:3000', {
      transports: ['websocket'], // Рекомендуется для явного использования WebSocket протокола
    });
  }

  // Метод для отправки сообщений на сервер
  sendMessage(message: ChatMessage): void {
    this.socket.emit(SocketEvents.SendMessage, message);
  }

  // Метод для прослушивания сообщений с сервера
  listenToMessages(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((subscriber: Subscriber<ChatMessage>) => {
      this.socket.on(SocketEvents.ReceiveMessage, (data: ChatMessage) => {
        subscriber.next(data);
      });

      // Корректно отписываемся от события при уничтожении потока
      return () => {
        this.socket.off(SocketEvents.ReceiveMessage);
      };
    });
  }

  ngOnDestroy(): void {
    if (this.socket) {
      this.socket.disconnect();
    }
  }
}
