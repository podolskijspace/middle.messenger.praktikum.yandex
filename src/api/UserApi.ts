import { HTTP } from '../core/HTTP';
import { BaseAPI } from '../core/BaseApi';

// Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class UserApi extends BaseAPI {
	changePassword(payload:unknown) {
    return HTTP.put(`https://ya-praktikum.tech/api/v2/user/password`, {
	    data: payload,
	    headers: {
		    'content-type': 'application/json', // Данные отправляем в формате JSON
	    }
    })
  }

	editProfile(payload:unknown) {
		return HTTP.put(`https://ya-praktikum.tech/api/v2/user/profile`, {
			data: payload,
			headers: {
				'content-type': 'application/json', // Данные отправляем в формате JSON
			}
		})
	}
}

export const userApi = new UserApi()