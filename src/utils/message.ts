class Message {
  message: HTMLDivElement | undefined;

  constructor () {
    this.initialization();
  }

  success (e: string) {
    if (this.message) {
      this.message.classList.add('success')
      this.message.classList.add('work')
      
      this.message.textContent = e;

      setTimeout(()=>{
        if (this.message) {
          this.message.classList.remove('work')
        }
      }, 3000)

      setTimeout(()=>{
        if (this.message) {
          this.message.classList.remove('success')
        }
      }, 4000)
    }
  }


  error (e: string) {
    if (this.message) {
      this.message.classList.add('error')
      this.message.classList.add('work')
      
      this.message.textContent = e;

      setTimeout(()=>{
        if (this.message) {
          this.message.classList.remove('work')
        }
      }, 3000)

      setTimeout(()=>{
        if (this.message) {
          this.message.classList.remove('error')
        }
      }, 4000)
    }
  }

  initialization () {
    const message = this.createMessage();
  
    document.body.insertAdjacentElement('beforebegin', message);

    this.message = message;
  }

  createMessage ():HTMLDivElement {
    const message = document.createElement('div');

    message.classList.add('tooltip-message');

    return message;
  }
}

export const message = new Message()