export class AboutComponent extends HTMLElement {
  constructor() {
    super();
    this.template = `
            <section class="about">
                <h2 class="heading-secondary u-margin-top u-center-element"> About me </h2>
                <p class="paragraph">
          Hi, I'm Karol. As a Senior Full Stack Developer, I specialize in building web applications using TypeScript technologies. My focus is on creating functional, user-centered solutions. Alongside my professional work, I enjoy game development as a personal hobby.
                </p>
                <p class="paragraph">
          For a detailed look at my professional background or to get in touch, please visit my <a class="link" href="https://www.linkedin.com/in/karol-toru%C5%84-123503121/">LinkedIn</a> profile.
                </p>
            </section>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;
  }
}
