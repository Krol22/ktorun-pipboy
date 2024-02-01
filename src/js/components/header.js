export class HeaderComponent extends HTMLElement {
  constructor() {
    super();

    this.template = `
            <header class="header">
                <div class="header__title">STATS</div>
                <ul class="header-list">
                    <li class="header-list__item header-list__item--lvl u-top-to-bottom">
                        <span class="header-list__text">LVL</span>
                        <span id="lvl-value" class="header-list__value">24</span>
                    </li>
                    <li class="header-list__item header-list__item--hp u-right-top-to-bottom">
                        <span class="header-list__text">HP</span>
                        <span class="header-list__value">220/220</span>
                    </li>
                    <li class="header-list__item header-list__item--ap u-right-top-to-bottom">
                        <span class="header-list__text">AP</span>
                        <span class="header-list__value">75/75</span>
                    </li>
                    <li class="header-list__item header-list__item--xp u-right-top-to-bottom">
                        <span class="header-list__text">XP</span>
                        <span id="xp-value" class="header-list__value">2 years</span>
                    </li>
                </ul>
            </header>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.elements = {
      lvlValue: this.querySelector("#lvl-value"),
      xpValue: this.querySelector("#xp-value"),
    };

    this._calculateDates();

    setTimeout(() => {
      if (window.pageYOffset || document.documentElement.scrollTop) {
        window.scrollTo(0, 0);
      }
    }, 300);
  }

  _calculateDates() {
    const oneYear = 24 * 60 * 60 * 1000 * 366;
    const startWorkDate = new Date(2016, 7, 1);
    const startLvlDate = new Date(1994, 3, 4);
    const endDate = new Date();

    const workDaysExp = Math.round(((endDate.getTime() - startWorkDate.getTime()) / oneYear) * 10) / 10;
    const lvlYears = endDate.getYear() - startLvlDate.getYear();

    this.elements.xpValue.innerHTML = `${workDaysExp} years`;
    this.elements.lvlValue.innerHTML = `${lvlYears}`;
  }
}
