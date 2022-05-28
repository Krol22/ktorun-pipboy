import statusImg from "../../assets/images/stats_main_100.png";

export class StatusComponent extends HTMLElement {
  constructor() {
    super();

    this.template = `
            <section class="status">
                <img class="status__image" src=".${statusImg}" />
                <div class="status__text">
                    <h2 class="heading-secondary u-margin-bottom-30">
                        Karol Toruń
                    </h2>
                    <h3 class="heading-tertiary">
                        Level <span id="level"></span> Fullstack JS developer at 
                        <a class="link" target="_blank" href="https://brevy.com"> Brevy </a>
                    </h3>
                </div>
            </section>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;

    const endDate = new Date();
    const startDate = new Date(1994, 3, 4);

    const lvlYears = endDate.getYear() - startDate.getYear();

    this.querySelector("#level").innerHTML = `${lvlYears}`;
  }
}
