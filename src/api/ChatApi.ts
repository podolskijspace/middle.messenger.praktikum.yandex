import { HTTP } from '../core/HTTP';
import { BaseAPI } from './BaseApi';

//Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class ChatAPI extends BaseAPI {
  create() {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return HTTP.post(`$/api/v1/chats/`, {title: 'string'});
  }

  request() {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return HTTP.get('/api/v1/chats/full');
  }
}

export const chatApi = new ChatAPI()