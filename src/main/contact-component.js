import { SoundService } from '../sound/sound.service.js';

export class ContactComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <h2> Contact Me </h2>
            <p> Please feel free to contact me if you have any questions at: <em>karol.torun94@gmail.com</em> or just send me a message to ma linkedIn accout. </p>
            <div id="send-mail-button" class="button active">Send mail</div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.sendMailButton = this.querySelector('#send-mail-button');
        this.sendMailButton.addEventListener('click', () => {
            SoundService.play('select');
            location.href = 'mailto:karol.torun94@gmail.com';
        });

        this.sendMailButton.addEventListener('mouseover', () => {
            SoundService.play('highlight');
        });
    }
}
