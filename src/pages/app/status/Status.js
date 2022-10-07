import React, { useEffect, useState } from "react";
import ContentAlt from "../../../layout/content/ContentAlt";
import Head from "../../../layout/head/Head";
import CalenderApp from "../../../components/partials/calender/Calender";
import DatePicker from "react-datepicker";
import {
  Modal,
  ModalBody,
  FormGroup,
  ModalHeader,
  Button,
  Spinner,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Card,
} from "reactstrap";
import {
  Block,
  BlockBetween,
  BlockHead,
  BlockHeadContent,
  BlockTitle,
  Col,
  Icon,
  PreviewAltCard,
  Row,
  RSelect,
} from "../../../components/Component";
import { eventOptions, events } from "../../../components/partials/calender/CalenderData";
import { useForm } from "react-hook-form";
import { setDateForPicker } from "../../../utils/Utils";
import { useDispatch, useSelector } from "react-redux";
import { getTableData } from "../../../api/api";
import { BASE_URL } from "../../../api/axiosInstance";
import TrafficChannel from "../../../components/partials/default/traffic-channel/Traffic";
import { setStockData } from "../../../redux/Reducer";
import { useHistory } from "react-router";
import Content from "../../../layout/content/Content";

const Status = () => {
  const MENU = useSelector((state) => state?.reducer?.mainMenu);
  const activeMenu = useSelector((state) => state?.reducer?.activeMenu);
  const stocksData = useSelector((state) => state?.reducer?.stocksData);
  const history = useHistory();
  const dispatch = useDispatch();
  const [sm, updateSm] = useState(false);
  const [selectedLink, setselectedLink] = useState();
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState();
  const [data, setData] = useState();
  useEffect(() => {
    const temp = MENU?.find((item) => item?.id === activeMenu);
    setData(temp?.data);
    if (temp?.data?.links) {
      setselectedLink(temp?.data?.links?.[0]);
    }
  }, [activeMenu]);

  useEffect(() => {
    if (selectedLink?.url) {
      setLoading(true);
      dispatch(setStockData(undefined));
      dispatch({ type: "STOP_STOCKS_POLLING" });
      dispatch({ type: "START_STOCKS_POLLING" });
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  }, [selectedLink]);

  if (data?.links?.length == 0 || loading) {
    return (
      <React.Fragment>
        <Head title="Status" />
        <ContentAlt>
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
        </ContentAlt>
      </React.Fragment>
    );
  } else if (data?.type !== "strategies") {
    return (
      <React.Fragment>
        <Head title="Status" />
        <ContentAlt>
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
                    Under Development
                  </BlockTitle>
                </BlockHeadContent>
              </div>
            </BlockHead>
          </div>
        </ContentAlt>
      </React.Fragment>
    );
  } else
    return (
      <React.Fragment>
        <Head title="Status" />
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
export default Status;
