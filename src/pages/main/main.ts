// @ts-nocheck
// src/pages/onboarding/onboarding.ts
import Block from '../../core/Block';
import {addZero, isUndefinedOrFalse, onSubmit, checkResultToError} from '../../utils/helpers';
import { authApi } from '../../api/AuthApi';
import { connect } from '../../core/Store';
import store from "../../core/Store";
import {chatApi} from "../../api/ChatApi";
import {message} from "../../utils/message";
import {userApi} from "../../api/UserApi";
import {messageApi} from "../../api/MessageApi";
import {isArray} from "../../utils/helpers";

const getUserInfo = async () => {
  const result = await authApi.getUserInfo()
	const answer = checkResultToError(result)
	if (answer) {
		return answer;
		// store.set("user", result)
	}
}

const onCreateChat = ():void => {
  const modal = document.querySelector("#modal-create-chat")

  modal?.classList.remove('active')
}

const onCloseChangePasswordModal = ():void => {
	const modal = document.querySelector("#modal-change-password")

	modal?.classList.remove('active')
}

const onCloseEditProfileModal = ():void => {
	const modal = document.querySelector("#modal-edit-profile")

	modal?.classList.remove('active')
}

const settingsList = [
	{
		label: "first_name",
		text: "Имя",
		type: "text",
	},
	{
		label: "second_name",
		text: "Фамилия",
		type: "text",
	},
	{
		label: "display_name",
		text: "Отображаемое имя",
		type: "text",
	},
	{
		label: "login",
		text: "Логин",
		type: "text",
	},
	{
		label: "email",
		text: "Почта",
		type: "email",
	},
	{
		label: "phone",
		text: "Телефон",
		type: "text",
	},
]

const onAddUser = ():void => {
	const modal = document.querySelector("#modal-add-user-to-chat")

	modal?.classList.remove('active')
}

const contextElems = (onOpenUsersModal, onOpenAddUserToChat, onDeleteChat) => [
  {
    title: "Список пользователей",
	  callback: onOpenUsersModal
  },
	{
		title: "Добавить пользователя в чат",
		callback: onOpenAddUserToChat
	},
  {
    title: "Удалить чат",
	  callback: onDeleteChat
  },
]

const settingsElems = (onChangePassword, onEditProfile, onEditAvatar) => [
	{
		title: "Сменить пароль",
		callback: onChangePassword
	},
	{
		title: "Редактировать профиль",
		callback: onEditProfile
	},
	{
		title: "Изменить аватар",
		callback: onEditAvatar
	},
	{
		title: "Выйти из системы",
		callback: () => console.log('Выход из системы в разработке')
	},
]

let currentChatId = null;

const onOpenModal = (selector):void => {
	const modal = document.querySelector(selector)

	modal?.classList.add('active')
}


const deleteContextMenu = (event):void => {
	if (!event.target.closest('.context-menu') || event.target.closest('.context-menu__item')) {
		const contextElem = document.querySelector('.context-menu') as HTMLDivElement;
		contextElem.classList.remove('active');
		document.body.removeEventListener('click', deleteContextMenu)
	}
}

const onContextMenu = (event) => {
	const contextElem = document.querySelector('.context-menu') as HTMLDivElement;
	const x = event.clientX;
	const y = event.clientY;
	contextElem.style.top = `${y + 2}px`;
	contextElem.style.left = `${x + 2}px`;
	contextElem.classList.add('active');

	document.body.addEventListener('click', deleteContextMenu)
}

class Main extends Block {
  constructor(props) {
    super(props);
    this.getChats();
		this.getUserInfo();

    this.setProps({
	    contextElems: [],
	    messages: [],
	    onChangeUserAvatar: this.onChangeUserAvatar.bind(this),
	    onDeleteUserFromChat: this.onDeleteUserFromChat.bind(this),
	    onOpenCreateChatModal: this.onOpenCreateChatModal,
	    onSendMessage: this.onSendMessage.bind(this),
      onContextMenu: this.onContextMenu.bind(this),
	    closeModal: this.closeModal.bind(this),
	    onEditProfile: () => onSubmit({
		    query: "#modal-edit-profile",
		    api: (payload) => userApi.editProfile(payload),
		    successMessage: "Данные о пользователе изменены",
		    callback: () => {
			    onCloseEditProfileModal();
		    },
	    }),
      onCreateChat: () => onSubmit({
        query: "#modal-create-chat",
        api: (payload) => chatApi.createChat(payload),
        successMessage: "Чат успешно создан",
        callback: () => {
          onCreateChat();
          this.getChats.apply(this)
        },
      }),
	    onChangePassword: (event) => {
		    onSubmit({
			    query: "#modal-change-password",
			    event,
			    api: (payload) => userApi.changePassword(payload),
			    successMessage: "Пароль изменен",
			    callback: () => {
				    onCloseChangePasswordModal();
			    },
		    })
		    console.log('working');
	    },
	    onAddUserToChat: () => onSubmit({
		    query: "#modal-add-user-to-chat",
		    api: (payload) => {
					const newPayload = JSON.stringify({users: [+payload.user_id], chatId: currentChatId})
			    chatApi.addUserToChat(newPayload)
		    },
		    notStringify: true,
		    successMessage: "Пользователь добавлен в чат",
		    callback: () => {
			    onAddUser();
		    },
	    }),
      onSmallChatClick: this.onSmallChatClick.bind(this),
      onContextElemClick: this.onContextElemClick.bind(this),
	    onSettingsButton: this.onSettingsButton.bind(this),
      onLogout: ():any => onSubmit({
          api: () => authApi.logout(), 
          url: '/auth',
          successMessage: 'Вы успешно вышли из системы'
        }),
    })
  }

	async onChangeUserAvatar(event) {
		const form = event.target.closest('form');
		const formData = new FormData(form);
		const result = await userApi.editAvatar(formData)
		if (checkResultToError(result)) {
			message.success("Аватар изменен");
			this.closeModal(event);
		}
	}

	async onDeleteUserFromChat(event):void {
		const id = event.target.closest('.chat-user-list').dataset.id;
		const payload = JSON.stringify({
			users: [id],
			chatId: currentChatId
		})
		const result = await chatApi.deleteUserFromChat(payload);
		if (checkResultToError(result)) {
			this.onOpenUsersModal();

			message.success('Пользователь удален')
		}
	}

	onSendMessage (event) {
		const form = document.querySelector('#add-message-to-chat')
		const textarea = form.querySelector('textarea');

		this.props.socket.send(JSON.stringify({
		  content: textarea.value,
		  type: 'message',
		}));
		textarea.value = "";
	}

	async onDeleteChat():void {
		if (currentChatId) {
			const result = await chatApi.deleteChat(JSON.stringify({chatId: +currentChatId}));
			if (checkResultToError(result)) {
				message.success("Чат успешно удален");
				this.getChats();
			}
		}
	}

	closeModal(event) {
		const modal = event.target.closest('.modal');
		modal.classList.remove('active')
	}

	onOpenCreateChatModal() {
		onOpenModal("#modal-create-chat")
	}

	onOpenAddUserToChat() {
		onOpenModal("#modal-add-user-to-chat")
	}

	onOpenChangePasswordModal() {
		onOpenModal("#modal-change-password")
	}

	async getUserInfo() {

		const result = await getUserInfo();
		if (result) {
			this.setProps({userInfo: result})
		}
		return result
	}

	async onOpenEditProfileModal() {
		const result = await this.getUserInfo();
		if (result) {
			onOpenModal("#modal-edit-profile");
		}
	}

	async onEditAvatar() {
		onOpenModal("#modal-edit-avatar");
	}



	async onOpenUsersModal() {
		if (currentChatId) {
			const result = await chatApi.getChatUsers(currentChatId)
			const payload = checkResultToError(result)
			if (payload) {
				this.setProps({chatUsers: payload})
				onOpenModal("#modal-users")
			}

		}
	}

  onContextElemClick(event):void {
		const target = event.target.closest('.context-menu__item')
	  if (target) {
			const id = +target.dataset.id;
		  this.props.contextElems[id].callback();
	  }
  }

	onSettingsButton(event):void {
		event.stopPropagation();
		this.setProps({
			contextElems: settingsElems(
				this.onOpenChangePasswordModal.bind(this),
				this.onOpenEditProfileModal.bind(this),
				this.onEditAvatar.bind(this),
				// this.onDeleteChat.bind(this)
			)
		})
		onContextMenu(event)
	}

  onContextMenu(event):void {
	  currentChatId = event.target.closest('.chat-small').dataset.id;
    event.preventDefault()
	  this.setProps({
		  contextElems: contextElems(
		  	this.onOpenUsersModal.bind(this),
		    this.onOpenAddUserToChat.bind(this),
		    this.onDeleteChat.bind(this)
		  )
	  })
	  onContextMenu(event)
  }

  async onSmallChatClick(event) {
    const target = event.target.closest('.chat-small')
    const CHAT_ID = target.dataset.id;
    let activeChat;
    const chats = this.props.chats?.map(chat => {
      if (chat.id == CHAT_ID) {
        activeChat = chat;
        return {...chat, active: true}
      } else {
        return {...chat, active: false}
      }
    })

	  //Сокеты:
		const TOKEN_VALUE = await messageApi.getToken(CHAT_ID)
			.then(result => {
				const answer = JSON.parse(result.response);
				return answer.token
			})

	  const USER_ID = this.props.userInfo.id
		const socket = messageApi.createWebSocket(USER_ID, CHAT_ID, TOKEN_VALUE);

	  socket.addEventListener('open', () => {
		  console.log('Соединение установлено');
			this.setProps({messages: [], socket})

		  socket.send(JSON.stringify({
			  content: '0',
			  type: 'get old',
		  }));
	  });

	  socket.addEventListener('close', event => {
		  if (event.wasClean) {
			  console.log('Соединение закрыто чисто');
		  } else {
			  console.log('Обрыв соединения');
		  }

		  console.log(`Код: ${event.code} | Причина: ${event.reason}`);
	  });

	  socket.addEventListener('message', event => {
			const result = JSON.parse(event.data);
		  console.log('Получены данные', result);
			const array = isArray(result) ? [...result] : [result]
			this.setProps({messages: [...array, ...this.props.messages]})
	  });

	  socket.addEventListener('error', event => {
		  console.log('Ошибка', event.message);
	  });

	  this.setProps({
      activeChat: activeChat ? activeChat : false,
      chats
    })
  }

  async getChats () {
    const result = await chatApi.getChats();
		const payload = checkResultToError(result);
	  if (payload) {
		  this.setProps({
			  chats: payload,
			  activeChat: false
		  })
	  }

  }

  render() {
    return `
		<main>
      <section class="messenger">
        <div class="messenger__left">
          <div class="messenger__top">
            <div class="search">
              <div class="search__button">
              	{{{ButtonWithIcon icon="fa-cog" onClick=onSettingsButton}}}
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
                  avatar="${chat.avatar}"
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
	                      ${this.props.messages.map(message =>{
													const date = new Date(message.time);
													const today = new Date;
													const todayFormatDate = `${addZero(today.getDate())}.${addZero(today.getMonth() + 1)}.${addZero(today.getFullYear())}`;
													const formatTime = `${addZero(date.getHours())}:${addZero(date.getMinutes())}`;
	                        const formatDate = `${addZero(date.getDate())}.${addZero(date.getMonth() + 1)}.${addZero(date.getFullYear())}`;
													return (`
														<li class="chat__item-messages">
															<div class="chat__wrapper-messages">
																<div class="chat__name">
																	${message.user_id}
																</div>
																<div class="chat__text">
																	${message.content}
																</div>
																<time class="chat__time">
																	${formatTime} ${todayFormatDate === formatDate ? "" : formatDate}
																</time>
																<div class="chat__status">
																	${message.is_read ? "<i class=\"fa fa-check\" aria-hidden=\"true\"></i>" : ""}
																</div>
															</div>
														</li>
													`)}
                        ).join('')}
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
            <form class="${`form form--horizontal${this.props.activeChat ? "" : " display-none"}`}" id="add-message-to-chat">
              <textarea name="message" class="write-message"></textarea>
              {{{Button text="Отправить" onClick=onSendMessage}}}
            </form>
          </div>
        </div>
      </section>
      
      <div class="modal" id="modal-edit-profile">
        <div class="modal__wrapper modal--settings">
        	{{{ButtonWithIcon className="modal__close" icon="fa-times" onClick=closeModal}}}
        	<div class="modal__user-avatar">
	          ${isUndefinedOrFalse(this.props.userInfo?.avatar) ? (`
							<img src="https://ya-praktikum.tech/api/v2/resources${this.props.userInfo.avatar}">
						`) : ""}
					</div>
          <form class="form">
            <ul class="form__list">
                ${settingsList.map(setting => {
									const userInfo = this.props.userInfo
									const value = userInfo ? userInfo[setting.label] : null;
									const setValue = value ? value : "" 
	                return (`
										<li class="form__item">
		                  <label class="form__label" for="${setting.label}">${setting.text}</label>
		                  <input class="form__input" id="${setting.label}" value="${setValue}" type="${setting.type}" name="${setting.label}">
		                </li>
									`)
								})?.join('')}
            </ul>
            <div class="form__buttons">
              {{{Button text="Сохранить" onClick=onEditProfile}}}
            </div> 
          </form>
        </div>
      </div>
      <div class="modal" id="modal-create-chat">
        <div class="modal__wrapper">
        	{{{ButtonWithIcon className="modal__close" icon="fa-times" onClick=closeModal}}}
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
      
      <div class="modal" id="modal-edit-avatar">
        <div class="modal__wrapper modal--settings">
        	{{{ButtonWithIcon className="modal__close" icon="fa-times" onClick=closeModal}}}
          <form class="form">
            <ul class="form__list">
                <li class="form__item">
                  <label class="form__label" for="avatar">Выберите новый аватар</label>
                  <input class="form__input" id="avatar" type="file" name="avatar" accept="image/*">
                </li>
            </ul>
            <div class="form__buttons">
              {{{Button text="Изменить аватар" onClick=onChangeUserAvatar}}}
            </div> 
          </form>
        </div>
      </div>
      <div class="modal" id="modal-add-user-to-chat">
        <div class="modal__wrapper modal--settings">
        	{{{ButtonWithIcon className="modal__close" icon="fa-times" onClick=closeModal}}}
          <form class="form">
            <ul class="form__list">
                <li class="form__item">
                  <label class="form__label" for="user_id">id пользователя</label>
                  <input class="form__input" id="user_id" type="text" name="user_id">
                </li>
            </ul>
            <div class="form__buttons">
              {{{Button text="Добавить пользователя" onClick=onAddUserToChat}}}
            </div> 
          </form>
        </div>
      </div>
      <div class="modal" id="modal-change-password">
        <div class="modal__wrapper">
        	{{{ButtonWithIcon className="modal__close" icon="fa-times" onClick=closeModal}}}
        	{{{Form onSubmit=onChangePassword}}}
<!--          <form class="form form&#45;&#45;settings">-->
<!--            <ul class="form__list">-->
<!--                <li class="form__item">-->
<!--                  <label class="form__label" for="oldPassword">Старый пароль</label>-->
<!--                  <input class="form__input" id="oldPassword" type="text" name="oldPassword">-->
<!--                </li>-->
<!--                <li class="form__item">-->
<!--                  <label class="form__label" for="newPassword">Новый пароль</label>-->
<!--                  <input class="form__input" id="newPassword" type="text" name="newPassword">-->
<!--                </li>-->
<!--                <li class="form__item">-->
<!--                  <label class="form__label" for="rePassword">Повторите пароль</label>-->
<!--                  <input class="form__input" data-not-add="true" id="rePassword" type="text" name="rePassword">-->
<!--                </li>-->
<!--            </ul>-->
<!--            <div class="form__buttons">-->
<!--              {{{Button text="Изменить пароль" onClick=onChangePassword}}}-->
<!--            </div> -->
<!--          </form>-->
        </div>
      </div>
      <div class="modal" id="modal-users">
        <div class="modal__wrapper">
        	{{{ButtonWithIcon className="modal__close" icon="fa-times" onClick=closeModal}}}
          <form class="form">
						<ul>
							${this.props.chatUsers?.map(user => {
								const {display_name, first_name, second_name, id} = user
								return (` 
 									<li class="flex chat-user-list" data-id=${id}>
										<div>
											${second_name} ${first_name}${display_name ? ` (${display_name})` : ''}
										</div> 
										{{{ButtonWithIcon icon="fa-close" onClick=onDeleteUserFromChat}}}
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
    </main>
    `;
  }
}

function mapUserToProps(state) {
  return {user: {
    ...state.user
  }};
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
