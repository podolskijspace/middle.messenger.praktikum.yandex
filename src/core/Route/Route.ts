import { isEqual } from "../../utils/helpers";
import Block from "../Block";

export class Route {
  _pathname: string;
  _blockClass: Block;
  _block: Block | null;
  _props: payloadData;

  constructor(pathname: string, view: Block, props: payloadData) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string) {
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

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      // @ts-ignore
      this._block = new this._blockClass();
      render(this._props.rootQuery as string, this._block as Block);
      return;
    }

    this._block.show();
  }
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);
  (root as HTMLDivElement).append(block.getContent());
  return root;
}
