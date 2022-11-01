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

type Indexed<T = unknown> = {
  [key in string]: T;
};

export const isObject = (value:unknown):boolean => {
  if (typeof value === 'object' &&
  !Array.isArray(value) &&
  value !== null) {
    return true;
  } else {
    return false;
  }
}

export const merge = (lhs: Indexed, rhs: Indexed): Indexed =>{
  const obj:Record<string, Indexed | unknown> = {};
  for (let key in lhs) {
    if (isObject(lhs[key])) {
      obj[key] = merge(lhs[key] as Indexed, {})
    } else {
      obj[key] = lhs[key]
    }
  }
  for (let key in rhs) {
    if (isObject(rhs[key])) {
      if (obj[key]) {
        obj[key] = merge(rhs[key] as Indexed, obj[key] as Indexed)
      } else {
        obj[key] = merge({}, rhs[key] as Indexed)
      }
    } else {
      if (obj[key]) {
      } else {
        obj[key] = rhs[key]
      }
    }
  }
  
  return obj;
}


function set(object: Indexed, path: string, value: unknown): Indexed | unknown {
	if (typeof path !== 'string') {
    throw new Error('path должен быть строкой')
  }

  if (!isObject(object)) {
    return object
  }

  const newObject = JSON.parse(JSON.stringify(object))

  const arrayPath = path.split('.')

  if (arrayPath.length === 1) {
    return {...newObject, [arrayPath[0]]: value}
  }

  arrayPath.reduceRight((prev, current, index) => {
    if (arrayPath.length - 1 === index) {
      prev[current] = value
      return  prev
    } else if (index === 0) {
      return newObject[current] = prev
    } else {
      return {[current]: prev}
    }
  }, {} as Indexed)

  return newObject
}

export default set

console.log(
  set({ foo: 5 }, 'bar.baz.bar', 10) // { foo: 5, bar: { baz: 10 } }
)

console.log(
  set({ foo: 5 }, 'bar', 10) // { foo: 5, baz: 10  }
)

console.log(
  set(3, 'foo.bar', 'baz') // 3
)