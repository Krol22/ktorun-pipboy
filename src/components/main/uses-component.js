import itermIcon from '../../assets/images/icon2.png';

export class UsesComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="uses">
                <ul class="uses__list u-scroll-container">
                    <li class="uses__list-item" data-item="terminal">ITerm2</li>
                    <li class="uses__list-item" data-item="editor">Vim (neovim)</li>
                    <li class="uses__list-item" data-item="macbook">Macbook Pro 15</li>
                    <li class="uses__list-item" data-item="keyboard">Old keyboard</li>
                    <li class="uses__list-item" data-item="monitor">LG 4K monitor</li>
                </ul>
                <div class="uses__items" data-item="items">
                    <div class="uses__item" data-item="terminal">
                        <div class="uses__icon">
                            <img class="uses__icon-img" src=${itermIcon} alt="iterm" />
                        </div> 
                        <div class="uses__description">
                            <div class="uses__condition u-right-top-to-bottom">
                                <div class="uses__condition--text">CND</div>
                                <div class="uses__condition--value"/>--</div>
                            </div>
                            <div class="uses__weight u-right-top-to-bottom">
                                <div class="uses__weight--text">WG</div>
                                <div class="uses__weight--value">37.1MB</div>
                            </div>
                            <div class="uses__text u-right-top-to-bottom">
                                MODS default shell ZSH,<br />
                            </div>
                        </div>
                    </div>
                    <div class="uses__item" data-item="editor">
                        <div class="uses__icon">
                            <img class="uses__icon-img" src=${itermIcon} alt="iterm" />
                        </div> 
                        <div class="uses__description">
                            <div class="uses__condition u-right-top-to-bottom">
                                <div class="uses__condition--text">CND</div>
                                <div class="uses__condition--value">--</div>
                            </div>
                            <div class="uses__weight u-right-top-to-bottom">
                                <div class="uses__weight--text">WG</div>
                                <div class="uses__weight--value">8.97MB</div>
                            </div>
                            <div class="uses__text u-right-top-to-bottom">
                                LOOK LIKE HACKER +9,<br />
                                MODS - TOO MANY, check <a class="link" href="https://github.com/Krol22/yadf/tree/master/nvim" target="blank">here</a>,
                            </div>
                        </div>
                    </div>
                    <div class="uses__item" data-item="macbook">
                        <div class="uses__icon">
                            <img class="uses__icon-img" src=${itermIcon} alt="iterm" />
                        </div> 
                        <div class="uses__description">
                            <div class="uses__condition u-right-top-to-bottom">
                                <div class="uses__condition--text">CND</div>
                                <progress-component class="uses__condition--value" data-value="90" />
                            </div>
                            <div class="uses__weight u-right-top-to-bottom">
                                <div class="uses__weight--text">WG</div>
                                <div class="uses__weight--value">2.05KG</div>
                            </div>
                            <div class="uses__text u-right-top-to-bottom">
                                BUILDING COOL STUFF SPEED +7,<br />
                                MODS: bunch of stickers,
                            </div>
                        </div>
                    </div>
                    <div class="uses__item" data-item="keyboard">
                        <div class="uses__icon">
                            <img class="uses__icon-img" src=${itermIcon} alt="iterm" />
                        </div> 
                        <div class="uses__description">
                            <div class="uses__condition u-right-top-to-bottom">
                                <div class="uses__condition--text">CND</div>
                                <progress-component class="uses__condition--value" data-value="80" />
                            </div>
                            <div class="uses__weight u-right-top-to-bottom">
                                <div class="uses__weight--text">WG</div>
                                <div class="uses__weight--value">0.48KG</div>
                            </div>
                            <div class="uses__text u-right-top-to-bottom">
                                SPEED +2,<br />
                                MODS PS2 to USB adapter,<br />
                                MODS DIN5 to PS2 converter,<br />
                            </div>
                        </div>
                    </div>
                    <div class="uses__item" data-item="monitor">
                        <div class="uses__icon">
                            <img class="uses__icon-img" src=${itermIcon} alt="iterm" />
                        </div> 
                        <div class="uses__description">
                            <div class="uses__condition u-right-top-to-bottom">
                                <div class="uses__condition--text">CND</div>
                                <progress-component class="uses__condition--value" data-value="100" />
                            </div>
                            <div class="uses__weight u-right-top-to-bottom">
                                <div class="uses__weight--text">WG</div>
                                <div class="uses__weight--value">5.2KG</div>
                            </div>
                            <div class="uses__text u-right-top-to-bottom">
                                CODING SPACES +1, <br />
                                EFFECTS: PIVOT,
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.items = this.querySelectorAll('div[data-item="items"] > div');

        this.listElements = this.querySelectorAll('.uses__list-item');
        this.listElements.forEach(element => {
            element.addEventListener('click', () => {
                this.listElements.forEach(el => el.classList.remove('uses__list-item--active'));
                this.selectItem(element)
            });
        });

        this.selectItem(this.listElements[0]);
    }

    selectItem(element) {
        element.classList.add('uses__list-item--active');
        const itemId = element.dataset.item;

        this.items.forEach(item => {
            item.classList.remove('uses__item--visible');
            if (item.dataset.item === itemId) {
                item.classList.add('uses__item--visible');
            }
        });
    }
}
