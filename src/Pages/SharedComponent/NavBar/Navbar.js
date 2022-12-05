import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { environment } from "../../../environment";
import useAuth from "../../../hooks/useAuth";
import logo from "../../../images/logo/TLPNG.png";
import "./Navbar.css";

const Navbar = () => {
  const { onClickLogout, login, user, setUser } = useAuth();
  // console.log(login);
  const navigate = useNavigate();
  const logout = () => {
    onClickLogout(navigate);
  };
  // let isLoggedIn=false;
  // const getToken = localStorage.getItem('token');
  // if(getToken !== undefined && getToken !== null && getToken!==''){
  //     // console.log(getToken);
  //     isLoggedIn=true;
  // }
  // else{
  //     isLoggedIn=false;
  // }
  // const getData = async () => {
  //     console.log(environment.headerToken)
  //     const response = await axios.get(
  //       environment.currentUserInfo,
  //       environment.headerToken
  //     );
  //     setUser(await response.data);
  //   };

  const getData = async () => {
    // console.log(environment.headerToken)
    const response = await axios.get(
      environment.currentUserInfo,
      environment.headerToken
    );
    setUser(await response.data);
  };

  useEffect(() => {
    const tokenData = JSON.parse(localStorage.getItem("token"));
    if (tokenData?.token !== null) {
      getData();
    }
    var navbar = document.querySelector("nav");

    window.onscroll = function () {
      // pageYOffset or scrollY
      if (window.pageYOffset > 0) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    };
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img
              className="brightness"
              src={logo}
              alt=""
              // width="50%"
              // height="30%"
            />
          </Link>
          <button
            className="navbar-toggler my-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {/* <ul class="navbar-nav mb-2 mb-lg-0" style={{ marginLeft: "29%" }}>
              <li class="nav-item">
                <Link
                  class="nav-link text-dark fw-bold"
                  aria-current="page"
                  to=""
                  style={{ fontSize: "13px" }}
                >
                  <span className="me-1">
                    <i class="fas fa-umbrella-beach"></i>
                  </span>
                  Holiday
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link text-dark fw-bold"
                  to=""
                  style={{ fontSize: "13px" }}
                  aria-current="page"
                >
                  <span className="me-1">
                    <i class="fa fa-plane" aria-hidden="true"></i>
                  </span>
                  Charter
                </Link>
              </li>
              <li class="nav-item">
                <Link
                  class="nav-link text-dark fw-bold"
                  to="/trackflight"
                  style={{ fontSize: "13px" }}
                >
                  <span className="me-1">
                    <i class="fas fa-plane-departure"></i>
                  </span>
                  Track Flight
                </Link>
              </li>
            </ul> */}
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {login === true ? (
                <>
                  <p className="pt-1 text-dark" style={{ fontSize: "12px" }}>
                    Help <i class="fa fa-phone me-1"></i>+8809613345345
                  </p>
                  <span className="mx-2">|</span>
                  <p
                    className="me-2 pt-1 text-dark"
                    style={{ fontSize: "12px" }}
                  >
                    {user?.fullName}
                  </p>
                  <li className="dropdown">
                    <Link
                      className="dropdown-toggle"
                      to="#"
                      id="navbarDarkDropdownMenuLink"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span className="fs-6 text-dark fw-bold">
                        <i className="fas fa-user"></i>
                      </span>
                    </Link>
                    <ul
                      className="dropdown-menu dropdown-menu-dark dropdown-menu-end"
                      aria-labelledby="navbarDarkDropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/profile">
                          {" "}
                          <span className="me-2">
                            <i className="fas fa-user"></i>
                          </span>
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/bookingList">
                          <span className="me-2">
                            <i className="fas fa-tags"></i>
                          </span>
                          My Bookings
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/makepayment">
                          <span className="me-2">
                            <i class="fa fa-credit-card" aria-hidden="true"></i>
                          </span>
                          Make Payment
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/mytransaction">
                          <span className="me-2">
                            <i class="fas fa-book" aria-hidden="true"></i>
                          </span>
                          My Transactions
                        </Link>
                      </li>
                      <li>
                        <Link
                          className="dropdown-item"
                          to="/"
                          onClick={() => logout()}
                        >
                          <span className="me-2">
                            <i className="fas fa-sign-out-alt"></i>
                          </span>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="btn btn-primary text-white px-3 m-1 fw-bold btn-sm rounded"
                      to="/login"
                    >
                      Login
                    </Link>
                  </li>
                  {/* <li className="nav-item">
                    <Link
                      className="btn btn-primary text-white px-3 m-1 fw-bold btn-sm rounded"
                      to="/register"
                    >
                      Register
                    </Link>
                  </li> */}
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
