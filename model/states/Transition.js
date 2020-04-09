class Transition {
  constructor(from, symbol, to) {
    this.state = from;
    this.symbol = symbol;
    this.stateTo = to;
  }

  setState(state) {
    this.state = state;
  }

  getState() {
    return this.state;
  }

  setSymbol(symbol) {
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }

  setStateTo(state) {
    this.stateTo = state;
  }

  getStateTo() {
    return this.stateTo;
  }
}

module.exports = Transition;
