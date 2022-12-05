import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { Link, Navigate, useNavigate } from "react-router-dom";
import $ from "jquery";
import ShowModal from "../../FlightPage/ShowModal/ShowModal";
import DurationFormat from "../../SharedComponent/Utility/DurationFormat";
import "./RightSide.css";
import useAuth from "../../../hooks/useAuth";
import Countdown from "react-countdown";

const RightSide = () => {
  const { choosePaymentOption, setChoosePaymentOption,gatewayCharge } = useAuth();
  const navigation = useNavigate();
  // const data = localStorage.getItem('Database');
  const filterParam = JSON.parse(sessionStorage.getItem("Database"));
  const flightType = filterParam.tripTypeModify;
  const direction0 = JSON.parse(localStorage.getItem("direction0"));
  const direction1 = JSON.parse(localStorage.getItem("direction1"));
  const direction2 = JSON.parse(localStorage.getItem("direction2"));
  const direction3 = JSON.parse(localStorage.getItem("direction3"));
  const direction4 = JSON.parse(localStorage.getItem("direction4"));
  const direction5 = JSON.parse(localStorage.getItem("direction5"));
  // const gatewayCharge = JSON.parse(localStorage.getItem("gatewayCharge"));
  const passengerFares = JSON.parse(localStorage.getItem("passengerFares"));
  const passengerCounts = JSON.parse(localStorage.getItem("passengerCounts"));
  const bookingComponents = JSON.parse(
    localStorage.getItem("bookingComponents")
  );
  const refundable = JSON.parse(localStorage.getItem("refundable"));
  const adult = JSON.parse(localStorage.getItem("adult"));
  const child = JSON.parse(localStorage.getItem("child"));
  const infant = JSON.parse(localStorage.getItem("infant"));

  const contact = localStorage.getItem("contact");
  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction0.platingCarrierCode}.png`;
  const ImageUrlR =
    Object.keys(direction1).length > 0
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction1.platingCarrierCode}.png`
      : ``;
  const submitFlight = () => {
    let sendObj = {
      // Departure: direction0,
      // Return: direction1,
      Adult: adult,
      Child: child,
      Infant: infant,
      contact: contact,
    };
    navigation("/travellcartconfirm");
    //console.log(sendObj);
  };

  const [termsBtn, setTermsBtn] = useState(false);

  const charge = gatewayCharge?.filter(
    (item) => item.name === choosePaymentOption
  );
  console.log(charge !== undefined ? charge[0].charge : 0);
  localStorage.setItem("charge", JSON.stringify(charge));

  const handleClick = (e) => {
    if (e.target.checked) {
      setTermsBtn(true);
    } else {
      setTermsBtn(false);
    }
  };

  useEffect(() => {
    $("#flight" + 0).show();
    $("#baggage" + 0).hide();
    $("#cancel" + 0).hide();
    $("#fare" + 0).hide();

    $("#flightId" + 0).click(function () {
      $("#flight" + 0).show();
      $("#baggage" + 0).hide();
      $("#cancel" + 0).hide();
      $("#fare" + 0).hide();
    });
    $("#baggageId" + 0).click(function () {
      $("#flight" + 0).hide();
      $("#baggage" + 0).show();
      $("#cancel" + 0).hide();
      $("#fare" + 0).hide();
    });
    $("#changeId" + 0).click(function () {
      $("#flight" + 0).hide();
      $("#baggage" + 0).hide();
      $("#cancel" + 0).show();
      $("#fare" + 0).hide();
    });
    $("#fareId" + 0).click(function () {
      $("#flight" + 0).hide();
      $("#baggage" + 0).hide();
      $("#cancel" + 0).hide();
      $("#fare" + 0).show();
    });
  }, []);
  const navigate = useNavigate();
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (!completed) {
      // Render a completed state
      return (
        <span className="text-white fw-bold fs-6">
          <i class="fas fa-clock me-1"></i>
          {minutes} min : {seconds} sec
        </span>
      );
    } else {
      return (
        <span className="text-white fw-bold fs-6">
          <i class="fas fa-clock me-1"></i>
          {minutes} min : {seconds} sec
        </span>
      );
    }
  };
  const [iconRotateFare, setIconRotateFare] = useState(false);
  const [iconRotateFlight, setIconRotateFlight] = useState(true);
  const [iconRotatePayment, setIconRotatePayment] = useState(true);
  return (
    <div className="col-lg-12">
      <div className="container box-shadow  bg-white card-border-radius">
        <div className="row py-3 m-1">
          <div
            className="mt-1 mb-4 p-2 rounded"
            style={{ backgroundColor: "#3c67af" }}
          >
            <span className="text-white">
              Please complete booking within{" "}
              <Countdown date={Date.now() + 1799000} renderer={renderer} />
            </span>
          </div>
          <div
            className="col-lg-12 text-start text-white border py-1 rounded"
            style={{ backgroundColor: "#3c67af" }}
          >
            <span className="card-title fw-bold">Flight summary</span>
            <span
              className="float-end"
              id="airclicksection"
              onClick={() =>
                iconRotateFlight
                  ? setIconRotateFlight(false)
                  : setIconRotateFlight(true)
              }
              style={{ cursor: "pointer" }}
            >
              <i
                className={
                  iconRotateFlight
                    ? "fa fa-chevron-up"
                    : "fa fa-chevron-up down"
                }
                aria-hidden="true"
              ></i>
            </span>
          </div>
          <div className={iconRotateFlight ? "col-lg-12 py-1 mb-1" : "d-none"}>
            {flightType === "Multi City" ? (
              <>
                <>
                  <div className="row border text-color p-2">
                    <div className="col-lg-2 my-auto">
                      <img src={ImageUrlD} alt="" width="50px" height="50px" />
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="my-auto fw-bold">{direction0.from}</h6>
                      <span className="fs-6">
                        {direction0.segments[0].departure.substr(11, 5)}
                      </span>
                    </div>
                    <div className="col-lg-6 my-auto text-center lh-1">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <span className="text-color fw-bold font-size">
                            {direction0.stops === 0
                              ? "Direct"
                              : direction0.stops + " Stop"}
                          </span>
                        </div>
                        <div className="col-lg-12 text-center">
                          <span className="text-color ">
                            <i class="fas fa-circle fa-xs"></i>
                            --------------
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                        </div>
                        <div className="col-lg-12 text-center ms-4">
                          <span className="text-color me-5">
                            <i className="fas fa-clock fa-sm"></i>
                            <span className="ms-1 font-size">
                              {direction0.segments[0].duration[0]}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="my-auto fw-bold">{direction0.to}</h6>
                      <span className="fs-6">
                        {direction0.segments[
                          direction0.segments.length - 1
                        ].arrival.substr(11, 5)}
                      </span>
                    </div>
                  </div>
                </>
                <>
                  <div className="row border text-color p-2">
                    <div className="col-lg-2 my-auto">
                      <img src={ImageUrlD} alt="" width="50px" height="50px" />
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="my-auto fw-bold">{direction1.from}</h6>
                      <span className="fs-6">
                        {direction1.segments[0].departure.substr(11, 5)}
                      </span>
                    </div>
                    <div className="col-lg-6 my-auto text-center lh-1">
                      <div className="row">
                        <div className="col-lg-12 text-center">
                          <span className="text-color fw-bold font-size">
                            {direction1.stops === 0
                              ? "Direct"
                              : direction1.stops + " Stop"}
                          </span>
                        </div>
                        <div className="col-lg-12 text-center">
                          <span className="text-color ">
                            <i class="fas fa-circle fa-xs"></i>
                            --------------
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                        </div>
                        <div className="col-lg-12 text-center ms-4">
                          <span className="text-color me-5">
                            <i className="fas fa-clock fa-sm"></i>
                            <span className="ms-1 font-size">
                              {direction1.segments[0].duration[0]}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="my-auto fw-bold">{direction1.to}</h6>
                      <span className="fs-6">
                        {direction1.segments[
                          direction1.segments.length - 1
                        ].arrival.substr(11, 5)}
                      </span>
                    </div>
                  </div>
                </>
                {direction2.segments !== undefined ? (
                  <>
                    <div className="row border text-color p-2">
                      <div className="col-lg-2 my-auto">
                        <img
                          src={ImageUrlD}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction2.from}</h6>
                        <span className="fs-6">
                          {direction2.segments[0].departure.substr(11, 5)}
                        </span>
                      </div>
                      <div className="col-lg-6 my-auto text-center lh-1">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <span className="text-color fw-bold font-size">
                              {direction2.stops === 0
                                ? "Direct"
                                : direction2.stops + " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12 text-center">
                            <span className="text-color ">
                              <i class="fas fa-circle fa-xs"></i>
                              --------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center ms-4">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {direction2.segments[0].duration[0]}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction2.to}</h6>
                        <span className="fs-6">
                          {direction2.segments[
                            direction2.segments.length - 1
                          ].arrival.substr(11, 5)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {direction3.segments !== undefined ? (
                  <>
                    <div className="row border text-color p-2">
                      <div className="col-lg-2 my-auto">
                        <img
                          src={ImageUrlD}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction3.from}</h6>
                        <span className="fs-6">
                          {direction3.segments[0].departure.substr(11, 5)}
                        </span>
                      </div>
                      <div className="col-lg-6 my-auto text-center lh-1">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <span className="text-color fw-bold font-size">
                              {direction3.stops === 0
                                ? "Direct"
                                : direction3.stops + " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12 text-center">
                            <span className="text-color ">
                              <i class="fas fa-circle fa-xs"></i>
                              --------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center ms-4">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {direction3.segments[0].duration[0]}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction3.to}</h6>
                        <span className="fs-6">
                          {direction3.segments[
                            direction3.segments.length - 1
                          ].arrival.substr(11, 5)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {direction4.segments !== undefined ? (
                  <>
                    <div className="row border text-color p-2">
                      <div className="col-lg-2 my-auto">
                        <img
                          src={ImageUrlD}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction4.from}</h6>
                        <span className="fs-6">
                          {direction4.segments[0].departure.substr(11, 5)}
                        </span>
                      </div>
                      <div className="col-lg-6 my-auto text-center lh-1">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <span className="text-color fw-bold font-size">
                              {direction4.stops === 0
                                ? "Direct"
                                : direction4.stops + " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12 text-center">
                            <span className="text-color ">
                              <i class="fas fa-circle fa-xs"></i>
                              --------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center ms-4">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {direction4.segments[0].duration[0]}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction4.to}</h6>
                        <span className="fs-6">
                          {direction4.segments[
                            direction4.segments.length - 1
                          ].arrival.substr(11, 5)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}

                {direction5.segments !== undefined ? (
                  <>
                    <div className="row border text-color p-2">
                      <div className="col-lg-2 my-auto">
                        <img
                          src={ImageUrlD}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction5.from}</h6>
                        <span className="fs-6">
                          {direction5.segments[0].departure.substr(11, 5)}
                        </span>
                      </div>
                      <div className="col-lg-6 my-auto text-center lh-1">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <span className="text-color fw-bold font-size">
                              {direction5.stops === 0
                                ? "Direct"
                                : direction5.stops + " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12 text-center">
                            <span className="text-color ">
                              <i class="fas fa-circle fa-xs"></i>
                              --------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center ms-4">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {direction5.segments[0].duration[0]}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction5.to}</h6>
                        <span className="fs-6">
                          {direction5.segments[
                            direction5.segments.length - 1
                          ].arrival.substr(11, 5)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                <div className="row border text-color p-2">
                  <div className="col-lg-2 my-auto">
                    <img src={ImageUrlD} alt="" width="50px" height="50px" />
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction0.from}</h6>
                    <span className="fs-6">
                      {direction0.segments[0].departure.substr(11, 5)}
                    </span>
                  </div>
                  <div className="col-lg-6 my-auto text-center lh-1">
                    <div className="row">
                      <div className="col-lg-12 text-center">
                        <span className="text-color font-size">
                          {direction0.stops === 0
                            ? "Direct"
                            : direction0.stops + " Stop"}
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color ">
                          <i class="fas fa-circle fa-xs"></i>
                          --------------
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                      </div>
                      <div className="col-lg-12 text-center ms-4">
                        <span className="text-color me-5">
                          <i className="fas fa-clock fa-sm"></i>
                          <span className="ms-1 font-size">
                            {direction0.segments[0].duration[0]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="my-auto fw-bold">{direction0.to}</h6>
                    <span className="fs-6">
                      {direction0.segments[
                        direction0.segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div></div>
            {flightType === "Multi City" ? (
              <></>
            ) : (
              <>
                {Object.keys(direction1).length > 0 ? (
                  <>
                    <div className="row border text-color p-2">
                      <div className="col-lg-2 my-auto">
                        <img
                          src={ImageUrlR}
                          alt=""
                          width="50px"
                          height="50px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction1.from}</h6>
                        <span className="fs-6">
                          {direction1.segments[0].departure.substr(11, 5)}
                        </span>
                      </div>
                      <div className="col-lg-6 my-auto text-center lh-1">
                        <div className="row">
                          <div className="col-lg-12 text-center">
                            <span className="text-color font-size">
                              {direction1.stops === 0
                                ? "Direct"
                                : direction1.stops + " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12">
                            <span className="text-color">
                              <i class="fas fa-circle fa-xs"></i>
                              --------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center ms-4">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {direction1.segments[0].duration[0]}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="my-auto fw-bold">{direction1.to}</h6>
                        <span className="fs-6">
                          {direction1.segments[
                            direction1.segments.length - 1
                          ].arrival.substr(11, 5)}
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <div
            className={iconRotateFlight ? "position-relative" : "d-none"}
            id={"show-option"}
          >
            <div className="position-absolute top-100 start-50 translate-middle">
              <p className="flight-details">
                <Link
                  to=""
                  className="my-auto text-color fw-bold text-center ms-4 pe-3"
                  data-bs-toggle="modal"
                  data-bs-target={"#exampleModal" + 0}
                >
                  Flight Details
                </Link>
              </p>
            </div>
          </div>
        </div>
        <div className="row py-1 m-1">
          <div
            className="col-lg-12 text-start text-white border py-1 rounded"
            style={{ backgroundColor: "#3c67af" }}
          >
            <span className="card-title fw-bold">Pay with</span>
            <span
              className="float-end"
              id="airclicksection"
              onClick={() =>
                iconRotatePayment
                  ? setIconRotatePayment(false)
                  : setIconRotatePayment(true)
              }
              style={{ cursor: "pointer" }}
            >
              <i
                className={
                  iconRotatePayment
                    ? "fa fa-chevron-up"
                    : "fa fa-chevron-up down"
                }
                aria-hidden="true"
              ></i>
            </span>
          </div>
          <div
            className={
              iconRotatePayment ? "col-lg-12 pt-3 text-start" : "d-none"
            }
          >
            <div className="form-check form-check-inline">
              <input
                className="form-check-input me-1 radio-type"
                type="radio"
                name="inlineRadioOptions"
                id="option1"
                checked={choosePaymentOption === "SSL"}
                value="SSL"
                onClick={() => setChoosePaymentOption("SSL")}
              />
              <label className="form-check-label fs-6 me-2" htmlFor="option1">
                <img
                  src={require("../../../images/payment/Screenshot 2022-06-29 110437.png")}
                  alt=""
                  width={"50px"}
                  height={"30px"}
                />{" "}
                <span className="mx-1"></span>
                <img
                  src={require("../../../images/payment/Screenshot 2022-06-29 110501.png")}
                  alt=""
                  width={"50px"}
                  height={"30px"}
                />
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input me-1 radio-type"
                defaultChecked="checked"
                type="radio"
                name="inlineRadioOptions"
                id="option2"
                checked={choosePaymentOption === "Bkash"}
                value="Bkash"
                onClick={() => setChoosePaymentOption("Bkash")}
              />
              <label className="form-check-label fs-6 me-2" htmlFor="option2">
                <img
                  src={require("../../../images/payment/bkash-logo-250D6142D9.png")}
                  alt=""
                  width={"50px"}
                  height={"30px"}
                />
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input me-1 radio-type"
                defaultChecked="checked"
                type="radio"
                name="inlineRadioOptions"
                id="option3"
                checked={choosePaymentOption === "Brac"}
                value="Brac"
                onClick={() => setChoosePaymentOption("Brac")}
              />
              <label className="form-check-label fs-6 me-2" htmlFor="option3">
                <img
                  src={"https://www.ifcamc.org/sites/amc/files/BRAC_Bank.png"}
                  alt=""
                  width={"50px"}
                  height={"30px"}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="row py-3 m-1">
          <div
            className="col-lg-12 text-start text-white border mb-2 py-1 rounded"
            style={{ backgroundColor: "#3c67af" }}
          >
            <span className="card-title fw-bold">Fare details</span>
            <span
              className="float-end"
              id="airclicksection"
              onClick={() =>
                iconRotateFare
                  ? setIconRotateFare(false)
                  : setIconRotateFare(true)
              }
              style={{ cursor: "pointer" }}
            >
              <i
                className={
                  iconRotateFare
                    ? "fa fa-chevron-down up"
                    : "fa fa-chevron-down"
                }
                aria-hidden="true"
              ></i>
            </span>
          </div>

          {passengerFares.adt !== null ? (
            <>
              <div
                className={
                  iconRotateFare ? "col-lg-12 border py-1 mb-1" : "d-none"
                }
              >
                <h6 className="fw-bold text-start" style={{ fontSize: "13px" }}>
                  <u>Adult</u>
                </h6>
                <div className="row mt-2">
                  <div className="col-lg-6">
                    <h6 className="text-start" style={{ fontSize: "13px" }}>
                      Base Fare ({passengerCounts.adt} &#215;{" "}
                      {passengerFares.adt.basePrice})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end" style={{ fontSize: "13px" }}>
                      {passengerCounts.adt * passengerFares.adt.basePrice}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start" style={{ fontSize: "13px" }}>
                      Taxes ({passengerCounts.adt} &#215;{" "}
                      {passengerFares.adt.taxes})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end" style={{ fontSize: "13px" }}>
                      {" "}
                      {passengerCounts.adt * passengerFares.adt.taxes}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {passengerFares.cnn !== null ? (
            <>
              <div
                className={
                  iconRotateFare ? "col-lg-12 border py-1 mb-1" : "d-none"
                }
              >
                <h6 className="fw-bold text-start" style={{ fontSize: "13px" }}>
                  <u>Child</u>
                </h6>
                <div className="row mt-2">
                  <div className="col-lg-6">
                    <h6 className="text-start" style={{ fontSize: "13px" }}>
                      Base Fare ({passengerCounts.cnn} &#215;{" "}
                      {passengerFares.cnn.basePrice})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end" style={{ fontSize: "13px" }}>
                      {passengerCounts.cnn * passengerFares.cnn.basePrice}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start" style={{ fontSize: "13px" }}>
                      Taxes ({passengerCounts.cnn} &#215;{" "}
                      {passengerFares.cnn.taxes})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end" style={{ fontSize: "13px" }}>
                      {" "}
                      {passengerCounts.cnn * passengerFares.cnn.taxes}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}

          {passengerFares.inf !== null ? (
            <>
              <div
                className={
                  iconRotateFare ? "col-lg-12 border py-1 mb-1" : "d-none"
                }
              >
                <h6 className="fw-bold text-start" style={{ fontSize: "13px" }}>
                  <u>Infant</u>
                </h6>
                <div className="row mt-2">
                  <div className="col-lg-6">
                    <h6 className="text-start" style={{ fontSize: "13px" }}>
                      Base Fare ({passengerCounts.inf} &#215;{" "}
                      {passengerFares.inf.basePrice})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end" style={{ fontSize: "13px" }}>
                      {passengerCounts.inf * passengerFares.inf.basePrice}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start" style={{ fontSize: "13px" }}>
                      Taxes ({passengerCounts.inf} &#215;{" "}
                      {passengerFares.inf.taxes})
                    </h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end" style={{ fontSize: "13px" }}>
                      {" "}
                      {passengerCounts.inf * passengerFares.inf.taxes}
                    </h6>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
          <div
            className={iconRotateFare ? "col-lg-12 border py-1 mb-1" : "d-none"}
          >
            <div className="row mt-2">
              <div className="col-lg-6">
                <h6 className="text-start" style={{ fontSize: "13px" }}>
                  (-) Discount
                </h6>
              </div>
              <div className="col-lg-6">
                <h6 className="text-end" style={{ fontSize: "13px" }}>
                  {" "}
                  {bookingComponents[0].discountPrice}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h6 className="text-start" style={{ fontSize: "13px" }}>
                  (=) Subtotal
                </h6>
              </div>
              <div className="col-lg-6">
                <h6 className="text-end" style={{ fontSize: "13px" }}>
                  {" "}
                  {(bookingComponents[0].basePrice +
                    bookingComponents[0].taxes)+ bookingComponents[0].discountPrice
                  }
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h6 className="text-start" style={{ fontSize: "13px" }}>
                  (+) AIT
                </h6>
              </div>
              <div className="col-lg-6">
                <h6 className="text-end" style={{ fontSize: "13px" }}>
                  {" "}
                  {bookingComponents[0].ait}
                </h6>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-6">
                <h6 className="text-start" style={{ fontSize: "13px" }}>
                  (+) Convenience fee
                </h6>
              </div>
              <div className="col-lg-6">
                <h6 className="text-end" style={{ fontSize: "13px" }}>
                  {" "}
                  {Math.round(
                    (bookingComponents[0].basePrice +
                      bookingComponents[0].taxes +
                      bookingComponents[0].ait) *
                      (charge !== undefined ? (charge[0].charge / 100) : 1)
                  )}
                </h6>
              </div>
            </div>
            
            
          </div>

          <div className="col-lg-12 border py-1 my-2 rounded">
            <div className="row">
              <div className="col-lg-6">
                <span className="card-title fw-bold float-start mt-2">
                  Total payable
                </span>
              </div>
              <div className="col-lg-6">
                <h6 className="card-title fw-bold text-end mt-2">
                  {" "}
                  BDT{" "}
                  {Math.round(
                    bookingComponents[0].totalPrice +
                      (bookingComponents[0].basePrice +
                        bookingComponents[0].taxes +
                        bookingComponents[0].ait) *
                        (charge !== undefined ? (charge[0].charge / 100) : 1)
                  )}
                </h6>
              </div>
            </div>
          </div>
          <div className="col-lg-12 py-1 mb-1 px-0">
            <div className="row">
              <div className="col-lg-12">
                <div class="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                    onChange={handleClick}
                  />
                  <label
                    class="form-check-label font-size-checkbok float-start"
                    for="flexCheckDefault"
                  >
                    <span style={{ fontSize: "12px" }}>
                      By Issuing this Ticket I agree to{" "}
                      <Link to="/termandcondition">
                        Triplover Terms & Conditions
                      </Link>
                    </span>
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-12 py-1 mb-1 px-0">
            <div className="row">
              <div className="col-lg-12 text-center">
                <button
                  type="submit"
                  className="btn text-white fw-bold w-50 btn-sm rounded"
                  style={{ backgroundColor: "#3c67af" }}
                  disabled={termsBtn === true ? false : true}
                >
                  Pay with bkash
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ShowModal
        key={0}
        flag={1}
        index={0}
        flightType={flightType}
        direction0={direction0}
        direction1={direction1}
        direction2={direction2}
        direction3={direction3}
        direction4={direction4}
        direction5={direction5}
        bookingComponents={bookingComponents}
        refundable={refundable}
        passengerFares={passengerFares}
        passengerCounts={passengerCounts}
      ></ShowModal>
    </div>
  );
};

export default RightSide;
