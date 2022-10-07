import { call, delay, put, race, take, select } from "redux-saga/effects";
import { getTableData } from "../../api/api";
import { BASE_URL } from "../../api/axiosInstance";
import { setStockData } from "../Reducer";

function* stocksPoll() {
  while (true) {
    try {
      const URL = yield select((state) => state?.reducer?.activeUrl);
      const res = yield getTableData(URL?.replace(BASE_URL, ""));

      yield put(setStockData(res?.data));

      yield delay(2000);
    } catch (err) {
      console.log("saga,err", err);
      yield put({
        type: "STOP_STOCKS_POLLING",
      });
    }
  }
}

export function* StocksPollingSaga() {
  while (true) {
    yield take("START_STOCKS_POLLING", stocksPoll);
    yield race([call(stocksPoll), take("STOP_STOCKS_POLLING")]);
  }
}
