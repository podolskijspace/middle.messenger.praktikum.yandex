// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import { onSubmit } from '../../utils/helpers';
import { ValidateRules } from '../../utils/constants';
import { registryInputs } from './constants';

export class RegistryPage extends Block {
  constructor() {
    super();

    this.setProps({
      formMod: "auth__form",
      pageName:"Регистрация",
      onSubmit: ():void => onSubmit("#registry")
    })
  }

  render() {
    return`<section class="auth" id="registry">
      <div class="container">
        <div class="auth__wrapper">
          <form class="form {{formMod}}">
            <h1 class="form__title">{{pageName}}</h1>
            ${registryInputs.map(item => (
              `
              <div class="form__item">
                {{{Input name="${item.name}" type="${item.type}" text="${item.text}" ${item.rule ? `rule="${item.rule}" errorMessage="${ValidateRules[item.rule].message}"` : ""} }}}
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
