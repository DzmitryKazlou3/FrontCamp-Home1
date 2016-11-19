// The articles view.
class ArticlesView extends View
{
    constructor() {
        super();
    }

    showArticles(articles) {
        super.clearView();
        let articlesPanel = document.createElement("div");
        let backElement = document.createElement("div");
        backElement.innerHTML = `<a href="${window.location.href}">Back</div>`;
        articlesPanel.appendChild(backElement);
        for (let article of articles) {
            let articleItemElement = document.createElement("div");
            articleItemElement.innerHTML = Templates.ArticleItemTemplate(article);
            articlesPanel.appendChild(articleItemElement);
        }

        this._viewControl.appendChild(articlesPanel);
    }
}