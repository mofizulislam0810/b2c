import React from "react";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";

const FailTicket = () => {
  const message = JSON.parse(sessionStorage.getItem('message'));
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-color py-5">
        <div className="container mt-5 bg-white w-25 shadow my-5">
          <div className="row py-2 pb-5">
            <div className="col-lg-12 text-center">
              <h4 className="pt-4 fw-bold">THANK YOU</h4>
              {/* <div className="my-3">
                  <span className="text-danger fs-3">
                    <i
                      class="fa fa-exclamation-triangle"
                      aria-hidden="true"
                    ></i>
                  </span>
                </div> */}
              {/* <h5 className="pt-4 fw-bold">{message}</h5> */}
              <p>
                {/* Our support team contact you within 15 minutes<br></br>or
                contact this number */}{message}
              </p>
              {/* <p className="fw-bold fs-5 my-2 pb-3">
                <span>+8809613345345</span>
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default FailTicket;
