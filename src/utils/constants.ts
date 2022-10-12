export const rules:Record<string, RegExp> = {
  password: /^[0-9a-zA-Z!"#$%&'()*+,-.\\\/:;<=>?@\[\]^_`{|}~;]{8,}$/g,
  rusString: /^[А-Я]{1}[а-я]{4,}$/g,
  login: /^[A-Za-z0-9]{3,}$/g,
  email: /^[A-Za-z0-9]{4,}@[A-Za-z]{3,}\.[A-Za-z]{2,}$/g,
}