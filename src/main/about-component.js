export class AboutComponent extends HTMLElement {
    constructor() {
        super();
        this.template = `
            <section class="about">
                <h2 class="heading-secondary u-margin-top"> About me </h2>
                <p class="paragraph">
                    Hello my name is Karol and I'm software developer currently living in Bielsko Biała.
                    Usually I spend my time on coding work projects and games or riding on my BMX.
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