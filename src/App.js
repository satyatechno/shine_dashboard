import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Route, Switch, withRouter } from "react-router-dom";
import Layout from "./layout/Index";
import Login from "./pages/auth/Login";
import PrivateRoute from "./route/PrivateRoute";
import { RedirectAs404 } from "./utils/Utils";

const App = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: "FETCH_DASHBOARD", payload: { history: history } });
  }, [dispatch]);
  return (
    <Switch>
      <Route exact path={`${process.env.PUBLIC_URL}/auth-login`} component={Login}></Route>
      <PrivateRoute exact path="" component={Layout}></PrivateRoute>
      <Route component={RedirectAs404}></Route>
    </Switch>
  );
};
export default withRouter(App);
