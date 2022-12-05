import React, { useState } from "react";
import { Link } from "react-router-dom";
import { environment } from "../../environment";
import useAuth from "../../hooks/useAuth";
import Navbar from "../SharedComponent/NavBar/Navbar";
import axios from "axios";
import "./RegisterPage.css";
import TLLLogo from "../../images/logo/logo-combined.png";
import Footer from "../SharedComponent/Footer/Footer";
import FooterLR from "../Optional/FooterLR/FooterLR";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
  // const {registerUser} = useAuth();
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({});
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newRegisterData = { ...registerData, IsFromWeb: true };
    newRegisterData[field] = value;
    // console.log(field, value, newRegisterData);
    setRegisterData(newRegisterData);
  };

  console.log(registerData);
  const handleRegisterUser = (e) => {
    if (registerData.password !== registerData.confirmPassword) {
      toast.error("Passsword Does not match!");
    }
    axios.post(environment.register, registerData).then((response) => {
      console.log(response);
      if (response.data.isSuccess === true) {
        toast.success("Registration Successfully!");
      } else {
        toast.error("Please try again!");
      }
    });
    // console.log(registerData)
    // registerUser(registerData);
    e.preventDefault();
  };
  return (
    <>
      <div>
        <Navbar></Navbar>
        <div className="bg-color py-5">
          <ToastContainer />
          <div class="container infinity-container pt-5">
            <div class="row">
              <div class="col-md-1 infinity-left-space"></div>

              <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 text-center infinity-form">
                <div class="text-center mb-3 mt-5">
                  {/* <Link to="/"><img src={TLLLogo} width="150px" alt="Triplover Logo"/></Link> */}
                </div>
                <div class="text-center mb-4">
                  <h4>Create an account</h4>
                </div>

                <form onSubmit={handleRegisterUser} class="px-3">
                  <div class="form-input">
                    <span>
                      <i class="fa fa-user"></i>
                    </span>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Full Name"
                      tabIndex="10"
                      onBlur={handleOnBlur}
                      required
                    />
                  </div>
                  <div class="form-input">
                    <span>
                      <i class="fa fa-envelope"></i>
                    </span>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email Address"
                      tabIndex="10"
                      onBlur={handleOnBlur}
                      required
                    />
                  </div>
                  <div class="form-input">
                    <span>
                      <i class="fas fa-phone"></i>
                    </span>
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Mobile"
                      tabIndex="10"
                      onBlur={handleOnBlur}
                      required
                    />
                  </div>
                  <div class="form-input">
                    <span>
                      <i class="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onBlur={handleOnBlur}
                      required
                    />
                  </div>
                  <div class="form-input">
                    <span>
                      <i class="fa fa-lock"></i>
                    </span>
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Retype Password"
                      onBlur={handleOnBlur}
                      required
                    />
                  </div>

                  <div class="mb-3">
                    <button type="submit" class="btn btn-block w-100">
                      Register
                    </button>
                  </div>
                  {/* <div class="text-center mb-2">
                  <div class="text-center mb-3" style={{ color: "#777" }}>
                    or register with
                  </div>

                  <a href="" class="btn btn-social btn-facebook">
                    <i class="fa fa-facebook"></i>
                  </a>

                  <a href="" class="btn btn-social btn-google">
                    <i class="fa fa-google"></i>
                  </a>

                  <a href="" class="btn btn-social btn-twitter">
                    <i class="fa fa-twitter"></i>
                  </a>
                </div> */}
                  <div class="text-center mb-5" style={{ color: "#777" }}>
                    Already have an account?
                    <Link
                      class="login-link ms-1"
                      to="/login"
                      style={{ textDecoration: "none" }}
                    >
                      Login here
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

export default RegisterPage;
