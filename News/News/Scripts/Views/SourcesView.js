// The sources view code behind
class SourcesView extends View
{
    constructor() {
        super();
    }

    showSources(sourceItems) {
        scroll(0, 0);
        super.clearView();
        let sourcesPanel = document.createElement("div");
        sourcesPanel.setAttribute("class", "listPanel");
        for (let sourceItem of sourceItems) {
            let sourceItemElement = document.createElement("div");
            sourceItemElement.innerHTML = Templates.SourceItemTemplate(sourceItem);
            sourceItemElement.setAttribute("data-source-id", sourceItem.id);
            sourceItemElement.setAttribute("class", "column-1of3 border");
            sourceItemElement.addEventListener("click", this.onSourceSelected.bind(this), false);
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