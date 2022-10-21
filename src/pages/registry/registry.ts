// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import { onSubmit } from '../../utils/helpers';
import { ValidateRules } from '../../utils/constants';
import {rules} from '../../utils/constants'

interface IRegistryInput {
  name: string,
  type: string,
  text: string,
  rule?: rules
}

const registryInputs:Array<IRegistryInput> = [
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

export class RegistryPage extends Block {
  constructor() {
    super();

    this.setProps({
      formMod: "auth__form",
      onSubmit: ():void => onSubmit("#auth")
    })
  }

  render() {
    return`<section class="auth" id="auth">
      <div class="container">
        <div class="auth__wrapper">
          <form class="form {{formMod}}">
            <h1 class="form__title">{{pageName}}</h1>
            ${registryInputs.map(item => (
              `
              <div class="form__item">
                {{{Input name="${item.name}" type="${item.type}" text="${item.text}" ${item.rule ? `rule="${item.rule}" errorMessage="${ValidateRules[item.rule].message}"` : null} }}}
              </div>
              `
            ))}
            <div class="form__buttons">
              {{{Button text="Зарегистрироваться" onClick=onSubmit}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}
