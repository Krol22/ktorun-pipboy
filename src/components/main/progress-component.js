export class ProgressComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <div class="progress">
                <div class="progress__bar-container"></div>
                <div class="progress__bar-value"></div>
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.progressBarValue = this.querySelector('.progress__bar-value');
        const value = this.dataset.value;

        this.progressBarValue.style.width = `${value}%`;
    }
}
