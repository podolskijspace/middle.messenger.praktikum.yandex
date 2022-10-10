// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';

export class RegistryPage extends Block {
  constructor() {
    super();

    this.setProps({
      formMod: "auth__form",
      formItems: [
        {name: 'login', text: 'Логин', type: 'text'},
        {name: 'email', text: 'Почта', type: 'email'},
        {name: 'password', text: 'Пароль', type: 'password'},
        {name: 'repeatPassword', text: 'Повторите пароль', type: 'password'},
      ],
      formButtons: [
        {href: 'auth', text: 'Зарегистрироваться'},
      ]
    })
  }

  onBlur () {
    console.log('blur')
  }

  render() {
    return`<section class="auth">
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
              {{{Input name="password" type="password" text="Пароль"}}}
            </div>
            <div class="form__item">
              {{{Input name="repeatPassword" type="password" text="Повторите пароль"}}}
            </div>
            <div class="form__buttons">
              {{#each formButtons}}
                <a class="form__button button link" href="{{this.href}}">{{this.text}}</a>
              {{/each}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}

// {{#if this.password}}
//   <a class="auth__forgetPass link" href="forget-password">Восстановить пароль</a>
// {{/if}}