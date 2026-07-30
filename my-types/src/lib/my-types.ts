export interface ChatMessage {
  sender: string;
  message: string;
  timestamp: number;
}

export enum SocketEvents {
  SendMessage = 'msgToServer',
  ReceiveMessage = 'msgToClient'
}

