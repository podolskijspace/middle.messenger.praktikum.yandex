const jsdom = require("jsdom");
const {JSDOM} = jsdom;
const {window} = new JSDOM(``, {
	url: "https://example.org/"
});
const {document} = window.document;
import { expect } from "chai";

describe('Проверяем переходы у Роута', () => {
	it('Переход на новую страницу должен менять состояние сущности history', () => {
		window.history.pushState({page: 'login'}, 'Login', '/login');
		window.history.pushState({page: 'register'}, 'Register', '/register');

		expect(window.history.length).to.eq(3);
	});
});
