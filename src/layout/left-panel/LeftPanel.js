import classNames from "classnames";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { Icon, TooltipComponent } from "../../components/Component";
import LOGO from "../../images/Sine-logo.png";
import { setActivePage, setActiveUrl, setMenu } from "../../redux/Reducer";
import { useHistory } from "react-router";

const LeftPanel = ({ theme }) => {
  let currentUrl;

  if (window.location.pathname !== undefined) {
    currentUrl = window.location.pathname;
  } else {
    currentUrl = null;
  }
  const MENU = useSelector((state) => state?.reducer?.mainMenu);
  const activeMenu = useSelector((state) => state?.reducer?.activeMenu);

  const dispatch = useDispatch();
  const history = useHistory();
  const appSidebarClass = classNames({
    "nk-apps-sidebar": true,
    [`is-light`]: theme === "white",
    [`is-${theme}`]: theme !== "white" && theme !== "light",
  });
  return (
    <div className={appSidebarClass}>
      <div className="nk-apps-brand">
        <Link
          to={``}
          className="logo-link"
          onClick={() => {
            let tempActiveMenu = null;
            let tempActivepage = null;
            MENU?.forEach((x) => {
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
            dispatch(setMenu({ menu: MENU?.[0]?.data, activeMenu: tempActiveMenu }));
            dispatch(setActivePage(tempActivepage));
            dispatch(setActiveUrl(tempActivepage.links?.[0]?.url));
          }}
        >
          <img className="logo-light logo-img" src={LOGO} alt="logo" />
          <img className="logo-dark logo-img" src={LOGO} alt="logo-dark" />
        </Link>
      </div>
      <div className="nk-sidebar-element">
        <div className="nk-sidebar-body">
          <SimpleBar className="nk-sidebar-content">
            <div className="nk-sidebar-menu">
              <ul className="nk-menu apps-menu">
                {MENU?.map((item, index) => {
                  if (item?.data?.length) {
                    return (
                      <React.Fragment key={index}>
                        <li
                          className={`nk-menu-item ${activeMenu === item?.id ? "active current-page" : ""}`}
                          key={index}
                          id={"dashboard" + index}
                          onClick={() => {
                            let tempActivepage = null;

                            item.data.forEach((y) => {
                              y.items.forEach((z) => {
                                if (z.visible && tempActivepage === null) {
                                  tempActivepage = z;
                                }
                              });
                            });
                            dispatch(setMenu({ menu: item?.data, activeMenu: item?.id }));
                            dispatch(
                              setActivePage(tempActivepage !== null ? tempActivepage : item?.data?.[0]?.items?.[0])
                            );
                            dispatch(
                              setActiveUrl(
                                tempActivepage !== null
                                  ? tempActivepage?.links?.[0]?.url
                                  : item?.data?.[0]?.items?.[0]?.links?.[0]?.url
                              )
                            );
                            history.push(item?.id + "/" + tempActivepage?.id);
                          }}
                        >
                          <Link to={""} className="nk-menu-link">
                            <span className="nk-menu-icon">
                              <Icon name={item?.icon}></Icon>
                            </span>
                          </Link>
                        </li>
                      </React.Fragment>
                    );
                  }
                })}
              </ul>
            </div>
          </SimpleBar>

          <React.Fragment>
            <ul className="nk-menu apps-menu" style={{ marginTop: -30 }}>
              <li className="nk-menu-hr"></li>
              {MENU?.map((item, index) => {
                let ITEM = MENU?.find((x) => x.icon === item);
                if (item?.id == "status") {
                  return (
                    <React.Fragment key={index}>
                      <li
                        className={`nk-menu-item ${activeMenu === item?.id ? "active current-page" : ""}`}
                        key={index}
                        id={"dashboard" + index}
                        onClick={() => {
                          dispatch(setMenu({ menu: [], activeMenu: item?.id }));
                          history?.push("app-status");
                        }}
                      >
                        <Link to={""} className="nk-menu-link">
                          <span className="nk-menu-icon">
                            <Icon name={item?.icon}></Icon>
                          </span>
                        </Link>
                      </li>
                    </React.Fragment>
                  );
                }
              })}
            </ul>
          </React.Fragment>
        </div>
      </div>
    </div>
  );
};

export default LeftPanel;
