import { HTTP } from '../core/HTTP';
import { BaseAPI } from '../core/BaseApi';

//Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class ChatAPI extends BaseAPI {
  getChats() {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return HTTP.get(`https://ya-praktikum.tech/api/v2/chats`, );
  }
  createChat(payload:unknown) {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.post(`https://ya-praktikum.tech/api/v2/chats`,{
      data: payload,
      headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
      },
    });
  }

	deleteChat(payload:unknown) {
		// Здесь уже не нужно писать полный путь /api/v1/chats/
		return HTTP.delete(`https://ya-praktikum.tech/api/v2/chats`,{
			data: payload,
			headers: {
				'content-type': 'application/json', // Данные отправляем в формате JSON
			},
		});
	}

	getChatUsers(chat_id:unknown) {
		// Здесь уже не нужно писать полный путь /api/v1/chats/
		return HTTP.get(`https://ya-praktikum.tech/api/v2/chats/${chat_id}/users`);
	}

	addUserToChat(payload:unknown) {
		// Здесь уже не нужно писать полный путь /api/v1/chats/
		return HTTP.put(`https://ya-praktikum.tech/api/v2/chats/users`, {
			data: payload,
			headers: {
				'content-type': 'application/json', // Данные отправляем в формате JSON
			},
		});
	}

	deleteUserFromChat(payload:unknown) {
		// Здесь уже не нужно писать полный путь /api/v1/chats/
		return HTTP.delete(`https://ya-praktikum.tech/api/v2/chats/users`, {
			data: payload,
			headers: {
				'content-type': 'application/json', // Данные отправляем в формате JSON
			},
		});
	}

  request() {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return HTTP.get('/api/v1/chats/full');
  }
}

export const chatApi = new ChatAPI()