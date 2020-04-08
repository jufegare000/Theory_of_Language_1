let State = require("../../../model/states/State");

class CreateStates {
  constructor() {
    this.states = [];
  }

  createStates(mapOfNodes) {
    //Create states using the map
    this.convertKeyOfMapInState(mapOfNodes);
  }

  convertKeyOfMapInState(mapOfNodes) {
    let keys = mapOfNodes.keys();
    let characters = new Map();

    let name = "";
    let newState = new State();
    for (let i of keys) {
      let currentValues = mapOfNodes.get(i);
      for (let j = 0; j < currentValues.length; j++) {
        let current = currentValues[j];
        let char = current.node.returnData();
        if (char !== "λ" && char !== null) {
          characters.set(char, current.node.returnRight());
        }
        name = current.node.identifier;
        let state = current.acceptation;

        if (state === 1) {
          newState.setAcceptation();
        }
      }
    }
  }

  setCharToState(map, char) {
    map.set(char, []);
  }

  setTransitionToChar(map, node, data) {
    mapa.get(data).push(node);
  }
}

module.exports = CreateStates;
