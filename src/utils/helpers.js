export function getObjectOfId(array, id) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].id == id) {
      return Object.assign({}, array[i]);
    }
  }
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
