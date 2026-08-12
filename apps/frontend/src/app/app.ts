import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WebSocketService } from './web-socket.service';
import { ChatMessage } from '@mars-colony/my-types';

@Component({
  imports: [RouterModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App implements OnInit {
  protected title = 'frontend';

  httpClient = inject(HttpClient);
  socketService = inject(WebSocketService);

  ngOnInit() {
    // this.httpClient.get('/api/hello').subscribe((data) => {
    //   console.log(data);
    // });

    // this.socketService.listenToMessages().subscribe((message) => {
    //   console.log('Received message from server:', message);
    // });
    this.socketService.listenToMessages().subscribe({
      next: (message: ChatMessage) => {
        console.log('Received message from server:', message);
      }
    });

    this.socketService.sendMessage({
      sender: 'Frontend',
      message: 'Hello from Angular!',
      timestamp: Date.now(),
    });
  }
}
