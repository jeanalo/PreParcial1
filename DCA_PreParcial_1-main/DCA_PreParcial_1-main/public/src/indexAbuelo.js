import * as components from './components/indexPadre.js' // Importing all exported components from the indexPadre.js file.

class AppContainer extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Attach a shadow DOM to encapsulate the component's styles and markup.
    }

    connectedCallback() {
        this.render(); // Called when the element is added to the DOM; invokes render method.
    }

    render() {
        this.shadowRoot.innerHTML = `
        <h1>App Container</h1>
        <task-list></task-list> <!-- Embedding a custom TaskList component -->
        `;
    }
}

customElements.define('app-container', AppContainer); // Define the custom element 'app-container'.
