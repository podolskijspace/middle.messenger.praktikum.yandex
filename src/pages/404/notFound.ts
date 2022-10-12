// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';

export class NotFountPage extends Block {
  constructor() {
    super();

  }

  render() {
    return`<div class="error-page">
      <div class="error-page__num">
        404
      </div>
      <div class="error-page__text">
        Страница не найдена
      </div>
      {{{Button text="Вернуться на главную"}}}
    </div>`;
  }
}
