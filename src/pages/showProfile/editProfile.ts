// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import { onSubmit } from '../../utils/helpers';
import { ValidateRules } from '../../utils/constants';
import { profileInputs } from './constants';

export class EditProfile extends Block {
  constructor() {
    super();

    this.setProps({
      formMod: "edit-profile__form",
      pageName:"Редактирование профиля",
      onSubmit: ():void => onSubmit("#profile")
    })
  }

  render() {
    return`<section class="auth" id="profile">
      <div class="container">
        <div class="auth__wrapper">
          <form class="form {{formMod}}">
            <h1 class="form__title">{{pageName}}</h1>
            ${profileInputs.map(item => (
              `
              <div class="form__item">
                {{{Input name="${item.name}" type="${item.type}" text="${item.text}" ${item.rule ? `rule="${item.rule}" errorMessage="${ValidateRules[item.rule].message}"` : ""} }}}
              </div>
              `
            ))}
            <div class="form__buttons">
              {{{Button text="Редактировать" onClick=onSubmit}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}
