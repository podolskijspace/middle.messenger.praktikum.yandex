import { links } from "./links"
import { routing } from "./routing";

const render = ():void => {
  routing();
  links();
}

window.addEventListener('popstate', render);

export {render};