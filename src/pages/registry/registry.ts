// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import { onSubmit } from '../../utils/helpers';

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
            <h3 class="form__title">{{pageName}}</h3>
            <div class="form__item">
              {{{Input name="first_name" type="text" text="Имя" rule="string"}}}
            </div>
            <div class="form__item">
              {{{Input name="second_name" type="text" text="Фамилия"}}}
            </div>
            <div class="form__item">
              {{{Input name="login" type="text" text="Логин"}}}
            </div>
            <div class="form__item">
              {{{Input name="email" type="email" text="Почта"}}}
            </div>
            <div class="form__item">
              {{{Input name="password" type="password" text="Пароль" rule="password" errorMessage="Пароль должен содержать 1 заглвную и 1 строчную букву, 1 символ, 1 цифру, и быть не менее 8 символов"}}}
            </div>
            <div class="form__item">
              {{{Input name="repeatPassword" type="password" text="Повторите пароль"}}}
            </div>
            <div class="form__buttons">
              {{{Button text="Зарегистрироваться" onClick=onSubmit}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}
