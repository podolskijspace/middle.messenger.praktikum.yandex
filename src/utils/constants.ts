interface IValidateRule {
  reg: RegExp;
  message: string;
}

export type rules = 'password' | 'rusString' | 'login' | 'email';


export const ValidateRules:Record<rules, IValidateRule> = {
  password: {
    reg: /^[0-9a-zA-Z!"#$%&'()*+,-.\\\/:;<=>?@\[\]^_`{|}~;]{8,}$/g,
    message: 'Пароль должен состоять из английских букв. Содержать 1 маленькую и 1 большую букву, содержать символ. Быть не менее 8 символов',
  },
  rusString: {
    reg: /^[А-Я]{1}[а-я]{0,15}$/g,
    message: 'Значение поля должно начинаться с большой буквы и содержать только русские буквы',
  },
  login: {
    reg: /^[A-Za-z\d]{1,15}$/g,
    message: 'Логин должен содержать только английский буквы и цифры',
  },
  email: {
	  // reg: /^[A-Za-z\d]{4,}@[A-Za-z]{3,}\.[A-Za-z]{2,}$/g,
	  reg: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g,
    message: 'Почта должна быть вида info@mail.ru',
  },
}
