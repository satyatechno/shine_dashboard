import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Card, DropdownItem, DropdownMenu, DropdownToggle, Spinner, UncontrolledDropdown } from "reactstrap";
import { Block, BlockHead, BlockHeadContent, BlockTitle, Button, Col, Icon, Row } from "../components/Component";
import TrafficChannel from "../components/partials/default/traffic-channel/Traffic";
import Content from "../layout/content/Content";
import Head from "../layout/head/Head";
import { setActivePage, setActiveUrl, setStockData } from "../redux/Reducer";

const HomePage = ({ data, sideBarId }) => {
  const activePage = useSelector((state) => state?.reducer?.activePage);
  const MENU = useSelector((state) => state?.reducer?.mainMenu);
  const stocksData = useSelector((state) => state?.reducer?.stocksData);
  const history = useHistory();
  const dispatch = useDispatch();
  const [sm, updateSm] = useState(false);
  const [selectedLink, setselectedLink] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!data?.title) {
      let url = null;
      MENU?.forEach((x) => {
        if (x?.data?.length)
          x.data.forEach((y) => {
            y.items.forEach((z) => {
              if (z.visible && url === null) {
                url = `${x.id}/${z.id}`;
              }
            });
          });
      });
      if (url !== null) history?.push(url);
    } else {
      setselectedLink(data?.links?.[0]);
    }
  }, [data]);
  if (data?.title) {
    dispatch(setActivePage(data));
  }
  useEffect(() => {
    if (selectedLink?.url) {
      dispatch(setActiveUrl(selectedLink?.url));
      setLoading(true);
      dispatch(setStockData(undefined));
      dispatch({ type: "STOP_STOCKS_POLLING" });
      dispatch({ type: "START_STOCKS_POLLING" });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [selectedLink]);

  if (!data?.title || loading) {
    return (
      <React.Fragment>
        <Head title={"Sine Capital"} />
        <Content>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <Spinner size="xl" color="dark" />
          </div>
        </Content>
      </React.Fragment>
    );
  } else if (activePage?.type !== "strategies") {
    return (
      <React.Fragment>
        <Head title={data?.title ?? "HOME"} />
        <Content>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flex: 1,
              flexDirection: "column",
              height: "80vh",
            }}
          >
            <BlockHead size="xl">
              <div className="nk-block-between">
                <BlockHeadContent>
                  <BlockTitle page tag="h3">
                    {data?.title} Under Development
                  </BlockTitle>
                </BlockHeadContent>
              </div>
            </BlockHead>
          </div>
        </Content>
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      <Head title={data?.title ?? "HOME"} />
      <Content>
        <BlockHead size="sm">
          <div className="nk-block-between">
            <BlockHeadContent>
              <BlockTitle page tag="h3">
                {stocksData?.tabName}
              </BlockTitle>
            </BlockHeadContent>
            <BlockHeadContent>
              <div className="toggle-wrap nk-block-tools-toggle">
                <Button
                  className={`btn-icon btn-trigger toggle-expand mr-n1 ${sm ? "active" : ""}`}
                  onClick={() => updateSm(!sm)}
                >
                  <Icon name="more-v"></Icon>
                </Button>
                <div className="toggle-expand-content" style={{ display: sm ? "block" : "none" }}>
                  <ul className="nk-block-tools g-3">
                    <li>
                      <UncontrolledDropdown>
                        <DropdownToggle tag="a" className="dropdown-toggle btn btn-white btn-dim btn-outline-light">
                          <span>{selectedLink?.title}</span>
                          <Icon className="dd-indc" name="chevron-right"></Icon>
                        </DropdownToggle>
                        <DropdownMenu>
                          <ul className="link-list-opt no-bdr">
                            {data?.links?.map((item) => (
                              <li key={item?.title}>
                                <DropdownItem
                                  href="#dropdownitem"
                                  onClick={(ev) => {
                                    setselectedLink(item);
                                  }}
                                >
                                  {item?.title}
                                  {selectedLink?.title === item?.title && (
                                    <Icon className="d-none d-sm-inline" name="check"></Icon>
                                  )}
                                </DropdownItem>
                              </li>
                            ))}
                          </ul>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </li>
                  </ul>
                </div>
              </div>
            </BlockHeadContent>
          </div>
        </BlockHead>

        <Block>
          {stocksData?.widgetsData ? (
            stocksData?.widgetsData?.map((table, index) => (
              <Row className="g-gs" key={index?.toString()}>
                <Col lg="12">
                  <Card className="card-bordered h-100">
                    <TrafficChannel data={table?.data} />
                  </Card>
                </Col>
              </Row>
            ))
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flex: 1,
                flexDirection: "column",
                height: "80vh",
              }}
            >
              <BlockHead size="xl">
                <div className="nk-block-between">
                  <BlockHeadContent>
                    <BlockTitle page tag="h3">
                      {data?.title} Under Development
                    </BlockTitle>
                  </BlockHeadContent>
                </div>
              </BlockHead>
            </div>
          )}
        </Block>
      </Content>
    </React.Fragment>
  );
};

export default HomePage;
