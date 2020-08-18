import { call, put, takeLatest, all } from "redux-saga/effects";
import Api from "../services/api";
import {
  getResource,
  doneGetResource,
  errorGetResource,
  doneAddResource,
  errorAddResource,
  doneDeleteResource,
  errorDeleteResource,
  doneSearchResource,
  searchResource,
} from "../actions/resource";
import Logout from "../../components/logout";

// GET RESOURCES
export function* getResourceCall(action) {
  const result = yield call(Api.getResource, action.data);

  if (result && result.status === 0) {
    yield put(doneGetResource(result.data));
  } else {
    yield put(errorGetResource(result.data));
  }
}

export function* watchGetResource() {
  yield takeLatest("GET_RESOURCE", getResourceCall);
}

// SEARCH RESOURCES
export function* searchResourceCall(action) {
  const { searchValue, data, user } = action.data;

  if (!searchValue.length) yield put(doneSearchResource(data));

  const result = data.filter((resource) => {
    return resource.value.toLowerCase().indexOf(searchValue.toLowerCase()) > -1;
  });

  yield put(doneSearchResource(result));
}

export function* watchSearchResource() {
  yield takeLatest("SEARCH_RESOURCE", searchResourceCall);
}

// ADD RESOURCE
export function* addResourceCall(action) {
  const result = yield call(Api.addResource, action.data);

  if (result && result.status === 0) {
    yield all([
      put(doneAddResource(result.data)),
      put(getResource(action.data.user)),
    ]);
  } else {
    yield put(errorAddResource(result.data));
  }
}

export function* watchAddResource() {
  yield takeLatest("ADD_RESOURCE", addResourceCall);
}

// DELETE RESOURCE
export function* deleteResourceCall(action) {
  const result = yield call(Api.deleteResource, action.data);

  if (result && result.status === 0) {
    yield all([
      put(doneDeleteResource(result.data)),
      put(getResource(action.data.user)),
    ]);
  } else {
    yield put(errorDeleteResource(result.data));
  }
}

export function* watchDeleteResource() {
  yield takeLatest("DELETE_RESOURCE", deleteResourceCall);
}
