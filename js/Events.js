class Events {
    constructor() {
        this.listeners = [];
    }

    addListener(event, handler) {
        var handlers = this.listeners[event];
        if (!handlers) {
            handlers = [];
            this.listeners[event] = handlers;
        }

        handlers.push(handler);
    }

    fireEvent(event) {
        var handlers = this.listeners[event];
        if (!handlers) {
            return;
        }

        for (var i in handlers) {
            handlers[i]();
        }
    }
}