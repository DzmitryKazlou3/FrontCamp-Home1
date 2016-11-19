// The source Presenter
class SourcePresenter {
    constructor(sourceView, sourceService, observable) {
        this._observable = observable;
        observable.addObserver("back", this.loadSources.bind(this));
        this._sourceService = sourceService;
        this._sourceView = sourceView;
        this._sourceView.Presenter = this;
        this._selectedSourceId = null;
    }

    set SelectedSourceId(value) {
        this._selectedSourceId = value;
        this._observable.emit("sourceChanged", this._selectedSourceId);
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

    setSources(sourceItems) {
        this._sourceView.showSources(sourceItems);
    }
}