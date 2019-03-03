import { delay } from '../helpers/delay.helper';
import loading from '../../assets/images/loading.gif';
import { LOADING_SPEED } from '../constants';

export class LoadingComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <div class="loading-component">
                <div class="loading-container__first">
                    <div class="loading-header">PIP-OS(R) V7.1.0.8</div>
                    <div id="loading-text"></div>
                </div>
                <div class="loading-container__second">
                    <img src=".${loading}" />
                </div>
            </div>
        `;
        this.loadingText = `
            COPYRIGHT 2075 ROBCO(R) </br>
            LOADER V1.1 </br>
            EXEC VERSION 41.10 </br>
            64k RAM SYSTEM </br>
            38911 BYTES FREE </br>
            NO HOLOTAPE FOUND </br>
            LOAD ROM(1): DEITRIX 303
        `.trim();
    }

    connectedCallback() {
        this.innerHTML = this.template;

        document.documentElement.style.setProperty('--loading-speed', LOADING_SPEED);

        this.pipboy = document.querySelectorAll('.pipboy')[0];
        this.loadingComponent = document.querySelectorAll('.loading-component')[0];
        this.loadingTextContainer = document.querySelectorAll('#loading-text')[0];
        this.firstAnimationContainer = document.querySelectorAll('.loading-container__first')[0];
        this.secondAnimationContainer = document.querySelectorAll('.loading-container__second')[0];


        // if (true) {
        //     this.loadingComponent.remove();
        //     delay(1000);
        //     this.pipboy.classList.add('pipboy--visible');
        // }
        this.firstAnimation();
    }

    async firstAnimation() {
        let loadingCounter = 0;
        let blinkCounter = 0;

        await delay(1500 * LOADING_SPEED);

        const interval = setInterval(async () => {
            loadingCounter++;
            blinkCounter++;
            if (this.loadingText.substring(loadingCounter, loadingCounter + 5) === '</br>') {
                this.loadingTextContainer.innerHTML += '</br>';
                loadingCounter+=5;
            }

            this.loadingTextContainer.innerHTML = this.loadingText.substring(0, loadingCounter);

            if (Math.floor(blinkCounter / 10) % 2 === 0)
                this.loadingTextContainer.innerHTML += '<div class="caret">&#9608;</div>';

            if (loadingCounter > this.loadingText.length) {
                clearInterval(interval);
                await delay(700 * LOADING_SPEED);
                this.firstAnimationContainer.classList.add('loading-container__first--loaded');
                this.secondAnimation();
            }
        }, 30 * LOADING_SPEED);
    }

    async secondAnimation() {
        await delay(3500 * LOADING_SPEED);

        this.secondAnimationContainer.classList.add('loading-container__second--loaded');

        await delay(3500 * LOADING_SPEED);

        this.loadingComponent.style.display = 'none';
        this.secondAnimationContainer.remove();
        this.pipboy.classList.add('pipboy--visible');
    }
}