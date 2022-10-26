// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import { profileInputs } from './constants';

export class EditProfile extends Block {
  constructor() {
    super();

    this.setProps({
      formMod: "edit-profile__form",
      pageName:"Редактирование профиля",
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
              <div class="input">
                <label class="form__label" for="${item.name}">${item.text}</label>
                <div class="input__value"> ${item.value} </div>
                
              </div>
              `
            ))}
            <div class="form__buttons">
              {{{Button text="Редактировать"}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}
