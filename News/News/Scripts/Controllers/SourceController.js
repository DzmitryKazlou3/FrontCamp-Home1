// The source controller
class SourceController {
    constructor(sourceView, sourceService, articleService) {
        this._sourceService = sourceService;
        this._articleService = articleService;
        this._sourceView = sourceView;
        this._sourceView.Controller = this;
        this._selectedSourceId = null;
    }

    set SelectedSourceId(value) {
        if (this._selectedSourceId !== value) {
            this._selectedSourceId = value;
            this.loadArticles(this._selectedSourceId);
        }
    }

    loadSources() {
        return this._sourceService.getSources()
            .then(sourceItems => {
                if (sourceItems) {
                    this.setSources(sourceItems);
                } else {
                    // TODO: move the alert message to constant.
                    alert("there is no source items");
                }
            }).catch(err => alert(err));
    }

    loadArticles(sourceId) {
        this._articleService.getArticlesBySourceId(sourceId)
            .then(articlesModel => {
                this.setArticles(articlesModel.Articles);
            })
            .catch(err => alert(err));
    }

    setSources(sourceItems) {
        this._sourceView.showSources(sourceItems);
    }

    setArticles(articles) {
        this._sourceView.showArticles(articles);
    }
}