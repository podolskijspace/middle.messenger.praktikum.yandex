import { router } from './../core/Router';
import { message } from './message';

export const onSubmit = async (containerQuery:string, apiRequest, url) => {
  const container:HTMLElement = document.querySelector(containerQuery) as HTMLElement

  if (container) {
    const elemsInputs = [...container.querySelectorAll('input')]

    const payload:Record<string, string> = {};

    elemsInputs.forEach(item => {
      if (item.id) {
        payload[item.id] = item.value;
      }
    })

    const result = await apiRequest(JSON.stringify(payload))

    if (result.status === 200) {
      message.success('Пользователь зарегистрирован');
      router.go(`${url}`);
    } else {
      console.warn(result);
      message.error(JSON.parse(result.responseText)?.reason || "Ошибка");
    }
  }
}

export function isEqual(lhs:unknown, rhs:unknown):boolean {
  return lhs === rhs;
}

export function onLink(e: MouseEvent, url:string) {
  e.preventDefault();

  router.go(`${url}`)
}