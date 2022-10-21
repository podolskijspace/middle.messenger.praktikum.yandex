// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';

export class AuthPage extends Block {
  constructor() {
    super();

    this.setProps({formMod: "auth__form", pageName:"Авторизация"})
  }

  render() {
    return`
    <section class="auth">
      <div class="container">
        <div class="auth__wrapper">
          <form class="form {{formMod}}">
            <h1 class="form__title">{{pageName}}</h1>
            <div class="form__item">
              {{{Input name="login" type="text" text="Логин" }}}
            </div>
            <div class="form__item">
              {{{Input name="password" type="password" text="Пароль" }}}
            </div>
            <div class="form__buttons">
              {{{Button text="Зарегистрироваться"}}}
              {{{Button text="Войти"}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}
