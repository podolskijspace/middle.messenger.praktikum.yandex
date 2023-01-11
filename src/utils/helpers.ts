// @ts-nocheck
import { router } from "../core/Router/Router";
import { message } from "./message";

type submitPayload = {
  query?: string;
  api: () => any;
  url: string;
  successMessage: string;
  callback?: () => void;
  notStringify?: boolean;
  event?: any;
};

export const onSubmit = async ({
  event,
  query,
  api,
  url,
  successMessage,
  callback = () => {},
  notStringify,
}: submitPayload) => {
  event?.preventDefault();
  const container: HTMLElement = document.querySelector(query) as HTMLElement;
  let result;
  if (container) {
    const elemsInputs = [...container.querySelectorAll("input")];
    const payload: Record<string, string> = {};
    elemsInputs.forEach((item) => {
      if (item.id && !item.dataset.notAdd) {
        payload[item.id] = item.value;
      }
    });

    result = await api(notStringify ? payload : JSON.stringify(payload));
  } else {
    result = await api();
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
};

export const checkResultToError = (result) => {
  if (result?.status === 200) {
    try {
      const answer = JSON.parse(result.response);

      return answer;
    } catch (e) {
      message.error(e || "Неудача при парсенге");
    }
    return result;
  } else {
    message.error(
      JSON.parse(result?.responseText)?.reason || "Что-то пошло не так"
    );
  }
};

export function isEqual(lhs: unknown, rhs: unknown): boolean {
  return lhs === rhs;
}

export function onLink(e: MouseEvent, url: string) {
  e.preventDefault();

  router.go(`${url}`);
}

type Indexed<T = unknown> = {
  [key in string]: T;
};

export const isObject = (value: unknown): boolean => {
  if (typeof value === "object" && !Array.isArray(value) && value !== null) {
    return true;
  } else {
    return false;
  }
};

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  const obj: Record<string, Indexed | unknown> = {};
  for (let key in lhs) {
    if (isObject(lhs[key])) {
      obj[key] = merge(lhs[key] as Indexed, {});
    } else {
      obj[key] = lhs[key];
    }
  }
  for (let key in rhs) {
    if (isObject(rhs[key])) {
      if (obj[key]) {
        obj[key] = merge(rhs[key] as Indexed, obj[key] as Indexed);
      } else {
        obj[key] = merge({}, rhs[key] as Indexed);
      }
    } else {
      if (obj[key]) {
      } else {
        obj[key] = rhs[key];
      }
    }
  }

  return obj;
};

export function set(
  object: Indexed,
  path: string,
  value: unknown
): Indexed | unknown {
  if (typeof path !== "string") {
    throw new Error("path должен быть строкой");
  }

  if (!isObject(object)) {
    return object;
  }

  const arrayPath = path.split(".");

  if (arrayPath.length === 1) {
    object[arrayPath[0]] = value;
    return object;
  }

  arrayPath.reduceRight((prev, current, index) => {
    if (arrayPath.length - 1 === index) {
      prev[current] = value;
      return prev;
    } else if (index === 0) {
      return (object[current] = prev);
    } else {
      return { [current]: prev };
    }
  }, {} as Indexed);

  return object;
}

type PlainObject<T = any> = {
  [k in string]: T;
};

function isPlainObject(value: unknown): value is PlainObject {
  return (
    typeof value === "object" &&
    value !== null &&
    value.constructor === Object &&
    Object.prototype.toString.call(value) === "[object Object]"
  );
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
  [key in string]: T | newIndexed;
};

type arr<T = undefined> = Array<newIndexed | T>;

type something<T = unknown> = T | newIndexed | arr;

type IndexedWIthArray = newIndexed | Array<something>;

// Авторское решение https://playcode.io/874530
// ПЕРЕДЕЛАТЬ ПОД АВТОРСКОЕ, ТОЛЬКО УПРОСТИТЬ!!! (надо ли??)
function cloneDeep(obj: IndexedWIthArray): IndexedWIthArray {
  const array = isArray(obj);
  if (array) {
    const newArray = [] as arr;
    (obj as arr).forEach((item, i) => {
      if (isObject(item) || isArray(item)) {
        newArray[i] = cloneDeep(item as IndexedWIthArray) as newIndexed;
      } else {
        newArray[i] = item;
      }
    });
    return [...newArray];
  } else if (isObject(obj)) {
    const newObj: newIndexed = {} as newIndexed;
    for (let key in obj) {
      if (
        isObject((obj as newIndexed)[key] || isArray((obj as newIndexed)[key]))
      ) {
        newObj[key] = cloneDeep(
          (obj as newIndexed)[key] as newIndexed
        ) as newIndexed;
      } else {
        newObj[key] = (obj as newIndexed)[key];
      }
    }

    return { ...newObj };
  } else {
    throw new Error("Вы передали неправильный параметр");
  }
}

export const isUndefinedOrFalse = (elem: undefined): boolean => {
  return !!(
    elem !== "undefined" &&
    elem !== "false" &&
    elem &&
    elem !== "null"
  );
};

export const addZero = (num) => {
  return num < 10 ? `0${num}` : num;
};

export default cloneDeep;

const objects = [{ a: 1 }, { b: 2 }];
const deep = cloneDeep(objects);

const TYPE_ERROR = 'Something wrong with type of input param';

const tree = (lvl: number | string): Nullable<string> => {
	if (typeof lvl !== "string" && typeof lvl !== "number") {
		throw new Error(TYPE_ERROR);
	}
	if (lvl < 3) {
		return null
	}
	const middle = lvl - 1;
	const height = middle + 1;
	const width = middle * 2 - 1;
	let answer = ""
	for (let i = 0; i < height; i++) {
		for(let j = 0; j < width; j++) {
			if (i === height - 1) {
				if (j === middle - 1) {
					answer += "|"
				} else {
					answer += " "
				}
			} else {
				const radius = i;
				if (j+1 >= middle - radius && j+1 <= middle + radius) {
					answer += "*"
				} else {
					answer += " "
				}
			}
		}
		answer += "\n";
	}

	return answer
};

const euclid = (...args: number[]): number => {
	const maxCount = Math.min(...args)
	let answer;
	for (let i = 1; i <= 6006; i++) {
		if (args.every(item => Number.isInteger(item / i))) {
			answer = i;
		}
	}
	return answer ? answer : -1;
}

// function add(val?: number): number | StepFn {
// 	const num = val || 0;
// 	return
// }

type StepFn = (val?: number) => number | StepFn;

function add(a?: number): number | StepFn {
	if (a) {
		return function (b?:number) {
			if (b && a) {
				return add(b + a);
			} else {
				return a || 0;
			}
		}
	} else {
		return 0;
	}
}

// function curry(func) {
//
// 	return function curried(...args) {
// 		if (args.length >= func.length) {
// 			return func.apply(this, args);
// 		} else {
// 			return function(...args2) {
// 				return curried.apply(this, args.concat(args2));
// 			}
// 		}
// 	};
//
// }

// const newAdd = curry(add)


// Function.prototype.bind = function(ctx: Record<string, unknown>) {
// 	const callback = this;
// 	return function () {
// 		callback.apply(ctx)
// 	}
// }
// var F = function() {
// 	console.log('foo is', this.foo);
// }
// var F1 = F.bind({ foo: 'bar' })
//
// F()               // foo is undefined
// F1()              // foo is bar
//
// var f = new F()   // foo is undefined
// var f1 = new F1() // foo is bar
//
// console.log(f instanceof F)    // true
// console.log(f1 instanceof F)   // false


//
// function newFunc () {
// 	console.log(this.arg)
// }
// //
// const bindFunc = newFunc.bind({arg: 5})
// //
// bindFunc();

// function User(name) {
// 	this.name = name;
// 	this.isAdmin = false;
//
// 	console.log(this)
// }
//
// console.log(new User())

function omit<T extends object>(obj: T, fields: (keyof T)[]) {
	const newObj = {...obj};
	fields.map(key => delete newObj[key])
	return newObj
}

//TODO: Авторское решение https://jsfiddle.net/Practicum_mf/obzd9gcm/53/
function classNames(...args:any[]) {
	let answer = "";

	args.forEach(arg => {
		if (arg) {
			if (answer.length) {
				answer += " ";
			}
			if(isArray(arg)) {
				if (arg.length) {
					answer += classNames(...arg)
				} else {
					answer = answer.slice(0, answer.length - 1)
				}
			} else if (isObject(arg)) {
				const newArr = Object.keys(arg).filter(item => arg[item])
				if (newArr.length) {
					answer += classNames(...newArr)
				} else {
					answer = answer.slice(0, answer.length - 1)
				}
			} else {
				answer += arg;
			}
		}
	})

	return answer
}


class ValidationError extends Error {
	constructor(message:string) {
		// Need to pass `options` as the second parameter to install the "cause" property.
		super(message);
		this.name = "ValidationError";
		this.stack = `${this.name}: ${this.message}`;
	}
}

function isNumber (num:unknown):num is Number {
	if(!isNaN(num) && parseInt(num) === num && +num === num) {
		return true
	}
	return false
}

function take<T>(list: T[], num: unknown = 1): T[] {
	if (isArray(list) && isNumber(num)) {
		return [...list.slice(0, (num as number))]
	} else {
		throw new ValidationError("bad value")
	}
}

const testErrCase1 = [123, [1, 2, 3], [1, 2, 3], [1, 2, 3]]
const testErrCase2 = [1, [1], '1', true]

for (let i = 0; i<4; i++) {
	try {
		take(testErrCase1[i], testErrCase2[i])
	}
	catch(err) {
		console.log(err.toString()) // ValidationError: bad value
	}
}


function unzip(...args:unknown[][]) {
	let maxLength = 0;
	args.forEach(arg => {
		if(!isArray(arg)) {
			throw new Error(`${arg} is not array`)
		}
		maxLength = arg.length > maxLength ? arg.length : maxLength
	});
	const answer = [];

	for(let i = 0; i < maxLength; i++) {
		answer[i] = args.map(arg => arg[i]);
	}

	return answer;
}

