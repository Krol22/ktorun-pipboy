import statusImgSrc from "../../assets/images/stats_main_100.png";

export class StatusComponent extends HTMLElement {
  constructor() {
    super();

    this.template = `
            <section class="status">
                <div id="image-placeholder">
                    <img 
                      alt="status-image"
                      class="status__image"
                      src="data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                    />
                </div>
                <div class="status__text">
                    <h2 class="heading-secondary u-margin-bottom-30">
                        Karol Toruń
                    </h2>
                    <h3 class="heading-tertiary">
                        Level <span id="level"></span> Fullstack JS developer at 
                        <a class="link" target="_blank" href="https://brainhub.eu"> Brainhub.eu </a>
                    </h3>
                </div>
            </section>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;

    const statusImg = new Image();

    statusImg.addEventListener("load", () => {
      const imagePlaceholderContainer = this.querySelector("#image-placeholder");
      const imagePlaceholder = imagePlaceholderContainer.querySelector("img");

      imagePlaceholderContainer.removeChild(imagePlaceholder);
      imagePlaceholderContainer.appendChild(statusImg);
    });

    statusImg.src = `.${statusImgSrc}`;

    const endDate = new Date();
    const startDate = new Date(1994, 3, 4);

    const lvlYears = endDate.getYear() - startDate.getYear();

    this.querySelector("#level").innerHTML = `${lvlYears}`;
  }
}
