let State = require("../../../model/states/State");

class CreateStates {
  constructor() {
    this.states = [];
    this.mapOfNodes;
  }

  createStates(mapOfNodes) {
    //Create states using the map
    this.convertKeyOfMapInState(mapOfNodes);
  }

  convertKeyOfMapInState(mapOfNodes) {
    this.mapOfNodes = mapOfNodes;
    let entries = mapOfNodes.entries().next().value;
    let firsValues = entries[1];
    this.createStateName(firsValues);
  }

  createStateName(values) {
    let newState = new State();
    let name = "";
    for (let i = 0; i < values.length; i++) {
      name += values[i].node.returnIdentifier();
      if (values[i].acceptation === 1) {
        newState.setAcceptation();
      }
    }
    newState.setName(name);
    this.states.push(newState);
    this.createOtherStatesFor(values);
  }

  createOtherStatesFor(values) {
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
    this.createStatesFroGeneratedMap(mapOfNextsNodes);
  }

  createStatesFroGeneratedMap(mapOfNextsNodes) {
    let newTranstions = [];
    let keys = mapOfNextsNodes.keys();
    for (let i of keys) {
      let vlauesOfCurrentMap = mapOfNextsNodes.get(i);
      for (let j of vlauesOfCurrentMap) {
        let currentValuesOfCurrentMap = j;
        for (let k = 0; k < j.length; k++) {
          vlauesOfCurrentMap.push(j[k]);
        }
      }
      console.log(vlauesOfCurrentMap);
    }
  }
}

module.exports = CreateStates;
