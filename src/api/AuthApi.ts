import { HTTP } from '../core/HTTP';
import { BaseAPI } from '../core/BaseApi';

// Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class AuthApi extends BaseAPI {
  signUp(payload: any) {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return HTTP.post(`https://ya-praktikum.tech/api/v2/auth/signup`, {
        data: payload, 
        mode: 'cors', 
        headers: {
        'content-type': 'application/json', // Данные отправляем в формате JSON
        },
      });
  }
}

export const authApi = new AuthApi()