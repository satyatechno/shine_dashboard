import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { Spinner } from "reactstrap";
import { Block, BlockTitle, Button } from "../../components/Component";
import LogoDark from "../../images/logo-dark-small.png";
import LogoSmall from "../../images/logo-small.png";
import Head from "../../layout/head/Head";
import PageContainer from "../../layout/page-container/PageContainer";
import { setAuthenticated, setUser } from "../../redux/Reducer";
import { url } from "../../utils/Utils";
import "./Login.css";
const Login = () => {
  const authenticated = useSelector((state) => state?.reducer?.authenticated);
  const { loginWithRedirect, isAuthenticated, isLoading, logout, user } = useAuth0();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && authenticated) {
      if (user) dispatch(setUser(user));
      history?.replace("/");
    }
  }, [isLoading, isAuthenticated]);
  const onSignIn = () => {
    if (isAuthenticated) {
      dispatch(setAuthenticated(false));
      logout();
    } else {
      dispatch(setAuthenticated(true));
      loginWithRedirect();
    }
  };

  return (
    <React.Fragment>
      <Head title="Login" />
      <div className="container-fluid">
        <div className="row">
          <div style={{ height: "100vh" }} className="col-md-5 col-sm-0  imageContainer"></div>
          <div style={{ background: "#ffffff", height: "100vh" }} className="col-md-7 col-sm-12 ">
            <PageContainer>
              <Block className="nk-block-middle nk-auth-body  wide-xs">
                <div className="brand-logo pb-4 text-center">
                  <BlockTitle tag="h4">
                    Sign in to <span style={{ color: "#f368e0" }}> HQ.</span>
                  </BlockTitle>
                </div>

                <Button
                  size="lg"
                  className="btn-block"
                  onClick={() => {
                    onSignIn();
                  }}
                  color="primary"
                >
                  {isLoading ? <Spinner size="sm" color="light" /> : "Sign in"}
                </Button>
              </Block>
            </PageContainer>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Login;
