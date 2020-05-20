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
                        <span id="xp-value" class="header-list__value">100 days</span>
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
  }

  _calculateDates() {
    var oneDay = 24 * 60 * 60 * 1000;
    var startWorkDate = new Date(2016, 7, 1);
    var startLvlDate = new Date(1994, 3, 4);
    var endDate = new Date();

    var workDaysExp = Math.round(
      (endDate.getTime() - startWorkDate.getTime()) / oneDay
    );
    var lvlYears = endDate.getYear() - startLvlDate.getYear();

    this.elements.xpValue.innerHTML = `${workDaysExp} days`;
    this.elements.lvlValue.innerHTML = `${lvlYears}`;
  }
}
