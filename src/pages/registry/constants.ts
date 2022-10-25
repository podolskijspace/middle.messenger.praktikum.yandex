export const registryInputs:Array<IInputs> = [
  {
    name: 'first_name',
    type: 'text',
    text: 'Имя',
    rule: 'rusString',
  },
  {
    name: 'second_name',
    type: 'text',
    text: 'Фамилия',
    rule: 'rusString',
  },
  {
    name: 'login',
    type: 'text',
    text: 'Логин',
    rule: 'login',
  },
  {
    name: 'email',
    type: 'email',
    text: 'Почта',
    rule: 'email',
  },
  {
    name: 'password',
    type: 'password',
    text: 'Пароль',
    rule: 'password',
  },
  {
    name: 'repeatPassword',
    type: 'password',
    text: 'Повторите пароль',
  },
]