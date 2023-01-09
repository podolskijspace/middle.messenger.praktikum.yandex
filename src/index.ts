// @ts-nocheck
require("babel-core/register");
import MainPage from './pages/main';
import RegistryPage from './pages/registry';
import EditProfile from './pages/editProfile';
import {renderDOM, registerComponent} from "./core";
import AuthPage from './pages/auth';
import ForgetPasswordPage from './pages/forgetPassword';
import router from './core/Router';
import ButtonWithIcon from "./components/buttonWithIcon";
import ChatSmallComponent from "./components/chatSmallComponent";
import ContextMenu from "./components/contextMenu";
//
import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';
import Form from "./components/form";

import './styles/index.scss';

registerComponent(Button);
registerComponent(ButtonWithIcon);
registerComponent(ChatSmallComponent);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);
registerComponent(ContextMenu);
registerComponent(Form);



// Можно обновиться на /user и получить сразу пользователя

document.addEventListener("DOMContentLoaded", () => {
  router
    .use("/", MainPage)
    .use("/auth", AuthPage)
    .use("/registry", RegistryPage)
    .use("/forget-password", ForgetPasswordPage)
    .use("/profile", EditProfile)
    .start();

    // setTimeout(()=>{router.go('/')}, 5000)
});
