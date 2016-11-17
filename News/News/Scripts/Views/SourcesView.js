// The sources view code behind
const sourceItemTemplate = sourceItem => `<div>${sourceItem.name}</div>`;

const articleItemTemplate = article => `<a href="${article.url}">${article.title}</a>`;

class SourcesView
{
    constructor() {
        this.sourcesListControl = document.getElementById("view");
        this._controller = null;
        this.handleEvent = function (event) {
            console.log(this.name); // 'Something Good', так как this является объектом Something
            switch (event.type) {
                case 'click':
                    this.onSourceSelected(event);
                    break;
            }
        };
    }

    set Controller(value) {
        this._controller = value;
    }

    showSources(sourceItems) {
        this.clearView();
        let sourcesPanel = document.createElement("div");
        for (let sourceItem of sourceItems) {
            let sourceItemElement = document.createElement("div");
            sourceItemElement.innerHTML = sourceItemTemplate(sourceItem);
            sourceItemElement.setAttribute("data-source-id", sourceItem.id);
            sourceItemElement.addEventListener("click", this, false);
            sourcesPanel.appendChild(sourceItemElement);
        }
        this.sourcesListControl.appendChild(sourcesPanel);
    }
    
    onSourceSelected(event) {
        event.preventDefault();
        let sender = event.currentTarget;
        if (this._controller != null) {
            this._controller.SelectedSourceId = sender.getAttribute("data-source-id");
        }
    }

    showArticles(articles) {
        this.clearView();
        let articlesPanel = document.createElement("div");
        let backElement = document.createElement("div");
        backElement.innerHTML = `<a href="${window.location.href}">Back</div>`;
        articlesPanel.appendChild(backElement);
        for (let article of articles) {
            let articleItemElement = document.createElement("div");
            articleItemElement.innerHTML = articleItemTemplate(article);
            articlesPanel.appendChild(articleItemElement);
        }

        this.sourcesListControl.appendChild(articlesPanel);
    }

    clearView() {
        this.sourcesListControl.innerHTML = "";
    }
}