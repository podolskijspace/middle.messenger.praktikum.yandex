import { isEqual } from "../../utils/helpers";

export class Route {
  constructor(pathname, view, props) {
      this._pathname = pathname;
      this._blockClass = view;
      this._block = null;
      this._props = props;
  }

  navigate(pathname) {
      if (this.match(pathname)) {
          this._pathname = pathname;
          this.render();
      }
  }

  leave() {
      if (this._block) {
          this._block.hide();
      }
  }

  match(pathname) {
      return isEqual(pathname, this._pathname);
  }

  render() {
      if (!this._block) {
          this._block = new this._blockClass();
          render(this._props.rootQuery, this._block);
          return;
      }

      this._block.show();
  }
}



function render(query, block) {
  const root = document.querySelector(query);
  root.append(block.getContent())
  return root;
}
