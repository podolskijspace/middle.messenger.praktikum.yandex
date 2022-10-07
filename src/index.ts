require("babel-core/register");
import { renderDOM, registerComponent }  from './core';
import { MainPage } from './pages/main/main';
import './styles/index.scss';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';
import Form from './components/form';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);
registerComponent(Form);


document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new MainPage());
});