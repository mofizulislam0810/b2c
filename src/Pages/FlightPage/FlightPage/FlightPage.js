import React, { useEffect, useState } from "react";
import FilterFlight from "../FilterFlight/FilterFlight";
import ModifySearch from "../ModifySearch/ModifySearch";
import ShowFlight from "../ShowFlight/ShowFlight";
import onewayData from "../../../JSON/flightoneway.json";
import roundData from "../../../JSON/flightroundway.json";
import roundtrip from "../../../JSON/roundtrip.json";
import multiData from "../../../JSON/flightmulticity.json";
// import airport from '../../../JSON/airports.json';
import { useNavigate } from "react-router-dom";
import SearchPanel from "../../SearchPanel/SearchPanel";
import $ from "jquery";
import Navbar from "../../SharedComponent/NavBar/Navbar";
import axios from "axios";
import { environment } from "../../../environment";
import airports from "../../../JSON/airports.json";
import "./FlightPage.css";
import Loading from "../../Loading/Loading";
import Footer from "../../SharedComponent/Footer/Footer";
import useAuth from "../../../hooks/useAuth";
import moment from "moment";
import NoFlight from "../../NoFlight/NoFlight";
import layOverFilter from "../../SharedComponent/Utility/layOverFilter";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import SingleAirFilterItem from "./SingleAirFilterItem";

const FlightPage = ({
  fetchFlighData,
  originCode,
  destinationCode,
  fecthMulti,
  loading,
  airlineFilters,
  tripType,
  journeyDate,
}) => {
  const [toggle, setToggle] = useState({
    price: true,
    stops: true,
    airlines: true,
    schedule: true,
    layover: true,
    baggage: true,
  });
  const [filterData, setFilterData] = useState(0);
  var flightsData = [];
  let mainJson;
  let jsonData;
  if (String(tripType) === String("One Way")) {
    if (fetchFlighData !== null) {
      mainJson = fetchFlighData;
      jsonData = fetchFlighData.airSearchResponses;
    } else {
    }
  } else if (String(tripType) === String("Round Trip")) {
    if (fetchFlighData !== null) {
      mainJson = fetchFlighData;
      jsonData = fetchFlighData.airSearchResponses;
    } else {
    }
  } else if (String(tripType) === String("Multi City")) {
    if (fetchFlighData !== null) {
      mainJson = fetchFlighData;
      jsonData = fetchFlighData?.airSearchResponses;
    } else {
    }
  }

  // const [price, setPrice] = useState(
  //   mainJson?.minMaxPrice?.maxPrice === undefined
  //     ? 1000000
  //     : mainJson?.minMaxPrice?.maxPrice
  // );

  const [price, setPrice] = useState([
    mainJson?.minMaxPrice?.minPrice,
    mainJson?.minMaxPrice?.maxPrice,
  ]);
  // console.log(price);
  // setPrice(mainJson.minMaxPrice?.maxPrice);
  //price=mainJson.minMaxPrice?.maxPrice;
  const [name, setName] = useState([]);
  const [radioname, setRadioName] = useState(0);
  const [check, setCheck] = useState(true);
  // const handleInput = (e) => {
  //   setPrice(e.target.value);
  // };
  const [isAirlineChecked, setIsAirlineChecked] = useState(true);

  let dataPrice = [];

  if (parseInt(radioname) === 0 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10)
    );
  } else if (parseInt(radioname) === 1 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        item.directions[0][0].stops === mainJson?.stops[0]
    );
  } else if (parseInt(radioname) === 2 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        item.directions[0][0].stops === mainJson?.stops[1]
    );
  } else if (parseInt(radioname) === 3 && name.length === 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        item.directions[0][0].stops > 1
    );
  } else if (parseInt(radioname) === 0 && name.length > 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        name.some((category) => [item.platingCarrier].flat().includes(category))
    );
  } else if (parseInt(radioname) === 1 && name.length > 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        name.some((category) =>
          [item.platingCarrier].flat().includes(category)
        ) &&
        item.directions[0][0].stops === 0
    );
  } else if (parseInt(radioname) === 2 && name.length > 0) {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        name.some((category) =>
          [item.platingCarrier].flat().includes(category)
        ) &&
        item.directions[0][0].stops === 1
    );
  } else {
    dataPrice = jsonData?.filter(
      (item) =>
        parseInt(price[0], 10) <= parseInt(item.totalPrice) &&
        parseInt(item.totalPrice) <= parseInt(price[1], 10) &&
        name.some((category) =>
          [item.platingCarrier].flat().includes(category)
        ) &&
        item.directions[0][0].stops > 1
    );
  }

  let flightName = [];

  mainJson?.airlineFilters?.map((item) => {
    const obj = {
      name: item.airlineName,
      code: item.airlineCode,
      totalFlights: item.totalFlights,
      minPrice: item.minPrice,
    };
    flightName.push(obj);
  });

  const handleChange = (e) => {
    //  alert(name.length+", "+flightName.length);
    if (e.target.checked) {
      if (flightName.length - name.length === 1) {
        setCheck(true);
      } else {
        setCheck(false);
      }
      setName([...name, e.target.value]);
    } else {
      if (name.length <= flightName.length && name.length > 1) {
        setCheck(false);
      } else {
        setCheck(true);
      }
      setName(name.filter((id) => id !== e.target.value));
    }
  };

  // for radio button filter
  const radioflightName = [
    { name: "All Flights" },
    // { name: "Direct flight only" },
    // { name: "1 stop" },
    // { name: "2 stops or more" },
  ];

  let i = 0;
  mainJson?.stops?.map((item) => {
    if (item === 0) {
      const obj = {
        name: "Direct",
      };
      radioflightName.push(obj);
    }
    if (item === 1) {
      const obj = {
        name: "1 Stop",
      };
      radioflightName.push(obj);
    }
    if (item > 1) {
      if (i === 0) {
        const obj = {
          name: "2 or More Stops",
        };
        radioflightName.push(obj);
      }
      i++;
    }
  });

  const radiohandleChange = (e) => {
    setRadioName(e.target.value);
  };

  if (String(tripType) === String("One Way")) {
    flightsData = dataPrice;
  } else if (String(tripType) === String("Round Trip")) {
    flightsData = dataPrice;
  } else if (String(tripType) === String("Multi City")) {
    flightsData = dataPrice;
  }

  const toMilliSeconds = (ts) =>
    ts.split(` `).reduce((acc, cur, i) => {
      const num = parseInt(cur);
      const [isHour, isMinute] = [cur.endsWith(`h`), cur.endsWith(`m`)];
      return num * (isHour ? 3600 : isMinute ? 60 : 1) * 1000 + acc;
    }, 0);

  let totalDuration = 0;
  console.log(filterData);
  if (filterData === 1) {
    flightsData = flightsData?.sort((a, b) =>
      Number(a.totalPrice) < Number(b.totalPrice) ? 1 : -1
    );
  } else if (filterData === 2) {
    flightsData = flightsData?.sort((a, b) =>
      moment(
        a.directions[0][0].segments[a.directions[0][0].segments.length - 1]
          .arrival,
        "YYYY/MM/DD HH:mm:ss a"
      ).diff(
        moment(
          a.directions[0][0].segments[0].departure,
          "YYYY/MM/DD HH:mm:ss a"
        )
      ) >
      moment(
        b.directions[0][0].segments[b.directions[0][0].segments.length - 1]
          .arrival,
        "YYYY/MM/DD HH:mm:ss a"
      ).diff(
        moment(
          b.directions[0][0].segments[0].departure,
          "YYYY/MM/DD HH:mm:ss a"
        )
      )
        ? 1
        : -1
    );
    // a.directions[0][0].segments.map(item => totalDuration += toMilliSeconds(item.duration[0])) < b.directions[0][0].segments.map(item => totalDuration += toMilliSeconds(item.duration[0])) ? 1 : -1 );
    // toMilliSeconds(a.directions[0][0].segments[0].duration[0]) > toMilliSeconds(b.directions[0][0].segments[0].duration[0]) ? 1 : -1 );
  } else if (filterData === 3) {
    flightsData = flightsData?.sort((a, b) =>
      moment(
        a.directions[0][0].segments[0].departure,
        "YYYY/MM/DD HH:mm:ss a"
      ) >
      moment(b.directions[0][0].segments[0].departure, "YYYY/MM/DD HH:mm:ss a")
        ? 1
        : -1
    );
  }
  // const [reset,setReset] = useState(false);
  const resetFilterData = () => {
    setPrice([
      mainJson?.minMaxPrice?.minPrice,
      mainJson?.minMaxPrice?.maxPrice,
    ]);
    setRadioName(0);
    console.log(document.getElementById("flexCheckDefault0").click());
    // $("#flexCheckDefault0").prop("checked", true);
    // flightName.map((item, index) => {
    //   $("#checkDefault" + index).prop("checked", false);
    // });
    flightName.map((item, index) => {
      document.getElementById("checkDefault" + index).checked = false;
    });
    setFilterData(0);
    setName([]);
    // setReset(true);
    setCheck(true);
    setTimeSlotOne();
    setTimeSlotTwo();
    setdepartureCount();
    setTimeSlotOneA();
    setTimeSlotTwoA();
    setArrivalCount();
    setLayOver("");
    setLayOverCount();
  };

  useEffect(() => {
    // $(".slide-toggle").hide();
    // $(".search-again").click(function () {
    //   $(".slide-toggle").slideToggle("slow");
    // });

    $(".rotate").click(function () {
      $(this).toggleClass("down");
    });

    // airlines section toggle option
    $(document).ready(function () {
      $("#airclicksection").click(function () {
        $("#airlinessection").toggle();
      });
    });

    // schedule section toggle option
    $(document).ready(function () {
      $("#scheduleclicksection").click(function () {
        $(".schedulesection").toggle();
      });
    });

    // layover section toggle option
    $(document).ready(function () {
      $("#layoverclicksection").click(function () {
        $("#layoversection").toggle();
      });
    });

    // airlines section toggle option
    $(document).ready(function () {
      $("#baggclicksection").click(function () {
        $("#baggagesection").toggle();
      });
      $("#priceclicksection").click(function () {
        $("#pricesection").toggle();
      });
    });
  }, []);

  // stop section toggle option
  $("#stopclicksection").click(function () {
    $("#stopsection").toggle();
  });

  // const [departureTime,setDepartureTime] = useState(`${journeyDate} 00:05:59`);
  const [timeSlotOne, setTimeSlotOne] = useState();
  const [timeSlotTwo, setTimeSlotTwo] = useState();
  const [timeSlotOneA, setTimeSlotOneA] = useState();
  const [timeSlotTwoA, setTimeSlotTwoA] = useState();
  const [departureCount, setdepartureCount] = useState();
  const [arrivalCount, setArrivalCount] = useState();
  console.log(departureCount);

  var format = "hh:mm:ss";

  // var time = moment() gives you current time. no format required.
  // const fliterWithDepartTime = (item) => {
  //   var time = moment('09:34:00',format),
  //   beforeTime = moment(timeSlotOne, format),
  //   afterTime = moment(timeSlotTwo, format);

  // if (time.isBetween(beforeTime, afterTime)) {

  //   console.log('is between')

  // } else {

  //   console.log('is not between')

  // }
  // }
  if (timeSlotOne !== undefined && timeSlotTwo !== undefined) {
    flightsData = flightsData?.filter((item) => {
      if (
        moment(
          item.directions[0][0].segments[0].departure.slice(11, 19),
          format
        ).isBetween(moment(timeSlotOne, format), moment(timeSlotTwo, format))
      ) {
        return item;
      }
    });
  }

  if (timeSlotOneA !== undefined && timeSlotTwoA !== undefined) {
    flightsData = flightsData?.filter((item) => {
      if (
        moment(
          item.directions[1][0].segments[0].departure.slice(11, 19),
          format
        ).isBetween(moment(timeSlotOneA, format), moment(timeSlotTwoA, format))
      ) {
        return item;
      }
    });
  }

  const [layOver, setLayOver] = useState("");
  const [layOverCount, setLayOverCount] = useState();

  if (layOver !== "") {
    if (layOver >= 0 && layOver <= 5) {
      flightsData = flightsData?.filter((item) => {
        if (item.directions[0][0].segments.length > 1) {
          if (
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) >= 0 &&
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) <= 5
          ) {
            return item;
          }
        }
      });
    } else if (layOver > 5 && layOver <= 10) {
      flightsData = flightsData?.filter((item) => {
        if (item.directions[0][0].segments.length > 1) {
          if (
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) > 5 &&
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) <= 10
          ) {
            return item;
          }
        }
      });
    } else if (layOver > 10 && layOver <= 15) {
      flightsData = flightsData?.filter((item) => {
        if (item.directions[0][0].segments.length > 1) {
          if (
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) > 10 &&
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) <= 15
          ) {
            return item;
          }
        }
      });
    } else {
      flightsData = flightsData?.filter((item) => {
        if (item.directions[0][0].segments.length > 1) {
          if (
            layOverFilter(
              item.directions[0][0].segments[1]?.departure,
              item.directions[0][0].segments[0]?.arrival
            ) > 15
          ) {
            return item;
          }
        }
      });
    }
  }

  console.log(flightsData);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  //  const fliterWithDepartTime = (timeSlotOne, timeSlotTwo) => {
  //    console.log(timeSlotOne);
  //    console.log(timeSlotTwo);
  //    var data = flightsData.filter((item) => {
  //      if (
  //        moment(
  //          item.directions[0][0].segments[0].departure.slice(11, 19),
  //          format
  //        ).isBetween(moment(timeSlotOne, format), moment(timeSlotTwo, format))
  //      ) {
  //        return item;
  //      }
  //    });
  //    return data;
  //  };
  // console.log(
  //   flightsData?.filter(
  //     (item) =>{
  //       var time = moment(item.directions[0][0].segments[0].departure.slice(11,19),format),
  //       beforeTime = moment(timeSlotOne, format),
  //       afterTime = moment(timeSlotTwo, format);

  //     if (time.isBetween(beforeTime, afterTime)) {

  //       console.log(item.directions[0][0].segments[0].departure.slice(11,19) + "one")

  //     } else {

  //       console.log(item.directions[0][0].segments[0].departure.slice(11,19) + "two")

  //     }
  //     }
  //   )
  // );
  // console.log(
  //       moment('09:34:00').isBetween("06:00:00", "12:00:00")
  // );

  // console.log(timeSlotOne);
  // console.log(timeSlotTwo);
  // console.log(
  //   flightsData?.map(
  //     (item) =>
  //      console.log(moment(
  //       item.directions[0][0].segments[0].departure.slice(11,19),
  //       "hh:mm:ss"
  //     ))
  //   )
  // );

  const log = (v) => {
    console.log(v);
  };

  return (
    <div className="bg-color">
      {/* <ModifySearch></ModifySearch> */}
      {/* <img src={gif} alt=""/> */}
      <Loading loading={loading}></Loading>
      <div className="container pb-3 content-width">
        <div className="row ps-3">
          <div className="col-lg-3">
            <div className="row my-2">
              <div className="col-lg-12 text-start">
                <button
                  className="btn btn-sm rounded fw-bold"
                  onClick={() => resetFilterData()}
                  style={{ fontSize: "12px" }}
                >
                  <span className="pe-1">
                    <i class="fas fa-window-restore"></i>
                  </span>
                  Reset all filters
                </button>
              </div>
            </div>
            <div
              className="container rounded box-shadow bg-white"
              style={{
                height: "100%",
                position: "sticky",
                top: "9%",
                maxHeight: "100vh",
                overflowY: "auto",
              }}
            >
              <div className="row px-2">
                <div className="col-lg-6 mt-3">
                  {/* <h6 className="float-start text-color fw-bold">PRICE <span style={{ fontSize: "10px" }}>({price})</span></h6> */}
                  <h6 className="float-start text-color fw-bold">PRICE</h6>
                </div>
                <div
                  className="col-lg-6 mt-3"
                  onClick={() =>
                    toggle.price
                      ? setToggle({
                          ...toggle,
                          price: false,
                        })
                      : setToggle({
                          ...toggle,
                          price: true,
                        })
                  }
                >
                  <div className="text-end">
                    <span id="priceclicksection">
                      <i
                        className={
                          toggle.price
                            ? "fa fa-chevron-up rotate"
                            : "fa fa-chevron-up rotate down"
                        }
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3">
                {toggle.price ? (
                  <>
                    <div className="col-lg-12" id="pricesection">
                      <div className="my-2 px-2">
                        {/* <Slider range allowCross={false} defaultValue={[mainJson?.minMaxPrice?.minPrice, mainJson?.minMaxPrice?.maxPrice]} min={mainJson?.minMaxPrice?.minPrice} max={mainJson?.minMaxPrice?.maxPrice} onChange={log} /> */}
                        {/* <input
                          className="w-100"
                          type="range"
                          name="flexRadioDefault2"
                          value={price}
                          id="flexRadioDefault1"
                          onInput={handleInput}
                          min={mainJson?.minMaxPrice?.minPrice}
                          max={mainJson?.minMaxPrice?.maxPrice}
                        /> */}

                        {mainJson?.minMaxPrice && (
                          <Slider
                            allowCross={false}
                            style={{ width: "100%" }}
                            range
                            value={price}
                            min={mainJson?.minMaxPrice?.minPrice}
                            max={mainJson?.minMaxPrice?.maxPrice}
                            defaultValue={[
                              mainJson?.minMaxPrice?.minPrice,
                              mainJson?.minMaxPrice?.maxPrice,
                            ]}
                            onChange={(val) => setPrice(val)}
                            trackStyle={{ backgroundColor: "#2196f3" }}
                            handleStyle={{
                              borderColor: "#2196f3",
                              backgroundColor: "#2196f3",
                              opacity: 1,
                            }}
                          />
                        )}
                      </div>
                      <div>
                        <span
                          className="float-start"
                          style={{ fontSize: "12px" }}
                        >
                          Min BDT{" "}
                          <span className="fw-bold">
                            {/* {mainJson?.minMaxPrice?.minPrice} */}
                            {price[0]}
                          </span>
                        </span>
                        <span
                          className="float-end"
                          style={{ fontSize: "12px" }}
                        >
                          Max BDT{" "}
                          <span className="fw-bold">
                            {/* {mainJson?.minMaxPrice?.maxPrice} */}
                            {price[1]}
                          </span>
                        </span>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <hr className="m-0"></hr>
              {/* Stop section  */}
              <div className="row px-2">
                <div className="col-lg-6 mt-3">
                  <h6 className="float-start text-color fw-bold">STOPS</h6>
                </div>
                <div
                  className="col-lg-6 mt-3"
                  onClick={() =>
                    toggle.stops
                      ? setToggle({
                          ...toggle,
                          stops: false,
                        })
                      : setToggle({
                          ...toggle,
                          stops: true,
                        })
                  }
                >
                  <div className="text-end">
                    <span id="stopclicksection">
                      <i
                        className={
                          toggle.stops
                            ? "fa fa-chevron-up rotate"
                            : "fa fa-chevron-up rotate down"
                        }
                        aria-hidden="true"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
              <div className="row pb-3 px-2">
                {toggle.stops ? (
                  <>
                    <div className="col-lg-12" id="stopsection">
                      <div className="form-check mb-2">
                        {radioflightName.map((item, index) => (
                          <div key={index}>
                            <input
                              className="form-check-input"
                              type="radio"
                              name="name"
                              value={index}
                              id={"flexCheckDefault" + index}
                              onChange={radiohandleChange}
                              defaultChecked={index === 0}
                            />
                            <label
                              className="form-check-label float-start"
                              htmlFor="flexCheckDefault"
                            >
                              {item.name}
                            </label>
                            <br></br>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              <hr className="m-0"></hr>
              {/* End of stop section  */}

              {/* Airlines Section  */}
              <div>
                <div className="row px-2">
                  <div className="col-lg-6 mt-3">
                    <h6 className="float-start text-color fw-bold">AIRLINES</h6>
                  </div>
                  <div
                    className="col-lg-6 mt-3"
                    onClick={() =>
                      toggle.airlines
                        ? setToggle({
                            ...toggle,
                            airlines: false,
                          })
                        : setToggle({
                            ...toggle,
                            airlines: true,
                          })
                    }
                  >
                    <div className="text-end">
                      <span id="airclicksection">
                        <i
                          className={
                            toggle.airlines
                              ? "fa fa-chevron-up rotate"
                              : "fa fa-chevron-up rotate down"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row pb-3 px-2">
                  {toggle.airlines ? (
                    <>
                      <div className="col-lg-12" id="airlinessection">
                        <div className="form-check mb-2 ">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                            checked={check}
                          />
                          <label
                            className="form-check-label float-start fw-bold"
                            htmlFor="flexCheckDefault"
                            style={{ fontSize: "14px" }}
                          >
                            All Airline
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          {flightName.map((item, index) => (
                            <div key={index}>
                              <input
                                className="form-check-input"
                                type="checkbox"
                                value={item.code}
                                id={"checkDefault" + index}
                                onChange={handleChange}
                              />
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${item.code}.png`}
                                alt="airlineCode"
                                width="35px"
                                height="30px"
                              />
                              <label
                                className="form-check-label float-start"
                                htmlFor="flexCheckDefault"
                                title={item.name}
                                style={{ fontSize: "13px" }}
                              >
                                {item.code} ({item.totalFlights})
                              </label>{" "}
                              <span
                                className="float-end"
                                style={{ fontSize: "13px" }}
                              >
                                BDT {item.minPrice}
                              </span>
                              <br></br>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <hr className="m-0"></hr>
              {/* End of Airlines Section  */}

              {/* Schedule Section  */}
              <div>
                <div className="row px-2">
                  <div className="col-lg-6 mt-3">
                    <h6 className="float-start text-color fw-bold">SCHEDULE</h6>
                  </div>
                  <div
                    className="col-lg-6 mt-3"
                    onClick={() =>
                      toggle.schedule
                        ? setToggle({
                            ...toggle,
                            schedule: false,
                          })
                        : setToggle({
                            ...toggle,
                            schedule: true,
                          })
                    }
                  >
                    <div className="text-end">
                      <span id="scheduleclicksection">
                        <i
                          className={
                            toggle.schedule
                              ? "fa fa-chevron-up rotate"
                              : "fa fa-chevron-up rotate down"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>

                {toggle.schedule ? (
                  <>
                    <div
                      className={
                        tripType === "Round Trip" ? "row px-2" : "row pb-3 px-2"
                      }
                    >
                      <div className="col-lg-12 schedulesection">
                        <h6
                          className="float-start text-color fw-bold mt-2"
                          style={{ fontSize: "14px" }}
                        >
                          Onward Depart Time
                        </h6>
                        <br></br>
                        <div
                          class="time-duration my-1"
                          style={{
                            backgroundColor:
                              departureCount === 0 ? "#ebedef" : " ",
                          }}
                          onClick={
                            () => {
                              if (departureCount !== 0) {
                                setTimeSlotOne("00:00:00");
                                setTimeSlotTwo("05:59:00");
                                setdepartureCount(0);
                              } else {
                                setTimeSlotOne();
                                setTimeSlotTwo();
                                setdepartureCount();
                              }
                            }

                            // fliterWithDepartTime('00:00:00','05:59:00')
                          }
                        >
                          <i class="fas fa-cloud-sun"></i>{" "}
                          <span>00:00 - 05:59</span>
                        </div>
                        <div
                          class="time-duration my-1"
                          style={{
                            backgroundColor:
                              departureCount === 1 ? "#ebedef" : " ",
                          }}
                          onClick={
                            () => {
                              if (departureCount !== 1) {
                                setTimeSlotOne("06:00:00");
                                setTimeSlotTwo("11:59:00");
                                setdepartureCount(1);
                              } else {
                                setTimeSlotOne();
                                setTimeSlotTwo();
                                setdepartureCount();
                              }
                            }

                            // fliterWithDepartTime('06:00:00','11:59:00')
                          }
                        >
                          <i class="fas fa-sun"></i> <span> 06:00 - 11:59</span>
                        </div>
                        <div
                          class="time-duration my-1"
                          style={{
                            backgroundColor:
                              departureCount === 2 ? "#ebedef" : " ",
                          }}
                          onClick={
                            () => {
                              if (departureCount !== 1) {
                                setTimeSlotOne("12:00:00");
                                setTimeSlotTwo("17:59:00");
                                setdepartureCount(2);
                              } else {
                                setTimeSlotOne();
                                setTimeSlotTwo();
                                setdepartureCount();
                              }
                            }

                            // fliterWithDepartTime('12:00:00','17:59:00')
                          }
                        >
                          <i class="fas fa-cloud-sun"></i>{" "}
                          <span>12:00 - 17:59</span>
                        </div>
                        <div
                          class="time-duration my-1"
                          style={{
                            backgroundColor:
                              departureCount === 3 ? "#ebedef" : " ",
                          }}
                          onClick={
                            () => {
                              if (departureCount !== 3) {
                                setTimeSlotOne("18:00:00");
                                setTimeSlotTwo("23:59:00");
                                setdepartureCount(3);
                              } else {
                                setTimeSlotOne();
                                setTimeSlotTwo();
                                setdepartureCount();
                              }
                            }
                            // setTimeSlotOne('18:00:00');
                            // setTimeSlotTwo('23:59:00');
                            // fliterWithDepartTime('18:00:00','23:59:00')
                          }
                        >
                          <i class="fas fa-cloud-moon"></i>{" "}
                          <span>18:00 - 23:59</span>
                        </div>
                      </div>
                    </div>
                    {tripType === "Round Trip" ? (
                      <>
                        <div className="row pb-3 px-2">
                          <div className="col-lg-12 schedulesection">
                            <h6
                              className="float-start text-color fw-bold mt-2"
                              style={{ fontSize: "14px" }}
                            >
                              Return Depart Time
                            </h6>
                            <br></br>
                            <div
                              class="time-duration my-1"
                              style={{
                                backgroundColor:
                                  arrivalCount === 0 ? "#ebedef" : " ",
                              }}
                              onClick={() => {
                                if (arrivalCount !== 0) {
                                  setTimeSlotOneA("00:00:00");
                                  setTimeSlotTwoA("05:59:00");
                                  setArrivalCount(0);
                                } else {
                                  setTimeSlotOneA();
                                  setTimeSlotTwoA();
                                  setArrivalCount();
                                }
                              }}
                            >
                              <i class="fas fa-cloud-sun"></i>{" "}
                              <span>00:00 - 05:59</span>
                            </div>
                            <div
                              class="time-duration my-1"
                              style={{
                                backgroundColor:
                                  arrivalCount === 1 ? "#ebedef" : " ",
                              }}
                              onClick={() => {
                                if (arrivalCount !== 1) {
                                  setTimeSlotOneA("06:00:00");
                                  setTimeSlotTwoA("11:59:00");
                                  setArrivalCount(1);
                                } else {
                                  setTimeSlotOneA();
                                  setTimeSlotTwoA();
                                  setArrivalCount();
                                }
                              }}
                            >
                              <i class="fas fa-sun"></i>{" "}
                              <span> 06:00 - 11:59</span>
                            </div>
                            <div
                              class="time-duration my-1"
                              style={{
                                backgroundColor:
                                  arrivalCount === 2 ? "#ebedef" : " ",
                              }}
                              onClick={() => {
                                if (arrivalCount !== 2) {
                                  setTimeSlotOneA("12:00:00");
                                  setTimeSlotTwoA("17:59:00");
                                  setArrivalCount(2);
                                } else {
                                  setTimeSlotOneA();
                                  setTimeSlotTwoA();
                                  setArrivalCount();
                                }
                              }}
                            >
                              <i class="fas fa-cloud-sun"></i>{" "}
                              <span>12:00 - 17:59</span>
                            </div>
                            <div
                              class="time-duration my-1"
                              style={{
                                backgroundColor:
                                  arrivalCount === 3 ? "#ebedef" : " ",
                              }}
                              onClick={() => {
                                if (arrivalCount !== 3) {
                                  setTimeSlotOneA("18:00:00");
                                  setTimeSlotTwoA("23:59:00");
                                  setArrivalCount(3);
                                } else {
                                  setTimeSlotOneA();
                                  setTimeSlotTwoA();
                                  setArrivalCount();
                                }
                              }}
                            >
                              <i class="fas fa-cloud-moon"></i>{" "}
                              <span>18:00 - 23:59</span>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                ) : (
                  <></>
                )}
              </div>
              <hr
                className={tripType === "Round Trip" ? "m-0 mt-3" : "m-0 mt-3"}
              ></hr>
              {/* End of Schedule Section  */}

              {/* Layover Section  */}
              <div>
                <div className="row px-2">
                  <div className="col-lg-6 mt-3">
                    <h6 className="float-start text-color fw-bold">
                      LAYOVER TIME
                    </h6>
                  </div>
                  <div
                    className="col-lg-6 mt-3"
                    onClick={() =>
                      toggle.layover
                        ? setToggle({
                            ...toggle,
                            layover: false,
                          })
                        : setToggle({
                            ...toggle,
                            layover: true,
                          })
                    }
                  >
                    <div className="text-end">
                      <span id="layoverclicksection">
                        <i
                          className={
                            toggle.layover
                              ? "fa fa-chevron-up rotate"
                              : "fa fa-chevron-up rotate down"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="row pb-3 px-2">
                  {toggle.layover ? (
                    <>
                      <div className="col-lg-12" id="layoversection">
                        <div className="d-flex">
                          <div
                            class="time-duration me-1 my-1"
                            style={{
                              backgroundColor:
                                layOverCount === 0 ? "#ebedef" : " ",
                            }}
                            onClick={() => {
                              if (layOverCount === 0) {
                                setLayOver("");
                                setLayOverCount(null);
                              } else {
                                setLayOver(5);
                                setLayOverCount(0);
                              }
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>0h-5h</span>
                          </div>
                          <div
                            class="time-duration me-1 my-1"
                            style={{
                              backgroundColor:
                                layOverCount === 1 ? "#ebedef" : " ",
                            }}
                            onClick={() => {
                              if (layOverCount === 0) {
                                setLayOver("");
                                setLayOverCount(null);
                              } else {
                                setLayOver(10);
                                setLayOverCount(1);
                              }
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>5h-10h</span>
                          </div>
                          <div
                            class="time-duration me-1 my-1"
                            style={{
                              backgroundColor:
                                layOverCount === 2 ? "#ebedef" : " ",
                            }}
                            onClick={() => {
                              if (layOverCount === 0) {
                                setLayOver("");
                                setLayOverCount(null);
                              } else {
                                setLayOver(15);
                                setLayOverCount(2);
                              }
                            }}
                          >
                            <span style={{ fontSize: "14px" }}>10h-15h</span>
                          </div>
                          <div
                            class="time-duration me-1 my-1"
                            style={{
                              backgroundColor:
                                layOverCount === 3 ? "#ebedef" : " ",
                            }}
                            onClick={() => {
                              if (layOverCount === 0) {
                                setLayOver("");
                                setLayOverCount(null);
                              } else {
                                setLayOver(16);
                                setLayOverCount(3);
                              }
                            }}
                          >
                            <span style={{ fontSize: "12px" }}>15h+</span>
                          </div>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
              <hr className="m-0"></hr>
              {/* End of Layover Section  */}

              {/* Baggage section  */}
              <div>
                <div className="row px-2">
                  <div className="col-lg-6 mt-3">
                    <h6 className="float-start text-color fw-bold">BAGGAGE</h6>
                  </div>
                  <div
                    className="col-lg-6 mt-3"
                    onClick={() =>
                      toggle.baggage
                        ? setToggle({
                            ...toggle,
                            baggage: false,
                          })
                        : setToggle({
                            ...toggle,
                            baggage: true,
                          })
                    }
                  >
                    <div className="text-end">
                      <span id="baggclicksection">
                        <i
                          className={
                            toggle.baggage
                              ? "fa fa-chevron-up rotate"
                              : "fa fa-chevron-up rotate down"
                          }
                          aria-hidden="true"
                        ></i>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="row pb-3 px-2">
                  {toggle.baggage ? (
                    <>
                      <div className="col-lg-12" id="baggagesection">
                        <div className="form-check mb-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault2"
                            id="flexRadioDefault1"
                            defaultChecked
                          />
                          <label
                            className="form-check-label float-start"
                            htmlFor="flexRadioDefault2"
                          >
                            All baggage options
                          </label>
                        </div>
                        <div className="form-check mt-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault2"
                            id="flexRadioDefault1"
                          />
                          <label
                            className="form-check-label float-start"
                            htmlFor="flexRadioDefault2"
                          >
                            Checked baggage included
                          </label>
                        </div>
                      </div>
                    </>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-9">
            {/* {console.log(flightRes)} */}
            <div className="row my-2">
              <div className="col-lg-12 text-end">
                <div class="dropdown me-3">
                  <button
                    class="btn dropdown-toggle btn-sm rounded"
                    type="button"
                    id="dropdownMenuButton1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <span style={{ fontSize: "12px" }}>
                      Sort by:{" "}
                      <span className="fw-bold">
                        {filterData === 0
                          ? "Cheapest"
                          : filterData === 2
                          ? "Fastest"
                          : "Earliest"}
                      </span>
                    </span>
                  </button>
                  <ul
                    class="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton1"
                  >
                    <li
                      onClick={() => setFilterData(0)}
                      className="dropdown-item"
                      style={{ fontSize: "12px" }}
                    >
                      Cheapest{" "}
                      {filterData === 0 ? (
                        <span className="float-end">
                          <i class="fas fa-check"></i>
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                    <li
                      onClick={() => setFilterData(2)}
                      className="dropdown-item"
                      style={{ fontSize: "12px" }}
                    >
                      Fastest{" "}
                      {filterData === 2 ? (
                        <span className="float-end">
                          <i class="fas fa-check"></i>
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                    <li
                      onClick={() => setFilterData(3)}
                      className="dropdown-item"
                      style={{ fontSize: "12px" }}
                    >
                      Earliest{" "}
                      {filterData === 3 ? (
                        <span className="float-end">
                          <i class="fas fa-check"></i>
                        </span>
                      ) : (
                        ""
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row mx-3 mb-3">
              <div className="col-lg-12 float-start p-0">
                <div>
                  <Carousel responsive={responsive}>
                    {flightName.map((item, index) => (
                      <SingleAirFilterItem
                        item={item}
                        index={index}
                        handleChange={handleChange}
                        isAirlineChecked={isAirlineChecked}
                        setIsAirlineChecked={() => isAirlineChecked}
                        airlinesChecked={name}
                      />
                    ))}
                  </Carousel>
                </div>
              </div>
            </div>

            {flightsData !== null &&
            flightsData !== undefined &&
            flightsData.length > 0 ? (
              <>
                {flightsData?.map((data, index) => (
                  <ShowFlight
                    key={index}
                    flightType={tripType}
                    index={index}
                    data={data}
                  ></ShowFlight>
                ))}
              </>
            ) : (
              <>
                <NoFlight></NoFlight>
              </>
            )}

            {/* {
              loading ? <><img src={gif} alt="" /></> : <></>
            }
            {
              flightsData?.length === 0 ? <><p>{flightsData.length} data found</p></> : flightsData?.map((data, index) => 
              <ShowFlight
              loading={loading}
              key={index}
              flightType={filterParam.flightType}
              index={index}
              data={data}
            ></ShowFlight>
            )
            } */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightPage;
