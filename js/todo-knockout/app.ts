/// <reference path="../lib/knockout.d.ts" />

/// <reference path="models.ts" />
/// <reference path="views.ts" />

module Demo.Todo.KnockoutApp {
    // A custom Knockout binding for enter-able inputs. The valueAccessor is called 
    // as a function when the element's keyup event is triggered on an enter press.
    ko.bindingHandlers["valueEnter"] = {
        init(element: HTMLElement, valueAccessor: KnockoutObservable<Function>, allBindings: any, viewModel: any): void {
            element.addEventListener("keyup", (event: KeyboardEvent): void => {
                if (event.which === 13) {
                    valueAccessor().call(viewModel);
                }
            });
        }
    };

    ko.applyBindings(new TodosViewModel("my-todos"));
}
