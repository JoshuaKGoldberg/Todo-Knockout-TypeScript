/// <reference path="../lib/knockout.d.ts" />

module Demo.Todo.KnockoutApp {
    /**
     * A simple representation of a todo's state.
     */
    export interface ITodoValue {
        /**
         * When this todo was originally created (used as a GUID).
         */
        timestamp?: number;

        /**
         * The displayed text of the todo.
         */
        text: string;

        /**
         * Whether the todo has been completed already.
         */
        completed?: boolean;
    }

    /**
     * A simple class that should contain the schema in ITodoValue.
     */
    export class Todo {
        /**
         * When this todo was originally created (used as a GUID).
         */
        timestamp: number;

        /**
         * The displayed text of the todo.
         */
        text: string;

        /**
         * Whether the todo has been completed already.
         */
        completed: KnockoutObservable<boolean>;

        /**
         * Initializes a new instance of the Todo class.
         */
        constructor(settings: ITodoValue) {
            this.timestamp = settings.timestamp || new Date().getTime();
            this.text = settings.text;
            this.completed = ko.observable(settings.completed || false);
        }
    }
}
