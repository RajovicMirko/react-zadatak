export function getResource(data) {
  return {
    type: "GET_RESOURCE",
    data: data,
  };
}

export function doneGetResource(data) {
  return {
    type: "DONE_GET_RESOURCE",
    data: data,
  };
}

export function errorGetResource(data) {
  return {
    type: "ERROR_GET_RESOURCE",
    data: data,
  };
}
export function searchResource(data) {
  return {
    type: "SEARCH_RESOURCE",
    data: data,
  };
}

export function doneSearchResource(data) {
  return {
    type: "DONE_SEARCH_RESOURCE",
    filteredData: data,
  };
}

export function addResource(data) {
  return {
    type: "ADD_RESOURCE",
    data: data,
  };
}

export function doneAddResource(data) {
  return {
    type: "DONE_ADD_RESOURCE",
    data: data,
  };
}

export function errorAddResource(data) {
  return {
    type: "ERROR_ADD_RESOURCE",
    data: data,
  };
}

export function deleteResource(data) {
  return {
    type: "DELETE_RESOURCE",
    data: data,
  };
}

export function doneDeleteResource(data) {
  return {
    type: "DONE_DELETE_RESOURCE",
    data: data,
  };
}

export function errorDeleteResource(data) {
  return {
    type: "ERROR_DELETE_RESOURCE",
    data: data,
  };
}
