import axios from "axios";
import React, { useState } from "react";
import { environment } from "../../environment";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import "./PackageDetails.css";
import { toast, ToastContainer } from "react-toastify";

const PackageDetailsD = () => {
  window.scrollTo(0, 0);
  const [bookingData, setBookingData] = useState({});
  const handleOnBlur = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    const newBookingData = { ...bookingData,isRemoved:false };
    newBookingData[field] = value;
    // console.log(field, value, newRegisterData);
    setBookingData(newBookingData);
  };

  console.log(bookingData);

  const handleBooking = (e) => {
  
    axios.post(environment.packageQuery, bookingData,environment.headerToken).then((response) => {
      console.log(response);
      if (response.data.isSuccess === true) {
        toast.success("Booking request successfully sent!")
      } else {
        toast.error("Something is wrong! Please try again!");
      }
    });
    // console.log(registerData)
    // registerUser(registerData);
    e.preventDefault();
  };


  return (
    <div className="bg-color pt-5">
      <Navbar></Navbar>
      <ToastContainer />
      <div className="container p-5 border bg-white my-5 rounded box-shadow">
        <div className="row">
          <div className="col-lg-5 p-0 position-relative">
            <img
              src="https://www.etravel.com/eTravelImages/ArticleContentImage/25_39_67.jpg"
              class="d-block w-100 h-100"
              alt="..."
            />
            <div
              class="position-absolute"
              style={{ left: "16px", top: "12px" }}
            >
              <span
                className="btn btn-danger btn-sm rounded"
                style={{ fontSize: "10px" }}
              >
                <span className="me-1">
                  <i class="fa fa-clock-o" aria-hidden="true"></i>
                </span>
                Validity 30th,September
              </span>
            </div>
          </div>
          <div className="col-lg-2" style={{ padding: "0px 7px" }}>
            <div className="col-lg-12 mb-2">
              <img
                src="https://img.traveltriangle.com/blog/wp-content/uploads/2017/09/aquaventure-parmk1.jpg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
            <div className="col-lg-12 my-2">
              <img
                src="https://www.visitdubai.com/-/media/dotsite/images/6-0-research-and-insights/2019/jul-2019/dtcm-dubai-tourism-performance-report-jul19-header-atlantis-sky-view-small.jpg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
            <div className="col-lg-12 mt-2">
              <img
                src="https://www.holidify.com/images/cmsuploads/compressed/the-palm-962785_960_720_20190929183908.jpg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
          </div>
          <div
            className="col-lg-5 text-start ps-3"
            style={{ fontSize: "14px" }}
          >
            <h5 className="fw-bold" style={{ fontSize: "15px" }}>
              SUMMER GATEWAY AT DUBAI FOR 4 DAYS 3 NIGHTS
            </h5>
            <ul>
              <li>03 nights accommodation in centrally located hotel</li>
              <li>Daily buffet breakfast at the hotel</li>
              <li>Return airport transfers</li>
              <li>Half day Dubai city tour</li>
              <li>Desert Safari with BBQ dinner and live entertainment</li>
              <li>Dubai creak dhow cruise with buffet dinner</li>
              <li>All above tours and tranfers on sharing basis</li>
              <li>All applicable hotel taxes</li>
            </ul>
            <h6 className="ms-2" style={{ fontSize: "14px" }}>
              <span className="me-1">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
              Dubai
            </h6>

            <div className="mt-3">
              <div className="row">
                <div className="col-lg-8">
                  <span className="btn btn-danger btn-sm rounded me-2">
                    <span className="me-1">
                      <i className="fas fa-plane fa-sm"></i>
                      <i class="fas fa-plus mx-1"></i>
                      <i className="fas fa-hotel"></i>
                    </span>
                  </span>
                  <span
                    className="btn btn-danger btn-sm rounded"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Book now
                  </span>
                </div>
                <div className="col-lg-4 text-end">
                  <h5>
                    BDT 15,500 <span style={{fontSize:"12px"}}>PP</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" style={{ maxWidth: "500px" }}>
          <div class="modal-content">
            <div class="modal-header">
              {/* <h5 class="modal-title" id="staticBackdropLabel">
              SUMMER GATEWAY AT DUBAI FOR 4 DAYS 3 NIGHTS
                </h5> */}
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body" style={{backgroundColor:"#e5e5e54f"}}>
              <h5 class="text-start py-3 text-white px-2 rounded" style={{backgroundColor:"#02034b"}}>
                SUMMER GATEWAY AT DUBAI FOR 4 DAYS 3 NIGHTS <span className="mx-2">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
              Dubai
              </h5>
              <form onSubmit={handleBooking}>
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          onBlur={handleOnBlur}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          onBlur={handleOnBlur}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          name="phone"
                          onBlur={handleOnBlur}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label for="message-text" class="col-form-label float-start">
                          Message
                        </label>
                        <textarea
                          class="form-control rounded"
                          id="message-text"
                          name="message"
                          onBlur={handleOnBlur}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  <button
                type="submit"
                class="btn btn-danger btn-sm rounded float-start mb-3"
              >
                Send
              </button>
                </div>
                
              </form>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger btn-sm rounded"
                data-bs-dismiss="modal"
              >
                Send
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default PackageDetailsD;
