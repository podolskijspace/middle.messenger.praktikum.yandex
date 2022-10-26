require("babel-core/register");
import { renderDOM, registerComponent }  from './core';
import MainPage from './pages/main';
import RegistryPage from './pages/registry';
import EditProfile from './pages/editProfile';
import AuthPage from './pages/auth';
import { Router } from './core/Router';
import { HTTP } from './core/HTTP';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';

import './styles/index.scss';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);


const router = new Router("#app");

// Можно обновиться на /user и получить сразу пользователя


document.addEventListener("DOMContentLoaded", () => {
  // renderDOM(new EditProfile());
  router
    .use("/", MainPage)
    .use("/edit-profile", EditProfile)
    .use("/auth", AuthPage)
    .use("/registry", RegistryPage)
    .start();

    // setTimeout(()=>{router.go('/edit-profile')}, 1000)
    // setTimeout(()=>{router.go('/auth')}, 2000)
    // setTimeout(()=>{router.go('/registry')}, 3000)
    // setTimeout(()=>{router.go('/')}, 5000)

});