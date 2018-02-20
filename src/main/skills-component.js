const skills = [
    { name: 'JS', value: 'js' },
    { name: 'AnguarJS', value: 'angularJs' },
    { name: 'Angular', value: 'angular' },
    { name: 'Kendo UI', value: 'kendo' },
    { name: 'HTML 5', value: 'html' },
    { name: 'CSS 3', value: 'css' },
    { name: 'Build tools', value: 'tools' },
    { name: 'Web Components', value: 'webComponents' },
    { name: 'VIM', value: 'vim' },
    { name: 'MySQL', value: 'mySql' }
];

export class SkillsComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <div class="list scroll-container">
                <ul id="list">
                    ${skills.map(skill => `<li data-value="${skill.value}">${skill.name}</li>`).join('')}
                </ul>
            </div>
            <div id="selected-item-details" class="item">
            </div>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.elements = {
            list: this.querySelector('#list'),
            selectedItem: this.querySelector('#selected-item-details')
        }

        this.elements.list.addEventListener('click', e => {
            var selectedItem = e.path[0];  
            if(selectedItem.nodeName !== 'LI') {
                return false; 
            }
            this._renderSelectedItem(selectedItem);
        });
    }

    _renderSelectedItem(selectedItem) {
        var selectedItemValue = selectedItem.attributes['data-value'].value;
        this.elements.selectedItem.innerHTML = `
            <h3>ICON - ${selectedItemValue}</h3>
            <p class="item-text ps-right-top-to-bottom">
                NO TEXT AVAILABLE FOR THIS ITEM (${selectedItemValue})...
            </p>
        `;
    }

    disconnectedCallback() {

    }

}
