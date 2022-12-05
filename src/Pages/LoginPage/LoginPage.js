import React, { useEffect} from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Navbar from "../SharedComponent/NavBar/Navbar";
import "./LoginPage.css";
import Footer from "../SharedComponent/Footer/Footer";
import { ToastContainer } from "react-toastify";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import { gapi } from "gapi-script";
import axios from "axios";
import { environment } from "../../environment";
import { toast } from "react-toastify";

const LoginPage = () => {
  const { onClickLoginButton,setUser,setLogin } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLoginUser = (e) => {
    let loginData = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };
    onClickLoginButton(loginData, location, navigate);
    e.preventDefault();
  };

  // const clientId = "188218811904-f82angcjbaq71upn1eov4jpt1hpr5n1d.apps.googleusercontent.com";

  // let obj =
  //   {
  //     "loginProvider": "string",
  //     "providerKey": "string",
  //     "name": "string",
  //     "email": "string"
  //   }

  const responseGoogle = (response) => {
    let obj = {
      loginProvider: "Google",
      providerKey: response.profileObj.googleId,
      name: response.profileObj.name,
      email: response.profileObj.email,
    };
    console.log(response);
    async function googleData() {
      await axios
        .post(environment.externalUser, obj, environment.headerToken)
        .then((res) => {
          console.log(res)
          if(res.data.isSuccess===true) {
            // setUser(res.data.userName);
            sessionStorage.setItem("token", JSON.stringify(res.data.data));
            const destination = location.state?.from || "/";
            navigate(destination);
            window.location.reload();
            setLogin(true);
          }else{
            toast.error("Something is wrong. Please try again.");
          }
        });
   
    }
    googleData();
  };

  const responseFacebook = (response) => {
    console.log(response);
    let obj = {
      loginProvider: "Facebook",
      providerKey: response.userID,
      name: response.name,
      email: response.email,
    };
    async function facebookData() {
      await axios
        .post(environment.externalUser, obj, environment.headerToken)
        .then((res) => {
          if(res.data.isSuccess===true) {
            // setUser(res.data.userName);
            sessionStorage.setItem("token", JSON.stringify(res.data.data));
            const destination = location.state?.from || "/";
            navigate(destination);
            window.location.reload();
          }else{
            toast.error("Something is wrong. Please try again.");
          }
        });
    }
    if(response.status === "unknown"){
      
    }else{
      facebookData();
    }
  };

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId:
          "188218811904-4m0amjem5pii8fe0utc03rchon6b8638.apps.googleusercontent.com",
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="bg-color pt-5">
          <ToastContainer />
          <div class="container infinity-container pt-3">
            <div class="row">
              <div class="col-md-1 infinity-left-space"></div>
              <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 text-center infinity-form">
                <div class="text-center mb-3 mt-5">
                  {/* <Link to="/"><img src={TLLLogo} width="150px" alt="Triplover Logo"/></Link> */}
                </div>
                <div class="text-center mb-4">
                  <h4>Login into account</h4>
                </div>
                <form onSubmit={handleLoginUser} class="px-3">
                  <div class="form-input">
                    <span>
                      <i class="fa fa-envelope"></i>
                    </span>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      tabIndex="10"
                      // onBlur={handleOnBlur}
                      required
                    />
                  </div>
                  <div class="form-input">
                    <span>
                      <i class="fa fa-lock"></i>
                    </span>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Password"
                      // onBlur={handleOnBlur}
                      required
                    />
                  </div>
                  <div class="row mb-3">
                    <div class="col-auto d-flex align-items-center">
                      <div class="custom-control custom-checkbox">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="cb1"
                        />
                        <label class="custom-control-label ms-1" htmlFor="cb1">
                          Remember me
                        </label>
                      </div>
                    </div>
                  </div>

                  <div class="mb-3">
                    <button type="submit" class="btn btn-block w-100">
                      Login
                    </button>
                  </div>
                  <div class="text-end">
                    <a
                      href="reset.html"
                      class="forget-link"
                      style={{ textDecoration: "none" }}
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div class="text-center mb-2">
                    <div class="text-center mb-3" style={{ color: "#777" }}>
                      or login with
                    </div>

                    {/* <a href="" class="btn btn-social btn-facebook"> */}
                    <GoogleLogin
                      clientId="188218811904-4m0amjem5pii8fe0utc03rchon6b8638.apps.googleusercontent.com"
                      render={(renderProps) => (
                        <button
                          class="btn btn-social btn-google"
                          onClick={renderProps.onClick}
                          // disabled={renderProps.disabled}
                        >
                          <i class="fa fa-google"></i>
                        </button>
                      )}
                      buttonText="Login"
                      onSuccess={responseGoogle}
                      onFailure={responseGoogle}
                      cookiePolicy={"single_host_origin"}
                    />
                    {/* <GoogleLogin
    clientId="188218811904-amtojm32lbns031t8bj3n7ro9ao6vn7c.apps.googleusercontent.com"
    buttonText="Login"
    onSuccess={responseGoogle}
    onFailure={responseGoogle}
    cookiePolicy={'single_host_origin'}
  /> */}
                    {/* </a> */}

                    {/* <FacebookLogin
                        appId="559698152230312"
                        // autoLoad={true}
                        fields="name,email,picture"
                        callback={responseFacebook}
                       
                      /> */}

                    <FacebookLogin
                      appId="1220938075942013"
                      callback={responseFacebook}
                      fields="name,email,picture"
                      cssClass="btn btn-social btn-facebook"
                      icon="fa-facebook"
                      // render={(renderProps) => (
                      //   <button class="btn btn-social btn-facebook" onClick={renderProps.onClick}>
                      //     <i class="fa fa-facebook"></i>
                      //   </button>
                      // )}
                    />
                    {/* <FacebookLogin
                      appId="559698152230312"
                      callback={responseFacebook}
                      fields="name,email,picture"
                      render={(renderProps) => (
                        <button
                          class="btn btn-social btn-facebook"
                          onClick={() => responseFacebook}
                        >
                          <i class="fa fa-facebook"></i>
                        </button>
                      )}
                    /> */}

                    {/* <a href="" class="btn btn-social btn-twitter">
                      <i class="fa fa-twitter"></i>
                    </a> */}
                  </div>
                  <div class="text-center mb-5" style={{ color: "#777" }}>
                    Don't have an account?
                    <Link
                      class="register-link ms-1"
                      to="/register"
                      style={{ textDecoration: "none" }}
                    >
                      Register here
                    </Link>
                  </div>
                </form>
              </div>

              <div class="col-md-1 infinity-right-space"></div>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </>
  );
};

export default LoginPage;
