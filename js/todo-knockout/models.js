/// <reference path="../lib/knockout.d.ts" />
var Demo;
(function (Demo) {
    var Todo;
    (function (Todo_1) {
        var KnockoutApp;
        (function (KnockoutApp) {
            /**
             * A simple class that should contain the schema in ITodoValue.
             */
            var Todo = (function () {
                /**
                 * Initializes a new instance of the Todo class.
                 */
                function Todo(settings) {
                    this.timestamp = settings.timestamp || new Date().getTime();
                    this.text = settings.text;
                    this.completed = ko.observable(settings.completed || false);
                }
                return Todo;
            })();
            KnockoutApp.Todo = Todo;
        })(KnockoutApp = Todo_1.KnockoutApp || (Todo_1.KnockoutApp = {}));
    })(Todo = Demo.Todo || (Demo.Todo = {}));
})(Demo || (Demo = {}));
