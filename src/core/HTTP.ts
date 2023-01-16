type optionsType = {
  timeout?: number;
  headers?: Record<string, string>;
  method?: string;
  data?: payloadData;
};

type responseMethod = (url: string, options?: optionsType) => Promise<void>;

const METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};
// Самая простая версия. Реализовать штучку со всеми проверками им предстоит в конце спринта
// Необязательный метод
function queryStringify(data: object) {
  if (typeof data === "object") {
    throw new Error("Data must be object");
  }
  // Здесь достаточно и [object Object] для объекта
  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => {
    return `${result}${key}=${data[key]}${index < keys.length - 1 ? "&" : ""}`;
  }, "?");
}

class HTTPTransport {
  get: responseMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.GET },
      options.timeout
    );
  };
  post: responseMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.POST },
      options.timeout
    );
  };
  put: responseMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.PUT },
      options.timeout
    );
  };
  delete: responseMethod = (url, options = {}) => {
    return this.request(
      url,
      { ...options, method: METHODS.DELETE },
      options.timeout
    );
  };
  request = (
    url: string,
    options: optionsType = {},
    timeout: number = 5000
  ): Promise<void> => {
    const { headers = {}, method, data } = options;
    return new Promise(function (resolve, reject) {
      if (!method) {
        reject("No method");
        return;
      }
      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;
      xhr.open(
        method,
        isGet && !!data ? `${url}${queryStringify(data as object)}` : url
      );
      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.withCredentials = true;

      xhr.onload = function () {
        // @ts-ignore
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        // @ts-ignore
        xhr.send(data);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState != 4) return;

        //TODO: Неправильно работает
        // if (xhr.status >= 400) {
        //   throw new Error('Ошибка')
        // }
      };
    });
  };
}

export const HTTP = new HTTPTransport();
