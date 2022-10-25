import Block from '../../core/Block';
import { authInputs } from './constants';
import { ValidateRules } from '../../utils/constants';
import { onSubmit } from '../../utils/helpers';

export class AuthPage extends Block {
  constructor() {
    super();

    this.setProps({
      formMod: "auth__form", 
      onSubmit: ():void => onSubmit("#auth"),
      pageName:"Авторизация"
    })
  }

  render() {
    return`
    <section class="auth" id="auth">
      <div class="container">
        <div class="auth__wrapper">
          <form class="form {{formMod}}">
            <h1 class="form__title">{{pageName}}</h1>
            ${authInputs.map(item => (
              `
              <div class="form__item">
                {{{Input name="${item.name}" type="${item.type}" text="${item.text}" ${item.rule ? `rule="${item.rule}" errorMessage="${ValidateRules[item.rule].message}"` : ""} }}}
              </div>
              `
            ))}
            <div class="form__buttons">
              {{{Button text="Зарегистрироваться"}}}
              {{{Button text="Войти" onClick=onSubmit}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}