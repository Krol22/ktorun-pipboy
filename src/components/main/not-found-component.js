export class NotFoundComponent extends HTMLElement {
  constructor() {
    super();
    this.template = `
            <section class="not-found">
                <div class="not-found__content">
                    <div class="not-found__icon"></div>
                    <p>PipOS Error &nbsp;- 404</p>
                    <p>[ Module '<span class="not-found__module" id="module"></span>' Not Found ]</p>
                </div>
            </section>
        `;
  }

  connectedCallback() {
    this.innerHTML = this.template;
    const moduleName = document.querySelector("body").dataset.notFoundModule;

    this.querySelector("#module").innerHTML = moduleName;
  }
}
