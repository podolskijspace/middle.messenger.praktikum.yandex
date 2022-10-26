export const onSubmit = (containerQuery:string) => {
  const container:Nullable<HTMLElement> = document.querySelector(containerQuery)

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
