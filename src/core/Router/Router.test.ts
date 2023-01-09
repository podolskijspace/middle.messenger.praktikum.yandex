// @ts-nocheck
import MainPage from "../../pages/main";

import { expect } from "chai";
import router from "./";
import AuthPage from "../../pages/auth";
import RegistryPage from "../../pages/registry";
import ForgetPasswordPage from "../../pages/forgetPassword";
import EditProfile from "../../pages/editProfile";


describe('Проверяем переходы у Роута', () => {
	router
		.use("/", MainPage)
		.use("/auth", AuthPage)
		.use("/registry", RegistryPage)
		.use("/forget-password", ForgetPasswordPage)
		.use("/profile", EditProfile)
		.start();

	it('Проверяем количество роутов', () => {
		expect(router.routes.length).to.eq(5);
	});

	it('Проверяем метод getRoute', () => {
		expect(router.getRoute('/')._blockClass).to.eq(MainPage);
		expect(router.getRoute('/auth')._blockClass).not.eq(MainPage);
	});

	it('Проверяем метод go', () => {
		router.go('/auth');
		expect(router.history.length).to.eq(2);
		expect(router._currentRoute._blockClass).not.eq(MainPage);
		expect(router._currentRoute._blockClass).to.eq(AuthPage);
	});

	it('Проверяем метод back', () => {
		router.go('/auth');
		router.back();
		expect(router.history.length).to.eq(3);
	});
});
