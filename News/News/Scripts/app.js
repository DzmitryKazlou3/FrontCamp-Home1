(function() {
    let sourceController = new SourceController(new SourcesView(), new SourceService(), new ArticleService());
    sourceController.loadSources();
})();