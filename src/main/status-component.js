import statusImg from '../../assets/images/stats_main_100.png';

export class StatusComponent extends HTMLElement {

    constructor() {
        super();
        this.level = 24;

        this.template = `
            <section class="status">
                <img class="status__image" src=".${statusImg}" />
                <div class="status__text">
                    <h2 class="heading-secondary u-margin-bottom">
                        Karol Toruń
                    </h2>
                    <h3 class="heading-tertiary">
                        Level <span id="level">${this.level}</span> Frontend developer
                    </h3>
                </div>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        var endDate = new Date();
        var startDate = new Date(1994, 3, 4);

        var lvlYears = endDate.getYear() - startDate.getYear();

        this.querySelector('#level').innerHTML = `${lvlYears}`;
    }
}
