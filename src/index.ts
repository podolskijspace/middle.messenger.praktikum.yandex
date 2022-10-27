require("babel-core/register");
import { renderDOM, registerComponent }  from './core';
import MainPage from './pages/main';
import RegistryPage from './pages/registry';
import EditProfile from './pages/editProfile';
import AuthPage from './pages/auth';
import ForgetPasswordPage from './pages/forgetPassword';
import { router } from './core/Router';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';

import './styles/index.scss';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);


// Можно обновиться на /user и получить сразу пользователя


document.addEventListener("DOMContentLoaded", () => {
  // renderDOM(new EditProfile());
  router
    .use("/", MainPage)
    .use("/edit-profile", EditProfile)
    .use("/auth", AuthPage)
    .use("/registry", RegistryPage)
    .use("/forget-password", ForgetPasswordPage)
    .start();
    // setTimeout(()=>{router.go('/')}, 5000)
});