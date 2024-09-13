import '../TaskItem/index.js'; // Importing TaskItem component so it can be used within TaskList.

class TaskList extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' }); // Attach shadow DOM to isolate component styles.
        this.tasks = []; // Initialize an empty array to store task objects.
    }

    connectedCallback() {
        this.render(); // Render the initial UI.
        
        const form = this.shadowRoot.querySelector('.task-form');
        // Add event listener for form submission.
        form.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent default form submission behavior.
            
            // Get values from input fields.
            const title = this.shadowRoot.querySelector('.input-title').value;
            const description = this.shadowRoot.querySelector('.input-description').value;

            // Create a new task and add it to the tasks array.
            this.tasks.push({ title, description, state: false });

            // Call addTask method to render the new task.
            this.addTask({ title, description, state: false });

            form.reset(); // Reset the form fields after submission.
        });
    }

    render() {
        this.shadowRoot.innerHTML = `
        <h2>Task List</h2>
        <form class="task-form">
            <input type="text" placeholder="Titulo" class="input-title" required>
            <input type="text" placeholder="Descripcion" class="input-description" required>
            <button>Agregar tarea</button> <!-- Button to submit the form -->
        </form>
        <ul class="tasks-container">
        </ul> <!-- Container for the task items -->
        `;

        // Render each task in the tasks array.
        this.tasks.forEach(task => this.addTask(task));
    }

    addTask({ title, description, state }) {
        const tasksContainer = this.shadowRoot.querySelector('.tasks-container');
        // Append a new task-item to the tasks container with the task's data.
        tasksContainer.innerHTML += `
        <task-item title="${title}" description="${description}" state="${state}"></task-item>
        `;
    }
}

customElements.define('task-list', TaskList); // Define the custom element 'task-list'.
export default TaskList;
