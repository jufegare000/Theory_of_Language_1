class State {
  constructor() {
    this.name = "";
    this.entranceSymbols = [];
    this.transtions = new Map();
    this.state = 0;
  }

  setAcceptation() {
    this.state = 1;
  }

  setName(name) {
    this.name = name;
  }

  getName() {
    return this.name;
  }

  getEntranceSymbols() {
    return this.entranceSymbols;
  }

  getTransitions() {
    return this.transtions;
  }

  setTransition(key) {
    this.transtions.set(key, []);
  }

  updateTransition(key, state) {
    this.transtions.get(key).push(state);
  }
}
module.exports = State;
