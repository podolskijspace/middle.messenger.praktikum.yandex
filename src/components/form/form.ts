// @ts-nocheck
import Block from "../../core/Block";

interface Form {
  icon: string;
  className?: string;
  onSubmit: () => void;
  items: [];
}

export class Form extends Block {
  constructor({ icon, items, onSubmit, className }: Form) {
    super({ icon, items, className, events: { submit: onSubmit } });
  }

  static componentName = "Form";

  protected render(): string {
    return `
    <form class="form form--settings">
	    <ul class="form__list">
        <li class="form__item">
          <label class="form__label" for="oldPassword">Старый пароль</label>
          <input class="form__input" id="oldPassword" type="text" name="oldPassword">
        </li>
        <li class="form__item">
          <label class="form__label" for="newPassword">Новый пароль</label>
          <input class="form__input" id="newPassword" type="text" name="newPassword">
        </li>
        <li class="form__item">
          <label class="form__label" for="rePassword">Повторите пароль</label>
          <input class="form__input" data-not-add="true" id="rePassword" type="text" name="rePassword">
        </li>
	    </ul>
	    <div class="form__buttons">
	      {{{Button text="Изменить пароль" type="submit"}}}
	    </div> 
	  </form>
    `;
  }
}
