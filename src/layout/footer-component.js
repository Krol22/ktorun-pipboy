import { SoundService } from '../sound/sound.service.js';

export class FooterComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <footer class="pipboy-footer">
                <div class="pipboy-footer__list u-bottom-to-top">
                    <router-link id="status-btn" class="pipboy-footer__item btn btn--active" [link]="/">Status</router-link>
                    <router-link id="skills-btn" class="pipboy-footer__item btn" [link]="/skills">S.K.I.L.L.S</router-link>
                    <router-link id="contact-btn" class="pipboy-footer__item btn" [link]="/contact">Contact</router-link>
                </div>
            </footer>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.buttons = [
            this.querySelector('#status-btn'),
            this.querySelector('#skills-btn'),
            this.querySelector('#contact-btn')
        ];

        this.buttons.forEach(button => {
            button.addEventListener('click', e => {
                this.buttons.forEach(btn => btn.classList.remove('btn--active'));
                button.classList.add('btn--active');

                SoundService.play('select');
            });
        });
    }

}
