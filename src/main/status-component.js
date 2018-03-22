import statusImg from '../../assets/images/stats_main_100.png';

export class StatusComponent extends HTMLElement {

    constructor() {
        super();
        this.level = 24;

        this.template = `
            <div class="image-container">
                <img class="image" src=${statusImg} />
                <h2 class="status-text">
                    <span class="name"> Karol Toruń </span> 
                    Level <span id="level">${this.level}</span> Frontend developer
                </h2>
            </div>
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
