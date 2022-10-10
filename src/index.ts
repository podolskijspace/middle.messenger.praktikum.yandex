require("babel-core/register");
import { renderDOM, registerComponent }  from './core';
import MainPage from './pages/main';
import { RegistryPage } from './pages/registry/registry';
import './styles/index.scss';

import Button from './components/button';
import Link from './components/link';
import Input from './components/input';
import Layout from './components/layout';

registerComponent(Button);
registerComponent(Link);
registerComponent(Input);
registerComponent(Layout);


document.addEventListener("DOMContentLoaded", () => {
  renderDOM(new RegistryPage());
});