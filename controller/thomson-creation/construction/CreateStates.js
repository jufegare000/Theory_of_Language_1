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
    this.currentState = state;
    //let transitionsForState = this.createTransitionsMap(values);
    this.createOtherStatesFor(values);
  }

  createState(name, values) {
    let newState = new State();
    for (let i = 0; i < values.length; i++) {
      if (values[i].acceptation === 1) {
        newState.setAcceptation();
      }
    }
    newState.setName(name);
    this.states.push(newState);
    this.names.push(name);
    this.currentState = newState;
    return newState;
  }

  createTransitionsMap(values) {
    let mapOfNextsNodes = new Map();
    let entries = [];
    let data;
    let currentNode;
    for (let i = 0; i < values.length; i++) {
      currentNode = values[i].node;
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
    this.castTransitionByMap(mapOfNextsNodes);
  }

  castTransitionByMap(mapOfNextsNodes) {
    let transitions = this.createStatesFroGeneratedMap(mapOfNextsNodes);
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
      currentNode = values[i].node;
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
    newStates = this.createStatesFroGeneratedMap(mapOfNextsNodes);
  }

  createStatesFroGeneratedMap(mapOfNextsNodes) {
    let newTranstions = [];
    let keys = mapOfNextsNodes.keys();
    for (let symbol of keys) {
      let vlauesOfCurrentMap = mapOfNextsNodes.get(symbol);
      console.log("for key: ", symbol);
      for (let j of vlauesOfCurrentMap) {
        let valueInBigMap = this.mapOfNodes.get(j);
        this.readyNodes.push(j);
        newTranstions = this.puhsing(newTranstions, valueInBigMap);
      }
      this.synthesizeArray(newTranstions);
      this.pendingStates.push({
        fromState: this.currentState,
        symbol: symbol,
        withTransitions: newTranstions,
      });
      newTranstions = [];
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
      } else {
        stateTo = this.createState(name, currentPending.withTransitions);
      }

      let trantion = new Transsition(stateFrom, currentPending.symbol, stateTo);

      stateFrom.setTransition(trantion);
      this.createOtherStatesFor(currentPending.withTransitions);
    }
    console.log(this.states);
  }

  createStateName(transitionsArray) {
    let name = "";
    for (let i = 0; i < transitionsArray.length; i++) {
      name += transitionsArray[i].node.returnIdentifier();
    }
    return name;
  }

  synthesizeArray(arrayx) {
    let visited = [];
    let finalArray = [];
    for (let i = 0; i < arrayx.length; i++) {
      if (!visited.includes(arrayx[i])) {
        finalArray.push(arrayx[i]);
      }
    }
    return finalArray;
  }
}

module.exports = CreateStates;
