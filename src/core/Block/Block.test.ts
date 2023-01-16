import Block from "./index";
import { expect } from "chai";

describe("Проверяем переходы у Роута", () => {
  const id = "component-mock-test";

  class ComponentMock extends Block {
    constructor(props?: any) {
      super(props);
    }

    render() {
      return `
				<div id=${id}>
	        test
	      </div>
			`;
    }
  }

  const container = new ComponentMock().render();

  it("Проверяем, что есть верстка", () => {
    const elem = container.includes("id");

    expect(elem).to.eq(true);
  });
});
