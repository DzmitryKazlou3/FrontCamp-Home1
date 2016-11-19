class View {
    constructor() {
        this._presenter = null;
        this._viewControl = document.getElementById("view");
    }

    set Presenter(value) {
        this._presenter = value;
    }

    clearView() {
        this._viewControl.innerHTML = "";
    }

}