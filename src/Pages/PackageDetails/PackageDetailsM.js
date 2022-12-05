import React, { useState } from "react";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";

const PackageDetailsM = () => {
  const [show, setShow] = useState(false);
  window.scrollTo(0, 0);
  return (
    <div className="bg-color pt-5">
      <Navbar></Navbar>
      <div className="container p-5 border bg-white my-5 rounded box-shadow">
        <div className="row">
          <div className="col-lg-5 p-0 position-relative">
            <img
              src="https://pyt-blogs.imgix.net/2021/12/beach-gedb05081c_1920.jpg?auto=format&ixlib=php-3.3.0"
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
                src="https://www.worthview.com/wp-content/uploads/2018/08/Dream-Places.jpeg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
            <div className="col-lg-12 my-2">
              <img
                src="https://hoteliermaldives.com/wp-content/uploads/Shutterstock-Maldives-Beach-Palm-Tree-lowres.jpg"
                class="d-block w-75 h-75"
                alt="..."
              />
            </div>
            <div className="col-lg-12 mt-2">
              <img
                src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/11/19152709/shutterstock_1902416098-min-1351x900.jpg"
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
              HULHUMALE 3 DAYS 2 NIGHTS
            </h5>
            <ul>
              <li>Daily breakfast</li>
              <li>Airport to hotel to airport transportation</li>
            </ul>
            <h6 className="ms-2" style={{ fontSize: "12px" }}>
              3 Star Hotels <br></br>
              Vista Beach hotel or similar
            </h6>

            <h6 className="ms-2" style={{ fontSize: "14px" }}>
              <span className="me-1">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
              Maldives
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
                    BDT 9,000 <span style={{fontSize:"12px"}}>PP</span>
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
                  src="https://pyt-blogs.imgix.net/2021/12/beach-gedb05081c_1920.jpg?auto=format&ixlib=php-3.3.0"
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
                    src="https://www.worthview.com/wp-content/uploads/2018/08/Dream-Places.jpeg"
                    class="d-block w-75 h-75"
                    alt="..."
                  />
                </div>
                <div className="col-lg-12 my-2">
                  <img
                    src="https://hoteliermaldives.com/wp-content/uploads/Shutterstock-Maldives-Beach-Palm-Tree-lowres.jpg"
                    class="d-block w-75 h-75"
                    alt="..."
                  />
                </div>
                <div className="col-lg-12 mt-2">
                  <img
                    src="https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/11/19152709/shutterstock_1902416098-min-1351x900.jpg"
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
                  MAAFUSHI ISLAND 3 DAYS 2 NIGHTS
                </h5>
                <ul>
                  <li>Daily breakfast</li>
                  <li>Airport to hotel to airport transportation</li>
                </ul>
                <h6 className="ms-2" style={{ fontSize: "12px" }}>
                  3 Star Hotels <br></br>
                  Icom Marina hotel or similar
                </h6>
                <h6 className="ms-2" style={{ fontSize: "14px" }}>
                  <span className="me-1">
                    <i class="fa fa-map-marker" aria-hidden="true"></i>
                  </span>
                  Maldives
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
                      <h5>
                        BDT 13,500 <span style={{fontSize:"12px"}}>PP</span>
                      </h5>
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
              HULHUMALE 3 DAYS 2 NIGHTS <span className="mx-2">
                <i class="fa fa-map-marker" aria-hidden="true"></i>
              </span>
              Maldives
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

export default PackageDetailsM;
