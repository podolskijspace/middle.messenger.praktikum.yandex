// src/pages/onboarding/onboarding.ts
import Block from "../../core/Block";

interface IErrorInterface {
  status?: number;
  text?: string;
}

export class ErrorPage extends Block {
  constructor({ status = 500, text = "Ошибка" }: IErrorInterface = {}) {
    super({ status, text });
  }

  render() {
    return `<div class="error-page">
      <div class="error-page__num">
        {{status}}
      </div>
      <div class="error-page__text">
        {{text}}
      </div>
      {{{Button text="Вернуться на главную"}}}
    </div>`;
  }
}
