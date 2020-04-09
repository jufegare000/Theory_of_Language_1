class State {
  constructor() {
    this.name = "";
    this.transtions = [];
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

  getTransitions() {
    return this.transtions;
  }

  setTransition(transtion) {
    this.transtions.push(transtion);
  }
}
module.exports = State;
