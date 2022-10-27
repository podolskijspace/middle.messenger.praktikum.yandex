import { router } from './../core/Router';

export const onSubmit = (containerQuery:string, apiRequest) => {
  const container:HTMLElement = document.querySelector(containerQuery) as HTMLElement

  if (container) {
    const elemsInputs = [...container.querySelectorAll('input')]

    const payload:Record<string, string> = {};

    elemsInputs.forEach(item => {
      if (item.id) {
        payload[item.id] = item.value;
      }
    })

    const result = apiRequest(JSON.stringify(payload))

    console.log(result)
  }
}

export function isEqual(lhs:unknown, rhs:unknown):boolean {
  return lhs === rhs;
}

export function onLink(e: MouseEvent, url:string) {
  e.preventDefault();

  router.go(`${url}`)
}