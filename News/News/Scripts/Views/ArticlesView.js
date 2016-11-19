// The articles view.
class ArticlesView extends View
{
    constructor() {
        super();
    }

    showArticles(articles) {
        scroll(0,0);
        super.clearView();
        let view = document.createElement("div");

        // Add back-button.
        let backElement = document.createElement("div");
        backElement.addEventListener("click", this.onBackClick.bind(this), false);
        backElement.innerText = "Back";
        backElement.setAttribute("class", "back-button");
        view.appendChild(backElement);

        // add articles.
        let articlesPanel = document.createElement("div");
        articlesPanel.setAttribute("class", "table");

        let i = 0;
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        articlesPanel.appendChild(row);

        for (let article of articles) {
            i++;
            let articleItemElement = document.createElement("div");
            articleItemElement.setAttribute("class", "border table-cell article-max-cell-width");
            articleItemElement.innerHTML = Templates.ArticleItemTemplate(article);
            row.appendChild(articleItemElement);
            if (i === 3) {
                i = 0;
                row = document.createElement("div");
                row.setAttribute("class", "row");
                articlesPanel.appendChild(row);
            }
        }

        view.appendChild(articlesPanel);
        this._viewControl.appendChild(view);
    }

    onBackClick() {
        this._presenter.goBack();
    }
}