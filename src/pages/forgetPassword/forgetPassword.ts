// @ts-nocheck
// src/pages/onboarding/onboarding.ts
import Block from "../../core/Block";
import { onLink } from "../../utils/helpers";

export class ForgetPasswordPage extends Block {
  constructor() {
    super();

    this.setProps({
      onLink: (e): void => onLink(e, "/auth"),
      formMod: "auth__form",
      formItems: [{ name: "email", text: "Почта", type: "email" }],
      formButtons: [{ href: "auth", text: "Восстановить пароль" }],
    });
  }

  render() {
    return `
    
    <section class="auth">
      <div class="container">
        <div class="auth__wrapper">
          <form class="form {{formMod}}">
            <h1 class="form__title">{{pageName}}</h1>
            {{{Input name="email" type="email" text="Почта" }}}
            <div class="form__buttons">
              {{{Button text="Назад" onClick=onLink}}}
              {{{Button text="Восстановить пароль"}}}
            </div> 
          </form>
        </div>
      </div>
    </section>`;
  }
}
