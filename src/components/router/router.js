export const Router = {
    /*
        * content can be static html or component
    */
    init: function(routes) {
        this.routes = routes ? routes : {};
        this.element = document.getElementsByTagName('router')[0];
        this.routerLinks = [...document.getElementsByTagName('router-link')];
        this.history = [];

        this.goTo(window.location.pathname);

        window.onpopstate = e => {
            this.changeState(e.state.url); // this shit doesn't work
        };
    },
    addPath: function(path, content){
        if(this.routes[path]){
            throw new Error('Content in this path already exists!');
        }

        this.routes[path] = content;
    },
    changeState: function(path) {
        this.currentLocation = findRoute(path);
        window.history.replaceState({ url: path }, '', path);
        this.changeContent();
    },
    goTo: function(path) {
        let route = findRoute(path);

        if(!this.routes[route.path]) {
            document.querySelector('body').dataset.notFoundModule = path;
            this.goTo('/404');
        }

        this.currentLocation = route; 
        window.history.pushState({ url: path }, '', path);
        this.changeContent();
    },
    changeContent() {
        const { path } = this.currentLocation;
        if(this.routes[path].resolve){
            this.currentLocation.resolve = {};
            this.routes[path]
                .resolve(this.currentLocation)
                .then(() => {
                    this.element.innerHTML = this.routes[path].text;
                }); 
        } else {
            this.element.innerHTML = this.routes[path].text;
        }

        this.routerLinks.forEach(element => {
            element.dataset.active = false;
            if (element.dataset.link === this.currentLocation.path) {
                element.dataset.active = true;
            } 
        });
    },
    addRouteLink(routeLink) {
        this.routeLinks.push(routeLink);
    }
};

function findRoute(path) {
    let pathElements = path.split("/");
    let parameters = {};

    let match = Object.keys(Router.routes).find(routerPath => {
        let routerPathElements = routerPath.split("/");

        if(pathElements.length !== routerPathElements.length){
            return false;
        }

        for(let i = 0; i < pathElements.length; i++) {
            if(routerPathElements[i].substring(0,1) === '{' && 
                routerPathElements[i].substring(routerPathElements[i].length - 1, routerPathElements[i].length) === '}') {

                let paramName = routerPathElements[i].substring(1, routerPathElements[i].length - 1);
                parameters[paramName] = pathElements[i];
                continue;
            } 
            
            if(routerPathElements[i] !== pathElements[i]) {
                return false;
            }
        }

        return true;
    });

    return {
        path: match,
        params: parameters
    };
}
