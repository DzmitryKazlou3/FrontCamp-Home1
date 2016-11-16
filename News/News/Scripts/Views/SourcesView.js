// The sources view code behind
const sourceItemTemplate = sourceItem => `<div>${sourceItem.name}</div>`;

class SourcesView
{
    constructor() {
        this.sourcesListControl = document.getElementById("sourcesList");
    }

    drawSources(sourceItems) {
        for (let sourceItem of sourceItems) {
            let sourceItemElement = document.createElement("div");
            sourceItemElement.innerHTML = sourceItemTemplate(sourceItem);
            this.sourcesListControl.appendChild(sourceItemElement);
        }
    }
}