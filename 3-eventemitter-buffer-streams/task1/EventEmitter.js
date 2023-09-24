class EventEmitter {
  /**
   * {
   *   "eventName": [
   *       { listener: () => {}, once: true/false },
   *    ]
   * }
   */
  listeners = {}; // key-value pair

  #addListenerObject(eventName, fn, once = false) {
    const isEventNameDefined = !!eventName && typeof eventName === "string";
    const isFnDefined = !!fn && typeof fn === "function";

    if (!isEventNameDefined || !isFnDefined) {
      return;
    }

    const hasOtherListeners = !!this.listeners[eventName];
    if (!hasOtherListeners) {
      this.listeners[eventName] = [];
    }

    const listenersForThisEvent = this.listeners[eventName];

    const newListenerObject = {
      listener: fn,
      once,
    };

    listenersForThisEvent.push(newListenerObject);
  }

  addListener(eventName, fn) {
    this.#addListenerObject(eventName, fn);
  }

  on(eventName, fn) {
    this.addListener(eventName, fn);
  }

  removeListener(eventName, fn) {
    // Check if we have listeners for this eventName
    const listenersForEventName = this.listeners[eventName];
    if (!listenersForEventName) {
      return;
    }

    // Added to cover case, when once function added 2+ times as listener
    // This how it works with regular EventListener class
    let isAlreadyDeleted = false;
    this.listeners[eventName] = listenersForEventName.reduce((newListeners, listenerObject) => {
      if (listenerObject.listener === fn && !isAlreadyDeleted) {
        isAlreadyDeleted = true;

        return newListeners;
      }

      newListeners.push(listenerObject);

      return newListeners;
    }, []);
  }

  off(eventName, fn) {
    this.removeListener(eventName, fn);
  }

  once(eventName, fn) {
    this.#addListenerObject(eventName, fn, true);
  }

  emit(eventName, ...args) {
    const listenersForEventName = this.listeners[eventName];
    if (!listenersForEventName) {
        return;
    }

    this.listeners[eventName] = listenersForEventName.reduce((updatedListeners, listenerObject) => {
        const { listener, once } = listenerObject;
        listener(...args);

        if (!once) {
            updatedListeners.push(listenerObject);
        }

        return updatedListeners;
    }, []);
  }

  listenerCount(eventName) {
    const listenersForEventName = this.listeners[eventName];
    if (!listenersForEventName) {
        return 0;
    }

    return listenersForEventName.length;
  }

  rawListeners(eventName) {
    const listenersForEventName = this.listeners[eventName];
    if (!listenersForEventName) {
        return [];
    }

    return listenersForEventName.map(({ listener }) => listener);
  }
}

module.exports = { EventEmitter };
