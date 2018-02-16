export class SkillsComponent extends HTMLElement {

    constructor() {
        super();
        this.template = `
            <div class="list">
                <ul>
                    <li>JS</li>
                    <li>AngularJS</li>
                    <li>Angular</li>
                    <li>Kendo UI</li>
                    <li>HTML 5</li>
                    <li>CSS 3</li>
                    <li>Build tools</li>
                    <li>Web components</li>
                    <li>VIM</li>
                    <li>MySQL</li>
                </ul>
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }

    disconnectedCallback() {

    }

}
