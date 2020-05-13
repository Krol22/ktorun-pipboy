import { SoundService } from '../sound/sound.service';

export class SettingsComponent extends HTMLElement {

    constructor() {
        super();

        this.currentColor = localStorage.getItem('pipboy-color');

        this.template = `
            <div id="menu" class="settings">
                <h2 class="heading-secondary u-margin-top"> Settings </h2>
                <div class="settings__group">
                    <input class="settings__checkbox-input" type="checkbox" id="sound-checkbox"/> 
                    <label class="settings__label" for="sound-checkbox">
                        <span class="settings__label--text"> Sound </span>
                        <div class="settings__label--input">
                            <div class="settings__checkbox"></div>
                        </div>
                    </label>
                </div>    
                <div class="settings__group">
                    <label class="settings__label u-margin-bottom" for="color_select">
                        <span class="settings__label--text"> Color </span>
                        <div class="settings__label--input">
                            <select id="color-select" class="settings__select">
                                <option value="white" class="btn">White</option>
                                <option value="green" class="btn">Green</option>
                                <option value="tan" class="btn">Tan</option>
                                <option value="blue" class="btn">Blue</option>
                            </select>
                        </div>
                    </label>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.crtFilter = document.querySelector('.crt-color-filter');
        this.select = this.querySelector('#color-select');
        this.menu = this.querySelector('#menu');
        this.soundCheckbox = this.querySelector('#sound-checkbox');
        this.openMenuButton = this.querySelector('#open-btn');
        this.closeMenuButton = this.querySelector('#close-btn');

        this.soundCheckbox.checked = (localStorage.getItem('soundEnabled') === 'true');
        this.select.value = localStorage.getItem('pipboy-color');

        this.select.addEventListener('change', (e) => {
            this.crtFilter.classList.remove(`crt-color-filter--${this.currentColor}`);
            this.currentColor = e.target.value;
            localStorage.setItem('pipboy-color', this.currentColor);
            this.crtFilter.classList.add(`crt-color-filter--${this.currentColor}`);           
        });

        this.soundCheckbox.addEventListener('change', (e) => {
            SoundService.toggleSound(e.target.checked);
        });
    }

}