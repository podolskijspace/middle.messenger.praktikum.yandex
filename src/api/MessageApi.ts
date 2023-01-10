// @ts-nocheck
import { HTTP } from "../core/HTTP";
import { BaseAPI } from "../core/BaseApi";
import { BASE_URL } from "../constants/main";

class MessageApi extends BaseAPI {
  getToken(chat_id: unknown) {
    return HTTP.post(`${BASE_URL}/chats/token/${chat_id}`);
  }

  createWebSocket(USER_ID, CHAT_ID, TOKEN_VALUE) {
    return new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${USER_ID}/${CHAT_ID}/${TOKEN_VALUE}`
    );
  }

  // createWebSocket(payload:unknown) {
  // 	return HTTP.put(`https://ya-praktikum.tech/api/v2/user/profile`, {
  // 		data: payload,
  // 		headers: {
  // 			'content-type': 'application/json', // Данные отправляем в формате JSON
  // 		}
  // 	})
  // }
}

export const messageApi = new MessageApi();
