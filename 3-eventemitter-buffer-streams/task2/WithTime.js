const { EventEmitter } = require("../task1/EventEmitter");

class WithTime extends EventEmitter {
  #startMeasureMark = "A";
  #endMeasureMark = "B";
  #measureName = "A to B";

  #startTimeMeasure() {
    performance.mark(this.#startMeasureMark);
  }

  #endTimeMeasure() {
    performance.mark(this.#endMeasureMark);
    performance.measure(this.#measureName, this.#startMeasureMark, this.#endMeasureMark);
    const measure = performance.getEntriesByName(this.#measureName)[0];

    return measure.duration;
  }

  #clearAfterTimeMeasure() {
    performance.clearMarks();
    performance.clearMeasures();
  }
  
  async execute(asyncFunc, ...args) {
    if (!asyncFunc) {
      return;
    }

    console.log("[WithTime] asyncFunc execution start");
    this.emit("begin");

    this.#startTimeMeasure();

    try {
      // Execute
      const data = await asyncFunc(...args);
      // Measure
      const duration = this.#endTimeMeasure();

      // Output
      console.log(`[WithTime] asyncFunc execution end, duration: ${duration}ms, data: ${data}`);
      this.emit("end", { data, duration });
    } catch (error) {
      console.error(`[WithTime] ERROR: ${error}`);
      this.emit("error", error);
    } finally {
      this.#clearAfterTimeMeasure();
    }
  }
}

module.exports = { WithTime };
