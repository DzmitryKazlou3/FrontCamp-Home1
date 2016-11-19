class ArticlesPresenter {
    constructor(articlesView, articleService, observable) {
        this._observable = observable;
        observable.addObserver("sourceChanged", this.onSourceChanged.bind(this));
        this._articleService = articleService;
        this._articlesView = articlesView;
        this._articlesView.Presenter = this;
    }

    // called from observable, when "sourceChanged" is emited.
    onSourceChanged(newSourceId) {
        this.loadArticles(newSourceId);
    }

    loadArticles(sourceId) {
        this._articleService.getArticlesBySourceId(sourceId)
            .then(articlesModel => {
                this.setArticles(articlesModel.Articles);
            })
            .catch(err => alert(err));
    }

    setArticles(articles) {
        this._articlesView.showArticles(articles);
    }

    goBack() {
        this._observable.emit("back");
    }
}