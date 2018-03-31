import { SoundService } from '../sound/sound.service.js';
import jsImg from '../../assets/images/js.png';
import angularImg from '../../assets/images/angular.png';
import angularJsImg from '../../assets/images/angularjs.png';
import kendoUiImg from '../../assets/images/kendo.png';
import htmlImg from '../../assets/images/html.png';
import cssImg from '../../assets/images/css.png';
import toolsImg from '../../assets/images/tools.png';
import testsImg from '../../assets/images/tests.png';
import webComponentsImg from '../../assets/images/webComponents.png';
import vimImg from '../../assets/images/vim.png';
import sqlImg from '../../assets/images/sql.png';
import otherImg from '../../assets/images/other.png';

const skills = [
    { 
        name: 'JS', 
        img: jsImg,
        text: 'Main and favorite language that I use in work and daily projects.'
    },
    { 
        name: 'AngularJS', 
        img: angularJsImg,
        text: 'First framework (ver. 1.6) I was learning during my initial project at work. You can check some of components I\'ve created on my Github page.',
    },
    { 
        name: 'Angular', 
        img: angularImg,
        text: 'In small team we have created an inner order management system for bakery. More about it in my LinkedIn account.'
    },
    { 
        name: 'Kendo UI', 
        img: kendoUiImg,
        text: 'Library used with JQuery in main project in my current work. I have used most of UI Components from library (exept Charts components).'
    },
    { 
        name: 'HTML 5', 
        img: htmlImg,
        text: 'I know about semantic new elements, new form attribute types, canvas, audio. Also I was working with Geolocation, Localstorage and Cache API of HTML5.'
    },
    { 
        name: 'CSS 3', 
        img: cssImg,
        text: 'Best things I know about CSS are transitions, animations and RWD with grid and flexbox. Now I\'m learning about preprocessors and BEM.'
    },
    { 
        name: 'Build tools', 
        img: toolsImg,
        text: 'When I was starting my adventure with JS projects I worked with grunt and gulp. Now I basically use webpack for everything.'
    },
    { 
        name: 'Tests', 
        img: testsImg,
        text: 'Karma runner + Jasmine and PhantomJS. In work project I use Jasmine with Chutzpah test runner (not the best but it works).'
    },
    { 
        name: 'Web Components', 
        img: webComponentsImg,
        text: 'This page is written with use only of custom elements. Love this technology, and I want to use it more in other projects.'
    },
    { 
        name: 'VIM', 
        img: vimImg,
        text: 'BEST, EDITOR, EVER (specially in VSCode with Vim extension)'
        },
    { 
        name: 'SQL', 
        img: sqlImg,
        text: 'Most of databases I have used were SQL db.'
    },
    { 
        name: 'Other', 
        img: otherImg,
        text: `Other skills not mentioned earlier: Agile, Git, Jira, Trello, VSTS, basic Java and C# ( I worked in project with API written in those languages )` 
    }
];

export class SkillsComponent extends HTMLElement {

    constructor() {
        super();

        this.template = `
            <section class="skills">
                <div class="skills__list u-scroll-container">
                    <ul id="list">
                        ${skills.map(skill => `<li class="skills__list-item" data-name="${skill.name}">${skill.name}</li>`).join('')}
                    </ul>
                </div>
                <div class="skills__details" class="item">
                </div>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;

        this.elements = {
            list: this.querySelector('#list'),
            selectedItem: this.querySelector('.skills__details')
        };

        this.elements.list.addEventListener('click', e => {
            var selectedItem = e.path[0];  

            if(selectedItem.nodeName !== 'LI') {
                return false; 
            }
            this._setActiveItem(selectedItem);
            this._renderSelectedItem(selectedItem);

            SoundService.play('highlight');
        });

        var defaultSelectedItem = this.elements.list.children[0];

        this._setActiveItem(defaultSelectedItem);
        this._renderSelectedItem(defaultSelectedItem);
    }

    _renderSelectedItem(selectedItem) {
        var selectedSkill = skills.find(skill => {
            return skill.name === selectedItem.attributes['data-name'].value;
        });

        this.elements.selectedItem.innerHTML = `
            <figure class="skills__icon">
                <img class="skills__icon-image" src=".${selectedSkill.img}" />
            </figure>

            <figcaption class="skills__text u-right-top-to-bottom">
                ${selectedSkill.text}
            </figcaption>
        `;
    }

    _setActiveItem(selectedItem) {
        var currentActiveElement = this.elements.list.querySelector('.skills__list-item--active');
        if(currentActiveElement) {
            currentActiveElement.classList.remove('skills__list-item--active');
        }

        selectedItem.classList.add('skills__list-item--active');
    }

    disconnectedCallback() {

    }

}
