import { fork } from "redux-saga/effects";
import DashboardSaga from "./dashboardSaga";
import { StocksPollingSaga } from "./stockPollingSaga";
export default function* rootSaga() {
  yield fork(StocksPollingSaga);
  yield fork(DashboardSaga);
}
