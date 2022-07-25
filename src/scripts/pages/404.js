
import Handlebars from "handlebars";

const source = `<div class="error-page">
<div class="error-page__num">
  404
</div>
<div class="error-page__text">
  Страница не найдена
</div>
<button class="button">
  Вернуться на главную
</button>
</div>`


const root = document.querySelector('#root');
const template = Handlebars.compile(source)

data = {}

const notFoundPage = template(data)

export default notFoundPage