export class HeaderComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <div class="title">STATS</div>
            <ul>
                <li class="lvl ps-top-to-bottom">
                    <span class="text">LVL</span>
                    <span class="value">24</span>
                </li>
                <li class="hp ps-right-top-to-bottom">
                    <span class="text">HP</span>
                    <span class="value">220/220</span>
                </li>
                <li class="ap ps-right-top-to-bottom">
                    <span class="text">AP</span>
                    <span class="value">75/75</span>
                </li>
                <li class="xp ps-right-top-to-bottom">
                    <span class="text">XP</span>
                    <span class="value">600 days</span>
                </li>
            </ul>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
        this.elements = {
            lvlValue: this.querySelector('.lvl span.value'),
            xpValue: this.querySelector('.xp span.value'),
        }

        // #TODO: lvlValue and xpValue
    };

    disconnectedCallback() {

    }

}
