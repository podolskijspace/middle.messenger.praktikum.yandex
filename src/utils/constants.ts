interface IValidateRule {
  reg: RegExp;
  message: string;
}

export type rules = 'password' | 'rusString' | 'login' | 'email';


export const ValidateRules:Record<rules, IValidateRule> = {
  password: {
    reg: /^[0-9a-zA-Z!"#$%&'()*+,-.\\\/:;<=>?@\[\]^_`{|}~;]{8,}$/g,
    message: 'Пароль должен состоять из английских букв. Содержать 1 маленькую и 1 букву, содержать символ. Быть не менее 8 символов',
  },
  rusString: {
    reg: /^[А-Я]{1}[а-я]{4,}$/g,
    message: 'Значение поля должно начинаться с большой буквы и содержать только русские буквы',
  },
  login: {
    reg: /^[A-Za-z0-9]{3,}$/g,
    message: 'Логин должен содержать только английский буквы и цифры',
  },
  email: {
    reg: /^[A-Za-z0-9]{4,}@[A-Za-z]{3,}\.[A-Za-z]{2,}$/g,
    message: 'Почта должна быть вида info@mail.ru',
  },
}