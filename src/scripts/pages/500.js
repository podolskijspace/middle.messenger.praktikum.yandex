
import Handlebars from "handlebars";

const source = `<div class="error-page">
<div class="error-page__num">
  500
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

const errorPage = template(data)

export default errorPage