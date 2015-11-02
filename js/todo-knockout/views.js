/// <reference path="../lib/knockout.d.ts" />
/// <reference path="models.ts" />
var Demo;
(function (Demo) {
    var Todo;
    (function (Todo) {
        var KnockoutApp;
        (function (KnockoutApp) {
            /**
             * A driving ViewModel for a todo application.
             */
            var TodosViewModel = (function () {
                /**
                 * Initializes a new instance of the TodosViewModel class.
                 *
                 * @param localStorageKey   The key under which values will be stored locally.
                 */
                function TodosViewModel(localStorageKey) {
                    this.localStorageKey = "todo-knockout-" + localStorageKey;
                    this.todos = ko.observableArray(this.getSavedTodos());
                    this.textAddValue = ko.observable();
                    this.todosIncomplete = ko.pureComputed(this.getTodosComputedWhere(false));
                    this.todosCompleted = ko.pureComputed(this.getTodosComputedWhere(true));
                    this.todos.subscribe(this.save.bind(this));
                }
                /**
                 * Adds a new todo to the the collection.
                 */
                TodosViewModel.prototype.addTodo = function () {
                    var todo = new KnockoutApp.Todo(this.createTodoValue());
                    todo.completed.subscribe(this.save.bind(this));
                    this.todos.push(todo);
                };
                /**
                 * Removes all todos from the collection.
                 */
                TodosViewModel.prototype.clearTodos = function () {
                    this.todos.removeAll();
                };
                /**
                 * Generates a filter function to be passed into a Knockout computable to
                 * retrieve todos where their completed value equals given status.
                 *
                 * @param status   What completed status retrieved views should be.
                 * @returns A function that returns a filtered Todo[].
                 */
                TodosViewModel.prototype.getTodosComputedWhere = function (status) {
                    var _this = this;
                    return function () { return ko.utils.arrayFilter(_this.todos(), function (todo) {
                        return todo.completed() === status;
                    }); };
                };
                /**
                 * @returns Default properties for a new todo item, with text
                 *          from the text input.
                 */
                TodosViewModel.prototype.createTodoValue = function () {
                    return {
                        timestamp: new Date().getTime(),
                        text: this.textAddValue(),
                        completed: false
                    };
                };
                /**
                 * Saves a current (JSON) snapshot of the todos to localStorage.
                 */
                TodosViewModel.prototype.save = function () {
                    localStorage.setItem(this.localStorageKey, ko.toJSON(this.todos));
                };
                /**
                 * Retrieves the current (JSON) snapshot of todos from localStorage.
                 *
                 * @returns The array of todos stored in localStorage.
                 */
                TodosViewModel.prototype.getSavedTodos = function () {
                    return JSON.parse(localStorage.getItem(this.localStorageKey) || "[]")
                        .map(function (settings) { return new KnockoutApp.Todo(settings); });
                };
                return TodosViewModel;
            })();
            KnockoutApp.TodosViewModel = TodosViewModel;
        })(KnockoutApp = Todo.KnockoutApp || (Todo.KnockoutApp = {}));
    })(Todo = Demo.Todo || (Demo.Todo = {}));
})(Demo || (Demo = {}));
