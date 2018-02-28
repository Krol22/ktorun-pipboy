import { SoundService } from '../sound/sound.service.js';

export class FooterComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <div class="list">
                <router-link class="button" [link]="/contact">Status</router-link>
                <router-link class="button" [link]="/status">Skills</router-link>
                <router-link class="button" [link]="/work">Work</router-link>
                <router-link class="button active" [link]="/">Contact</router-link>
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.list = this.querySelector('.list');

        this.list.addEventListener('click', (e) => {
            if(e.srcElement.nodeName === 'ROUTER-LINK') {
                Array.from(this.list.childNodes)
                    .filter(node => 
                        node.nodeName === 'ROUTER-LINK'
                    ).forEach(routerNode => {
                        routerNode.classList.remove('active');
                    });

                SoundService.play('select');
                e.srcElement.classList.add('active');
            }
        });
    }

}
