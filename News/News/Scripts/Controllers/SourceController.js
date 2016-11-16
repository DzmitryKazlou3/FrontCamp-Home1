// The source controller
class SourceController {
    constructor(sourceView, sourceService) {
        this._sourceService = sourceService;
        this._sourceView = sourceView;
    }

    loadSources() {
        return this._sourceService.getSources()
            .then((sourceItems) => {
                if (sourceItems) {
                    this.setSources(sourceItems);
                } else {
                    // TODO: move the alert message to constant.
                    alert("there is no source items");
                }
            }).catch((err) => {
                console.log(err);
            });
    }

    setSources(sourceItems) {
        this._sourceView.drawSources(sourceItems);
    }
}