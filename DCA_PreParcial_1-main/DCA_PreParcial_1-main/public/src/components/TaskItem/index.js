class TaskItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Attach shadow DOM to isolate component styles.
    }

    static get observedAttributes() {
        return ['title', 'description', 'state']; // List of attributes to observe for changes.
    }

    connectedCallback() {
        this.render(); // Render the initial UI when the element is added to the DOM.
    }

    attributeChangedCallback(propName, oldValue, newValue) {
        // Called when observed attributes change; update the respective property.
        if (oldValue !== newValue) {
            this[propName] = propName === 'state' ? newValue === 'true' : newValue; // Convert state to boolean.
            this.render(); // Re-render to reflect changes.
        }
    }

    toggleTask() {
        this.state = !this.state; // Toggle the task's state (completed or pending).
        this.render(); // Re-render the UI to reflect the new state.
    }

    render() {
        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="./src/components/TaskItem/styles.css"> <!-- Link to external styles -->
        <li class=${this.state ? "completed" : "task"}> <!-- Apply class based on state -->
            <h3>${this.title}</h3>
            <p>${this.description}</p>
            <p>${!this.state ? "Pendiente" : "Completada"}</p> <!-- Display task status -->
            <input type="checkbox" ${this.state ? "checked" : ""} class="task-checkbox"> <!-- Checkbox to toggle state -->
        </li>
        `;

        const checkbox = this.shadowRoot.querySelector('.task-checkbox');
        // Add event listener to toggle task state on checkbox change.
        checkbox.addEventListener('change', () => this.toggleTask());
    }
}

customElements.define('task-item', TaskItem); // Define the custom element 'task-item'.
export default TaskItem;
