
import Handlebars from "handlebars";

const source:string = `
<section class="auth">
  <div class="container">
    <div class="auth__wrapper">
      <form class="form {{formMod}}">
        <h3 class="form__title">{{pageName}}</h3>
        {{#each formItems}}
          <div class="form__item">
            <label class="form__label" for="{{this.name}}">{{this.text}}</label>
            <input class="form__input auth__input" type="{{this.type}}" name="{{this.name}}">
            {{#if this.password}}
              <a class="auth__forgetPass link" href="forget-password">Восстановить пароль</a>
            {{/if}}
          </div>
        {{/each}}
        <div class="form__buttons">
          {{#each formButtons}}
            <a class="form__button button link" href="{{this.href}}">{{this.text}}</a>
          {{/each}}
        </div> 
      </form>
    </div>
  </div>
</section>`


const template = Handlebars.compile(source)

const data:Object = {
  formMod: "auth__form",
  formItems: [
    {name: 'name', text: 'Имя', type: 'text'},
    {name: 'password', text: 'Пароль', password: true, type: 'password'}
  ],
  formButtons: [
    {href: 'registry', text: 'Зарегистрироваться'},
    {href: '/', text: 'Войти'},
  ]
}

const authPage = template(data)

export {authPage}
