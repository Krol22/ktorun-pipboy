export class FooterComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <div class="list">
                <router-link  [link]="/contact">Status</router-link>
                <router-link [link]="/status">Skills</router-link>
                <router-link [link]="/work">Work</router-link>
                <router-link class="active" [link]="/">Contact</router-link>
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.list = this.querySelector('.list');

        console.dir(this.list);

        this.list.addEventListener('click', (e) => {
            if(e.srcElement.nodeName === 'ROUTER-LINK') {
                Array.from(this.list.childNodes)
                    .filter(node => 
                        node.nodeName === 'ROUTER-LINK'
                    ).forEach(routerNode => {
                        routerNode.classList.remove('active');
                    });

                e.srcElement.classList.add('active');
            }
        });
    }

}
