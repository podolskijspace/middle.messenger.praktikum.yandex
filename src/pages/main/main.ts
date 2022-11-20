// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import { onSubmit } from '../../utils/helpers';
import { authApi } from '../../api/AuthApi';
import { connect } from '../../core/Store';
import store from "../../core/Store";
import {chatApi} from "../../api/ChatApi";
import {message} from "../../utils/message";

const getUserInfo = async () => {
  const result = await authApi.getUserInfo()
    .then(result => JSON.parse(result.response))
  const name = `${result.second_name} ${result.first_name}`

  store.set("user", {name, avatar: result.avatar})
}

const onCreateChat = ():void => {
  const modal = document.querySelector("#modal-create-chat")

  modal?.classList.remove('active')
}

const contextElems = (onOpenUsersModal, onDeleteChat, ) => [
  {
    title: "Список пользователей",
	  callback: onOpenUsersModal
  },
  {
    title: "Удалить чат",
	  callback: onDeleteChat
  },
]

let currentChatId = null;
let chatUsers = [];

const onOpenModal = (selector):void => {
	const modal = document.querySelector(selector)

	modal?.classList.add('active')
}

class Main extends Block {
  constructor() {
    super();

    getUserInfo();
    this.getChats();

    this.setProps({
      contextElems: contextElems(this.onOpenUsersModal.bind(this), this.onDeleteChat.bind(this)),
      onOpenModal: this.onOpenModal,
      onContextMenu: this.onContextMenu.bind(this),
      onCreateChat: () => onSubmit({
        query: "#modal-create-chat",
        api: (payload) => chatApi.createChat(payload),
        successMessage: "Чат успешно создан",
        callback: () => {
          onCreateChat();
          this.getChats.apply(this)
        },
      }),
      onSmallChatClick: this.onSmallChatClick.bind(this),
      onContextElemClick: this.onContextElemClick.bind(this),
      onButtonClick: this.onButtonClick.bind(this),
      onLogout: ():any => onSubmit({
          api: () => authApi.logout(), 
          url: '/auth',
          successMessage: 'Вы успешно вышли из системы'
        }),
    })
  }

	async onDeleteChat():void {
		if (currentChatId) {
			await chatApi.deleteChat(JSON.stringify({chatId: +currentChatId}))
			message.success("Чат успешно удален");
			this.getChats();
		}
	}

	onOpenCreateChatModal() {
		onOpenModal("#modal-create-chat")
	}

	async onOpenUsersModal() {
		if (currentChatId) {
			const result = await chatApi.getChatUsers(currentChatId)
				.then(result => JSON.parse(result.response))
			this.setProps({chatUsers: result})
			onOpenModal("#modal-users")
		}


	}

  onContextElemClick(event):void {
		const target = event.target.closest('.context-menu__item')
	  if (target) {
			const id = +target.dataset.id;
		  this.props.contextElems[id].callback();
	  }
  }

  onContextMenu(event):void {
    event.preventDefault()
    const contextElem = document.querySelector('.context-menu') as HTMLDivElement;
    const x = event.clientX;
    const y = event.clientY;
		currentChatId = event.target.closest('.chat-small').dataset.id;
    contextElem.style.top = `${y + 2}px`;
    contextElem.style.left = `${x + 2}px`;
		contextElem.classList.add('active');

    document.body.addEventListener('click', this.deleteContextMenu)
  }


  deleteContextMenu(event):void {
    if (!event.target.closest('.context-menu') || event.target.closest('.context-menu__item')) {
      const contextElem = document.querySelector('.context-menu') as HTMLDivElement;
	    contextElem.classList.remove('active');
      document.body.removeEventListener('click', this.deleteContextMenu)
    }
  }

  onSmallChatClick(event) {
    const target = event.target.closest('.chat-small')
    const id = target.dataset.id;
    let activeChat;
    const chats = this.props.chats?.map(chat => {
      if (chat.id == id) {
        activeChat = chat;
        return {...chat, active: true}
      } else {
        return {...chat, active: false}
      }
    })
      this.setProps({
        activeChat: activeChat ? activeChat : false,
        chats
      })
  }

  async getChats () {
    const result = await chatApi.getChats()
      .then(result => JSON.parse(result.response))

    this.setProps({
      chats: result,
      activeChat: false
    })
  }

  onButtonClick():void {
    console.log(this)
  }

  render() {
    return `
    <div> 
      <section class="messenger">
        <div class="messenger__left">
          <div class="messenger__top">
            <div class="search">
              <div class="search__button">
                <i class="fa fa-cog" aria-hidden="true"></i>
              </div>
              <input type="text" class="search__input">
              
              <div class="search__button">
                {{{ButtonWithIcon icon="fa-plus" onClick=onOpenCreateChatModal}}}
              </div>
            </div>
          </div>
          <ul class="chats">
            ${this.props.chats?.map(chat => (
              ` {{{ChatSmallComponent 
                  onClick=onSmallChatClick
                  title="${chat.title}"
                  last_message="${chat.last_message?.content}"
                  id="${chat.id}"
                  active="${chat.active}"
                  onContextMenu=onContextMenu
                }}}`
            ))?.join('')}
          </ul>
        </div>
        <div class="messenger__right">
          <div class="messenger__top right__top">
            <div class="chat-info">
              <div class="chat-info__name">
                ${this.props.activeChat ? (`
                    ${this.props.activeChat.title}
                `) : ""}
              </div>
              <div class="chat-info__settings">
                {{{Button text="Выйти" onClick=onLogout}}}
              </div>
            </div>
          </div>
          <div class="chat">
            ${this.props.activeChat ? (
              `
                <ul class="chat__list">
                  <li class="chat__item">
                    <div class="chat__wrapper">
                      <ul class="chat__list-messages">
<!--                        <li class="chat__item-messages">-->
<!--                          <div class="chat__wrapper-messages">-->
<!--                            <div class="chat__name">-->
<!--                              Артем-->
<!--                            </div>-->
<!--                            <div class="chat__text">-->
<!--                              Привет, хотел у тебя давно спросить, как твои дела?-->
<!--                            </div>-->
<!--                            <time class="chat__time">-->
<!--                              16:03-->
<!--                            </time>-->
<!--                            <div class="chat__status">-->
<!--                              <i class="fa fa-check" aria-hidden="true"></i>-->
<!--                            </div>-->
<!--                          </div>-->
<!--                        </li>-->
                      </ul>
                    </div>
                  </li>
                </ul>
            `) : `
              <div class="chat__pick-chat">
                Выберите чат из списка слева
              </div>
            `}
          </div>
          <div class="write">
          ${this.props.activeChat ? (
            `
              <form class="form form--horizontal" onSubmit={{onSubmit}}>
                <textarea name="message" class="write-message"></textarea>
                <button class="write__button button">Отправить</button>
              </form>
            `) : ""}
          </div>
        </div>
      </section>
      <div class="modal" id="modal-create-chat">
        <div class="modal__wrapper">
          <form class="form">
            <ul class="form__list">
                <li class="form__item">
                  <label class="form__label" for="title">Заголовок чата</label>
                  <input class="form__input" id="title" type="text" name="title">
                </li>
            </ul>
            <div class="form__buttons">
              {{{Button text="Создать чат" onClick=onCreateChat}}}
            </div> 
          </form>
        </div>
      </div>
      <div class="modal" id="modal-users">
        <div class="modal__wrapper">
          <form class="form">
						<ul>
							${this.props.chatUsers?.map(user => {
								const {display_name, first_name, second_name} = user
								return (` 
 									<li>
										<div>
											${display_name ? display_name : `${second_name} ${first_name}`}
										</div> 
									</li> `
              )})?.join('')}
						</ul>
            <div class="form__buttons">
              {{{Button text="Создать чат" onClick=onCreateChat}}}
            </div> 
          </form>
        </div>
      </div>
      {{{ContextMenu onClick=onContextElemClick elems=contextElems}}}
    </div>
    `;
  }
}

function mapUserToProps(state) {
  return {
    name: state.user.name,
    avatar: state.user.avatar,
    chats: state.chats,
  };
}

const MainPage = connect(Main, mapUserToProps)
// const MainPage = Main;

export {MainPage}

// <div class="modal">
//   <div class="modal__wrapper">
//     <form class="form form--settings">
//       <ul class="form__list">
//         {{#each formItems}}
//           <li class="form__item">
//             <label class="form__label" for="{{this.name}}">{{this.text}}</label>

//             <input class="form__input" type="{{this.type}}" name="{{this.name}}">
//           </li>
//         {{/each}}
//       </ul>
//       <div class="form__buttons">
//         {{#each formButtons}}
//           <a class="form__button button" href="{{this.href}}">{{this.text}}</a>
//         {{/each}}
//       </div>
//     </form>
//   </div>
// </div>
