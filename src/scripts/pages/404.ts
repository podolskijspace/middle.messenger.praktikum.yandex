
import Handlebars from "handlebars";

const source:string = `
<div class="error-page">
  <div class="error-page__num">
    404
  </div>
  <div class="error-page__text">
    Страница не найдена
  </div>
  <a class="button link" href="/">
    Вернуться на главную
  </a>
</div>`


const template = Handlebars.compile(source)

const notFoundPage = template(null)

export {notFoundPage}
