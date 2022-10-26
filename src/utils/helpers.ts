export const onSubmit = (containerQuery:string) => {
  const container:HTMLElement = document.querySelector(containerQuery) as HTMLElement

  if (container) {
    const elemsInputs = [...container.querySelectorAll('input')]

    const result:Record<string, string> = {};

    elemsInputs.forEach(item => {
      if (item.id) {
        result[item.id] = item.value;
      }
    })

    console.log(result)
  }
}

export function isEqual(lhs, rhs) {
  return lhs === rhs;
}
