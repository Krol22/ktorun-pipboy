export class UsesComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="uses">
                <ul class="uses__list u-scroll-container">
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                    <li class="uses__list-item">Test</li>
                </ul>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.listElements = this.querySelectorAll('.uses__list-item');
        this.listElements.forEach(element => {
            element.addEventListener('click', () => {
                this.listElements.forEach(el => el.classList.remove('uses__list-item--active'));
                element.classList.add('uses__list-item--active');
            });
        });

        this.listElements[0].classList.add('uses__list-item--active');
    }
}
