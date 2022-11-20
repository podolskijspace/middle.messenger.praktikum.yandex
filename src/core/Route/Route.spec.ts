import { expect } from "chai";

const hello = (text) => {
	return `Hello ${text}`
}

describe("Typescript + Babel usage suite", () => {
	it("should return string correctly", () => {
		expect(hello("mocha"), "Hello mocha");
	});
});
