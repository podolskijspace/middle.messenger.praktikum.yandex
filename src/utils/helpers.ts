// @ts-nocheck
import { router } from '../core/Router/Router';
import { message } from './message';

type submitPayload = {
  query?: string,
  api: () => any,
  url: string,
  successMessage: string,
  callback?: () => void,
	notStringify?: boolean,
	event?: any,
}

export const onSubmit = async ({event, query, api, url, successMessage, callback = () => {}, notStringify}:submitPayload) => {
	event?.preventDefault();
	const container:HTMLElement = document.querySelector(query) as HTMLElement
  let result
  if (container) {
    const elemsInputs = [...container.querySelectorAll('input')]
    const payload:Record<string, string> = {};
    elemsInputs.forEach(item => {
      if (item.id && !item.dataset.notAdd) {
        payload[item.id] = item.value;
      }
    })


    result = await api(notStringify ? payload : JSON.stringify(payload))
  } else {
    result = await api()
  }

  if (result.status === 200) {
    message.success(successMessage);
    if (url) {
      router.go(`${url}`);
    }
    callback();
  } else {
    console.warn(result);
    message.error(JSON.parse(result.responseText)?.reason || "Ошибка");
  }
}

export const checkResultToError = (result) => {
	if (result?.status === 200) {
		try {
			const answer = JSON.parse(result.response);

			return answer;
		} catch (e) {
			message.error(e || "Неудача при парсенге")
		}
		return result
	} else {
		message.error(JSON.parse(result?.responseText)?.reason || "Что-то пошло не так")
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


export function set(object: Indexed, path: string, value: unknown): Indexed | unknown {
	if (typeof path !== 'string') {
    throw new Error('path должен быть строкой')
  }

  if (!isObject(object)) {
    return object
  }

  const arrayPath = path.split('.')

  if (arrayPath.length === 1) {
    object[arrayPath[0]] = value
    return object
  }

  arrayPath.reduceRight((prev, current, index) => {
    if (arrayPath.length - 1 === index) {
      prev[current] = value
      return  prev
    } else if (index === 0) {
      return object[current] = prev
    } else {
      return {[current]: prev}
    }
  }, {} as Indexed)

  return object
}

type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}

function isArrayOrObject(value: unknown): value is [] | PlainObject {
  return isPlainObject(value) || isArray(value);
}

export function isEqualObj(lhs: PlainObject, rhs: PlainObject) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
      return false;
  }

  for (const [key, value] of Object.entries(lhs)) {
      const rightValue = rhs[key];
      if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
          if (isEqualObj(value, rightValue)) {
              continue;
          }
          return false;
      }

      if (value !== rightValue) {
          return false;
      }
  }

  return true;
}

type newIndexed<T = undefined> = {
  [key in string]: T | newIndexed
}

type arr<T = undefined> = Array<newIndexed | T>

type something<T = unknown> = T | newIndexed | arr

type IndexedWIthArray = newIndexed | Array<something>



// Авторское решение https://playcode.io/874530 
// ПЕРЕДЕЛАТЬ ПОД АВТОРСКОЕ, ТОЛЬКО УПРОСТИТЬ!!! (надо ли??)
function cloneDeep(obj: IndexedWIthArray):IndexedWIthArray {
  const array = isArray(obj)
  if (array) {
    const newArray = [] as arr;
    (obj as arr).forEach((item, i) => {
      if (isObject(item) || isArray(item)) {
        newArray[i] = cloneDeep(item as IndexedWIthArray) as newIndexed
      } else {
        newArray[i] = item
      }
    })
    return [...newArray]
  } else if (isObject(obj)) {
    const newObj:newIndexed = {} as newIndexed;
    for (let key in obj) {
      if (isObject((obj as newIndexed)[key] || isArray((obj as newIndexed)[key]))) {
        newObj[key] = cloneDeep((obj as newIndexed)[key] as newIndexed) as newIndexed;
      } else {
        newObj[key] = (obj as newIndexed)[key]
      }
    }

    return {...newObj}
  } else {
    throw new Error('Вы передали неправильный параметр')
  }
}

export const isUndefinedOrFalse = (elem:undefined):boolean =>{
  return !!(elem !== "undefined" && elem !== "false" && elem && elem !== "null")
}

export const addZero = (num) => {
	return num < 10 ? `0${num}` : num
}

export default cloneDeep; 

const objects = [{ 'a': 1 }, { 'b': 2 }];
const deep = cloneDeep(objects);
