import {Block} from "../../NewBlock";
type Chat = {
  id: string | number, 
  name: string, 
  text: string, 
  active?: boolean
}

type State = {
  chats: Chat[]
}

class MainPage extends Block {
  state: State;
  _createState() {
    this.state = {
      chats:[
        {name: "Артем Иванов", id: 0, active: true, text: "Артем: Привет, хотел у тебя давно спросить, как твои дела? как твои дела? как твои дела? как твои дела?"},
        {name: "Артем Иванов", id: 1, text: "Артем: Привет, хотел у тебя давно спросить, как твои дела? как твои дела? как твои дела? как твои дела?"},
        {name: "Артем Иванов", id: 2, text: "Артем: Привет, хотел у тебя давно спросить, как твои дела? как твои дела? как твои дела? как твои дела?"},
        {name: "Артем Иванов", id: 3, text: "Артем: Привет, хотел у тебя давно спросить, как твои дела? как твои дела? как твои дела? как твои дела?"}
      ]
    }
  }

  _addListeners() {
    const elems:NodeListOf<HTMLElement> = this._element.querySelectorAll('.chat-small')
    elems.forEach(item => {
      item.addEventListener('click', this.changePickedChat.bind(this))
    })
  }

  // _deleteListeners() {
  //   this.elems.forEach(item => {
  //     item.removeEventListener('click', this.changePickedChat.bind(this))
  //   })
  // }

  changePickedChat(elem: any) {
    const currentId = +elem.target.closest('.chat-small').dataset.id
    const newChats = [...this.state.chats].map(item => (
      {...item, active: item.id === currentId}
    ));

    this._setState({
      ...this.state, chats: newChats
    })


  }
}

export {MainPage}
