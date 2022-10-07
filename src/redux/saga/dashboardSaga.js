import { put, select, takeLatest } from "redux-saga/effects";
import { getDashboardStructure } from "../../api/api";
import { setActivePage, setMainMenu, setMenu } from "../Reducer";

function* fetchDashboard(action) {
  const MENU = yield select((state) => state?.reducer?.menu);

  try {
    const res = yield getDashboardStructure();

    let tempActiveMenu = null;
    let tempActivepage = null;
    yield res?.data?.data?.forEach((x) => {
      if (x?.data?.length)
        x.data.forEach((y) => {
          y.items.forEach((z) => {
            if (z.visible && tempActiveMenu === null) {
              tempActiveMenu = x.id;
              tempActivepage = z;
            }
          });
        });
    });
    yield put(setMainMenu({ mainMenu: res?.data?.data }));

    yield put(setMenu({ menu: res?.data?.data?.[0]?.data, activeMenu: tempActiveMenu }));
    yield put(setActivePage(tempActivepage));
  } catch (err) {
    console.log("error on saga", err);
  }
}

function* DashboardSaga() {
  yield takeLatest("FETCH_DASHBOARD", fetchDashboard);
}

export default DashboardSaga;
