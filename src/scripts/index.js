import {mainPage} from "./pages/main"
import {notFoundPage} from "./pages/404"
import {errorPage} from "./pages/500"
import {authPage} from "./pages/auth"
import {forgetPasswordPage} from "./pages/forgetPassword"
import {registryPage} from "./pages/registry"



switch(window.location.pathname) {
  case "/":
    root.innerHTML = mainPage
    break;
  case "/forget-password":
    root.innerHTML = forgetPasswordPage
    break;
  case "/registry":
    root.innerHTML = registryPage
    break;
  case "/auth":
    root.innerHTML = authPage
    break;
  case "/500":
    root.innerHTML = errorPage
    break;
  default:
    root.innerHTML = notFoundPage
    break;
}
