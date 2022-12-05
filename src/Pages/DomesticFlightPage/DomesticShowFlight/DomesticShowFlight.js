import React, { useEffect, useState } from "react";
import $ from "jquery";
import "./DomesticShowFlight.css";
import domestic from "../../../JSON/domesticroundway.json";
import DomesticDeparture from "../DomesticDeparture/DomesticDeparture";
import DomesticReturn from "../DomesticReturn/DomesticReturn";
import useAuth from "../../../hooks/useAuth";
import airports from "../../../JSON/airports.json";
import Moment from "react-moment";
import DurationFormat from "../../SharedComponent/Utility/DurationFormat";

const DomesticShowFlight = () => {
  const { doDepartureIndex, doReturnIndex } = useAuth();
  const domesticSorted = domestic.sort((a, b) =>
    Number(a.totalPrice.substring(3, a.totalPrice.length - 3)) >
    Number(b.totalPrice.substring(3, b.totalPrice.length - 3))
      ? 1
      : -1
  );

  const ImageUrlD = `https://tjwlcdn.com/img/air/${domesticSorted[doDepartureIndex].directions[0][0].segments[0].airline}.png`;
  const ImageUrlR = `https://tjwlcdn.com/img/air/${domesticSorted[doReturnIndex].directions[1][0].segments[0].airline}.png`;
  var numberPattern = /\d+/g;
  const departureAmount =
    domesticSorted[doDepartureIndex].totalPrice.match(numberPattern);
  const retuenAmount =
    domesticSorted[doReturnIndex].totalPrice.match(numberPattern);

  useEffect(() => {
    $("#effect").click(function () {
      $("#effect").removeClass("shadow-effect");
      $("#flight-details-toggle").hide("slow");
    });

    $("#flight-details-toggle").hide();
    $("#flight-details-option").show();
    $("#fare-details-option").hide();
    $("#cancel-details-option").hide();
    $("#fare-details-toggle").hide();

    $("#flight-details-toggle-click1").click(function () {
      $("#effect").addClass("shadow-effect");
      $("#flight-details-toggle").show("slow");
    });
    $("#flight-details-toggle-click2").click(function () {
      $("#effect").addClass("shadow-effect");
      $("#flight-details-toggle").show("slow");
    });
    $("#flight-details-toggle-click3").click(function () {
      $("#effect").toggleClass("shadow-effect");
      $("#flight-details-toggle").toggle("slow");
    });
    $("#fare-details-toggle-click").click(function () {
      $("#fare-details-toggle").toggle();
    });

    $("#flight-details").click(function () {
      $("#flight-details-option").show();
      $("#fare-details-option").hide();
      $("#cancel-details-option").hide();
    });
    $("#fare-details").click(function () {
      $("#flight-details-option").hide();
      $("#fare-details-option").show();
      $("#cancel-details-option").hide();
    });
    $("#cancel-details").click(function () {
      $("#flight-details-option").hide();
      $("#fare-details-option").hide();
      $("#cancel-details-option").show();
    });
    $(document).ready(function () {
      $("#flight-details").attr("style", "background:green");
      $("#fare-details").attr("style", "background:red");
      $("#cancel-details").attr("style", "background:red");
    });

    $("#flight-details").click(function () {
      $("#flight-details").attr("style", "background:green");
      $("#fare-details").attr("style", "background:red");
      $("#cancel-details").attr("style", "background:red");
    });

    $("#fare-details").click(function () {
      $("#flight-details").attr("style", "background:red");
      $("#fare-details").attr("style", "background:green");
      $("#cancel-details").attr("style", "background:red");
    });

    $("#cancel-details").click(function () {
      $("#flight-details").attr("style", "background:red");
      $("#fare-details").attr("style", "background:red");
      $("#cancel-details").attr("style", "background:green");
    });
  }, []);
  return (
    <>
      <div class="col-lg-4">
        <div class="row rounded pt-2 bg-light">
          <div class="col-lg-3">
            <p class="text-start fw-bold">Departure</p>
          </div>
          <div class="col-lg-3">
            <p class="text-center fw-bold">Duration</p>
          </div>
          <div class="col-lg-3">
            <p class="text-center fw-bold">Arrival</p>
          </div>
          <div class="col-lg-3">
            <p class="text-center fw-bold">Price</p>
          </div>
        </div>
        {domesticSorted.map((item, index) => (
          <DomesticDeparture index={index} item={item}></DomesticDeparture>
        ))}
      </div>

      <div class="col-lg-4">
        <div class="row rounded pt-2 bg-light">
          <div class="col-lg-3">
            <p class="text-start fw-bold">Departure</p>
          </div>
          <div class="col-lg-3">
            <p class="text-center fw-bold">Duration</p>
          </div>
          <div class="col-lg-3">
            <p class="text-center fw-bold">Arrival</p>
          </div>
          <div class="col-lg-3">
            <p class="text-center fw-bold">Price</p>
          </div>
        </div>
        {domesticSorted.map((item, index) => (
          <DomesticReturn index={index} item={item}></DomesticReturn>
        ))}
      </div>
      <p id="effect"></p>
      <div class="p-2 sticky-option">
        <div class="container">
          <div class="row" style={{ backgroundColor: "#0a223d" }}>
            <div class="col-lg-4 border-end py-1">
              <div class="row mb-2">
                <div class="col-lg-12">
                  <span
                    class="d-inline fw-bold text-white float-start"
                    style={{ fontSize: "14px" }}
                  >
                    Departure -{" "}
                    {airports
                      .filter(
                        (f) =>
                          f.iata ===
                          domesticSorted[doDepartureIndex].directions[0][0].from
                      )
                      .map((item) => item.city)}{" "}
                    to{" "}
                    {airports
                      .filter(
                        (f) =>
                          f.iata ===
                          domesticSorted[doDepartureIndex].directions[0][0].to
                      )
                      .map((item) => item.city)}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-2">
                  <img src={ImageUrlD} alt="" width="30px" height="30px" />
                </div>
                <div class="col-lg-6">
                  <span class="text-white fw-bold">
                    {domesticSorted[
                      doDepartureIndex
                    ].directions[0][0].segments[0].departure.substr(11, 5)}{" "}
                    →{" "}
                    {domesticSorted[doDepartureIndex].directions[0][0].segments[
                      domesticSorted[doDepartureIndex].directions[0][0].segments
                        .length - 1
                    ].arrival.substr(11, 5)}
                  </span>
                  <p
                    class="text-white"
                    style={{ fontSize: "13px", cursor: "pointer" }}
                    id="flight-details-toggle-click1"
                  >
                    Flight Details
                  </p>
                </div>
                <div class="col-lg-4">
                  <p class="fw-bold text-white" style={{ fontSize: "15px" }}>
                    {domesticSorted[doDepartureIndex].totalPrice}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 border-end py-1">
              <div class="row mb-2">
                <div class="col-lg-12">
                  <span
                    class="d-inline fw-bold text-white float-start"
                    style={{ fontSize: "14px" }}
                  >
                    Return -{" "}
                    {airports
                      .filter(
                        (f) =>
                          f.iata ===
                          domesticSorted[doReturnIndex].directions[1][0].from
                      )
                      .map((item) => item.city)}{" "}
                    to{" "}
                    {airports
                      .filter(
                        (f) =>
                          f.iata ===
                          domesticSorted[doReturnIndex].directions[1][0].to
                      )
                      .map((item) => item.city)}
                  </span>
                </div>
              </div>
              <div class="row">
                <div class="col-lg-2">
                  <img src={ImageUrlR} alt="" width="30px" height="30px" />
                </div>
                <div class="col-lg-6">
                  <span class="text-white fw-bold">
                    {domesticSorted[
                      doReturnIndex
                    ].directions[1][0].segments[0].departure.substr(11, 5)}{" "}
                    →{" "}
                    {domesticSorted[doReturnIndex].directions[1][0].segments[
                      domesticSorted[doReturnIndex].directions[1][0].segments
                        .length - 1
                    ].arrival.substr(11, 5)}
                  </span>
                  <p
                    class="text-white"
                    style={{ fontSize: "13px", cursor: "pointer" }}
                    id="flight-details-toggle-click2"
                  >
                    Flight Details
                  </p>
                </div>
                <div class="col-lg-4">
                  <p class="fw-bold text-white" style={{ fontSize: "15px" }}>
                    {domesticSorted[doReturnIndex].totalPrice}
                  </p>
                </div>
              </div>
            </div>
            <div class="col-lg-4 py-1">
              <div class="row">
                <div class="col-lg-12 mt-4 text-center">
                  <span class="fw-bold text-white me-1 fs-5">
                    BDT{" "}
                    {parseInt(departureAmount[0]) + parseInt(retuenAmount[0])}{" "}
                  </span>
                  <button class="btn btn-danger btn-sm me-1">BOOK NOW</button>
                  <span
                    class="text-white me-2"
                    id="flight-details-toggle-click3"
                  >
                    <i class="fa fa-angle-down"></i>
                  </span>
                  <p
                    class="text-white"
                    style={{
                      fontSize: "13px",
                      cursor: "pointer",
                      marginRight: "160px",
                    }}
                    id="fare-details-toggle-click"
                  >
                    Fare Details
                  </p>
                  <div class="top box-shadow" id="fare-details-toggle">
                    <div class="container">
                      <div class="row">
                        <div class="col-lg-12 pt-3">
                          <p class="text-start fs-6 fw-bold">Fare Summary</p>
                        </div>
                      </div>
                      <div class="row py-2 border-bottom">
                        <div class="col-lg-6">
                          <span class="float-start">Total base fare</span>
                        </div>
                        <div class="col-lg-6">
                          <span class="float-end fw-bold">
                            BDT{" "}
                            {parseInt(departureAmount[0]) +
                              parseInt(retuenAmount[0])}
                          </span>
                        </div>
                      </div>
                      <div class="row py-2 border-bottom">
                        <div class="col-lg-6">
                          <span class="float-start">Total Vat</span>
                        </div>
                        <div class="col-lg-6">
                          <span class="float-end fw-bold">
                            BDT{" "}
                            {domesticSorted[doDepartureIndex].taxes.substring(
                              3,
                              domesticSorted[doDepartureIndex].taxes.length
                            )}
                          </span>
                        </div>
                      </div>
                      <div class="row py-2">
                        <div class="col-lg-6">
                          <span class="float-start">Total</span>
                        </div>
                        <div class="col-lg-6">
                          <span class="float-end fw-bold">
                            BDT{" "}
                            {parseInt(departureAmount[0]) +
                              parseInt(retuenAmount[0]) +
                              parseInt(
                                domesticSorted[
                                  doDepartureIndex
                                ].taxes.substring(
                                  3,
                                  domesticSorted[doDepartureIndex].taxes.length
                                )
                              )}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="flight-details-toggle">
          <div class="container">
            <div class="row py-3" style={{ backgroundColor: "#ffffff" }}>
              <div class="col-lg-12 text-center">
                <button
                  class="btn btn-primary btn-sm ms-2"
                  type="button"
                  id="flight-details"
                  onclick="showDiv(1)"
                >
                  Flight itinerary
                </button>
                <button
                  class="btn btn-primary btn-sm ms-2"
                  type="button"
                  id="fare-details"
                  onclick="showDiv(2)"
                >
                  Fare details
                </button>
                <button
                  class="btn btn-primary btn-sm ms-2"
                  type="button"
                  id="cancel-details"
                  onclick="showDiv(3)"
                >
                  Cancel & change
                </button>
              </div>
            </div>
            <div
              class="row py-3 pe-3"
              style={{ backgroundColor: "#ffffff", minHeight: "350px" }}
              id="flight-details-option"
            >
              <div
                class="col-lg-6 p-2"
                style={{
                  overflow: "scroll",
                  overflowX: "hidden",
                  height: "300px",
                }}
              >
                <div class="row border ms-2">
                  <div class="col-lg-12 pt-2">
                    <p class="fw-bold">
                      {airports
                        .filter(
                          (f) =>
                            f.iata ===
                            domesticSorted[doDepartureIndex].directions[0][0]
                              .from
                        )
                        .map((item) => item.city)}{" "}
                      to{" "}
                      {airports
                        .filter(
                          (f) =>
                            f.iata ===
                            domesticSorted[doDepartureIndex].directions[0][0].to
                        )
                        .map((item) => item.city)}{" "}
                      ,{" "}
                      {domesticSorted[
                        doDepartureIndex
                      ].directions[0][0].segments[0].departure.substr(0, 10)}
                    </p>
                  </div>
                </div>

                {domesticSorted[doDepartureIndex].directions[0][0].segments.map(
                  (seg, index) => (
                    <>
                      <div class="row border ms-2">
                        <div class="row py-2">
                          <div class="col-lg-12">
                            <img
                              src={ImageUrlD}
                              alt=""
                              width="30px"
                              height="30px"
                            />
                            <span class="ms-1 fw-bold">{seg.airline}</span>
                            <span class="ms-1 fw-bold">
                              {seg.details[0].equipment}
                            </span>
                            <hr />
                          </div>
                        </div>
                        <div class="row py-2">
                          <div class="col-lg-4 my-auto text-start">
                            <span class="fw-bold fs-5">
                              {seg.departure.substr(11, 5)}
                            </span>
                            <p
                              class="my-auto fw-bold"
                              style={{ fontSize: "12px" }}
                            >
                              <Moment format="dddd, LL">
                                {seg.departure.substr(0, 10)}
                              </Moment>
                            </p>
                            <p class="my-auto">
                              {airports
                                .filter((f) => f.iata === seg.from)
                                .map((item) => item.name + ", " + item.city)}
                            </p>
                          </div>
                          <div class="col-lg-4 text-center my-auto">
                            <div style={{ fontSize: "15px" }}>
                              {DurationFormat(seg.details[0].travelTime)}
                            </div>
                            <div class="text-black-50">-----------------</div>
                          </div>
                          <div class="col-lg-4 text-end my-auto">
                            <span class="fw-bold fs-5">
                              {seg.arrival.substr(11, 5)}
                            </span>
                            <p
                              class="my-auto fw-bold"
                              style={{ fontSize: "12px" }}
                            >
                              <Moment format="dddd, LL">
                                {seg.arrival.substr(0, 10)}
                              </Moment>
                            </p>
                            <p class="my-auto">
                              {airports
                                .filter((f) => f.iata === seg.to)
                                .map((item) => item.name + ", " + item.city)}
                            </p>
                          </div>
                        </div>
                        <div class="row pt-2 pb-3">
                          <div class="col-lg-4 my-auto text-start">
                            <p class="my-auto fw-bold fs-6">BAGGAGE</p>
                            <p class="my-auto" style={{ fontSize: "13px" }}>
                              ADULT
                            </p>
                          </div>
                          <div class="col-lg-4 text-center my-auto">
                            <p class="my-auto fw-bold fs-6">CHECKIN</p>
                            <p class="my-auto" style={{ fontSize: "13px" }}>
                              {seg.baggage[0].amount +
                                " " +
                                seg.baggage[0].units}
                            </p>
                          </div>
                          <div class="col-lg-4 text-end my-auto">
                            <p class="my-auto fw-bold fs-6">CABIN</p>
                            <p class="my-auto" style={{ fontSize: "13px" }}>
                              7KG (max 1 Bag)
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )}
              </div>
              <div
                class="col-lg-6 p-2"
                style={{
                  overflow: "scroll",
                  overflowX: "hidden",
                  height: "300px",
                }}
              >
                <div class="row border ms-2">
                  <div class="col-lg-12 pt-2">
                    <p class="fw-bold">
                      {airports
                        .filter(
                          (f) =>
                            f.iata ===
                            domesticSorted[doReturnIndex].directions[0][0].from
                        )
                        .map((item) => item.city)}{" "}
                      to{" "}
                      {airports
                        .filter(
                          (f) =>
                            f.iata ===
                            domesticSorted[doReturnIndex].directions[0][0].to
                        )
                        .map((item) => item.city)}{" "}
                      ,{" "}
                      {domesticSorted[
                        doReturnIndex
                      ].directions[1][0].segments[0].departure.substr(0, 10)}
                    </p>
                  </div>
                </div>
                {domesticSorted[doReturnIndex].directions[1][0].segments.map(
                  (seg, index) => (
                    <>
                      <div class="row border ms-2">
                        <div class="row py-2">
                          <div class="col-lg-12">
                            <img
                              src={ImageUrlR}
                              alt=""
                              width="30px"
                              height="30px"
                            />
                            <span class="ms-1 fw-bold">{seg.airline}</span>
                            <span class="ms-1 fw-bold">
                              {seg.details[0].equipment}
                            </span>
                            <hr />
                          </div>
                        </div>
                        <div class="row py-2">
                          <div class="col-lg-4 my-auto text-start">
                            <span class="fw-bold fs-5">
                              {seg.departure.substr(11, 5)}
                            </span>
                            <p
                              class="my-auto fw-bold"
                              style={{ fontSize: "12px" }}
                            >
                              <Moment format="dddd, LL">
                                {seg.departure.substr(0, 10)}
                              </Moment>
                            </p>
                            <p class="my-auto">
                              {airports
                                .filter((f) => f.iata === seg.from)
                                .map((item) => item.name + ", " + item.city)}
                            </p>
                          </div>
                          <div class="col-lg-4 text-center my-auto">
                            <div style={{ fontSize: "15px" }}>
                              {DurationFormat(seg.details[0].travelTime)}
                            </div>
                            <div class="text-black-50">-----------------</div>
                          </div>
                          <div class="col-lg-4 text-end my-auto">
                            <span class="fw-bold fs-5">
                              {seg.arrival.substr(11, 5)}
                            </span>
                            <p
                              class="my-auto fw-bold"
                              style={{ fontSize: "12px" }}
                            >
                              <Moment format="dddd, LL">
                                {seg.arrival.substr(0, 10)}
                              </Moment>
                            </p>
                            <p class="my-auto">
                              {airports
                                .filter((f) => f.iata === seg.to)
                                .map((item) => item.name + ", " + item.city)}
                            </p>
                          </div>
                        </div>
                        <div class="row pt-2 pb-3">
                          <div class="col-lg-4 my-auto text-start">
                            <p class="my-auto fw-bold fs-6">BAGGAGE</p>
                            <p class="my-auto" style={{ fontSize: "13px" }}>
                              ADULT
                            </p>
                          </div>
                          <div class="col-lg-4 text-center my-auto">
                            <p class="my-auto fw-bold fs-6">CHECKIN</p>
                            <p class="my-auto" style={{ fontSize: "13px" }}>
                              {seg.baggage[0].amount +
                                " " +
                                seg.baggage[0].units}
                            </p>
                          </div>
                          <div class="col-lg-4 text-end my-auto">
                            <p class="my-auto fw-bold fs-6">CABIN</p>
                            <p class="my-auto" style={{ fontSize: "13px" }}>
                              7KG (max 1 Bag)
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  )
                )}
              </div>
            </div>
            <div
              class="row py-3 pe-3"
              style={{ backgroundColor: "#ffffff", minHeight: "350px" }}
              id="fare-details-option"
            >
              <div class="container px-3 mx-2">
                <div class="fw-bold text-center">Fare details</div>
                <hr />
                <div class="row mt-2">
                  <div class="col-lg-2 text-start">
                    <h6>Fare</h6>
                  </div>
                  <div class="col-lg-8"></div>
                  <div class="col-lg-2 text-end">
                    <h6>
                      BDT{" "}
                      {parseInt(departureAmount[0]) + parseInt(retuenAmount[0])}
                    </h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-2 text-start">
                    <h6>Taxes & fees</h6>
                  </div>
                  <div class="col-lg-8"></div>
                  <div class="col-lg-2 text-end">
                    <h6>BDT 0</h6>
                  </div>
                </div>
                <div class="row">
                  <div class="col-lg-2 text-start">
                    <h6>VAT</h6>
                  </div>
                  <div class="col-lg-8"></div>
                  <div class="col-lg-2 text-end">
                    <h6>BDT 0</h6>
                  </div>
                </div>
                <div class="row">
                  <hr />
                  <div class="col-lg-2 text-start">
                    <h6>Total(incl. VAT)</h6>
                  </div>
                  <div class="col-lg-8"></div>
                  <div class="col-lg-2 text-end">
                    <h6>
                      BDT{" "}
                      {parseInt(departureAmount[0]) + parseInt(retuenAmount[0])}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
            <div
              class="row py-3 pe-3"
              style={{ backgroundColor: "#ffffff", minHeight: "350px" }}
              id="cancel-details-option"
            >
              <div class="col-lg-12 m-2">
                <h6 className="fw-bold text-start">
                  Refund or Date Change can be done as per the following
                  policies:
                </h6>
                <hr></hr>
                <span class="float-start">
                  • Refund Amount= Received amount from customer - Refund Charge
                  (As per Airline Policy + Triplover Convenience Fee).
                </span>
                <br></br>
                <span class="float-start">
                  • Date Change Amount= Date change fee as per Airline +
                  Difference of fare if any + Triplover Convenience Fee.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DomesticShowFlight;
