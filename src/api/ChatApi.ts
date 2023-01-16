import { HTTP } from "../core/HTTP";
import { BaseAPI } from "../core/BaseApi";
import { BASE_URL, JSON_DATA_HEADER } from "../constants/main";

//Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class ChatAPI extends BaseAPI {
  getChats() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.get(`${BASE_URL}/chats`);
  }
  createChat(payload: payloadData) {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.post(`${BASE_URL}/chats`, {
      data: payload,
      headers: {
        ...JSON_DATA_HEADER,
      },
    });
  }

  deleteChat(payload: payloadData) {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.delete(`${BASE_URL}/chats`, {
      data: payload,
      headers: {
        ...JSON_DATA_HEADER,
      },
    });
  }

  getChatUsers(chat_id: payloadData) {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.get(`${BASE_URL}/chats/${chat_id}/users`);
  }

  addUserToChat(payload: payloadData) {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.put(`${BASE_URL}/chats/users`, {
      data: payload,
      headers: {
        ...JSON_DATA_HEADER,
      },
    });
  }

  deleteUserFromChat(payload: payloadData) {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.delete(`${BASE_URL}/chats/users`, {
      data: payload,
      headers: {
        ...JSON_DATA_HEADER,
      },
    });
  }

  request() {
    // Здесь уже не нужно писать полный путь /api/v1/chats/
    return HTTP.get("/api/v1/chats/full");
  }
}

export const chatApi = new ChatAPI();
