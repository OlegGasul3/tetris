class Events {
    constructor() {

    }

    static addListener(eventName, handler) {
        var handlers = Events.listeners[eventName];
        if (!handlers) {
            handlers = [];
            Events.listeners[eventName] = handlers;
        }

        handlers.push(handler);
    }

    static fireEvent(eventName, args) {
        var handlers = Events.listeners[eventName];
        if (!handlers) {
            return;
        }

        for (var i in handlers) {
            handlers[i].apply(args);
        }
    }
}

Events.listeners = [];