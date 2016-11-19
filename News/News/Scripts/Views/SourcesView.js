// The sources view code behind
class SourcesView extends View
{
    constructor() {
        super();
        this.handleEvent = function (event) {
            switch (event.type) {
                case 'click':
                    this.onSourceSelected(event);
                    break;
            }
        };
    }

    showSources(sourceItems) {
        super.clearView();
        let sourcesPanel = document.createElement("div");
        for (let sourceItem of sourceItems) {
            let sourceItemElement = document.createElement("div");
            sourceItemElement.innerHTML = Templates.SourceItemTemplate(sourceItem);
            sourceItemElement.setAttribute("data-source-id", sourceItem.id);
            sourceItemElement.addEventListener("click", this, false);
            sourcesPanel.appendChild(sourceItemElement);
        }
        this._viewControl.appendChild(sourcesPanel);
    }
    
    onSourceSelected(event) {
        event.preventDefault();
        let sender = event.currentTarget;
        if (this._presenter != null) {
            this._presenter.SelectedSourceId = sender.getAttribute("data-source-id");
        }
    }
}