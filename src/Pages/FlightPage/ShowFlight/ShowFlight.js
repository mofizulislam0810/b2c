import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import ShowModal from "../ShowModal/ShowModal";
import DurationFormat from "../../SharedComponent/Utility/DurationFormat";
// import gif from '../../../images/icon/Spinner-1s-200px.gif';
import airports from "../../../JSON/airports.json";
import moment from "moment";
import dayCount from "../../SharedComponent/Utility/dayCount";
import layOver from "../../SharedComponent/Utility/layOver";
import ReactTooltip from "react-tooltip";
import "./ShowFlight.css";
import Loading from "../../Loading/Loading";

const ShowFlight = (props) => {
  const navigate = useNavigate();
  // let index1 = 0;
  // console.log(props.data)
  const {
    passengerFares,
    refundable,
    directions,
    bookingComponents,
    uniqueTransID,
    itemCodeRef,
    totalPrice,
    loading,
    passengerCounts,
    avlSrc
  } = props.data;

  console.log(avlSrc);
  //let  totalPrice, directions,bookingComponents,refundable;//// = props.data;
  // totalPrice=props.data.totalPrice;
  // directions=props.data.directions;
  // bookingComponents=props.data.bookingComponents;
  // console.log('okkkkkkkkk')
  // console.log(uniqueTransID,props.data);
  const flightType = props.flightType;
  // console.log(directions);
  // console.log(props.flightType);
  // console.log(directions.length);
  const [hoverD, sethoverD] = useState(false);
  const [hoverR, sethoverR] = useState(false);
  const [direction0, setdirection0] = useState(directions[0][0]);
  const [direction1, setdirection1] = useState(
    directions.length > 1 ? directions[1][0] : []
  );
  const [direction2, setdirection2] = useState(
    directions.length > 2 ? directions[2][0] : []
  );
  const [direction3, setdirection3] = useState(
    directions.length > 3 ? directions[3][0] : []
  );
  const [direction4, setdirection4] = useState(
    directions.length > 4 ? directions[4][0] : []
  );
  const [direction5, setdirection5] = useState(
    directions.length > 5 ? directions[5][0] : []
  );
  // const [direction0,setdirection0] = useState(directions[0][0]);
  // const [direction1,setdirection1] = useState(directions[1]!==undefined?directions[1][0]:{});
  // const ImageUrlD = `https://tjwlcdn.com/img/air/${directions[0][0].platingCarrierCode}.png`;
  //const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${directions[0][0].PlatingCarrier}.png`;
  // console.log(directions.map(item=> item[0]));
  // console.log(directions.length)

  // const flightTime = direction0.segments.map(item => item.details[0].flightTime);
  // const travelTime = direction0.segments[0].details[0].travelTime;
  // const layOver = travelTime - time;
  // console.log(flightTime);

  // const ImageUrlR = directions[1]!==undefined? `https://tjwlcdn.com/img/air/${directions[1][0].platingCarrierCode}.png`:``;
  //const ImageUrlR = directions[1]!==undefined? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${directions[1][0].PlatingCarrier}.png`:``;

  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${directions[0][0].platingCarrierCode}.png`;
  const ImageUrlR =
    directions[1] !== undefined
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${directions[1][0].platingCarrierCode}.png`
      : ``;

  const [idxD, setIdxD] = useState(0);
  const [idxA, setIdxA] = useState(0);
  // const selectDirectionOption0 = (id) =>{
  //    setdirection0(directions[0][id]);
  // }
  // console.log('direction0')
  // console.log(direction0);

  const selectDirectionOption0 = (id) => {
    setdirection0(directions[0][id]);
    // console.log(direction0);
    setIdxD(id);
  };
  const selectDirectionOption1 = (id) => {
    setdirection1(directions[1][id]);
    // console.log(direction1);
    setIdxA(id);
  };
  const selectDirectionOption2 = (id) => {
    setdirection2(directions[2][id]);
    // console.log(direction2);
  };
  const selectDirectionOption3 = (id) => {
    setdirection3(directions[3][id]);
    // console.log(direction3);
  };
  const selectDirectionOption4 = (id) => {
    setdirection4(directions[4][id]);
    // console.log(direction4);
  };
  const selectDirectionOption5 = (id) => {
    setdirection5(directions[5][id]);
    // console.log(direction5);
  };

  //   const selectDirectionOption1 = (id) =>{
  // alert('ok 2')
  //     setdirection1(directions[1][id]);
  //   }
  // console.log('direction1')
  // console.log(direction1);
  // const handleChange = e =>{
  //   const index2 = e.target;
  //   setIndex(index2);
  // }

  // console.log(index);

  const handleSelectFlight = () => {
    // alert("Select");
    // console.log(direction0);
    // console.log(direction1);
    // console.log(direction2);
    // console.log(direction3);
    // console.log(direction4);
    // console.log(direction5);
    localStorage.setItem("uniqueTransID", JSON.stringify(uniqueTransID));
    localStorage.setItem("itemCodeRef", JSON.stringify(itemCodeRef));
    localStorage.setItem("direction0", JSON.stringify(direction0));
    localStorage.setItem("direction1", JSON.stringify(direction1));
    localStorage.setItem("direction2", JSON.stringify(direction2));
    localStorage.setItem("direction3", JSON.stringify(direction3));
    localStorage.setItem("direction4", JSON.stringify(direction4));
    localStorage.setItem("direction5", JSON.stringify(direction5));
    localStorage.setItem("passengerFares", JSON.stringify(passengerFares));
    localStorage.setItem("passengerCounts", JSON.stringify(passengerCounts));
    localStorage.setItem(
      "bookingComponents",
      JSON.stringify(bookingComponents)
    );
    localStorage.setItem("refundable", JSON.stringify(refundable));
    navigate("/travellcart");
    // console.log(direction0);
  };

  useEffect(() => {
    setdirection0(directions[0][0]);
    setdirection1(directions.length > 1 ? directions[1][0] : []);
    setdirection2(directions.length > 2 ? directions[2][0] : []);
    setdirection3(directions.length > 3 ? directions[3][0] : []);
    setdirection4(directions.length > 4 ? directions[4][0] : []);
    setdirection5(directions.length > 5 ? directions[5][0] : []);
    $("#select-flight-click" + props.index).click(function () {
      localStorage.setItem("uniqueTransID", JSON.stringify(uniqueTransID));
      localStorage.setItem("itemCodeRef", JSON.stringify(itemCodeRef));
      localStorage.setItem("direction0", JSON.stringify(direction0));
      localStorage.setItem("direction1", JSON.stringify(direction1));
      localStorage.setItem("direction2", JSON.stringify(direction2));
      localStorage.setItem("direction3", JSON.stringify(direction3));
      localStorage.setItem("direction4", JSON.stringify(direction4));
      localStorage.setItem("direction5", JSON.stringify(direction5));
      localStorage.setItem("passengerFares", JSON.stringify(passengerFares));
      localStorage.setItem("passengerCounts", JSON.stringify(passengerCounts));
      localStorage.setItem(
        "bookingComponents",
        JSON.stringify(bookingComponents)
      );
      localStorage.setItem("refundable", JSON.stringify(refundable));
    });

    $("#select-flight-t-click" + props.index).click(function () { });

    $(document).ready(function () {
      $("#toggle-option" + props.index).hide();
      $("#hide-option" + props.index).hide();
      $("#check-price" + props.index).hide();
      $("#check-t-price" + props.index).hide();
    });

    $("#show-option" + props.index).click(function () {
      $("#check-price" + props.index).hide();
      $("#check-t-price" + props.index).hide();
      $("#first-option" + props.index).hide();
      $("#toggle-option" + props.index).show();
      $("#show-option" + props.index).hide();
      $("#hide-option" + props.index).show();
    });

    $("#hide-option" + props.index).click(function () {
      $("#first-option" + props.index).show();
      $("#toggle-option" + props.index).hide();
      $("#show-option" + props.index).show();
      $("#hide-option" + props.index).hide();
      $("#check-price" + props.index).hide();
    });

    $("#check-price-click" + props.index).click(function () {
      $("#rotate-click" + props.index).toggleClass("down");
      $("#check-price" + props.index).toggle();
    });
    $("#rotate-click" + props.index).click(function () {
      $(this).toggleClass("down");
      $("#check-price" + props.index).toggle();
    });

    $("#check-price-t-click" + props.index).click(function () {
      $("#rotate-t-click" + props.index).toggleClass("down");
      $("#check-t-price" + props.index).toggle();
    });

    $("#rotate-t-click" + props.index).click(function () {
      $(this).toggleClass("down");
      $("#check-t-price" + props.index).toggle();
    });

    $("#flight" + props.index).show();
    $("#baggage" + props.index).hide();
    $("#cancel" + props.index).hide();
    $("#fare" + props.index).hide();

    $("#flightId" + props.index).click(function () {
      $("#flight" + props.index).show();
      $("#baggage" + props.index).hide();
      $("#cancel" + props.index).hide();
      $("#fare" + props.index).hide();
    });
    $("#baggageId" + props.index).click(function () {
      $("#flight" + props.index).hide();
      $("#baggage" + props.index).show();
      $("#cancel" + props.index).hide();
      $("#fare" + props.index).hide();
    });
    $("#changeId" + props.index).click(function () {
      $("#flight" + props.index).hide();
      $("#baggage" + props.index).hide();
      $("#cancel" + props.index).show();
      $("#fare" + props.index).hide();
    });
    $("#fareId" + props.index).click(function () {
      $("#flight" + props.index).hide();
      $("#baggage" + props.index).hide();
      $("#cancel" + props.index).hide();
      $("#fare" + props.index).show();
    });
  }, [directions, props.index]);

  return (
    <>
      <Loading loading={loading}></Loading>
      <div
        className="row mb-5 mx-3 py-2 rounded box-shadow bg-white"
        id={"first-option" + props.index}
      >
        <div className="col-lg-10">
          {/* up flight section  */}
          <div className="row p-2">
            {flightType === "Multi City" ? (
              directions.map((item, index) => (
                <div className="row p-2 text-color border m-1" key={index}>
                  <div className="col-lg-1 my-auto">
                    <img src={ImageUrlD} alt="" width="40px" height="40px" />
                  </div>
                  <div
                    className="col-lg-3 my-auto text-center"
                    style={{ fontSize: "14px" }}
                  >
                    <p className="my-auto">{item[0].platingCarrierName}</p>
                    <p className="my-auto">
                      {item[0].segments[0].details[0].equipment}
                    </p>
                    <p>
                      {item[0].platingCarrierCode} -{" "}
                      {item[0].segments[0].flightNumber}
                    </p>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="fw-bold">
                      <span className="fs-5">{item[0].from}</span>
                      <span className="ms-1 fs-5">
                        {item[0].segments[0].departure.substr(11, 5)}
                      </span>
                    </h6>
                    <h6 className="flighttime">
                      {moment(item[0].segments[0].departure).format(
                        "DD-MMM-YY, ddd"
                      )}
                    </h6>
                    <h6 className="flighttime">
                      {airports
                        .filter((f) => f.iata === item[0].from)
                        .map((item) => item.city)}
                    </h6>
                  </div>
                  <div className="col-lg-4 my-auto">
                    <div className="row lh-1">
                      <div className="col-lg-12 text-center">
                        <span className="text-color font-size">
                          {item[0].stops === 0
                            ? "Direct"
                            : item[0].stops + " Stop"}
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color">
                          <i class="fas fa-circle fa-xs"></i>
                          ----------------------
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                      </div>
                      <div className="col-lg-12 text-center">
                        <span className="text-color me-5">
                          <i className="fas fa-clock fa-sm"></i>
                          <span className="ms-1 font-size">
                            {item[0].segments[0].duration[0]}
                          </span>
                        </span>
                        <span className="text-color">
                          <i className="fas fa-briefcase fa-sm"></i>
                          <span className="ms-1 font-size">
                            {item[0].segments[0].baggage[0]?.amount +
                              " " +
                              directions[0][0].segments[0].baggage[0]?.units}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-2 my-auto">
                    <h6 className="fw-bold">
                      <span className="fs-5">{item[0].to}</span>
                      <span className="ms-1 fs-5">
                        {item[0].segments[
                          item[0].segments.length - 1
                        ].arrival.substr(11, 5)}
                      </span>

                      <sup>
                        &nbsp;
                        {dayCount(
                          item[0].segments[item[0].segments.length - 1].arrival,
                          item[0].segments[0]?.departure
                        ) !== 0 ? (
                          <span className="text-danger">
                            +
                            {dayCount(
                              item[0].segments[item[0].segments.length - 1]
                                .arrival,
                              item[0].segments[0]?.departure
                            )}
                          </span>
                        ) : (
                          ""
                        )}{" "}
                      </sup>
                    </h6>
                    <h6 className="flighttime">
                      {moment(
                        item[0].segments[item[0].segments.length - 1].arrival
                      ).format("DD-MMM-YY, ddd")}
                    </h6>
                    <h6 className="flighttime">
                      {airports
                        .filter((f) => f.iata === item[0].to)
                        .map((item) => item.city)}
                    </h6>
                  </div>
                </div>
              ))
            ) : (
              <div className="row p-2">
                <div className="col-lg-1 my-auto">
                  <img src={ImageUrlD} alt="" width="40px" height="40px" />
                </div>
                <div
                  className="col-lg-3 my-auto text-start"
                  style={{ fontSize: "14px" }}
                >
                  <p className="my-auto">
                    {directions[0][0].platingCarrierName}
                  </p>
                  <p className="my-auto">
                    <span style={{ fontSize: "12px" }}>{directions[0][0].segments[0].details[0].equipment}</span>
                  </p>
                  <p>
                    {directions[0][0].platingCarrierCode} -{" "}
                    {directions[0][0].segments[0].flightNumber}
                  </p>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[0][0].from}</span>
                    <span className="ms-1 fs-5">
                      {directions[0][0].segments[0].departure.substr(11, 5)}
                    </span>
                    {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {moment(directions[0][0].segments[0].departure).format(
                      "DD-MMM-YY, ddd"
                    )}
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {airports
                      .filter((f) => f.iata === directions[0][0].from)
                      .map((item) => item.city)}
                  </h6>
                  {/* <p className="my-auto">{directions[0][0].from}</p> */}
                </div>
                <div className="col-lg-4 my-auto">
                  <div className="row lh-1">
                    <div className="col-lg-12 text-center text-black-50">
                      <span className="font-size">
                        {directions[0][0].stops === 0 ? (
                          "Direct"
                        ) : (
                          <>
                            {directions[0][0].segments.length === 1 &&
                              directions[0][0].segments[0].details.length ===
                              1 ? (
                              "Direct"
                            ) : (
                              <>
                                {directions[0][0].segments.length > 1 ? (
                                  <>
                                    {directions[0][0].segments.length === 2 ? (
                                      <>
                                        <div className="position-relative" onMouseOver={() => sethoverD(true)} onMouseOut={() => sethoverD(false)}>{directions[0][0].stops + " Stop"}
                                          <div className={hoverD ? "position-absolute top-0 start-50 translate-middle layOver" : "d-none"}
                                          >{
                                              directions[0][0].segments[0].to +

                                              " - Layover " +
                                              layOver(
                                                directions[0][0].segments[1]
                                                  .departure,
                                                directions[0][0].segments[0]
                                                  ?.arrival
                                              )
                                            }
                                          </div>
                                        </div>
                                      </>
                                    ) : directions[0][0].segments.length ===
                                      3 ? (
                                      <>
                                        <div className="position-relative" onMouseOver={() => sethoverD(true)} onMouseOut={() => sethoverD(false)}>  {directions[0][0].stops + " Stop"}
                                          <div
                                            className={hoverD ? "position-absolute top-0 start-50 translate-middle layOver" : "d-none"}
                                          >
                                            {
                                              directions[0][0].segments[0].to +
                                              " - Layover " +
                                              layOver(
                                                directions[0][0].segments[1]
                                                  .departure,
                                                directions[0][0].segments[0]
                                                  ?.arrival
                                              )}
                                            | {
                                              directions[0][0].segments[1].to +

                                              " - Layover " +
                                              layOver(
                                                directions[0][0].segments[2]
                                                  .departure,
                                                directions[0][0].segments[1]
                                                  ?.arrival
                                              )
                                            }
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {directions[0][0].segments.map((item) => {
                                      item.details.length === 2 ? (
                                        <span
                                          data-bs-toggle="tooltip"
                                          data-bs-placement="top"
                                          data-title={
                                            item.details[0].destinationName +
                                            " (" +
                                            item.details[0].destination +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              item.details[1].departure,
                                              item.details[0]?.arrival
                                            )
                                          }
                                        >
                                          {directions[0][0].stops + " Stop"}
                                        </span>
                                      ) : item.details.length === 3 ? (
                                        <>
                                          <span
                                            data-bs-toggle="tooltip"
                                            data-bs-placement="top"
                                            data-title={
                                              item.details[0].destinationName +
                                              " (" +
                                              item.details[0].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[1].departure,
                                                item.details[0]?.arrival
                                              ) +
                                              "<br /> <hr/>" +
                                              item.details[1].destinationName +
                                              " (" +
                                              item.details[1].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[2].departure,
                                                item.details[1]?.arrival
                                              )
                                            }
                                          >
                                            {directions[0][0].stops + " Stop"}
                                          </span>{" "}
                                        </>
                                      ) : (
                                        <></>
                                      );
                                    })}
                                  </>
                                )}
                              </>
                            )}

                            {/* <ReactTooltip
                              effect="solid"
                              html={true}
                            ></ReactTooltip> */}
                          </>
                        )}
                      </span>
                    </div>
                    <div className="col-lg-12 text-center" style={{color : avlSrc}}>
                      <span className="text-color">
                        <i class="fas fa-circle fa-xs"></i>
                        ----------------------
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                    </div>
                    <div className="col-lg-12 text-center text-black-50">
                      <span className="text-color">
                        <i className="fas fa-clock fa-sm"></i>
                        <span className="ms-1 font-size">
                          {directions[0][0].segments[0].duration[0]}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[0][0].to}</span>
                    <span className="ms-1 fs-5">
                      {directions[0][0].segments[
                        directions[0][0].segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>

                    <sup>
                      &nbsp;
                      {dayCount(
                        directions[0][0].segments[
                          directions[0][0].segments.length - 1
                        ].arrival,
                        directions[0][0].segments[0]?.departure
                      ) !== 0 ? (
                        <span className="text-danger">
                          +
                          {dayCount(
                            directions[0][0].segments[
                              directions[0][0].segments.length - 1
                            ].arrival,
                            directions[0][0].segments[0]?.departure
                          )}
                        </span>
                      ) : (
                        ""
                      )}{" "}
                    </sup>
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {moment(
                      directions[0][0].segments[
                        directions[0][0].segments.length - 1
                      ].arrival
                    ).format("DD-MMM-YY, ddd")}
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {airports
                      .filter((f) => f.iata === directions[0][0].to)
                      .map((item) => item.city)}
                  </h6>
                  {/* <span className="fw-bold">
                  {directions[0][0].segments[
                    directions[0][0].segments.length - 1
                  ].arrival.substr(11, 5)}
                </span>
                <p className="my-auto">{directions[0][0].to}</p> */}
                </div>
              </div>
            )}
            {/* end of up flight section  */}

            {/* return fight section  */}
            {flightType === "Multi City" ? (
              <></>
            ) : directions[1] !== undefined ? (
              <div className="row p-2 border-top text-color">
                <div className="col-lg-1 my-auto">
                  <img src={ImageUrlR} alt="" width="40px" height="40px" />
                </div>
                <div
                  className="col-lg-3 my-auto text-start"
                  style={{ fontSize: "14px" }}
                >
                  <p className="my-auto">
                    {directions[1][0].platingCarrierName}
                  </p>
                  <p className="my-auto">
                    <span style={{ fontSize: "12px" }}>{directions[1][0].segments[0].details[0].equipment}</span>
                  </p>
                  <p>
                    {directions[1][0].platingCarrierCode} -{" "}
                    {directions[1][0].segments[0].flightNumber}
                  </p>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[1][0].from}</span>
                    <span className="ms-1 fs-5">
                      {directions[1][0].segments[0].departure.substr(11, 5)}
                    </span>
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {moment(directions[1][0].segments[0].departure).format(
                      "DD-MMM-YY, ddd"
                    )}
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {airports
                      .filter((f) => f.iata === directions[1][0].from)
                      .map((item) => item.city)}
                  </h6>
                </div>
                <div className="col-lg-4 my-auto text-center">
                  <div className="row lh-1">
                    <div className="col-lg-12 text-center text-black-50">
                      <span className="text-color font-size">
                        {directions[1][0].stops === 0 ? (
                          "Direct"
                        ) : (
                          <>
                            {directions[0][0].segments.length === 1 &&
                              directions[0][0].segments[0].details.length ===
                              1 ? (
                              "Direct"
                            ) : (
                              <>
                                {directions[1][0].segments.length > 1 ? (
                                  <>
                                    {directions[1][0].segments.length === 2 ? (
                                      <>
                                        <div className="position-relative" onMouseOver={() => sethoverR(true)} onMouseOut={() => sethoverR(false)}>{directions[0][0].stops + " Stop"}
                                          <div className={hoverR ? "position-absolute top-0 start-50 translate-middle layOver" : "d-none"}
                                          >{
                                              directions[1][0].segments[0].to +

                                              " - Layover " +
                                              layOver(
                                                directions[1][0].segments[1]
                                                  .departure,
                                                directions[1][0].segments[0]
                                                  ?.arrival
                                              )
                                            }
                                          </div>
                                        </div>
                                      </>
                                    ) : directions[1][0].segments.length ===
                                      3 ? (
                                      <>
                                        <div className="position-relative" onMouseOver={() => sethoverR(true)} onMouseOut={() => sethoverR(false)}>  {directions[0][0].stops + " Stop"}
                                          <div
                                            className={hoverR ? "position-absolute top-0 start-50 translate-middle layOver" : "d-none"}
                                          >
                                            {
                                              directions[1][0].segments[0].to +
                                              " - Layover " +
                                              layOver(
                                                directions[1][0].segments[1]
                                                  .departure,
                                                directions[1][0].segments[0]
                                                  ?.arrival
                                              )}
                                            | {
                                              directions[1][0].segments[1].to +

                                              " - Layover " +
                                              layOver(
                                                directions[1][0].segments[2]
                                                  .departure,
                                                directions[1][0].segments[1]
                                                  ?.arrival
                                              )
                                            }
                                          </div>
                                        </div>
                                      </>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {directions[1][0].segments.map((item) => {
                                      item.details.length === 2 ? (
                                        <span
                                          data-tip={
                                            item.details[0].destinationName +
                                            " (" +
                                            item.details[0].destination +
                                            ")" +
                                            " | Layover " +
                                            layOver(
                                              item.details[1].departure,
                                              item.details[0]?.arrival
                                            )
                                          }
                                        >
                                          {directions[0][0].stops + " Stop"}
                                        </span>
                                      ) : item.details.length === 3 ? (
                                        <>
                                          <span
                                            data-tip={
                                              item.details[0].destinationName +
                                              " (" +
                                              item.details[0].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[1].departure,
                                                item.details[0]?.arrival
                                              ) +
                                              "<br /> <hr/>" +
                                              item.details[1].destinationName +
                                              " (" +
                                              item.details[1].destination +
                                              ")" +
                                              " | Layover " +
                                              layOver(
                                                item.details[2].departure,
                                                item.details[1]?.arrival
                                              )
                                            }
                                          >
                                            {directions[1][0].stops + " Stop"}
                                          </span>{" "}
                                        </>
                                      ) : (
                                        <></>
                                      );
                                    })}
                                  </>
                                )}
                              </>
                            )}

                            <ReactTooltip
                              effect="solid"
                              html={true}
                            ></ReactTooltip>
                          </>
                        )}
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <span className="text-color" style={{color : avlSrc}}>
                        <i class="fas fa-circle fa-xs"></i>
                        ----------------------
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                    </div>
                    <div className="col-lg-12 text-center text-black-50">
                      <span className="text-color">
                        <i className="fas fa-clock fa-sm"></i>
                        <span className="ms-1 font-size">
                          {directions[1][0].segments[0].duration[0]}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 my-auto">
                  <h6 className="fw-bold">
                    <span className="fs-5">{directions[1][0].to}</span>
                    <span className="ms-1 fs-5">
                      {directions[1][0].segments[
                        directions[1][0].segments.length - 1
                      ].arrival.substr(11, 5)}
                    </span>
                    <sup>
                      &nbsp;
                      {dayCount(
                        directions[1][0].segments[
                          directions[1][0].segments.length - 1
                        ].arrival,
                        directions[1][0].segments[0]?.departure
                      ) !== 0 ? (
                        <span className="text-danger">
                          +
                          {dayCount(
                            directions[1][0].segments[
                              directions[1][0].segments.length - 1
                            ].arrival,
                            directions[1][0].segments[0]?.departure
                          )}
                        </span>
                      ) : (
                        ""
                      )}{" "}
                    </sup>
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {moment(
                      directions[1][0].segments[
                        directions[1][0].segments.length - 1
                      ].arrival
                    ).format("DD-MMM-YY, ddd")}
                  </h6>
                  <h6 className="flighttime text-black-50">
                    {airports
                      .filter((f) => f.iata === directions[1][0].to)
                      .map((item) => item.city)}
                  </h6>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          {/* end of return flight section  */}
        </div>

        {/* check price click section */}
        <div className="col-lg-2 text-end lh-1 border-start border-secondary d-flex align-items-center justify-content-end">
          <div>
            <h5 className="text-end text-color fw-bold" style={{ marginBottom: "2px" }}>
              <span style={{ fontSize: "13px" }}>BDT</span> {totalPrice.toLocaleString("en-US")}
            </h5>
            <Link
              to="/travellcart"
              className="btn btn-danger text-white fw-bold w-100 rounded fw-bold"
              // id={"select-flight-click" + props.index}
              onClick={handleSelectFlight}
            >
              Book Now
            </Link>
            <br></br>
            <Link
              to=""
              style={{ textDecoration: "none" }}
              className="pe-1 text-color font-size"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + props.index}
            >
              Flight Details
            </Link>
          </div>
          {/* <h6
                className="text-end fw-bold text-color text-center font-size"
                id={"priceDown" + props.index}
                style={{ cursor: "pointer" }}
              >
                Price Breakdown{" "}
                <span>
                  <i class="fas fa-angle-down"></i>
                </span>
              </h6> */}
        </div>
        {/* end of check price click section */}

        {/* check price section  */}
        <div className="border-top" id={"check-price" + props.index}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex align-item-center py-3">
                  <span className="text-danger">
                    <i className="fas fa-plane fa-2x"></i>
                  </span>
                  <h2 className="ms-2">Select fare type</h2>
                </div>
              </div>
            </div>
            <div className="row p-2 mb-4 gap-2 mx-auto">
              <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                <div className="row py-4 border-bottom rounded">
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold">LIGHT</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold text-end">BDT 9,000</h6>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-lg-12">
                    <p>Baggage</p>
                    <p>
                      <span className="text-success pe-1">
                        <i className="fas fa-check"></i>
                      </span>
                      7 KG cabin baggage
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      No Checked baggage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>Flexibility</p>
                    <p>
                      <span className="text-dander pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Non-refundable fare
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Changeable with fees
                    </p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-lg-12">
                    <button className="btn btn-danger w-100">Select</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                <div className="row py-4 border-bottom rounded">
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold">VALUE</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold text-end">
                      BDT 10,000
                    </h6>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-lg-12">
                    <p>Baggage</p>
                    <p>
                      <span className="text-success pe-1">
                        <i className="fas fa-check"></i>
                      </span>
                      7 KG cabin baggage
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      No Checked baggage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>Flexibility</p>
                    <p>
                      <span className="text-dander pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Non-refundable fare
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Changeable with fees
                    </p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-lg-12">
                    <button className="btn btn-danger w-100">Select</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                <div className="row py-4 border-bottom rounded">
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold">PLUS</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold text-end">
                      BDT 12,000
                    </h6>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-lg-12">
                    <p>Baggage</p>
                    <p>
                      <span className="text-success pe-1">
                        <i className="fas fa-check"></i>
                      </span>
                      7 KG cabin baggage
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      No Checked baggage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>Flexibility</p>
                    <p>
                      <span className="text-dander pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Non-refundable fare
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Changeable with fees
                    </p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-lg-12">
                    <button className="btn btn-danger w-100">Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of check price section */}
      </div>

      {/* Modal option */}
      {/* {
        directions.map(item1=>item1.map(item2=><ShowModal index={props.index} item2={item2} ></ShowModal>))
      } */}
      <ShowModal
        key={props.index}
        flag={0}
        index={props.index}
        flightType={flightType}
        direction0={direction0}
        direction1={direction1}
        direction2={direction2}
        direction3={direction3}
        direction4={direction4}
        direction5={direction5}
        passengerFares={passengerFares}
        bookingComponents={bookingComponents}
        refundable={refundable}
        passengerCounts={passengerCounts}
      ></ShowModal>

      {/* show more section  */}

      {(directions[0] !== undefined && directions[0].length > 1) ||
        (directions[1] !== undefined && directions[1].length > 1) ||
        (directions[2] !== undefined && directions[2].length > 1) ||
        (directions[3] !== undefined && directions[3].length > 1) ||
        (directions[4] !== undefined && directions[4].length > 1) ||
        (directions[5] !== undefined && directions[5].length > 1) ? (
        <>
          <div className="position-relative" id={"show-option" + props.index}>
            <div className="position-absolute top-100 start-50 translate-middle">
              <p className="show-hide">
                Show{" "}
                {directions[0].length -
                  1 +
                  (directions[1] !== undefined
                    ? directions[1].length - 1
                    : 0)}{" "}
                more options
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}

      {/* end of show more section */}

      {/* toggle option for hide */}
      <div
        className="row mb-5 mx-3 py-2 rounded box-shadow bg-white"
        id={"toggle-option" + props.index}
      >
        <div className="col-lg-10">
          {/* up flight section for hide*/}
          {/* {flightType === "Multi City" ? (
            <></>
          ) : (
            <>
              <div className="row pt-2">
                <div className="col-lg-3">
                  <p className="text-white bg-danger py-1 px-3 text-center">
                    <span className="me-1">
                      <i className="fas fa-plane fa-sm"></i>
                    </span>
                    Select Departure Flight
                  </p>
                </div>
              </div>
            </>
          )} */}

          {flightType === "Multi City" ? (
            <>
           <fieldset
                className="mt-3"
                style={{
                  padding: "2%",
                  border: "2px solid #d3d3d3",
                  borderRadius: ".25rem",
                }}
              >
                <legend
                  class="float-none w-auto fw-bold px-1"
                  style={{ textAlign: "end" }}
                >
                  Select Onward Flight
                </legend>
              {directions[0].map((item, index) => (
                <div key={index}>
                  {index === 0 ? (
                    <p className="text-white bg-danger py-2 px-3 text-center">
                      <span className="me-1">
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                      Departure : {item.from} - {item.to}
                    </p>
                  ) : (
                    <></>
                  )}
                  <div className="row p-2 text-color border m-1">
                    <div className="col-lg-1 my-auto">
                      <img
                        src={ImageUrlD}
                        alt=""
                        width="40px"
                        height="40px"
                      />
                    </div>
                    <div className="col-lg-2 my-auto text-black-50">
                      <h6 className="my-auto flighttime">
                        {item.platingCarrierName}
                      </h6>
                      <h6 className="my-auto flighttime">
                        {item.segments[0].details[0].equipment}
                      </h6>
                      <h6 className="flighttime">
                        {item.platingCarrierCode} -{" "}
                        {item.segments[0].flightNumber}
                      </h6>
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="fw-bold">
                        <span className="fs-5">{item.from}</span>
                        <span className="ms-1 fs-5">
                          {item.segments[0].departure.substr(11, 5)}
                        </span>
                        {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                      </h6>
                      <h6 className="flighttime text-black-50">
                        {moment(item.segments[0].departure).format(
                          "DD-MMM-YY, ddd"
                        )}
                      </h6>
                      <h6 className="flighttime text-black-50">
                        {airports
                          .filter((f) => f.iata === item.from)
                          .map((item) => item.city)}
                      </h6>
                    </div>
                    <div className="col-lg-4 my-auto">
                      <div className="row lh-1">
                        <div className="col-lg-12 text-center text-black-50">
                          <span className="text-color font-size">
                            {directions[0][0].segments.length === 1
                              ? "Direct"
                              : directions[0][0].segments.length -
                              1 +
                              " Stop"}
                          </span>
                        </div>
                        <div className="col-lg-12 text-center text-black-50">
                          <span className="text-color">
                            <i class="fas fa-circle fa-xs"></i>
                            -----------------------
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                        </div>
                        <div className="col-lg-12 text-center text-black-50">
                          <span className="text-color me-5">
                            <i className="fas fa-clock fa-sm"></i>
                            <span className="ms-1 font-size">
                              {item.segments[0].duration[0]}
                            </span>
                          </span>
                          <span className="text-color">
                            <i className="fas fa-briefcase fa-sm"></i>
                            <span className="ms-1 font-size">
                              {item.segments[0].baggage[0]?.amount +
                                " " +
                                item.segments[0].baggage[0]?.units}
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-2 my-auto">
                      <h6 className="fw-bold">
                        <span className="fs-5">{item.to}</span>
                        <span className="ms-1 fs-5">
                          {item.segments[
                            item.segments.length - 1
                          ].arrival.substr(11, 5)}
                        </span>
                        <sup>
                          &nbsp;
                          {dayCount(
                            item.segments[item.segments.length - 1].arrival,
                            item.segments[0]?.departure
                          ) !== 0 ? (
                            <span className="text-danger">
                              +
                              {dayCount(
                                item.segments[item.segments.length - 1]
                                  .arrival,
                                item.segments[0]?.departure
                              )}
                            </span>
                          ) : (
                            ""
                          )}{" "}
                        </sup>
                      </h6>
                      <h6 className="flighttime text-black-50">
                        {moment(
                          item.segments[item.segments.length - 1].arrival
                        ).format("DD-MMM-YY, ddd")}
                      </h6>
                      <h6 className="flighttime text-black-50">
                        {airports
                          .filter((f) => f.iata === item.to)
                          .map((item) => item.city)}
                      </h6>
                    </div>
                    <div className="col-lg-1 mx-auto my-auto">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          value={index}
                          name={"chooseoption0" + props.index}
                          onChange={() => selectDirectionOption0(index)}
                          defaultChecked={index === 0 ? true : false}
                        // onChange={handleChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="flexRadioDefault2"
                        ></label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <hr></hr>
              {directions[1] !== undefined ? (
                <>
                  {directions[1].map((item, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <p className="text-white bg-danger py-2 px-3 text-center">
                          <span className="me-1">
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                          Departure : {item.from} - {item.to}
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className="row p-2 text-color border m-1">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-2 my-auto text-black-50">
                          <h6 className="my-auto flighttime">
                            {item.platingCarrierName}
                          </h6>
                          <h6 className="my-auto flighttime">
                            {item.segments[0].details[0].equipment}
                          </h6>
                          <h6 className="flighttime">
                            {item.platingCarrierCode} -{" "}
                            {item.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.from}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[0].departure.substr(11, 5)}
                            </span>
                            {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(item.segments[0].departure).format(
                              "DD-MMM-YY, ddd"
                            )}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.from)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-4 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color font-size">
                                {directions[1][0].segments.length === 1
                                  ? "Direct"
                                  : directions[1][0].segments.length -
                                  1 +
                                  " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                -----------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].baggage[0]?.amount +
                                    " " +
                                    item.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.to}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[
                                item.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <sup>
                              &nbsp;
                              {dayCount(
                                item.segments[item.segments.length - 1].arrival,
                                item.segments[0]?.departure
                              ) !== 0 ? (
                                <span className="text-danger">
                                  +
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  )}
                                </span>
                              ) : (
                                ""
                              )}{" "}
                            </sup>
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(
                              item.segments[item.segments.length - 1].arrival
                            ).format("DD-MMM-YY, ddd")}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.to)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-1 mx-auto my-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={index}
                              name={"chooseoption1" + props.index}
                              onChange={() => selectDirectionOption1(index)}
                              defaultChecked={index === 0 ? true : false}
                            // onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}

              {directions.length > 2 ? (
                <>
                  <hr></hr>
                  {directions[2].map((item, index) => (
                    <>
                      {index === 0 ? (
                        <p className="text-white bg-danger py-2 px-3 text-center">
                          <span className="me-1">
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                          Departure : {item.from} - {item.to}
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className="row p-2 text-color border m-1">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-2 my-auto text-black-50">
                          <h6 className="my-auto flighttime">
                            {item.platingCarrierName}
                          </h6>
                          <h6 className="my-auto flighttime">
                            {item.segments[0].details[0].equipment}
                          </h6>
                          <h6 className="flighttime">
                            {item.platingCarrierCode} -{" "}
                            {item.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.from}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[0].departure.substr(11, 5)}
                            </span>
                            {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(item.segments[0].departure).format(
                              "DD-MMM-YY, ddd"
                            )}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.from)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-4 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color font-size">
                                {directions[2][0].segments.length === 1
                                  ? "Direct"
                                  : directions[2][0].segments.length -
                                  1 +
                                  " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                -----------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].baggage[0]?.amount +
                                    " " +
                                    item.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.to}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[
                                item.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <sup>
                              &nbsp;
                              {dayCount(
                                item.segments[item.segments.length - 1].arrival,
                                item.segments[0]?.departure
                              ) !== 0 ? (
                                <span className="text-danger">
                                  +
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  )}
                                </span>
                              ) : (
                                ""
                              )}{" "}
                            </sup>
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(
                              item.segments[item.segments.length - 1].arrival
                            ).format("DD-MMM-YY, ddd")}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.to)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-1 mx-auto my-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={index}
                              name={"chooseoption2" + props.index}
                              onChange={() => selectDirectionOption2(index)}
                              defaultChecked={index === 0 ? true : false}
                            // onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </>
                  ))}
                </>
              ) : (
                <></>
              )}

              {directions.length > 3 ? (
                <>
                  <hr></hr>
                  {directions[3].map((item, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <p className="text-white bg-danger py-2 px-3 text-center">
                          <span className="me-1">
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                          Departure : {item.from} - {item.to}
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className="row p-2 text-color border m-1">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-2 my-auto text-black-50">
                          <h6 className="my-auto flighttime">
                            {item.platingCarrierName}
                          </h6>
                          <h6 className="my-auto flighttime">
                            {item.segments[0].details[0].equipment}
                          </h6>
                          <h6 className="flighttime">
                            {item.platingCarrierCode} -{" "}
                            {item.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.from}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[0].departure.substr(11, 5)}
                            </span>
                            {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(item.segments[0].departure).format(
                              "DD-MMM-YY, ddd"
                            )}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.from)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-4 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color font-size">
                                {directions[3][0].segments.length === 1
                                  ? "Direct"
                                  : directions[3][0].segments.length -
                                  1 +
                                  " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                -----------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].baggage[0]?.amount +
                                    " " +
                                    item.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.to}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[
                                item.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <sup>
                              &nbsp;
                              {dayCount(
                                item.segments[item.segments.length - 1].arrival,
                                item.segments[0]?.departure
                              ) !== 0 ? (
                                <span className="text-danger">
                                  +
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  )}
                                </span>
                              ) : (
                                ""
                              )}{" "}
                            </sup>
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(
                              item.segments[item.segments.length - 1].arrival
                            ).format("DD-MMM-YY, ddd")}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.to)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-1 mx-auto my-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={index}
                              name={"chooseoption3" + props.index}
                              onChange={() => selectDirectionOption3(index)}
                              defaultChecked={index === 0 ? true : false}
                            // onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
              {directions.length > 4 ? (
                <>
                  <hr></hr>
                  {directions[4].map((item, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <p className="text-white bg-danger py-2 px-3 text-center">
                          <span className="me-1">
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                          Departure : {item.from} - {item.to}
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className="row p-2 text-color border m-1">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-2 my-auto text-black-50">
                          <h6 className="my-auto flighttime">
                            {item.platingCarrierName}
                          </h6>
                          <h6 className="my-auto flighttime">
                            {item.segments[0].details[0].equipment}
                          </h6>
                          <h6 className="flighttime">
                            {item.platingCarrierCode} -{" "}
                            {item.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.from}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[0].departure.substr(11, 5)}
                            </span>
                            {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(item.segments[0].departure).format(
                              "DD-MMM-YY, ddd"
                            )}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.from)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-4 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color font-size">
                                {directions[4][0].segments.length === 1
                                  ? "Direct"
                                  : directions[4][0].segments.length -
                                  1 +
                                  " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                -----------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].baggage[0]?.amount +
                                    " " +
                                    item.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.to}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[
                                item.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <sup>
                              &nbsp;
                              {dayCount(
                                item.segments[item.segments.length - 1].arrival,
                                item.segments[0]?.departure
                              ) !== 0 ? (
                                <span className="text-danger">
                                  +
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  )}
                                </span>
                              ) : (
                                ""
                              )}{" "}
                            </sup>
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(
                              item.segments[item.segments.length - 1].arrival
                            ).format("DD-MMM-YY, ddd")}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.to)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-1 mx-auto my-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={index}
                              name={"chooseoption4" + props.index}
                              onChange={() => selectDirectionOption4(index)}
                              defaultChecked={index === 0 ? true : false}
                            // onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}

              {directions.length > 5 ? (
                <>
                  <hr></hr>
                  {directions[5].map((item, index) => (
                    <div key={index}>
                      {index === 0 ? (
                        <p className="text-white bg-danger py-2 px-3 text-center">
                          <span className="me-1">
                            <i className="fas fa-plane fa-sm"></i>
                          </span>
                          Departure : {item.from} - {item.to}
                        </p>
                      ) : (
                        <></>
                      )}
                      <div className="row p-2 text-color border m-1">
                        <div className="col-lg-1 my-auto">
                          <img
                            src={ImageUrlD}
                            alt=""
                            width="40px"
                            height="40px"
                          />
                        </div>
                        <div className="col-lg-2 my-auto text-black-50">
                          <h6 className="my-auto flighttime">
                            {item.platingCarrierName}
                          </h6>
                          <h6 className="my-auto flighttime">
                            {item.segments[0].details[0].equipment}
                          </h6>
                          <h6 className="flighttime">
                            {item.platingCarrierCode} -{" "}
                            {item.segments[0].flightNumber}
                          </h6>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.from}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[0].departure.substr(11, 5)}
                            </span>
                            {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(item.segments[0].departure).format(
                              "DD-MMM-YY, ddd"
                            )}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.from)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-4 my-auto">
                          <div className="row lh-1">
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color font-size">
                                {directions[5][0].segments.length === 1
                                  ? "Direct"
                                  : directions[5][0].segments.length -
                                  1 +
                                  " Stop"}
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color">
                                <i class="fas fa-circle fa-xs"></i>
                                -----------------------
                                <i className="fas fa-plane fa-sm"></i>
                              </span>
                            </div>
                            <div className="col-lg-12 text-center text-black-50">
                              <span className="text-color me-5">
                                <i className="fas fa-clock fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].duration[0]}
                                </span>
                              </span>
                              <span className="text-color">
                                <i className="fas fa-briefcase fa-sm"></i>
                                <span className="ms-1 font-size">
                                  {item.segments[0].baggage[0]?.amount +
                                    " " +
                                    item.segments[0].baggage[0]?.units}
                                </span>
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-2 my-auto">
                          <h6 className="fw-bold">
                            <span className="fs-5">{item.to}</span>
                            <span className="ms-1 fs-5">
                              {item.segments[
                                item.segments.length - 1
                              ].arrival.substr(11, 5)}
                            </span>
                            <sup>
                              &nbsp;
                              {dayCount(
                                item.segments[item.segments.length - 1].arrival,
                                item.segments[0]?.departure
                              ) !== 0 ? (
                                <span className="text-danger">
                                  +
                                  {dayCount(
                                    item.segments[item.segments.length - 1]
                                      .arrival,
                                    item.segments[0]?.departure
                                  )}
                                </span>
                              ) : (
                                ""
                              )}{" "}
                            </sup>
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {moment(
                              item.segments[item.segments.length - 1].arrival
                            ).format("DD-MMM-YY, ddd")}
                          </h6>
                          <h6 className="flighttime text-black-50">
                            {airports
                              .filter((f) => f.iata === item.to)
                              .map((item) => item.city)}
                          </h6>
                        </div>
                        <div className="col-lg-1 mx-auto my-auto">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="radio"
                              value={index}
                              name={"chooseoption5" + props.index}
                              onChange={() => selectDirectionOption5(index)}
                              defaultChecked={index === 0 ? true : false}
                            // onChange={handleChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="flexRadioDefault2"
                            ></label>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <></>
              )}
            </fieldset>
            </>
          ) : (
            <>
              <fieldset
                className="mt-3"
                style={{
                  padding: "2%",
                  border: "2px solid #d3d3d3",
                  borderRadius: ".25rem",
                }}
              >
                <legend
                  class="float-none w-auto fw-bold px-1"
                  style={{ textAlign: "end" }}
                >
                  Select Onward Flight
                </legend>

                {directions[0].map((item, index) => (
                  <div
                    key={index}
                    className={
                      index === idxD
                        ? "border text-color m-1 selected-bg-color"
                        : "border text-color m-1"
                    }
                  >
                    {/* {console.log(item.length)} */}
                    <div className="row p-2 ">
                      <div className="col-lg-1 my-auto">
                        <img
                          src={ImageUrlD}
                          alt=""
                          width="40px"
                          height="40px"
                        />
                      </div>
                      <div className="col-lg-2 my-auto text-black-50">
                        <h6 className="my-auto flighttime">
                          {item.platingCarrierName}
                        </h6>
                        <h6 className="my-auto flighttime">
                          {item.segments[0].details[0].equipment}
                        </h6>
                        <h6 className="flighttime">
                          {item.platingCarrierCode} -{" "}
                          {item.segments[0].flightNumber}
                        </h6>
                      </div>
                      <div className="col-lg-2 my-auto">
                        {/* <span className="fw-bold">
                  {item.segments[0].departure.substr(11, 5)}
                </span>
                <p className="my-auto">{item.from}</p> */}
                        <h6 className="fw-bold">
                          <span className="fs-5">{item.from}</span>
                          <span className="ms-1 fs-5">
                            {item.segments[0].departure.substr(11, 5)}
                          </span>
                          {/* {directions[0][0].segments[0].departure.substr(11, 5)} */}
                        </h6>
                        <h6 className="flighttime text-black-50">
                          {moment(item.segments[0].departure).format(
                            "DD-MMM-YY, ddd"
                          )}
                        </h6>
                        <h6 className="flighttime text-black-50">
                          {airports
                            .filter((f) => f.iata === item.from)
                            .map((item) => item.city)}
                        </h6>
                      </div>
                      <div className="col-lg-4 my-auto">
                        <div className="row lh-1">
                          <div className="col-lg-12 text-center text-black-50">
                            <span className="text-color font-size">
                              {directions[0][0].segments.length === 1
                                ? "Direct"
                                : directions[0][0].segments.length -
                                1 +
                                " Stop"}
                            </span>
                          </div>
                          <div className="col-lg-12 text-center text-black-50">
                            <span className="text-color">
                              <i class="fas fa-circle fa-xs"></i>
                              -----------------------
                              <i className="fas fa-plane fa-sm"></i>
                            </span>
                          </div>
                          <div className="col-lg-12 text-center text-black-50">
                            <span className="text-color me-5">
                              <i className="fas fa-clock fa-sm"></i>
                              <span className="ms-1 font-size">
                                {item.segments[0].duration[0]}
                              </span>
                            </span>
                            <span className="text-color">
                              <i className="fas fa-briefcase fa-sm"></i>
                              <span className="ms-1 font-size">
                                {item.segments[0].baggage[0]?.amount +
                                  " " +
                                  item.segments[0].baggage[0]?.units}
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-2 my-auto">
                        <h6 className="fw-bold">
                          <span className="fs-5">{item.to}</span>
                          <span className="ms-1 fs-5">
                            {item.segments[
                              item.segments.length - 1
                            ].arrival.substr(11, 5)}
                          </span>
                          <sup>
                            &nbsp;
                            {dayCount(
                              item.segments[item.segments.length - 1].arrival,
                              item.segments[0]?.departure
                            ) !== 0 ? (
                              <span className="text-danger">
                                +
                                {dayCount(
                                  item.segments[item.segments.length - 1]
                                    .arrival,
                                  item.segments[0]?.departure
                                )}
                              </span>
                            ) : (
                              ""
                            )}{" "}
                          </sup>
                        </h6>
                        <h6 className="flighttime text-black-50">
                          {moment(
                            item.segments[item.segments.length - 1].arrival
                          ).format("DD-MMM-YY, ddd")}
                        </h6>
                        <h6 className="flighttime text-black-50">
                          {airports
                            .filter((f) => f.iata === item.to)
                            .map((item) => item.city)}
                        </h6>
                      </div>
                      <div className="col-lg-1 mx-auto my-auto">
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            type="radio"
                            value={index}
                            name={"chooseDeparture" + props.index}
                            onChange={() => selectDirectionOption0(index)}
                            defaultChecked={index === 0 ? true : false}
                          // onChange={handleChange}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexRadioDefault2"
                          ></label>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </fieldset>
            </>
          )}

          {flightType === "Multi City" ? (
            <></>
          ) : (
            <>
              {directions[1] !== undefined ? (
                <>
                  {" "}
                  {/* <div className="row">
                    <div className="col-lg-12 m-1 text-start">
                      <span className="text-white bg-danger py-1 px-3 text-center">
                        <span className="me-1">
                          <i className="fas fa-plane fa-sm"></i>
                        </span>
                        Select Return Flight
                      </span>
                    </div>
                  </div> */}
                  <fieldset
                    className="my-3"
                    style={{
                      padding: "2%",
                      border: "2px solid #d3d3d3",
                      borderRadius: ".25rem",
                    }}
                  >
                    <legend
                      class="float-none w-auto fw-bold px-1"
                      style={{ textAlign: "end" }}
                    >
                      Select Return Flight
                    </legend>

                    {directions[1].map((item, index) => (
                      <div
                        key={index}
                        className={
                          index === idxA
                            ? "border text-color m-1 selected-bg-color"
                            : "border text-color m-1"
                        }
                      >
                        {/* {console.log(item[0].segments[0].group)} */}
                        <div className="row p-2">
                          <div className="col-lg-1 my-auto">
                            <img
                              src={ImageUrlR}
                              alt=""
                              width="40px"
                              height="40px"
                            />
                          </div>
                          <div className="col-lg-2 my-auto text-black-50">
                            <h6 className="my-auto flighttime">
                              {item.platingCarrierName}
                            </h6>
                            <h6 className="my-auto flighttime">
                              {item.segments[0].details[0].equipment}
                            </h6>
                            <h6 className="flighttime">
                              {item.platingCarrierCode} -{" "}
                              {item.segments[0].flightNumber}
                            </h6>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <h6 className="fw-bold">
                              <span className="fs-5">{item.from}</span>
                              <span className="ms-1 fs-5">
                                {item.segments[0].departure.substr(11, 5)}
                              </span>
                            </h6>
                            <h6 className="flighttime text-black-50">
                              {moment(item.segments[0].departure).format(
                                "DD-MMM-YY, ddd"
                              )}
                            </h6>
                            <h6 className="flighttime text-black-50">
                              {airports
                                .filter((f) => f.iata === item.from)
                                .map((item) => item.city)}
                            </h6>
                          </div>
                          <div className="col-lg-4 my-auto">
                            <div className="row lh-1">
                              <div className="col-lg-12 text-center text-black-50">
                                <span className="text-color font-size">
                                  {directions[1][0].segments.length === 1
                                    ? "Direct"
                                    : directions[1][0].segments.length -
                                    1 +
                                    " Stop"}
                                </span>
                              </div>
                              <div className="col-lg-12 text-center text-black-50">
                                <span className="text-color">
                                  <i class="fas fa-circle fa-xs"></i>
                                  -----------------------
                                  <i className="fas fa-plane fa-sm"></i>
                                </span>
                              </div>
                              <div className="col-lg-12 text-center text-black-50">
                                <span className="text-color me-5">
                                  <i className="fas fa-clock fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {item.segments[0].duration[0]}
                                  </span>
                                </span>
                                <span className="text-color">
                                  <i className="fas fa-briefcase fa-sm"></i>
                                  <span className="ms-1 font-size">
                                    {item.segments[0].baggage[0]?.amount +
                                      " " +
                                      item.segments[0].baggage[0]?.units}
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-2 my-auto">
                            <h6 className="fw-bold">
                              <span className="fs-5">{item.to}</span>
                              <span className="ms-1 fs-5">
                                {item.segments[
                                  item.segments.length - 1
                                ].arrival.substr(11, 5)}
                              </span>
                              <sup>
                                &nbsp;
                                {dayCount(
                                  item.segments[item.segments.length - 1]
                                    .arrival,
                                  item.segments[0]?.departure
                                ) !== 0 ? (
                                  <span className="text-danger">
                                    +
                                    {dayCount(
                                      item.segments[item.segments.length - 1]
                                        .arrival,
                                      item.segments[0]?.departure
                                    )}
                                  </span>
                                ) : (
                                  ""
                                )}{" "}
                              </sup>
                            </h6>
                            <h6 className="flighttime text-black-50">
                              {moment(
                                item.segments[item.segments.length - 1].arrival
                              ).format("DD-MMM-YY, ddd")}
                            </h6>
                            <h6 className="flighttime text-black-50">
                              {airports
                                .filter((f) => f.iata === item.to)
                                .map((item) => item.city)}
                            </h6>
                          </div>
                          <div className="col-lg-1 mx-auto my-auto">
                            <div className="form-check">
                              <input
                                className="form-check-input"
                                type="radio"
                                value={index}
                                name={"chooseReturn" + props.index}
                                onChange={() => selectDirectionOption1(index)}
                                defaultChecked={index === 0 ? true : false}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="flexRadioDefault2"
                              ></label>
                            </div>
                          </div>
                        </div>
                        {/* <input type="hidden" value={index1++}></input> */}
                      </div>
                    ))}
                  </fieldset>
                </>
              ) : (
                <></>
              )}
            </>
          )}

          {/* end of return flight section for hide*/}
        </div>
        <div className="col-lg-2 my-auto text-center">
          <h5 className="text-end text-color text-center fw-bold">
            BDT {totalPrice}
          </h5>
          <h6 className="text-end text-color fw-bold text-center">
            {refundable === true ? "Refundable" : "Non-Refundable"}
          </h6>
          <button
            type="submit"
            className="btn btn-danger text-white fw-bold w-100 rounded"
            onClick={handleSelectFlight}
          >
            {" "}
            Book Now
          </button>
          <Link
            to=""
            style={{ textDecoration: "none" }}
            className="fw-bold text-color font-size mx-auto"
            data-bs-toggle="modal"
            data-bs-target={"#exampleModal" + props.index}
          >
            Flight Details
          </Link>
        </div>

        {/* check price section for toggle */}
        <div className="border-top" id={"check-t-price" + props.index}>
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-12">
                <div className="d-flex py-3">
                  <span className="text-danger">
                    <i className="fas fa-plane fa-3x"></i>
                  </span>
                  <h1 className="ms-2">Select fare type</h1>
                </div>
              </div>
            </div>
            <div className="row p-2 mb-4 gap-2 mx-auto">
              <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                <div className="row py-4 border-bottom rounded">
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold">LIGHT</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold text-end">BDT 9,000</h6>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-lg-12">
                    <p>Baggage</p>
                    <p>
                      <span className="text-success pe-1">
                        <i className="fas fa-check"></i>
                      </span>
                      7 KG cabin baggage
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      No Checked baggage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>Flexibility</p>
                    <p>
                      <span className="text-dander pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Non-refundable fare
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Changeable with fees
                    </p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-lg-12">
                    <button className="btn btn-danger w-100">Select</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                <div className="row py-4 border-bottom rounded">
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold">VALUE</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold text-end">
                      BDT 10,000
                    </h6>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-lg-12">
                    <p>Baggage</p>
                    <p>
                      <span className="text-success pe-1">
                        <i className="fas fa-check"></i>
                      </span>
                      7 KG cabin baggage
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      No Checked baggage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>Flexibility</p>
                    <p>
                      <span className="text-dander pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Non-refundable fare
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Changeable with fees
                    </p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-lg-12">
                    <button className="btn btn-danger w-100">Select</button>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 shadow" style={{ width: "18rem" }}>
                <div className="row py-4 border-bottom rounded">
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold">PLUS</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-success fw-bold text-end">
                      BDT 12,000
                    </h6>
                  </div>
                </div>
                <div className="row py-2">
                  <div className="col-lg-12">
                    <p>Baggage</p>
                    <p>
                      <span className="text-success pe-1">
                        <i className="fas fa-check"></i>
                      </span>
                      7 KG cabin baggage
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      No Checked baggage
                    </p>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <p>Flexibility</p>
                    <p>
                      <span className="text-dander pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Non-refundable fare
                    </p>
                    <p>
                      <span className="text-danger pe-1">
                        <i className="fas fa-times"></i>
                      </span>
                      Changeable with fees
                    </p>
                  </div>
                </div>
                <div className="row pb-3">
                  <div className="col-lg-12">
                    <button className="btn btn-danger w-100">Select</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* end of check price section for toggle */}
      </div>
      {/* end of toggle option for hide */}
      {/* hide more section  */}
      <div className="position-relative" id={"hide-option" + props.index}>
        <div className="position-absolute top-100 start-50 translate-middle">
          <p className="show-hide">Hide more options</p>
        </div>
      </div>
      {/* end of hide more section  */}
    </>
  );
};

export default ShowFlight;
