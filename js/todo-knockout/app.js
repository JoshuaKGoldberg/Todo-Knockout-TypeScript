/// <reference path="../lib/knockout.d.ts" />
/// <reference path="models.ts" />
/// <reference path="views.ts" />
var Demo;
(function (Demo) {
    var Todo;
    (function (Todo) {
        var KnockoutApp;
        (function (KnockoutApp) {
            // A custom Knockout binding for enter-able inputs. The valueAccessor is called 
            // as a function when the element's keyup event is triggered on an enter press.
            ko.bindingHandlers["valueEnter"] = {
                init: function (element, valueAccessor, allBindings, viewModel) {
                    element.addEventListener("keyup", function (event) {
                        if (event.which === 13) {
                            valueAccessor().call(viewModel);
                        }
                    });
                }
            };
            ko.applyBindings(new KnockoutApp.TodosViewModel("my-todos"));
        })(KnockoutApp = Todo.KnockoutApp || (Todo.KnockoutApp = {}));
    })(Todo = Demo.Todo || (Demo.Todo = {}));
})(Demo || (Demo = {}));
