import { MainPage } from "./main"

const Main = ():any => {
  const source:string = `
    <section class="messenger">
      <div class="messenger__left">
        <div class="messenger__top">
          <div class="search">
            <input type="text" class="search__input">
            <div class="search__button">
              <i class="fa fa-cog" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <ul class="chats">
          {{#each chats}}
            <li data-id={{this.id}} class="chat-small {{#if this.active}}active{{/if}}">
              <div class="chat-small__wrapper">
                <div class="chat-small__avatar">
                  <div></div>
                </div>
                <div class="chat-small__info">
                  <div class="chat-small__name">
                    {{this.name}}
                  </div>
                  <div class="chat-small__last-message">
                    {{this.text}}
                  </div> 
                </div>
              </div>
            </li>
          {{/each}}
        </ul>
      </div>
      <div class="messenger__right">
        <div class="messenger__top right__top">
          <div class="chat-info">
            <div class="chat-info__name">
              Артем Иванов
            </div>
            <div class="chat-info__settings">
              <i class="fa fa-cog" aria-hidden="true"></i>
            </div>
          </div>
        </div>
        <div class="chat">
          <ul class="chat__list">
            <li class="chat__item">
              <div class="chat__wrapper">
                <ul class="chat__list-messages">
                  <li class="chat__item-messages">
                    <div class="chat__wrapper-messages">
                      <div class="chat__name">
                        Артем
                      </div>
                      <div class="chat__text">
                        Привет, хотел у тебя давно спросить, как твои дела?
                      </div>
                      <div class="chat__time">
                        16:03
                      </div>
                      <div class="chat__status">
                        <i class="fa fa-check" aria-hidden="true"></i>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          <div class="chat__pick-chat">
            Выберите чат из списка
          </div>
        </div>
        <div class="write">
          <textarea name="message" class="write-message"></textarea>
          <button class="write__button button">Отправить</button>
        </div>
      </div>
    </section>
    <div class="modal">
      <div class="modal__wrapper">
        <form class="form form--settings">
          <ul class="form__list">
            {{#each formItems}}
              <li class="form__item">
                <label class="form__label" for="{{this.name}}">{{this.text}}</label>
                <input class="form__input" type="{{this.type}}" name="{{this.name}}">
              </li>
            {{/each}}
          </ul>
          <div class="form__buttons">
            {{#each formButtons}}
              <a class="form__button button" href="{{this.href}}">{{this.text}}</a>
            {{/each}}
          </div> 
        </form>
      </div>
    </div>
  `

  const data:object = {
    formItems:[{name: 'first_name', text: 'Имя', type: 'text'}],
    formButtons: [{text: 'Сохранить'}]
  }
 
  const mainPage = new MainPage('div', {source, data, classNames: 'app'})
  // mainPage.init()

  console.log(mainPage._element)

  return mainPage._element;
}

export {Main};