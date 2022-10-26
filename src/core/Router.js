/* eslint-disable */
class Block {
  getContent() { }
  
  show() {
    console.log('show');
  }
  
  hide() {
    console.log('hide');
  }
}

class Chats extends Block {
  getContent() {
    return 'chats';
  }
  
  show() {
    console.log('show chats');
  }
  
  hide() {
    console.log('hide chats');
  }
}

class Users extends Block {
  getContent() {
    return 'users';
  }
  
  show() {
    console.log('show users');
  }
  
  hide() {
    console.log('hide users');
  }
}





// Необходимо оставить в силу особенностей тренажёра
history.pushState({}, '', '/');



// // Через секунду контент изменится сам, достаточно дёрнуть переход
// setTimeout(() => {
//   router.go("/users");
// }, 1000);

// // А можно и назад
// setTimeout(() => {
//   router.back();
// }, 3000);

// // И снова вперёд
// setTimeout(() => {
//   router.forward();
// }, 5000);