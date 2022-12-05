import React, { useRef, useState } from "react";
import Navbar from "../../SharedComponent/NavBar/Navbar";
import LeftSide from "../LeftSide/LeftSide";
import axios from "axios";
import { environment } from "../../../environment";
import $ from "jquery";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../Loading/Loading";
import Footer from "../../SharedComponent/Footer/Footer";
import { ToastContainer } from "react-toastify";
import Progressbar from "../../SharedComponent/Progressbar/Progressbar";
import Countdown from "react-countdown";

const TravellCartPage = () => {
  const { loading } = useAuth();
  const ref = useRef(null);
  const navigation = useNavigate();
  // const tokenData =JSON.parse(localStorage.getItem('token'));
  // console.log(tokenData)
  // let httpOptions = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Access-Control-Allow-Origin': '*',
  //       Authorization: 'Bearer ' + tokenData.token
  //   })
  // };
  const submitFlight = () => {
    navigation("/travellcartconfirm");
    //console.log(sendObj);
  };

  axios.get(environment.weatherList).then((response) => {
    //   console.log('weather forecast')
    // console.log(response.data)
  });

  // axios.get(environment.userList, environment.headerToken).then((response) => {
  //     console.log('weather forecast')
  //    console.log(response.data)
  // });
  //    console.log(getSecuredData(environment.userList));

  const data = sessionStorage.getItem("Database");
  const searchData = JSON.parse(data);
  const qtyList = searchData.qtyList;
  //console.log(qtyList);
  // useEffect(()=>{

  //     $(document).ready(function() {
  //       $("#basic-form").validate();
  //   },[])
  const navigate = useNavigate();

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     navigate("/")
  //   },5000)
  // },[])
  // window.setTimeout(function () {
  //   navigate("/");
  // }, 1799000);
  console.log(loading);
  const [click, setClick] = useState(false);
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (!completed) {
      // Render a completed state
      return (
        <span className="text-white fw-bold fs-6">
          {/* <i class="fas fa-clock me-1"></i>
          {minutes} min : {seconds} sec */}
        </span>
      );
    } else {
      $(document).ready(function () {
        $("#modal").click();
      });
      const handleSearchAgain = () => {
        navigate("/");
      };
      return (
        <>
          <span
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            id="modal"
          ></span>

          <div
            class="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabindex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered"
              style={{ maxWidth: "300px" }}
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticBackdropLabel">
                    Session Expired
                  </h5>
                  {/* <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button> */}
                </div>
                <div class="modal-body">
                  <span className="text-secondary">
                    Sorry, your session has expired
                  </span>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-sm rounded text-white"
                    data-bs-dismiss="modal"
                    onClick={() => handleSearchAgain()}
                    style={{ backgroundColor: "#3c67af" }}
                  >
                    Search again
                  </button>
                  {/* <button type="button" class="btn btn-primary">
                    Understood
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <>
      <Navbar></Navbar>
      {loading ? (
        <Loading flag={1} loading={loading}></Loading>
      ) : (
        <>
          <div className="container-fluid py-5 bg-color">
            <ToastContainer />
            <Countdown date={Date.now() + 1799000} renderer={renderer} />
            {/* <Header flag={2}></Header> */}
            <div className="row mx-5 pt-5">
              <Progressbar flag={1}></Progressbar>
              <LeftSide></LeftSide>
            </div>
          </div>
          <Footer></Footer>
        </>
      )}
    </>
  );
};

export default TravellCartPage;
