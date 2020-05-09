import { SoundService } from '../sound/sound.service.js';

export class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <footer class="pipboy-footer">
                <div class="pipboy-footer__list u-bottom-to-top">
                    <router-link id="status-btn" class="pipboy-footer__item btn" data-link="/">Status</router-link>
                    <router-link id="about-me-btn" class="pipboy-footer__item btn" data-link="/about-me">A.B.O.U.T.M.E</router-link>
                    <router-link id="uses-btn" class="pipboy-footer__item btn" data-link="/uses">Uses</router-link>
                    <router-link id="contact-btn" class="pipboy-footer__item btn" data-link="/contact">Contact</router-link>
                </div>
            </footer>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.buttons = this.querySelectorAll('router-link');

        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.buttons.forEach(btn => btn.classList.remove('btn--active'));
                button.classList.add('btn--active');

                SoundService.play('select');
            });
        });
    }
}
