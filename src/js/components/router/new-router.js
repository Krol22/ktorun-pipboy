export const Router = {
  init: function (routes) {
    this.routes = routes ? routes : [];
    this.routerLinks = [...document.getElementsByTagName("router-link")];
    this.prevElement = document.getElementById("pre-router");

    this.goTo(window.location.pathname);

    window.onpopstate = (e) => {
      const { url } = e.state;
      window.history.replaceState({ url }, "", url);

      const route = findRoute(url);
      if (!route.path) {
        document.querySelector("body").dataset.notFoundModule = url;
        this.setNewContent("/404");
        return;
      }

      this.setNewContent(url);
    };
  },

  goTo: function (path) {
    const route = findRoute(path);

    window.history.pushState({ url: path }, "", path);

    if (!this.routes[route.path]) {
      document.querySelector("body").dataset.notFoundModule = path;
      this.setNewContent("/404");
      return;
    }

    this.setNewContent(path);
  },

  setNewContent: async function (path) {
    const currentPage = document.querySelector("[data-current-page='true']");

    if (currentPage !== null) {
      currentPage.remove();
    }

    this.prevElement.insertAdjacentHTML("afterend", this.routes[path].text);
    this.prevElement.nextElementSibling.dataset.currentPage = "true";

    this.routerLinks.forEach((routeLink) => {
      routeLink.dataset.active = false;
      if (routeLink.dataset.link === path) {
        routeLink.dataset.active = true;
      }
    });
  },
};

function findRoute(path) {
  let pathElements = path.split("/");
  let parameters = {};

  let match = Object.keys(Router.routes).find((routerPath) => {
    let routerPathElements = routerPath.split("/");

    if (pathElements.length !== routerPathElements.length) {
      return false;
    }

    for (let i = 0; i < pathElements.length; i++) {
      if (
        routerPathElements[i].substring(0, 1) === "{" &&
        routerPathElements[i].substring(
          routerPathElements[i].length - 1,
          routerPathElements[i].length
        ) === "}"
      ) {
        let paramName = routerPathElements[i].substring(
          1,
          routerPathElements[i].length - 1
        );
        parameters[paramName] = pathElements[i];
        continue;
      }

      if (routerPathElements[i] !== pathElements[i]) {
        return false;
      }
    }

    return true;
  });

  return {
    path: match,
    params: parameters,
  };
}
