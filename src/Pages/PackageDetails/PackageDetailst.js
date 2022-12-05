import React, { useState } from "react";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import "./PackageDetails.css";

const PackageDetailst = () => {
  const [show, setShow] = useState(false);
  window.scrollTo(0, 0);
  return (
    <div className="bg-color pt-5">
      <Navbar></Navbar>
      <div className="container p-5 border bg-white my-5 rounded box-shadow">
        <div className="row">
          <div className="col-lg-5 p-0 position-relative">
            <img
              src="https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg"
              class="d-block w-100"
              alt="..."
              style={{ height: "307px" }}
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
                src="https://reverievacations.com/wp-content/uploads/sites/73/2021/04/bkk2.jpg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
            <div className="col-lg-12 my-2">
              <img
                src="https://theculturetrip.com/wp-content/uploads/2019/12/tour_img-1142054-24.jpg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
            <div className="col-lg-12 mt-2">
              <img
                src="https://www.planetware.com/wpimages/2021/05/thailand-bangkok-top-attractions-wat-suthat.jpg"
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
              BANGKOK PATTAYA 5 DAYS 4 NIGHTS
            </h5>
            <p className="p-0 m-0" style={{ fontSize: "13px" }}>
              BREAKFAST WITH ROOMS INCLUDED
            </p>
            <ul>
              <li>02 nights stay in Pattaya</li>
              <li>02 night stay in Bangkok</li>
              <li>
                Bangkok airport - Pattaya hotel - Bangkok hotel - Bangkok
                airport
              </li>
              <li>Coral islan + lunch on sharing basis</li>
              <li>Half day city tour of bangkok on sharing basis</li>
              <li>All taxes</li>
            </ul>
            <h6 className="ms-2" style={{ fontSize: "12px" }}>
              4 Star Hotels <br></br>
              Sunbeam Pattaya or Similar | Ambassador Hotel bangkok or similar
            </h6>

            <h6 className="ms-2" style={{ fontSize: "14px" }}>
              <span className="me-1">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
              Thailand
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
                    className="btn btn-danger btn-sm rounded me-2"
                    data-bs-toggle="modal"
                    data-bs-target="#staticBackdrop"
                  >
                    Book now
                  </span>

                  {show ? (
                    <>
                      <span
                        className="btn btn-danger btn-sm rounded"
                        onClick={() => setShow(false)}
                      >
                        Hide more
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        className="btn btn-danger btn-sm rounded"
                        onClick={() => setShow(true)}
                      >
                        Show more
                      </span>
                    </>
                  )}
                </div>
                <div className="col-lg-4 text-end">
                  <h5>
                    BDT 15,700 <span style={{fontSize:"12px"}}>PP</span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {show ? (
        <>
          <div className="container p-5 border bg-white my-5 rounded box-shadow">
            <div className="row">
              <div className="col-lg-5 p-0 position-relative">
                <img
                  src="https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg"
                  class="d-block w-100"
                  alt="..."
                  style={{ height: "307px" }}
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
                    src="https://reverievacations.com/wp-content/uploads/sites/73/2021/04/bkk2.jpg"
                    class="d-block w-75 h-75"
                    alt="..."
                  />
                </div>
                <div className="col-lg-12 my-2">
                  <img
                    src="https://theculturetrip.com/wp-content/uploads/2019/12/tour_img-1142054-24.jpg"
                    class="d-block w-75 h-75"
                    alt="..."
                  />
                </div>
                <div className="col-lg-12 mt-2">
                  <img
                    src="https://www.planetware.com/wpimages/2021/05/thailand-bangkok-top-attractions-wat-suthat.jpg"
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
                  BANGKOK PHUKET 7 DAYS 6 NIGHTS
                </h5>
                <p className="p-0 m-0" style={{ fontSize: "13px" }}>
                  BREAKFAST WITH ROOMS INCLUDED
                </p>
                <ul>
                  <li>02 night stay in Bangkok</li>
                  <li>04 nights stay in Phuket</li>
                  <li>Phi Phi islad + lunch on big boat on sharing basis</li>
                  <li>Half day city tour of Bangkok on sharing basis</li>
                  <li>Phuket airport - Phuket hotel - Phuket airport</li>
                  <li>Bangkok airport - Bangkok hotel - Bangkok airport</li>
                  <li>All taxes</li>
                </ul>
                <h6 className="ms-2" style={{ fontSize: "12px" }}>
                  4 Star Hotels <br></br>
                  Novotel Phuket/Novotel Vintage Phuket or similar<br></br>
                  Ambassador hotel bangkok or similar
                </h6>
                <h6 className="ms-2" style={{ fontSize: "14px" }}>
                  <span className="me-1">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                  </span>
                  Thailand
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
                        className="btn btn-danger btn-sm rounded me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#staticBackdrop"
                      >
                        Book now
                      </span>
                    </div>
                    <div className="col-lg-4 text-end">
                      <h5>BDT 26,000 <span style={{fontSize:"12px"}}>PP</span></h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

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
                Modal title
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
              BANGKOK PATTAYA 5 DAYS 4 NIGHTS <span className="mx-2">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
              Thailand
              </h5>
              <form >
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
                          class="form-control rounded"
                          id="recipient-name"
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
                          class="form-control rounded"
                          id="recipient-name"
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
                          class="form-control rounded"
                          id="recipient-name"
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
                        ></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger btn-sm rounded"
                data-bs-dismiss="modal"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default PackageDetailst;
