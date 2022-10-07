import Block from '../../core/Block';

interface FormProps {
  onSubmit?: (event:any) => void;
  type?: 'text' | 'password' | 'email';
  placeholder?: string;
  value?: string;
  error?: string;
}

export class Form extends Block {
  constructor({onSubmit = (event:any) => {event.preventDefault();console.log(event)}, type = 'text', error, placeholder, value}: FormProps) {
    super({type, placeholder, value, error, events: {submit: onSubmit}});
  }

  protected render(): string {
    return `
    <form class="form form--horizontal" onSubmit={{onSubmit}}>
    
      <textarea name="message" class="write-message"></textarea>
      <button class="write__button button">Отправить</button>
    </form>
    `
  }
}