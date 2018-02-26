export class ColorChangeComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            Change color: 
            <div id="color_1">White</div>
            <div id="color_2">Green</div>
            <div id="color_3">Tan</div>
            <div id="color_4">Blue</div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.elements = {
            btn1: this.querySelector('#color_1'),
            btn2: this.querySelector('#color_2'),
            btn3: this.querySelector('#color_3'),
            btn4: this.querySelector('#color_4')
        };

        this.pageElement = document.querySelector('main');
        this.pageElement.style.color = '#fff';

        this.elements.btn1.addEventListener('click', () => {
            this.pageElement.style.filter = '';
        });

        this.elements.btn2.addEventListener('click', () => {
            this.pageElement.style.filter = `
                brightness(50%) sepia(1) hue-rotate(109deg) saturate(984.5%) brightness(104.5%)
            `;
        });

        this.elements.btn3.addEventListener('click', () => {
            this.pageElement.style.filter = `
                brightness(50%) sepia(1) hue-rotate(1deg) saturate(334.5%) brightness(118%)
            `;
        });

        this.elements.btn4.addEventListener('click', () => {
            this.pageElement.style.filter = `
                brightness(50%) sepia(1) hue-rotate(156deg) saturate(334.5%) brightness(113%)
            `;
        });
    }

}
