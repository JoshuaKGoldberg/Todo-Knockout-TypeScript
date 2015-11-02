/// <reference path="../lib/knockout.d.ts" />

/// <reference path="models.ts" />

module Demo.Todo.KnockoutApp {
    /**
     * A driving ViewModel for a todo application.
     */
    export class TodosViewModel {
        /**
         * The key under which values will be stored locally.
         */
        localStorageKey: string;

        /**
         * Stored todos, as an observable Todo[].
         */
        todos: KnockoutObservableArray<Todo>;

        /**
         * Todos where computed=false, as a view of this.todos.
         */
        todosIncomplete: KnockoutComputed<Todo[]>;

        /**
         * Todos where computed=true, as a view of this.todos.
         */
        todosCompleted: KnockoutComputed<Todo[]>;

        /**
         * Bound value to the page's text input for naming todos.
         */
        textAddValue: KnockoutObservable<string>;

        /**
         * Initializes a new instance of the TodosViewModel class.
         * 
         * @param localStorageKey   The key under which values will be stored locally.
         */
        constructor(localStorageKey: string) {
            this.localStorageKey = "todo-knockout-" + localStorageKey;

            this.todos = ko.observableArray(this.getSavedTodos());

            this.textAddValue = ko.observable<string>();

            this.todosIncomplete = ko.pureComputed(this.getTodosComputedWhere(false));
            this.todosCompleted = ko.pureComputed(this.getTodosComputedWhere(true));

            this.todos.subscribe(this.save.bind(this));
        }

        /**
         * Adds a new todo to the the collection.
         */
        addTodo(): void {
            var todo = new Todo(this.createTodoValue());

            todo.completed.subscribe(this.save.bind(this));

            this.todos.push(todo);
        }
        
        /**
         * Removes all todos from the collection.
         */
        clearTodos(): void {
            this.todos.removeAll();
        }

        /**
         * Generates a filter function to be passed into a Knockout computable to
         * retrieve todos where their completed value equals given status.
         * 
         * @param status   What completed status retrieved views should be.
         * @returns A function that returns a filtered Todo[].
         */
        private getTodosComputedWhere(status: boolean): () => Todo[] {
            return (): Todo[] => ko.utils.arrayFilter(this.todos(), (todo: Todo): boolean => {
                return todo.completed() === status;
            });
        }

        /**
         * @returns Default properties for a new todo item, with text
         *          from the text input.
         */
        private createTodoValue(): ITodoValue {
            return {
                timestamp: new Date().getTime(),
                text: this.textAddValue(),
                completed: false
            };
        }

        /**
         * Saves a current (JSON) snapshot of the todos to localStorage.
         */
        private save(): void {
            localStorage.setItem(this.localStorageKey, ko.toJSON(this.todos));
        }

        /**
         * Retrieves the current (JSON) snapshot of todos from localStorage.
         * 
         * @returns The array of todos stored in localStorage.
         */
        private getSavedTodos(): Todo[] {
            return JSON.parse(localStorage.getItem(this.localStorageKey) || "[]")
                .map((settings: ITodoValue): Todo => new Todo(settings));
        }
    }
}
