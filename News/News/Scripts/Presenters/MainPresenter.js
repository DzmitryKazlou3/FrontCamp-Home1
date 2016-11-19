class MainPresenter
{
    constructor()
    {
        this._observable = new Observable();
        this._sourcePresenter = new SourcePresenter(new SourcesView(), new SourceService(), this._observable);
        this._articlesPresenter = new ArticlesPresenter(new ArticlesView(), new ArticlesService(), this._observable);
    }

    initialize() {
        this._sourcePresenter.loadSources();
    }
}