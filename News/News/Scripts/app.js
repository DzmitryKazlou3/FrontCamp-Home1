(function() {
    let sourceController = new SourceController(new SourcesView(), new SourceService());
    sourceController.loadSources();
})();