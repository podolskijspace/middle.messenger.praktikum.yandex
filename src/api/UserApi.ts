// @ts-nocheck
import { HTTP } from "../core/HTTP";
import { BaseAPI } from "../core/BaseApi";
import { BASE_URL, JSON_DATA_HEADER } from "../constants/main";

// Так можно делать, чтобы использовать базовый путь!!!

// const chatAPIInstance = new HTTP('api/v1/chats');

class UserApi extends BaseAPI {
  changePassword(payload: unknown) {
    return HTTP.put(`${BASE_URL}/user/password`, {
      data: payload,
      headers: {
        ...JSON_DATA_HEADER,
      },
    });
  }

  editProfile(payload: unknown) {
    return HTTP.put(`${BASE_URL}/user/profile`, {
      data: payload,
      headers: {
        ...JSON_DATA_HEADER,
      },
    });
  }

  editAvatar(formData: unknown) {
    return HTTP.put(`${BASE_URL}/user/profile/avatar`, {
      data: formData,
    });
  }
}

export const userApi = new UserApi();
