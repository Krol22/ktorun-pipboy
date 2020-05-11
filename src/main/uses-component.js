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
                        <div class="uses__icon">TestIcon</div> 
                        <div class="uses__text u-right-top-to-bottom">
                            <a class="link" href="https://iterm2.com" target="blank">Iterm2</a> - 
                        </div>
                    </div>
                    <div class="uses__item" data-item="editor">
                        <div class="uses__icon">TestIcon</div> 
                        <div class="uses__text u-right-top-to-bottom">
                            <a class="link" href="https://neovim.io/" target="blank">Neovim</a> -
                            <a class="link" href="https://github.com/Krol22/yadf/tree/master/nvim" target="blank">My configuration</a>
                        </div>
                    </div>
                    <div class="uses__item" data-item="macbook">
                        <div class="uses__icon">TestIcon</div> 
                        <div class="uses__text u-right-top-to-bottom">
                            <a class="link" href="https://support.apple.com/kb/SP719" target="blank">Macbook</a> - 
                        </div>
                    </div>
                    <div class="uses__item" data-item="keyboard">
                        <div class="uses__icon">TestIcon</div> 
                        <div class="uses__text u-right-top-to-bottom">
                            In my home office, I use a 20 year old keyboard (DIN 5) which I recently found in the attic. I don't know the model exactly, but it looks like <a class="link" href="https://www.cnet.com/products/btc-5121-keyboard/" target="blank">this</a>.
                        </div>
                    </div>
                    <div class="uses__item" data-item="monitor">
                        <div class="uses__icon">TestIcon</div> 
                        <div class="uses__text u-right-top-to-bottom">
                            <a class="link" href="https://www.lg.com/us/monitors/lg-27UD69P-W-4k-uhd-led-monitor" target="blank">LG 27"</a> - 
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
