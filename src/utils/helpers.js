import { vertex, relations } from "variables/graphs";

export function getObjectOfId(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      return Object.assign({}, array[i]);
    }
  }
}

export function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function editItemAtIndex(array, data, index) {
  return array
    .slice(0, index)
    .concat([data])
    .concat(array.slice(Number(index) + 1));
}

export function getIndexOfId(array, id) {
  const len = array.length;
  for (let i = 0; i < len; i++) {
    if (array[i]["id"] === id) {
      return i;
    }
  }
  return -1;
}

export function getIndexAndObjectofId(array, id, keyValue = "id") {
  for (let i = 0; i < array.length; i++) {
    if (array[i][keyValue] == id) {
      return {
        object: Object.assign({}, array[i]),
        index: i
      };
    }
  }
}

export function removeItemAtIndex(array, index) {
  return array.slice(0, index).concat(array.slice(Number(index) + 1));
}

export function getNode(node, type) {
  return {
    name: `${node.name}:${node.id}`,
    symbolSize: 50,
    draggable: "true",
    category: type,
    value: `${node.name}:${node.id}`,
    node: node
  };
}

export function getNodes(nodes, type) {
  return nodes.map(node => {
    return getNode(node, type);
  });
}

export function getLink(source, target, relation) {
  return {
    source: source.name,
    target: target.name,
    value: relation
  };
}

export function getLinks(source, targets, relation) {
  return targets.map(target => {
    return {
      source: source.name,
      target: target.name,
      value: relation
    };
  });
}

export function getNodesAndLinks(array, nodes, key, relation) {
  const data = {
    nodes: [],
    links: []
  };
  array.forEach((object, index) => {
    const node = nodes[index];
    const childNodes = getNodes(object[key], relation);
    const links = getLinks(node, childNodes, relation.associatedFailureMode);
    data.nodes = data.nodes.concat(childNodes);
    data.links = data.links.concat(links);
  });
  return data;
}

export function getOutputChildNodesAndLinks(outputs, functionNode) {
  const data = {
    nodes: [],
    links: []
  };
  outputs.forEach((output, index) => {
    const node = getNode(output, vertex.output);
    data.nodes.push(node);
    data.links.push(getLink(node, functionNode, relations.functionOutput));
    output.failureModes.forEach(mode => {
      const failureNode = getNode(mode, vertex.failureMode);
      data.nodes.push(failureNode);
      data.links.push(
        getLink(node, failureNode, relations.associatedFailureMode)
      );
      mode.effects.forEach(effect => {
        const failureEffect = getNode(effect, vertex.failureModeEffect);
        data.nodes.push(failureEffect);
        data.links.push(
          getLink(
            failureNode,
            failureEffect,
            relations.associatedFailureModeEffect
          )
        );
      });
      mode.causes.forEach(cause => {
        const failureCause = getNode(cause, vertex.failureCause);
        data.nodes.push(failureCause);
        data.links.push(
          getLink(
            failureNode,
            failureCause,
            relations.associatedFailureModeCause
          )
        );
      });
    });
  });
  return data;
}

export function preparedGraphData(data, functionItem) {
  const graphData = { nodes: [], links: [] };
  const functionNode = getNode(functionItem, vertex.function);
  graphData.nodes.push(functionNode);
  const inputs = getNodes(data.inputs, vertex.input);
  graphData.nodes = graphData.nodes.concat(inputs);
  graphData.links = graphData.links.concat(
    getLinks(functionNode, inputs, relations.functionInput)
  );
  const childs = getOutputChildNodesAndLinks(data.outputs, functionNode);
  graphData.nodes = graphData.nodes.concat(childs.nodes);
  graphData.links = graphData.links.concat(childs.links);
  return graphData;
}
