import { render } from "./render";

const links = ():void => {
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll('.link');

  links.forEach(link => {
    if (!link.classList.contains('active')) {
      link.addEventListener('click', linkWorker);
      link.classList.add('active')
    }
  })
}

// TODO: Заменить на нормальный тип
const linkWorker = (e:MouseEvent):void => {
  e.preventDefault();
  if (e.target instanceof HTMLAnchorElement) {
    window.history.pushState({}, 'new', e.target.href)
    render()
  }
}

export {links};