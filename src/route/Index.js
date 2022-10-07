import React, { Suspense, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Status from "../pages/app/status/Status";
import Homepage from "../pages/Homepage";
import { RedirectAs404 } from "../utils/Utils";

const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });
  const MENU = useSelector((state) => state?.reducer?.mainMenu);
  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Route exact path={`${process.env.PUBLIC_URL}/`} render={(props) => <Homepage {...props} />}></Route>
        {MENU?.map?.((sidebar) => {
          return (
            sidebar?.data?.length &&
            sidebar?.data?.map?.((item) =>
              item?.items?.map((row, index) => (
                <Route
                  key={sidebar?.id + "/" + row?.id}
                  exact
                  path={`${process.env.PUBLIC_URL}/${sidebar?.id}/${row?.id}`}
                  render={(props) => <Homepage sideBarId={sidebar?.id} data={row} {...props} />}
                ></Route>
              ))
            )
          );
        })}
        <Route exact path={`${process.env.PUBLIC_URL}/app-status`} component={Status}></Route>
        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
