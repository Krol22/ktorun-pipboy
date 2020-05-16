export class AboutComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="about">
                <h2 class="heading-secondary u-margin-top u-center-element"> About me </h2>
                <p class="paragraph">
                    Hello my name is Karol and I'm software developer working at <a href="https://brainhub.eu/" target="_blank">Brainhub</a>.
                    Usually I spend my time on coding applications, websites or games with JavaScript technologies.
                </p>
                <p class="paragraph">
                    Go to contact page if you want to find more information about me around Internet! 
                </p>
            </section>
        `;
    }

    connectedCallback() {
        this.innerHTML = this.template;
    }
}
