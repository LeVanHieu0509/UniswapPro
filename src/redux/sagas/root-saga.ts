import { all } from "redux-saga/effects";
import loginSaga from "./login-saga";

export default function* rootSaga() {
  yield all([loginSaga()]);
}
