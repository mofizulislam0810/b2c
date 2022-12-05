import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import Fuse from "fuse.js";
import airports from "../../JSON/airports.json";
import "./SearchPanel.css";
import "../../plugins/t-datepicker.min";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { produce } from "immer";
import axios from "axios";
import { environment } from "../../environment";

// [
//   { name: "one", id: 1 },
//   { name: "two", id: 2 },
//   { name: "three", id: 3 },
// ]

const SearchPanel = (props) => {
  const filterParam = JSON.parse(sessionStorage.getItem("Database"));
  const [tripType, setTripType] = useState(
    filterParam !== null ? filterParam.tripTypeModify : "Round Trip"
  );
  const [travel, setTravel] = useState(
    filterParam !== null ? filterParam.travelClass : "Economy"
  );
  const [adultCount, setAdultCount] = useState(
    filterParam !== null ? filterParam.qtyList.Adult : 1
  ); //1
  const [childCount, setChildCount] = useState(
    filterParam !== null ? filterParam.qtyList.Children : 0
  ); //0
  let [infantCount, setInfantCount] = useState(
    filterParam !== null ? filterParam.qtyList.Infant : 0
  ); //0
  const totalPassenger = adultCount + childCount;
  const formCount = 0;
  const navigate = useNavigate();
  const originRef = useRef();
  const destinationRef = useRef();
  const originRef1 = useRef();
  const destinationRef1 = useRef();
  const originRef2 = useRef();
  const destinationRef2 = useRef();
  const originRef3 = useRef();
  const destinationRef3 = useRef();
  const originRef4 = useRef();
  const destinationRef4 = useRef();
  const originRef5 = useRef();
  const destinationRef5 = useRef();
  // const preAirlineRef = useRef();

  let cIndex = 1;
  const handleFlightOptionP = (index) => {
    if (cIndex < 5) {
      cIndex += 1;
      if (cIndex >= 2) {
        document.getElementById("btnm-1").style.display = "";
      }
      document.getElementById("multiCity" + cIndex).style.display = "";
    }
  };
  const handleFlightOptionM = (index) => {
    cIndex -= 1;
    if (cIndex < 2) {
      document.getElementById("btnm-1").style.display = "none";
    }
    document.getElementById("multiCity" + (cIndex + 1)).style.display = "none";
    if (cIndex === 1) {
      originRef2.current.value = "";
      destinationRef2.current.value = "";
      $(".class_2").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 2) {
      originRef3.current.value = "";
      destinationRef3.current.value = "";
      $(".class_3").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 3) {
      originRef4.current.value = "";
      destinationRef4.current.value = "";
      $(".class_4").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 4) {
      originRef5.current.value = "";
      destinationRef5.current.value = "";
      $(".class_5").tDatePicker({
        autoClose: true,
      });
    }
  };

  const [selectedVisa, setSelectedVisa] = useState(9);
  const handleVisaSearch = (e) => {
    e.preventDefault();
    navigate({ pathname: "/visainfo", search: `?country=${selectedVisa}` });
  };

  const handleSearchFlight = (e) => {
    if (String(tripType) === "Multi City") {
      const origin = originRef.current.value;
      const destination = destinationRef.current.value;
      const origin1 = originRef1.current.value;
      const destination1 = destinationRef1?.current.value;
      const origin2 = originRef2.current.value;
      const destination2 = destinationRef2.current.value;
      const origin3 = originRef3.current.value;
      const destination3 = destinationRef3.current.value;
      const origin4 = originRef4.current.value;
      const destination4 = destinationRef4.current.value;
      const origin5 = originRef5.current.value;
      const destination5 = destinationRef5.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const returnDate = $("#returnDate").children("input").val();
      const inputDateMulti1 = $("#departureDate1").children("input").val();
      const inputDateMulti2 = $("#departureDate2").children("input").val();
      const inputDateMulti3 = $("#departureDate3").children("input").val();
      const inputDateMulti4 = $("#departureDate4").children("input").val();
      const inputDateMulti5 = $("#departureDate5").children("input").val();
      console.log(journeyDate);
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const searchData = {
        origin: origin,
        destination: destination,
        origin1: origin1,
        destination1: destination1,
        origin2: origin2,
        destination2: destination2,
        origin3: origin3,
        destination3: destination3,
        origin4: origin4,
        destination4: destination4,
        origin5: origin5,
        destination5: destination5,
        journeyDate: journeyDate,
        returnDate: returnDate,
        inputDateMulti1: inputDateMulti1,
        inputDateMulti2: inputDateMulti2,
        inputDateMulti3: inputDateMulti3,
        inputDateMulti4: inputDateMulti4,
        inputDateMulti5: inputDateMulti5,
        tripTypeModify: tripType,
        qtyList: qtyList,
        travelClass: travel,
        childAgeList: childAge,
      };
      sessionStorage.setItem("Database", JSON.stringify(searchData));
      navigate("/flightsearch", {
        state: {
          origin: origin,
          destination: destination,
          origin1: origin1,
          destination1: destination1,
          origin2: origin2,
          destination2: destination2,
          origin3: origin3,
          destination3: destination3,
          origin4: origin4,
          destination4: destination4,
          origin5: origin5,
          destination5: destination5,
          journeyDate: journeyDate,
          returnDate: returnDate,
          inputDateMulti1: inputDateMulti1,
          inputDateMulti2: inputDateMulti2,
          inputDateMulti3: inputDateMulti3,
          inputDateMulti4: inputDateMulti4,
          inputDateMulti5: inputDateMulti5,
          tripTypeModify: tripType,
          qtyList: qtyList,
          travelClass: travel,
          formCount: formCount,
          childAgeList: childAge,
        },
      });
    } else {
      const origin = originRef.current.value;
      const destination = destinationRef.current.value;
      // const airlines  = preAirlineRef.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const returnDate = $("#returnDate").children("input").val();
      console.log(journeyDate);
      if (origin === destination) {
        toast.error("Origin and Destination must be diffarent");
      } else {
        if (String(journeyDate) !== String(null)) {
          const qtyList = {
            Adult: adultCount,
            Children: childCount,
            Infant: infantCount,
          };
          console.log(qtyList);
          const searchData = {
            origin: origin,
            destination: destination,
            journeyDate: journeyDate,
            returnDate: returnDate,
            tripTypeModify: tripType,
            qtyList: qtyList,
            travelClass: travel,
            childAgeList: childAge,
          };
          sessionStorage.setItem("Database", JSON.stringify(searchData));
          navigate("/flightsearch", {
            state: {
              origin: origin,
              destination: destination,
              journeyDate: journeyDate,
              returnDate: returnDate,
              tripTypeModify: tripType,
              qtyList: qtyList,
              travelClass: travel,
              airlines: preAirlines,
              childAgeList: childAge,
            },
          });
        } else {
          toast.error("Please select date");
        }
      }
    }
    e.preventDefault();
  };
  useEffect(() => {
    $("#txtFrom").val(
      filterParam !== null ? filterParam.origin : originRef.current.value
    );
    $("#txtTo").val(
      filterParam !== null
        ? filterParam.destination
        : destinationRef.current.value
    );
    $(".class_0").tDatePicker({});
    $(".class_1").tDatePicker({});
    $(".class_2").tDatePicker({});
    $(".class_3").tDatePicker({});
    $(".class_4").tDatePicker({});
    $(".class_5").tDatePicker({});

    $(".t-date-check-in").html(
      "<label class='t-date-info-title' style='font-size: 14px;font-weight: 400'><span class='me-1 text-danger'><i class='fa fa-calendar'></i></span><span>Departing</span></label>"
    );
    $(".t-date-check-out").html(
      "<label class='t-date-info-title' style='font-size: 14px;font-weight: 400'><span class='me-1 text-danger'><i class='fa fa-calendar'></i></span><span style='font-size: 15px'>Returning</span></label>"
    );
    // $(document).ready(function(){
    //   $(".t-dates").prepend("<label className='form-check-label'>Departing</label>");
    //   $(".t-check-out").prepend("<label className='form-check-label'>Returning</label>");
    // })
    $("#departureDate").attr("class", "t-check-in");
    $("#returnDate").hide();
    $("#returnLavel").hide();

    if (tripType === "Round Trip") {
      $(document).ready(function () {
        $(".class_0").tDatePicker("update", [
          filterParam !== null ? filterParam.journeyDate : new Date(),
          filterParam !== null ? filterParam.returnDate : new Date(),
        ]);
      });
    } else {
      $(document).ready(function () {
        $(".class_0").tDatePicker("update", [
          filterParam !== null ? filterParam.journeyDate : new Date(),
        ]);
      });
    }

    // for passenger count
    $("#passengerBlock").on({
      click: function (e) {
        e.preventDefault();
      },
    });

    // date picker check for triptype
    if (String(tripType) === String("One Way")) {
      $("#departureDate").attr("class", "t-check-in t-picker-only");
    } else if (String(tripType) === String("Round Trip")) {
      $("#departureDate").attr("class", "t-check-in");
      $("#returnDate").show();
      $("#returnLavel").show();
    } else {
      $("#departureDate").attr("class", "t-check-in t-picker-only");
    }

    // airport autoComplete
    var options = {
      shouldSort: true,
      threshold: 0.4,
      maxPatternLength: 32,
      keys: [
        {
          name: "iata",
          weight: 0.5,
        },
        {
          name: "name",
          weight: 0.3,
        },
      ],
    };

    // var fuse = new Fuse(airports, options)

    $(".autocomplete").each(function () {
      var ac = $(this);

      ac.on("click", function (e) {
        e.stopPropagation();
      })
        .on("focus keyup", search)
        .on("keydown", onKeyDown);

      var wrap = $("<div>")
        .addClass("autocomplete-wrapper")
        .insertBefore(ac)
        .append(ac);

      var list = $("<div>")
        .addClass("autocomplete-results")
        .on("click", ".autocomplete-result", function (e) {
          e.preventDefault();
          e.stopPropagation();
          selectIndex($(this).data("index"), ac);
        })
        .appendTo(wrap);
    });

    $(document)
      .on("mouseover", ".autocomplete-result", function (e) {
        var index = parseInt($(this).data("index"), 10);
        if (!isNaN(index)) {
          $(this).attr("data-highlight", index);
        }
      })
      .on("click", clearResults);

    function clearResults() {
      results = [];
      numResults = 0;
      $(".autocomplete-results").empty();
    }

    function selectIndex(index, autoinput) {
      if (results.length >= index + 1) {
        autoinput.val(
          results[index].city +
            " - " +
            results[index].country +
            ", " +
            results[index].name
        );
        clearResults();
      }
    }

    var results = [];
    var numResults = 0;
    var selectedIndex = -1;

    function search(e) {
      if (e.which === 38 || e.which === 13 || e.which === 40) {
        return;
      }
      var ac = $(e.target);
      var list = ac.next();
      if (ac.val().length > 0) {
        var fuse = new Fuse(airports, options);
        results = fuse
          .search(ac.val(), { limit: 6 })
          .map((result) => result.item);
        numResults = results.length;

        var divs = results.map(function (r, i) {
          return (
            '<div class="autocomplete-result text-start" data-index="' +
            i +
            '">' +
            '<label style="display:none">' +
            r.iata +
            " - " +
            r.country +
            ", " +
            r.name +
            '</label><div> <span class="text-danger me-1"><i class="fas fa-plane-departure"></i></span> <b>' +
            r.city +
            "</b> - " +
            r.country +
            ", " +
            r.name +
            '<span class="autocomplete-location ps-2">(' +
            r.iata +
            ")</span>" +
            "</div>" +
            "</div>"
          );
        });

        selectedIndex = -1;
        list.html(divs.join("")).attr("data-highlight", selectedIndex);
      } else {
        numResults = 0;
        list.empty();
      }
    }

    function onKeyDown(e) {
      var ac = $(e.currentTarget);
      var list = ac.next();
      switch (e.which) {
        case 38: // up
          selectedIndex--;
          if (selectedIndex <= -1) {
            selectedIndex = -1;
          }
          list.attr("data-highlight", selectedIndex);
          break;
        case 13: // enter
          selectIndex(selectedIndex, ac);
          break;
        case 9: // enter
          selectIndex(selectedIndex, ac);
          e.stopPropagation();
          return;
        case 40: // down
          selectedIndex++;
          if (selectedIndex >= numResults) {
            selectedIndex = numResults - 1;
          }
          list.attr("data-highlight", selectedIndex);
          break;

        default:
          return; // exit this handler for other keys
      }
      e.stopPropagation();
      e.preventDefault(); // prevent the default action (scroll / move caret)
    }
  }, [tripType]);

  useEffect(() => {
    $(".swap").click(function () {
      //Swaps previous and next address values
      var prevAddress = $(this).parent().prev(".forms").find(".address input");
      var nextAddress = $(this).parent().next(".forms").find(".address input");

      var tmp = prevAddress.val();
      prevAddress.val(nextAddress.val());
      nextAddress.val(tmp);
    });
  }, []);

  const [preAirlines, setPreAirlines] = useState();

  const handleChange = (e) => {
    const re = /^[a-zA-Z,]*$/;
    let text = e.target.value;
    if (re.test(text)) {
      setPreAirlines(text);
    } else {
    }
  };

  // console.log(preAirlines);

  const [childAge, setChildAge] = useState(
    filterParam !== null ? filterParam.childAgeList : []
  );
  const addNewChild = (child) => {
    setChildCount(child + 1);
    setChildAge([...childAge, { age: "" }]);
    // if(childAge.length < 9){
    // }
  };

  const handleChildAge = (e, index) => {
    let age = childAge;
    age[index][e.target.name] = e.target.value;
    setChildAge(age);
  };

  // console.log(childAge);

  const clickOnDelete = (child) => {
    setChildCount(child - 1);
    const lastIndex = childAge.length - 1;
    // this.setState({ items: items.filter((item, index) => index !== lastIndex) });
    setChildAge(childAge.filter((r, index) => index !== lastIndex));
  };

  const [countries, setCountries] = useState();
  useEffect(() => {
    axios
      .get(`http://172.17.17.103:81/api/Dropdown/visa-details/`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  return (
    <>
      <div id="form-bg" style={{ minHeight: "270px" }}>
        <ToastContainer />
        {/* FLIGHT TAB */}
        <form
          onSubmit={handleSearchFlight}
          style={{ display: props.tab === "FLIGHT" ? "block" : "none" }}
        >
          <div className="row">
            <div className="col-lg-12 pb-3">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input me-1 radio-type"
                  type="radio"
                  name="inlineRadioOptions"
                  id="option1"
                  checked={tripType === "One Way"}
                  value="One Way"
                  onClick={() => setTripType("One Way")}
                />
                <label
                  className="form-check-label text-white fs-6 me-2"
                  htmlFor="option1"
                >
                  One Way
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input me-1 radio-type"
                  defaultChecked="checked"
                  type="radio"
                  name="inlineRadioOptions"
                  id="option2"
                  checked={tripType === "Round Trip"}
                  value="Round Trip"
                  onClick={() => setTripType("Round Trip")}
                />
                <label
                  className="form-check-label text-white fs-6 me-2"
                  htmlFor="option2"
                >
                  Round Trip
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input me-1 radio-type"
                  type="radio"
                  name="inlineRadioOptions"
                  id="option3"
                  checked={tripType === "Multi City"}
                  value="Multi City"
                  onClick={() => setTripType("Multi City")}
                />
                <label
                  className="form-check-label text-white fs-6 me-2"
                  htmlFor="option3"
                >
                  Multi City
                </label>
              </div>
            </div>
          </div>
          <div className="row pt-3">
            <div
              className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1 position-relative"
              style={{ paddingRight: "0px" }}
            >
              <div className="row ">
                <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                  <div className="address">
                    <input
                      type="text"
                      ref={originRef}
                      className="form-control input-field text-input-from autocomplete rounded"
                      placeholder="Depart From"
                      required
                      autoComplete="off"
                      id="txtFrom"
                    />
                  </div>
                </div>
                <div className="swap">
                  <label className="swap">
                    <span className="icon text-danger">
                      <i className="fas fa-exchange-alt fa-rotate-90"></i>
                    </span>
                  </label>
                </div>
                <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                  <div className="address">
                    <input
                      type="text"
                      ref={destinationRef}
                      className="form-control input-field text-input-to autocomplete rounded"
                      placeholder="Going To"
                      required
                      autoComplete="off"
                      id="txtTo"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1 ">
              <div className="t-datepicker class_0 bg-light rounded">
                <div
                  className="t-check-in"
                  id="departureDate"
                  style={{ minHeight: "100%", borderRight: "1px solid gray" }}
                ></div>
                <div className="t-check-out" id="returnDate"></div>
              </div>
            </div>
            <div className="col-lg-2 col-md-3 col-sm-12 col-12 mb-1">
              <div className="row mb-1 rounded">
                <div className="col-lg-12 px-0">
                  <button
                    className="form-select inputgroup"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      height: "50px",
                      border: "0",
                      width: "210px",
                      textAlign: "left",
                      boxShadow: "none",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <span id="valClass">
                      <span className="me-2 text-danger">
                        <i className="fas fa-couch"></i>
                      </span>
                      {travel}
                    </span>
                  </button>
                  <ul
                    id="classList"
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <li
                      className="dropdown-item dropdown-item-selected"
                      onClick={() => setTravel("Economy")}
                      style={{ cursor: "pointer" }}
                    >
                      Economy
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setTravel("Business")}
                      style={{ cursor: "pointer" }}
                    >
                      Business
                    </li>
                    <li
                      className="dropdown-item"
                      onClick={() => setTravel("First")}
                      style={{ cursor: "pointer" }}
                    >
                      First
                    </li>
                    {/* <li
                      className="dropdown-item"
                      onClick={() => setTravel("Any Cabin")}
                      style={{ cursor: "pointer" }}
                    >
                      Any Cabin
                    </li> */}
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-12 px-0">
                  <button
                    className="form-select inputgroup "
                    type="button"
                    id="dropdownMenuButtonpassenger"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    data-bs-auto-close="outside"
                    style={{
                      height: "50px",
                      border: "0",
                      width: "210px",
                      textAlign: "left",
                      boxShadow: "none",
                      borderRadius: "0.25rem",
                    }}
                  >
                    <span id="adultval">
                      <span className="me-2 text-danger">
                        <i className="fas fa-users"></i>
                      </span>
                      <span id="valPerson">
                        Passenger {adultCount + childCount + infantCount}
                      </span>
                    </span>
                  </button>
                  <div
                    id="passengerBlock"
                    className="dropdown-menu passenger-pack"
                    aria-labelledby="dropdownMenuButtonpassenger"
                  >
                    <div>
                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <div style={{ fontSize: "15px" }}>
                            <i
                              className="fas fa-male align-self-center d-none"
                              style={{ color: "#222" }}
                              aria-hidden="true"
                            ></i>
                            Adults
                          </div>
                          <div
                            className="adult text-secondary"
                            style={{ fontSize: "10px" }}
                          >
                            <span>12 years & above</span>
                          </div>
                        </div>
                        <div className="number-input text-center">
                          <button
                            className="round-btn"
                            title="adultminus"
                            onClick={
                              infantCount > 0 && adultCount === infantCount
                                ? () => {
                                    setAdultCount(adultCount - 1);
                                    setInfantCount(infantCount - 1);
                                  }
                                : () => setAdultCount(adultCount - 1)
                            }
                            disabled={adultCount === 1 ? true : false}
                          >
                            <span className="text-white">
                              <i className="fas fa-minus"></i>
                            </span>
                          </button>
                          <input
                            readOnly
                            value={adultCount}
                            type="text"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                          <button
                            className="round-btn"
                            title="adultplus"
                            onClick={() => setAdultCount(adultCount + 1)}
                            disabled={totalPassenger === 9 ? true : false}
                          >
                            <span className="text-white">
                              <i className="fas fa-plus"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                      <div className="d-flex justify-content-between mb-2">
                        <div>
                          <div style={{ fontSize: "15px" }}>
                            <i
                              className="fas fa-child align-self-center d-none"
                              style={{ color: "#222" }}
                              aria-hidden="true"
                            ></i>
                            Children
                            {/* <p style={{fontSize:"10px"}}>2-12 years</p> */}
                          </div>
                          <div
                            className="adult text-secondary"
                            style={{ fontSize: "10px" }}
                          >
                            <span>2-11 years on travel date</span>
                          </div>
                        </div>
                        <div className="number-input text-center">
                          <button
                            className="round-btn"
                            title="adultminus"
                            onClick={
                              () => clickOnDelete(childCount)
                              // setChildCount(childCount - 1)
                            }
                            disabled={childCount === 0 ? true : false}
                          >
                            <span className="text-white">
                              <i className="fas fa-minus"></i>
                            </span>
                          </button>
                          <input
                            readOnly
                            value={childCount}
                            type="text"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />
                          <button
                            className="round-btn"
                            title="adultplus"
                            onClick={
                              () => addNewChild(childCount)
                              // setChildCount(childCount + 1)
                            }
                            disabled={totalPassenger === 9 ? true : false}
                          >
                            <span className="text-white">
                              <i className="fas fa-plus"></i>
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="row mb-2">
                        <div className="col-lg-12">
                          <span className="d-flex flex-wrap w-100">
                            {" "}
                            {childAge.map((val, index) => {
                              let agenum = `age-${index}`;
                              return (
                                <span className="col-lg-4">
                                  <label
                                    htmlFor="formGroupExampleInput"
                                    className="form-label"
                                  >
                                    <div
                                      className="adult text-secondary"
                                      style={{ fontSize: "10px" }}
                                    >
                                      <span>Child {index + 1} Age</span>
                                    </div>
                                  </label>
                                  <select
                                    name="age"
                                    className="form-select rounded"
                                    style={{ width: "97%" }}
                                    onChange={(e) => {
                                      const date = e.target.value;
                                      setChildAge((ob) =>
                                        produce(ob, (v) => {
                                          v[index].age = date;
                                        })
                                      );
                                    }}
                                    // value={p.date}
                                    value={val.age}
                                    // onChange={(e) => handleChildAge(e, index)}
                                    required
                                  >
                                    <option hidden></option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                    <option value={6}>6</option>
                                    <option value={7}>7</option>
                                    <option value={8}>8</option>
                                    <option value={9}>9</option>
                                    <option value={10}>10</option>
                                    <option value={11}>11</option>
                                  </select>

                                  {/* <input
                                    type="number"
                                    value={val.agenum}
                                    name="age"
                                    className="form-control me-1"
                                    style={{ width: "60px" }}
                                    min="2"
                                    max="12"
                                    onChange={(e) => handleChildAge(e, index)}
                                    required
                                  /> */}
                                </span>
                              );
                            })}
                          </span>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <div style={{ fontSize: "15px" }}>
                            <i
                              className="fas fa-baby align-self-center d-none"
                              style={{ color: "#222" }}
                              aria-hidden="true"
                            ></i>
                            Infants
                            {/* <p style={{fontSize:"10px"}}> &#62;  2 years</p> */}
                          </div>
                          <div
                            className="adult text-secondary"
                            style={{ fontSize: "10px" }}
                          >
                            0-23 months on travel date
                          </div>
                        </div>
                        <div className="number-input text-center">
                          <button
                            className="round-btn"
                            title="adultminus"
                            onClick={() => setInfantCount(infantCount - 1)}
                            disabled={infantCount === 0 ? true : false}
                          >
                            <span className="text-white">
                              <i className="fas fa-minus"></i>
                            </span>
                          </button>
                          <input
                            readOnly
                            value={infantCount}
                            type="text"
                            style={{
                              width: "30px",
                              height: "30px",
                            }}
                          />

                          <button
                            className="round-btn"
                            title="adultplus"
                            onClick={
                              infantCount < adultCount
                                ? () => setInfantCount(infantCount + 1)
                                : () => {}
                            }
                            disabled={infantCount === 9 ? true : false}
                          >
                            <span className="text-white">
                              <i className="fas fa-plus"></i>
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-1 col-sm-12 col-12">
              <button
                type="submit"
                className="btn btn-primary fw-bold fs-5 search-button w-100 rounded"
              >
                <span className="me-2">
                  <i className="fas fa-search"></i>
                </span>
                Search
              </button>
            </div>
          </div>
          {tripType === "Multi City" ? (
            <>
              <div className="row " id="multiCity1">
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1 position-relative"
                  style={{ paddingRight: "0px" }}
                >
                  <div className="row">
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          className="form-control input-field text-input-from autocomplete rounded"
                          placeholder="Depart From"
                          id="txtFrom1"
                          ref={originRef1}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="swap">
                      <label className="swap">
                        <span className="icon text-danger">
                          <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          className="form-control input-field text-input-to autocomplete rounded"
                          placeholder="Going To"
                          ref={destinationRef1}
                          autoComplete="off"
                          id="txtTo1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  <div className="t-datepicker class_1 bg-light rounded">
                    <div
                      className="t-check-in t-picker-only"
                      id="departureDate1"
                    ></div>
                  </div>
                </div>
                <div className="col-lg-3 col-lg-3 col-md-3 col-sm-12 col-12 my-auto">
                  <span
                    className="p-4 bg-white rounded"
                    id="btnp-1"
                    onClick={() => handleFlightOptionP(1)}
                  >
                    <i className="fas fa-plus"></i>
                  </span>
                  &nbsp;
                  <span
                    className="p-4 bg-white rounded"
                    id="btnm-1"
                    style={{ display: "none" }}
                    onClick={() => handleFlightOptionM(1)}
                  >
                    <i className="fas fa-minus"></i>
                  </span>
                </div>
              </div>

              <div className="row" id="multiCity2" style={{ display: "none" }}>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1 position-relative"
                  style={{ paddingRight: "0px" }}
                >
                  <div className="row">
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          id="txtFrom2"
                          className="form-control input-field text-input-from autocomplete rounded"
                          placeholder="Depart From"
                          ref={originRef2}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="swap">
                      <label className="swap">
                        <span className="icon text-danger">
                          <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          className="form-control input-field text-input-to autocomplete rounded"
                          placeholder="Going To"
                          ref={destinationRef2}
                          autoComplete="off"
                          id="txtTo2"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  <div className="t-datepicker class_2 bg-light rounded">
                    <div
                      className="t-check-in t-picker-only"
                      id="departureDate2"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row" id="multiCity3" style={{ display: "none" }}>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1 position-relative"
                  style={{ paddingRight: "0px" }}
                >
                  <div className="row">
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          id="txtFrom3"
                          className="form-control input-field text-input-from autocomplete rounded"
                          placeholder="Depart From"
                          ref={originRef3}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="swap">
                      <label className="swap">
                        <span className="icon text-danger">
                          <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          className="form-control input-field text-input-to autocomplete rounded"
                          placeholder="Going To"
                          ref={destinationRef3}
                          autoComplete="off"
                          id="txtTo3"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  <div className="t-datepicker class_3 bg-light rounded">
                    <div
                      className="t-check-in t-picker-only"
                      id="departureDate3"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row" id="multiCity4" style={{ display: "none" }}>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1 position-relative"
                  style={{ paddingRight: "0px" }}
                >
                  <div className="row">
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          id="txtFrom4"
                          className="form-control input-field text-input-from autocomplete rounded"
                          placeholder="Depart From"
                          ref={originRef4}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="swap">
                      <label className="swap">
                        <span className="icon text-danger">
                          <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          className="form-control input-field text-input-to autocomplete rounded"
                          placeholder="Going To"
                          ref={destinationRef4}
                          autoComplete="off"
                          id="txtTo4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  <div className="t-datepicker class_4 bg-light rounded">
                    <div
                      className="t-check-in t-picker-only"
                      id="departureDate4"
                    ></div>
                  </div>
                </div>
              </div>
              <div className="row" id="multiCity5" style={{ display: "none" }}>
                <div
                  className="col-lg-5 col-md-12 col-sm-12 col-12 mb-1 position-relative"
                  style={{ paddingRight: "0px" }}
                >
                  <div className="row">
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          id="txtFrom5"
                          className="form-control input-field text-input-from autocomplete rounded"
                          placeholder="Depart From"
                          ref={originRef5}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="swap">
                      <label className="swap">
                        <span className="icon text-danger">
                          <i className="fas fa-exchange-alt fa-rotate-90"></i>
                        </span>
                      </label>
                    </div>
                    <div className="col-lg-12 mb-1 col-sm-12 col-md-12 forms">
                      <div className="address">
                        <input
                          type="text"
                          className="form-control input-field text-input-to autocomplete rounded"
                          placeholder="Going To"
                          ref={destinationRef5}
                          autoComplete="off"
                          id="txtTo5"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                  <div className="t-datepicker class_5 bg-light rounded">
                    <div
                      className="t-check-in t-picker-only"
                      id="departureDate5"
                    ></div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </form>

        {/* HOTEL TAB */}
        <div style={{ display: props.tab === "HOTEL" ? "block" : "none" }}>
          <p className="fs-4 m-4 fw-bolder text-white">Coming soon...</p>
        </div>

        {/* VISA TAB */}
        <div style={{ display: props.tab === "VISA" ? "block" : "none" }}>
          <p className="fs-4 mt-4 mb-2 fw-bolder text-white">Country List</p>
          <br></br>
          <div className="d-flex gap-2  justify-content-center">
            {countries && (
              <select
                name="visa"
                id="visa"
                onChange={(e) => setSelectedVisa(e.target.value)}
                style={{
                  height: "50px",
                  width: "380px",
                  textAlign: "left",
                  boxShadow: "none",
                  borderRadius: "0.25rem",
                  padding: "10px",
                }}
                value={selectedVisa}
              >
                {countries.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
              </select>
            )}
            <div className="col-lg-2 col-md-1 col-sm-12 col-12">
              <button
                onClick={handleVisaSearch}
                className="btn btn-primary fw-bold fs-5 search-button w-100 rounded"
                style={{ height: "50px" }}
              >
                <span className="me-2">
                  <i className="fas fa-search"></i>
                </span>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchPanel;
