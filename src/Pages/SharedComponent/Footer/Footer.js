import React from 'react';
import './Footer.css';
import logo from "../../../images/logo/Pay-with.png"
import { Link } from "react-router-dom";

const Footer = () => {
    return (
      <div>
        <div
          class="container-fluid text-body footer pt-4 wow fadeIn"
          data-wow-delay="0.1s"
          style={{ backgroundColor: "#00014a" }}
        >
          <div class="container py-3">
            <div class="row g-5">
              <div class="col-lg-3 col-md-6 text-start">
                <h5 class="text-white mb-4">Address</h5>
                <p class="mb-2" style={{ color: "#c5c4c4", fontSize: "16px" }}>
                  <i class="fa fa-map-marker me-3"></i>House # 08, Road # 02,
                  Block # C,<br></br> Banasree,Rampura, Dhaka- 1219,<br></br>{" "}
                  Bangladesh.
                </p>
                <p class="mb-2" style={{ color: "#c5c4c4", fontSize: "16px" }}>
                  <i class="fa fa-phone me-3"></i>(880) 9613345345
                </p>
                <p class="mb-2" style={{ color: "#c5c4c4", fontSize: "16px" }}>
                  <i class="fa fa-envelope me-3"></i>support@triplover.com{" "}
                </p>
                <div class="d-flex pt-2">
                  <a
                    class="btn btn-square btn-outline-light btn-social"
                    href="" target="_blank"
                  >
                    <i class="fab fa-twitter"></i>
                  </a>
                  <a
                    class="btn btn-square btn-outline-light btn-social"
                    href="https://www.facebook.com/triploverbd/" target="_blank"
                  >
                    <i class="fab fa-facebook-f"></i>
                  </a>
                  <a
                    class="btn btn-square btn-outline-light btn-social"
                    href="https://www.youtube.com/channel/UCf0d1Rf2V9mBjQmprn9aZhQ" target="_blank"
                  >
                    <i class="fab fa-youtube"></i>
                  </a>
                  <a
                    class="btn btn-square btn-outline-light btn-social"
                    href="https://www.linkedin.com/company/triplover/about/?viewAsMember=true" target="_blank"
                  >
                    <i class="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-start">
                <h5 class="text-white mb-4">Quick Links</h5>
                <Link class="btn btn-link" to="/contact">
                  Contact
                </Link>
                <Link class="btn btn-link" to="/bankdetail">
                  Bank Details
                </Link>
                <Link class="btn btn-link" to="/privacypolicy">
                  Privacy Policy
                </Link>
                <Link class="btn btn-link" to="/termandcondition">
                  Terms and Conditions
                </Link>
                <Link class="btn btn-link" to="/refundandcancellation">
                  Refund & Cancellation
                </Link>
                <Link class="btn btn-link" to="/faq">
                  FAQ
                </Link>
              </div>
              <div class="col-lg-3 col-md-6 text-start">
                <h5 class="text-white mb-4">We Accept</h5>
                <div class="row g-2">
                  <div class="col-12">
                    <img class="img-fluid rounded" src={logo} alt="" />
                  </div>
                  {/* <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-2.jpg" alt=""/>
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-3.jpg" alt=""/>
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-4.jpg" alt=""/>
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-5.jpg" alt=""/>
                        </div>
                        <div class="col-4">
                            <img class="img-fluid rounded" src="img/gallery-6.jpg" alt=""/>
                        </div> */}
                </div>
              </div>
              <div class="col-lg-3 col-md-6 text-start">
                <h5 class="text-white mb-4">Download App</h5>
                {/* <p style={{color:"#c5c4c4",fontSize:"14px"}}>Don't worry your information is safe with us.</p>
                    <div class="position-relative mx-auto" style={{maxWidth: "400px"}}>
                        <input class="form-control border-0 w-100 py-3 ps-4 pe-5 rounded" type="text" placeholder="Your email"/>
                        <button type="button" class="btn btn-primary py-2 position-absolute top-0 end-0 mt-2 me-2 rounded ">Subscribe me</button>
                    </div> */}
                <div class="app-icons">
                  <a
                    href="#"
                    className="me-2"
                  >
                    <img
                      class="apple border rounded"
                      src="https://sharetrip.net/assets/images/playStore.png"
                      alt="Download on the App Store"
                    />
                  </a>
                  <a href="#">
                    <img
                      class="android border rounded"
                      alt="Get it on Google Play"
                      src="https://sharetrip.net/assets/images/appStore.png"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="copyright">
              <div class="row">
                <div
                  class="col-md-12 text-center mb-3 mb-md-0 text-white"
                  style={{ fontSize: "13px" }}
                >
                  &copy; Copyright Triplover Limited. All rights reserved.
                </div>
                {/* <div class="col-md-6 text-center text-white text-md-end">
                       
                        Designed By <a href="https://htmlcodex.com">HTML Codex</a>
                        <br/>Distributed By: <a href="https://themewagon.com" target="_blank">ThemeWagon</a>
                    </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Footer;