export class ContactComponent extends HTMLElement {
  constructor() {
    super();
    this.template = `
            <section class="contact">
                <h2 class="heading-secondary u-margin-top"> Contact Me </h2>
      <p class="contact__text"> Please feel free to contact me if you have any questions at: <a class="link" href="mailto:karolt@protonmail.com">karolt@protonmail.com</a>. You can also find me on: 
                    <a class="link" href="https://github.com/Krol22" target="blank"><em>Github</em></a> or
                    <a class="link" href="https://www.linkedin.com/in/karol-toru%C5%84-123503121/" target="blank"><em>LinkedIn</em></a>.
                </p>
            </section>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;

    this.sendMailButton = this.querySelector("#send-mail-button");
    this.sendMailButton.addEventListener("click", () => {
      location.href = "mailto:krol22ee@gmail.com";
    });
  }
}
