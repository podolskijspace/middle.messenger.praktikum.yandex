import { HTTP } from '../core/HTTP';
import { BaseAPI } from '../core/BaseApi';
import {BASE_URL, JSON_DATA_HEADER} from "../constants/main";

// Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class AuthApi extends BaseAPI {
  signUp(payload: any) {
      // Здесь уже не нужно писать полный путь /api/v1/chats/
      return HTTP.post(`${BASE_URL}/v2/auth/signup`, {
        data: payload, 
        headers: {
          ...JSON_DATA_HEADER
        },
      });
  }

  signIn(payload: any) {
    return HTTP.post(`${BASE_URL}/auth/signin`, {
      data: payload, 
      headers: {
	      ...JSON_DATA_HEADER
      },
    });
  }

  logout() {
    return HTTP.post(`${BASE_URL}/auth/logout`);
  }

  getUserInfo () {
    return HTTP.get(`${BASE_URL}/auth/user`)
  }
}

export const authApi = new AuthApi()