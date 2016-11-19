class Observable{
    constructor() {
        this._observers = new Map();
    }

    addObserver(label, callback) {
        this._observers.has(label) || this._observers.set(label, []);
        this._observers.get(label).push(callback);
    }
    removeListener(label, callback) {
        let observers = this._observers.get(label);
        let index;

        if (observers && observers.length) {
            index = observers.reduce((i, observer, index) => {
                return (isFunction(observer) && observer === callback) ?
                    i = index :
                    i;
            }, -1);

            if (index > -1) {
                observers.splice(index, 1);
                this._observers.set(label, observers);
                return true;
            }
        }
        return false;
    }
    emit(label, ...args) {
        let observers = this._observers.get(label);
        if (observers && observers.length) {
            observers.forEach((observer) => {
                observer(...args);
            });
            return true;
        }
        return false;
    }
}