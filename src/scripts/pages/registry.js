
import Handlebars from "handlebars";

const source = `
<section class="auth">
  <div class="container">
    <div class="auth__wrapper">
      <form class="form {{formMod}}">
        <h3 class="form__title">{{pageName}}</h3>
        {{#each formItems}}
          <div class="form__item">
            <label class="form__label" for="{{this.name}}">{{this.text}}</label>
            <input class="form__input auth__input" type={{this.type}}" name="{{this.name}}">
            {{#if this.password}}
              <a class="auth__forgetPass" href="forget-password.hbs">Восстановить пароль</a>
            {{/if}}
          </div>
        {{/each}}
        <div class="form__buttons">
          {{#each formButtons}}
            <a class="form__button button" href="{{this.href}}">{{this.text}}</a>
          {{/each}}
        </div> 
      </form>
    </div>
  </div>
</section>`


const root = document.querySelector('#root');
const template = Handlebars.compile(source)

const data = {
  "formMod": "auth__form",
  "formItems": [
    {"name": 'first_name', "text": 'Имя', "type": 'text'},
    {"name": 'second_name', "text": 'Фамилия', "type": 'text'},
    {"name": 'login', "text": 'Логин', "type": 'text'},
    {"name": 'email', "text": 'Почта', "type": 'email'},
    {"name": 'password', "text": 'Пароль', "type": 'password'},
    {"name": 'repeatPassword', "text": 'Повторите пароль', "type": 'password'},
  ],
  formButtons: [
    {"href": 'auth.hbs', "text": 'Зарегистрироваться'},
  ]
}

const registryPage = template(data)

export {registryPage}
