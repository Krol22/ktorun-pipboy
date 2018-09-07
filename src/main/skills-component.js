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
import sqlImg from '../../assets/images/sql.png';
import otherImg from '../../assets/images/other.png';

const skills = [
    { 
        name: 'JavaScript', 
        img: jsImg,
        text: 'ES5, ES6, ESNext.'
    },
    { 
        name: 'AngularJS', 
        img: angularJsImg,
        text: 'First framework (ver. 1.6) I was learning during my initial project at work.',
    },
    { 
        name: 'Angular', 
        img: angularImg,
        text: 'In small team we have created an inner order management system for bakery. More about it in my LinkedIn account.'
    },
    { 
        name: 'React', 
        text: 'React, Redux, React Native, Reactotron, Redux-form',
    },
    { 
        name: 'HTML 5', 
        img: htmlImg,
        text: 'Semantic new elements, new form attribute types, canvas, audio. I was working also with Geolocation, Localstorage and Cache API of HTML5.'
    },
    { 
        name: 'CSS 3', 
        img: cssImg,
        text: 'SaSS, BeM, transitions, animations and RWD with grid and flexbox.'
    },
    { 
        name: 'Kendo UI', 
        img: kendoUiImg,
        text: 'Library used with JQuery in main project in my current work. I have used most of UI Components from library (exept Charts components).'
    },
    { 
        name: 'Build tools', 
        img: toolsImg,
        text: 'Earlier I was working with grunt and gulp. Now I use webpack (v3).'
    },
    { 
        name: 'Tests', 
        img: testsImg,
        text: 'Karma runner + Jasmine and PhantomJS. In work project I use Jasmine with Chutzpah test runner.'
    },
    { 
        name: 'SQL', 
        img: sqlImg,
        text: 'Most of databases I have used were SQL db.'
    },
    { 
        name: 'Web Components', 
        img: webComponentsImg,
        text: 'Webpage2v is written with use only of custom elements.'
    },
    { 
        name: 'Other', 
        img: otherImg,
        text: `Other skills not mentioned earlier: NodeJs + Express (with loopback), Agile, Git, Jira, Trello, VSTS, basic Java and C#` 
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
