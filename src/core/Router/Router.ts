import Route from "../Route";

class Router {
  constructor(rootQuery) {
      if (Router.__instance) {
          return Router.__instance;
      }

      this.routes = [];
      this.history = window.history;
      this._currentRoute = null;
      this._rootQuery = rootQuery;

      Router.__instance = this;
  }

  use(pathname, block) {
    const route = new Route(pathname, block, {rootQuery: this._rootQuery});

    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = event => {
      this._onRoute(event.currentTarget.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname) {
      const route = this.getRoute(pathname);

      if (this._currentRoute) {
        this._currentRoute.leave();
      }
      this._currentRoute  = route;
      
      route.render(route, pathname);
  }

  go(pathname) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  back() {
    this.history.go(-1)
  }

  forward() {
    this.history.go(1)
  }

  getRoute(pathname) {
    return this.routes.find(route => route.match(pathname));
  }
}

export const router = new Router("#app");
