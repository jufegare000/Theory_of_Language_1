let State = require("../../../model/states/State");
let Transsition = require("../../../model/states/Transition");

class CreateStates {
  constructor() {
    this.states = [];
    this.mapOfNodes;
    this.currentState;
    this.names = [];
    this.pendingStates = [];
    this.readyNodes = [];
  }

  createStates(mapOfNodes) {
    //Create states using the map
    this.convertKeyOfMapInState(mapOfNodes);
    return this.states;
  }

  convertKeyOfMapInState(mapOfNodes) {
    this.mapOfNodes = mapOfNodes;
    let entries = mapOfNodes.entries().next().value;
    let firsValues = entries[1];
    this.connect(firsValues);
  }

  connect(values) {
    let name = this.createStateName(values);
    let state = this.createState(name, values);
    this.createOtherStatesFor(values);
  }

  createState(name, values) {
    let newState = new State();
    for (let i = 0; i < values.length; i++) {
      if (values[i].returnData() === null) {
        newState.setAcceptation();
      }
    }
    newState.setName(name);
    this.states.push(newState);
    this.names.push(name);
    this.currentState = newState;
    return newState;
  }

  findStateByName(name) {
    for (let i = 0; i < this.states.length; i++) {
      if (name === this.states[i].getName()) {
        return this.states[i];
      }
    }
  }

  createOtherStatesFor(values) {
    let mapOfNextsNodes = new Map();
    let newStates;
    let entries = [];
    let data;
    let currentNode;
    for (let i = 0; i < values.length; i++) {
      currentNode = values[i];
      data = currentNode.returnData();
      if (data !== "λ" && !entries.includes(data) && data !== null) {
        mapOfNextsNodes.set(data, []);
        mapOfNextsNodes.get(data).push(currentNode.returnRight());
        entries.push(data);
      } else if (data !== "λ" && data !== null) {
        mapOfNextsNodes.get(data).push(currentNode, currentNode.returnRight());
        entries.push(data);
      }
    }
    newStates = this.createStatesFromGeneratedMap(mapOfNextsNodes);
  }

  createStatesFromGeneratedMap(mapOfNextsNodes) {
    let newTranstions = [];
    let trans;
    let keys = mapOfNextsNodes.keys();
    for (let symbol of keys) {
      let vlauesOfCurrentMap = mapOfNextsNodes.get(symbol);
      console.log("for key: ", symbol);
      for (let j of vlauesOfCurrentMap) {
        let valuesInBigMap = this.mapOfNodes.get(j);
        //this.readyNodes.push(j);
        newTranstions = this.puhsing(newTranstions, valuesInBigMap);
      }
      trans = this.synthesizeArray(newTranstions);
      this.pendingStates.push({
        fromState: this.currentState,
        symbol: symbol,
        withTransitions: trans,
      });
      newTranstions = [];
      trans = null;
    }
    this.createPendingStates();
  }

  puhsing(newTranstions, valueInBigMap) {
    for (let i = 0; i < valueInBigMap.length; i++) {
      newTranstions.push(valueInBigMap[i]);
    }
    return newTranstions;
  }

  createPendingStates() {
    let currentPending;
    let stateTo;
    while (this.pendingStates.length !== 0) {
      currentPending = this.pendingStates.pop();
      let stateFrom = currentPending.fromState;
      let name = this.createStateName(currentPending.withTransitions);
      if (this.names.includes(name)) {
        stateTo = this.findStateByName(name);
        console.log(
          " create transition with symbol ",
          currentPending.symbol,
          "from state",
          stateFrom.getName(),
          "to state: ",
          stateTo.getName()
        );
        let transition = new Transsition(
          stateFrom,
          currentPending.symbol,
          stateTo
        );
        stateFrom.setTransition(transition);
      } else {
        stateTo = this.createState(name, currentPending.withTransitions);
        console.log(
          "Will create transition with symbol ",
          currentPending.symbol,
          "from state",
          stateFrom.getName(),
          "to state: ",
          stateTo.getName()
        );
        let transition = new Transsition(
          stateFrom,
          currentPending.symbol,
          stateTo
        );
        stateFrom.setTransition(transition);
        this.createOtherStatesFor(currentPending.withTransitions);
      }
    }
  }

  createStateName(transitionsArray) {
    let name = "";
    for (let i = 0; i < transitionsArray.length; i++) {
      name += transitionsArray[i].returnIdentifier();
    }
    console.log(name);
    return name;
  }

  synthesizeArray(arrayx) {
    let visited = [];
    let finalArray = [];
    for (let i = 0; i < arrayx.length; i++) {
      if (!visited.includes(arrayx[i].returnIdentifier())) {
        finalArray.push(arrayx[i]);
        visited.push(arrayx[i].returnIdentifier());
      }
    }
    return finalArray;
  }
}

module.exports = CreateStates;
