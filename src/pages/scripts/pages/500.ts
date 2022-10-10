
import Handlebars from "handlebars";

const source:string = `
<div class="error-page">
  <div class="error-page__num">
    500
  </div>
  <div class="error-page__text">
    Страница не найдена
  </div>
  <a class="button link" href="/">
    Вернуться на главную
  </a>
</div>`


const template = Handlebars.compile(source)

const errorPage = template(null)

export {errorPage}
