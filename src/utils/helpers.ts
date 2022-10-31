import { router } from './../core/Router';
import { message } from './message';

type submitPayload = {
  query?: string,
  api: () => any,
  url: string,
  successMessage: string,
}

export const onSubmit = async ({query, api, url, successMessage}:submitPayload) => {
  const container:HTMLElement = document.querySelector(query) as HTMLElement

  console.log(successMessage)
  let result
  if (container) {
    const elemsInputs = [...container.querySelectorAll('input')]

    const payload:Record<string, string> = {};

    elemsInputs.forEach(item => {
      if (item.id) {
        payload[item.id] = item.value;
      }
    })

    result = await api(JSON.stringify(payload))
  } else {
    result = await api(JSON.stringify())
  }

  

  if (result.status === 200) {
    message.success(successMessage);
    router.go(`${url}`);
  } else {
    console.warn(result);
    message.error(JSON.parse(result.responseText)?.reason || "Ошибка");
  }
}

export function isEqual(lhs:unknown, rhs:unknown):boolean {
  return lhs === rhs;
}

export function onLink(e: MouseEvent, url:string) {
  e.preventDefault();

  router.go(`${url}`)
}