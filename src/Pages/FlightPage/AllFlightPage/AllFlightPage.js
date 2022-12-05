import React, { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from "react-router";
import $ from "jquery";
import airports from "../../../JSON/airports.json";
import axios from "axios";
import Fuse from "fuse.js";
import Navbar from "../../SharedComponent/NavBar/Navbar";
import Loading from "../../Loading/Loading";
import FlightPage from "../FlightPage/FlightPage";
import { environment } from "../../../environment";
import Footer from "../../SharedComponent/Footer/Footer";
import NoFlight from "../../NoFlight/NoFlight";
import moment from "moment";
import { produce } from "immer";
import useAuth from "../../../hooks/useAuth";

let cIndex = 1;
const AllFlightPage = () => {
  const { state } = useLocation();
  const {
    origin,
    destination,
    origin1,
    destination1,
    origin2,
    destination2,
    origin3,
    destination3,
    origin4,
    destination4,
    origin5,
    destination5,
    journeyDate,
    returnDate,
    inputDateMulti1,
    inputDateMulti2,
    inputDateMulti3,
    inputDateMulti4,
    inputDateMulti5,
    travelClass,
    qtyList,
    tripTypeModify,
    airlines,
    childAgeList,
  } = state;
  // let { formCount } = state;
  console.log(String(airlines), childAgeList);
  const { setFilterDate } = useAuth();
  const [tripType, setTripType] = useState(tripTypeModify); //"One Way"
  const [travel, setTravel] = useState(travelClass); //:"Economy"
  const [adultCount, setAdultCount] = useState(qtyList.Adult); //1
  const [childCount, setChildCount] = useState(qtyList.Children); //0
  let [infantCount, setInfantCount] = useState(qtyList.Infant); //0
  const totalPassenger = adultCount + childCount;
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
  const [originRefValue, setoriginRefValue] = useState(origin);
  const [destinationRefValue, setdestinationRefValue] = useState(destination);
  const [originRefValue1, setoriginRefValue1] = useState(origin1);
  const [destinationRefValue1, setdestinationRefValue1] =
    useState(destination1);
  const [originRefValue2, setoriginRefValue2] = useState(origin2);
  const [destinationRefValue2, setdestinationRefValue2] =
    useState(destination2);
  const [originRefValue3, setoriginRefValue3] = useState(origin3);
  const [destinationRefValue3, setdestinationRefValue3] =
    useState(destination3);
  const [originRefValue4, setoriginRefValue4] = useState(origin4);
  const [destinationRefValue4, setdestinationRefValue4] =
    useState(destination4);
  const [originRefValue5, setoriginRefValue5] = useState(origin5);
  const [destinationRefValue5, setdestinationRefValue5] =
    useState(destination5);
  // const originRefValue1 = origin1;
  // const destinationRefValue1 = destination1;
  // const originRefValue2 = origin2;
  // const destinationRefValue2 = destination2;
  // const originRefValue3 = origin3;
  // const destinationRefValue3 = destination3;
  // const originRefValue4 = origin4;
  // const destinationRefValue4 = destination4;
  // const originRefValue5 = origin5;
  // const destinationRefValue5 = destination5;

  // console.log(originRefValue2);
  // loadCount=formCount;
  // alert(cIndex + "CIndex");

  //   if(tripType==="One Way" || tripType==="Round Trip"){
  //     cIndex=0;
  //   }else if(tripType ==="Multi City"){
  //     cIndex=1;
  // }

  if (originRefValue2 && document.getElementById("multiCity2")) {
    // alert(cIndex+"o2");
    document.getElementById("multiCity2").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 2) {
      cIndex = 2;
    }
  }

  if (originRefValue3 && document.getElementById("multiCity3")) {
    // alert(cIndex+"o3");
    document.getElementById("multiCity3").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 3) {
      cIndex = 3;
    }
  }
  if (originRefValue4 && document.getElementById("multiCity4")) {
    // alert(cIndex+"o4");
    document.getElementById("multiCity4").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 4) {
      cIndex = 4;
    }
  }
  if (originRefValue5 && document.getElementById("multiCity5")) {
    // alert(cIndex+"o5");
    document.getElementById("multiCity5").style.display = "";
    document.getElementById("btnm-1").style.display = "";
    if (cIndex < 5) {
      cIndex = 5;
    }
  }

  const handleFlightOptionP = () => {
    // alert(cIndex);
    if (cIndex < 5) {
      cIndex += 1;
      if (cIndex >= 2) {
        document.getElementById("btnm-1").style.display = "";
      }
      // alert(cIndex+"Plus")
      document.getElementById("multiCity" + cIndex).style.display = "";
      document
        .getElementById("txtFrom" + cIndex)
        .setAttribute("required", "required");
      document
        .getElementById("txtTo" + cIndex)
        .setAttribute("required", "required");
    }
    // alert("p" + cIndex);
  };
  const handleFlightOptionM = () => {
    cIndex -= 1;

    if (cIndex < 2) {
      document.getElementById("btnm-1").style.display = "none";
    }
    document.getElementById("multiCity" + (cIndex + 1)).style.display = "none";
    document
      .getElementById("txtFrom" + (cIndex + 1))
      .removeAttribute("required");
    document.getElementById("txtTo" + (cIndex + 1)).removeAttribute("required");
    // alert(cIndex + "minus");
    if (cIndex === 1) {
      // alert("2" + cIndex);
      originRef2.current.value = "";
      destinationRef2.current.value = "";
      $(".class_2").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 2) {
      // alert("3" + cIndex);
      originRef3.current.value = "";
      destinationRef3.current.value = "";
      $(".class_3").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 3) {
      // alert("4" + cIndex);
      originRef4.current.value = "";
      destinationRef4.current.value = "";
      $(".class_4").tDatePicker({
        autoClose: true,
      });
    }
    if (cIndex === 4) {
      // alert("5" + cIndex);
      originRef5.current.value = "";
      destinationRef5.current.value = "";
      $(".class_5").tDatePicker({
        autoClose: true,
      });
    }
  };

  useEffect(() => {
    $("#txtFrom").val(originRefValue);
    $("#txtTo").val(destinationRefValue);
    $("#txtFrom1").val(originRefValue1);
    $("#txtTo1").val(destinationRefValue1);
    $("#txtFrom1").val(originRefValue1);
    $("#txtTo1").val(destinationRefValue1);
    $("#txtFrom2").val(originRefValue2);
    $("#txtTo2").val(destinationRefValue2);
    $("#txtFrom3").val(originRefValue3);
    $("#txtTo3").val(destinationRefValue3);
    $("#txtFrom4").val(originRefValue4);
    $("#txtTo4").val(destinationRefValue4);
    $("#txtFrom5").val(originRefValue5);
    $("#txtTo5").val(destinationRefValue5);
    $(document).ready(function () {
      $(".class_0").tDatePicker({
        autoClose: true,
        dateCheckIn: journeyDate,
        dateCheckOut: returnDate,
      });
      $(".class_1").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti1,
      });
      $(".class_2").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti2,
      });
      $(".class_3").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti3,
      });
      $(".class_4").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti4,
      });
      $(".class_5").tDatePicker({
        autoClose: true,
        dateCheckIn: inputDateMulti5,
      });
    });
  }, []);

  const searchData = JSON.parse(sessionStorage.getItem("Database"));
  const originCode = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin
    )
    .map((item) => item.iata);
  const destinationCode = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination
    )
    .map((item) => item.iata);
  const originCode1 = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin1
    )
    .map((item) => item.iata);
  const destinationCode1 = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination1
    )
    .map((item) => item.iata);
  const originCode2 = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin2
    )
    .map((item) => item.iata);
  const destinationCode2 = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination2
    )
    .map((item) => item.iata);
  const originCode3 = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin3
    )
    .map((item) => item.iata);
  const destinationCode3 = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination3
    )
    .map((item) => item.iata);
  const originCode4 = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin4
    )
    .map((item) => item.iata);
  const destinationCode4 = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination4
    )
    .map((item) => item.iata);
  const originCode5 = airports
    .filter(
      (f) => f.city + " - " + f.country + ", " + f.name === searchData.origin5
    )
    .map((item) => item.iata);
  const destinationCode5 = airports
    .filter(
      (f) =>
        f.city + " - " + f.country + ", " + f.name === searchData.destination5
    )
    .map((item) => item.iata);

  let searchParamOnedWay = {
    routes: [
      {
        origin: originCode[0],
        destination: destinationCode[0],
        departureDate: journeyDate,
      },
    ],
    adults: qtyList.Adult,
    childs: qtyList.Children,
    infants: qtyList.Infant,
    cabinClass: 1,
    preferredCarriers: airlines !== undefined ? airlines.split(",") : [],
    prohibitedCarriers: [],
    childrenAges: [],
  };

  childAgeList.map((item) =>
    searchParamOnedWay.childrenAges.push(parseInt(item.age))
  );

  console.log(searchParamOnedWay);

  let searchParamRoundWay = {
    routes: [
      {
        origin: originCode[0],
        destination: destinationCode[0],
        departureDate: journeyDate,
      },
      {
        origin: destinationCode[0],
        destination: originCode[0],
        departureDate: returnDate,
      },
    ],
    adults: qtyList.Adult,
    childs: qtyList.Children,
    infants: qtyList.Infant,
    cabinClass: 1,
    preferredCarriers: [],
    prohibitedCarriers: [],
    childrenAges: [],
  };
  console.log(searchParamRoundWay);

  childAgeList.map((item) =>
    searchParamRoundWay.childrenAges.push(parseInt(item.age))
  );

  let searchParamMulti = {
    routes: [
      {
        origin: originCode[0],
        destination: destinationCode[0],
        departureDate: journeyDate,
      },
      {
        origin: originCode1[0],
        destination: destinationCode1[0],
        departureDate: inputDateMulti1,
      },
    ],
    adults: qtyList.Adult,
    childs: qtyList.Children,
    infants: qtyList.Infant,
    isOpenCombination: false,
    cabinClass: 1,
    preferredCarriers: [],
    prohibitedCarriers: [],
    taxRedemptions: [],
    childrenAges: [],
  };
  if (originCode2[0] !== undefined) {
    let mc2 = {
      origin: originCode2[0],
      destination: destinationCode2[0],
      departureDate: inputDateMulti2,
    };
    searchParamMulti.routes.push(mc2);
  }
  if (originCode3[0] !== undefined) {
    let mc2 = {
      origin: originCode3[0],
      destination: destinationCode3[0],
      departureDate: inputDateMulti3,
    };
    searchParamMulti.routes.push(mc2);
  }
  if (originCode4[0] !== undefined) {
    let mc2 = {
      origin: originCode4[0],
      destination: destinationCode4[0],
      departureDate: inputDateMulti4,
    };
    searchParamMulti.routes.push(mc2);
  }
  if (originCode5[0] !== undefined) {
    let mc2 = {
      origin: originCode5[0],
      destination: destinationCode5[0],
      departureDate: inputDateMulti5,
    };
    searchParamMulti.routes.push(mc2);
  }
  console.log(searchParamMulti);

  childAgeList.map((item) =>
    searchParamMulti.childrenAges.push(parseInt(item.age))
  );

  const [fetchFlighData, setFetchFlighData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (tripTypeModify === "One Way") {
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamOnedWay
        );
        console.log(response.data.item1);
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightoneway.item1);
        setLoading(false);
      };
      getData();
    } else if (tripTypeModify === "Round Trip") {
      setLoading(true);
      const getData = async () => {
        // await axios.post(
        //   environment.searchFlight,
        //   searchParamRoundWay
        // ).then((response)=>{
        //     // setFetchFlighData(await response.data.item1);
        //     setFetchFlighData(roundtrip.item1);
        //     setLoading(false);
        // });
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamRoundWay
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightoneway.item1);
        setLoading(false);
      };
      getData();
    } else {
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamMulti
        );
        console.log(response);
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightmulticity.item1);
        setLoading(false);
      };
      getData();
    }
  }, []);
  console.log(fetchFlighData);
  useEffect(() => {
    $(".slide-toggle").hide();
  }, []);
  

 

  const showAgain = () =>{
        $(".slide-toggle").show("slow");
  };

  const hideAgain = () =>{
        $(".slide-toggle").hide("slow");
  };


  useEffect(() => {
    // $(".slide-toggle").hide();
    // $(".search-again").click(function () {
    //   $(".slide-toggle").toggle("slow");
    // });
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

    $("#departureDate").attr("class", "t-check-in");
    $("#returnDate").hide();
    $("#returnLavel").hide();

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
  // alert(cIndex + "outside");

  const handleTripType = (name) => {
    setTripType(name);
    if (name === "One Way" || name === "Round Trip") {
      cIndex = 0;
    } else if (name === "Multi City") {
      cIndex = 1;
    }
  };
  console.log(tripType);
  const handleSearchFlight = (e) => {
    setChangeText(false);
    $(".slide-toggle").hide("slow");
    console.log(tripType);
    if (String(tripType) === "Multi City") {
      // document.getElementById("multiCity" + (cIndex + 1)).style.display = "none";
      const origin =
        originRef.current.value === undefined
          ? originRefValue
          : originRef.current.value;
      const destination =
        destinationRef.current.value === undefined
          ? destinationRefValue
          : destinationRef.current.value;

      const origin1 =
        originRef1.current.value === undefined
          ? originRefValue1
          : originRef1.current.value;
      const destination1 =
        destinationRef1?.current.value === undefined
          ? destinationRefValue1
          : destinationRef1?.current.value;

      const origin2 =
        originRef2.current.value === undefined
          ? originRefValue2
          : originRef2.current.value;
      const destination2 =
        destinationRef2.current.value === undefined
          ? destinationRefValue2
          : destinationRef2.current.value;

      const origin3 =
        originRef3.current.value === undefined
          ? originRefValue3
          : originRef3.current.value;
      const destination3 =
        destinationRef3.current.value === undefined
          ? destinationRefValue3
          : destinationRef3.current.value;

      const origin4 =
        originRef4.current.value === undefined
          ? originRefValue4
          : originRef4.current.value;
      const destination4 =
        destinationRef4.current.value === undefined
          ? destinationRefValue4
          : destinationRef4.current.value;

      const origin5 =
        originRef5.current.value === undefined
          ? originRefValue5
          : originRef5.current.value;
      const destination5 =
        destinationRef5.current.value === undefined
          ? destinationRefValue5
          : destinationRef5.current.value;

      if (origin === "") {
        setoriginRefValue("");
        setdestinationRefValue("");
      }
      if (origin1 === "") {
        setoriginRefValue1("");
        setdestinationRefValue1("");
      }
      if (origin2 === "") {
        setoriginRefValue2("");
        setdestinationRefValue2("");
      }
      if (origin3 === "") {
        setoriginRefValue3("");
        setdestinationRefValue3("");
      }
      if (origin4 === "") {
        setoriginRefValue4("");
        setdestinationRefValue4("");
      }
      if (origin5 === "") {
        setoriginRefValue5("");
        setdestinationRefValue5("");
      }
      const journeyDate = $("#departureDate").children("input").val();
      const inputDateMulti1 = $("#departureDate1").children("input").val();
      const inputDateMulti2 = $("#departureDate2").children("input").val();
      const inputDateMulti3 = $("#departureDate3").children("input").val();
      const inputDateMulti4 = $("#departureDate4").children("input").val();
      const inputDateMulti5 = $("#departureDate5").children("input").val();
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const originCode = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin)
        .map((item) => item.iata);
      const destinationCode = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination
        )
        .map((item) => item.iata);
      const originCode1 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin1)
        .map((item) => item.iata);
      const destinationCode1 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination1
        )
        .map((item) => item.iata);
      const originCode2 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin2)
        .map((item) => item.iata);
      const destinationCode2 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination2
        )
        .map((item) => item.iata);
      const originCode3 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin3)
        .map((item) => item.iata);
      const destinationCode3 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination3
        )
        .map((item) => item.iata);
      const originCode4 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin4)
        .map((item) => item.iata);
      const destinationCode4 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination4
        )
        .map((item) => item.iata);
      const originCode5 = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin5)
        .map((item) => item.iata);
      const destinationCode5 = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination5
        )
        .map((item) => item.iata);
      let searchParamMulti = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: journeyDate,
          },
          {
            origin: originCode1[0],
            destination: destinationCode1[0],
            departureDate: inputDateMulti1,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        isOpenCombination: false,
        cabinClass: 1,
        preferredCarriers: [],
        prohibitedCarriers: [],
        taxRedemptions: [],
        childrenAges: [],
      };
      if (originCode2[0] !== undefined) {
        let mc2 = {
          origin: originCode2[0],
          destination: destinationCode2[0],
          departureDate: inputDateMulti2,
        };
        searchParamMulti.routes.push(mc2);
      }
      if (originCode3[0] !== undefined) {
        let mc2 = {
          origin: originCode3[0],
          destination: destinationCode3[0],
          departureDate: inputDateMulti3,
        };
        searchParamMulti.routes.push(mc2);
      }
      if (originCode4[0] !== undefined) {
        let mc2 = {
          origin: originCode4[0],
          destination: destinationCode4[0],
          departureDate: inputDateMulti4,
        };
        searchParamMulti.routes.push(mc2);
      }
      if (originCode5[0] !== undefined) {
        let mc2 = {
          origin: originCode5[0],
          destination: destinationCode5[0],
          departureDate: inputDateMulti5,
        };
        searchParamMulti.routes.push(mc2);
      }
      // document.getElementById("multiCity" + (cIndex + 1)).style.display =
      //   "none";

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

      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamMulti
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightmulticity.item1);
        // alert(response.data.item2[1].message);
        setLoading(false);
      };
      console.log(searchParamMulti);
      console.log(origin, origin1, origin2, origin3, origin4, origin5);
      getData();
    } else if (String(tripType) === "Round Trip") {
      const origin =
        originRef.current.value === undefined
          ? originRefValue
          : originRef.current.value;
      const destination =
        destinationRef.current.value === undefined
          ? destinationRefValue
          : destinationRef.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const returnDate = $("#returnDate").children("input").val();
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const originCode = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin)
        .map((item) => item.iata);
      const destinationCode = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination
        )
        .map((item) => item.iata);

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

      let searchParamRoundWay = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: journeyDate,
          },
          {
            origin: destinationCode[0],
            destination: originCode[0],
            departureDate: returnDate,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        isOpenCombination: false,
        cabinClass: 1,
        preferredCarriers: [],
        prohibitedCarriers: [],
        taxRedemptions: [],
        childrenAges: [],
      };

      console.log(searchParamRoundWay);
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamRoundWay
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(roundtrip.item1);
        setLoading(false);
        // alert(response.data.item2[1].message);
      };
      getData();
    } else if (String(tripType) === "One Way") {
      const origin =
        originRef.current.value === ""
          ? originRefValue
          : originRef.current.value;
      const destination =
        destinationRef.current.value === ""
          ? destinationRefValue
          : destinationRef.current.value;
      const journeyDate = $("#departureDate").children("input").val();
      const qtyList = {
        Adult: adultCount,
        Children: childCount,
        Infant: infantCount,
      };
      const originCode = airports
        .filter((f) => f.city + " - " + f.country + ", " + f.name === origin)
        .map((item) => item.iata);
      const destinationCode = airports
        .filter(
          (f) => f.city + " - " + f.country + ", " + f.name === destination
        )
        .map((item) => item.iata);

      const searchData = {
        origin: origin,
        destination: destination,
        journeyDate: journeyDate,
        returnDate: "null",
        tripTypeModify: tripType,
        qtyList: qtyList,
        travelClass: travel,
        childAgeList: childAge,
      };

      sessionStorage.setItem("Database", JSON.stringify(searchData));

      let searchParamOnedWay = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: journeyDate,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        isOpenCombination: false,
        cabinClass: 1,
        preferredCarriers: [],
        prohibitedCarriers: [],
        taxRedemptions: [],
        childrenAges: [],
      };

      console.log(searchParamOnedWay);

      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamOnedWay
        );
        setFetchFlighData(await response.data.item1);
        // setFetchFlighData(flightoneway.item1);
        setLoading(false);
        // alert(response.data.item2[1].message);
      };
      // console.log(flightoneway);
      getData();
    }
    e.preventDefault();
  };

  const [childAge, setChildAge] = useState(childAgeList);
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

  const clickOnDelete = (child) => {
    setChildCount(child - 1);
    const lastIndex = childAge.length - 1;
    // this.setState({ items: items.filter((item, index) => index !== lastIndex) });
    setChildAge(childAge.filter((r, index) => index !== lastIndex));
  };

  const [changeText, setChangeText] = useState(false);

  // const [date, updateDate] = useState(new Date(journeyDate));
  // const [nextDays, setNextDays] = useState(1);
  // const [previousDays, setPreviousDays] = useState(1);
  const [currentDate, setCurrentDate] = useState(journeyDate);
  const [currentRDate, setCurrentRDate] = useState(returnDate);

  // const incrementDate = useCallback(() => {
  //   setDays((prevState) => prevState + 1);
  // }, []);

  // const decrementDate = useCallback(() => {
  //   setDays((prevState) => prevState - 1);
  // }, []);

  // useEffect(() => {
  //   updateDate(
  //     (prevState) => new Date(Date.now() + days * 24 * 60 * 60 * 1000)
  //   );
  // }, [days, updateDate]);
  //   console.log(date);
  //  console.log(days);

  const filterWithDays = (param, tripType) => {
    var dataI = new Date(currentDate);
    if (param === 1) {
      var i = dataI.valueOf() + 86400000;
    } else {
      var i = dataI.valueOf() - 86400000;
    }
    dataI = new Date(i);
    // console.log(nextDays);
    const date = moment(dataI).format().slice(0, 10);
    setCurrentDate(date);

    const searchData = JSON.parse(sessionStorage.getItem("Database"));
    searchData.journeyDate = date;
    sessionStorage.setItem("Database", JSON.stringify(searchData));
    console.log(date);
    if (tripType === "One Way") {
      let searchParamOnedWay = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: date,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        cabinClass: 1,
        preferredCarriers: airlines !== undefined ? airlines.split(",") : [],
        prohibitedCarriers: [],
        childrenAges: [],
      };
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamOnedWay
        );
        console.log(response.data.item1);
        setFetchFlighData(await response.data.item1);
        setLoading(false);
      };
      getData();
    } else if (tripType === "Round Trip") {
      let searchParamRoundWay = {
        routes: [
          {
            origin: originCode[0],
            destination: destinationCode[0],
            departureDate: date,
          },
          {
            origin: destinationCode[0],
            destination: originCode[0],
            departureDate: currentRDate,
          },
        ],
        adults: qtyList.Adult,
        childs: qtyList.Children,
        infants: qtyList.Infant,
        cabinClass: 1,
        preferredCarriers: airlines !== undefined ? airlines.split(",") : [],
        prohibitedCarriers: [],
        childrenAges: [],
      };
      const getData = async () => {
        setLoading(true);
        const response = await axios.post(
          environment.searchFlight,
          searchParamRoundWay
        );
        console.log(response.data.item1);
        setFetchFlighData(await response.data.item1);
        setLoading(false);
      };
      getData();
    }
  };

  const filterWithReturnDays = (param) => {
    var dataI = new Date(currentRDate);
    if (param === 1) {
      var i = dataI.valueOf() + 86400000;
    } else {
      var i = dataI.valueOf() - 86400000;
    }
    dataI = new Date(i);
    // console.log(nextDays);
    const date = moment(dataI).format().slice(0, 10);
    setCurrentRDate(date);

    const searchData = JSON.parse(sessionStorage.getItem("Database"));
    searchData.returnDate = date;
    sessionStorage.setItem("Database", JSON.stringify(searchData));
    console.log(date);
    let searchParamRoundWay = {
      routes: [
        {
          origin: originCode[0],
          destination: destinationCode[0],
          departureDate: currentDate,
        },
        {
          origin: destinationCode[0],
          destination: originCode[0],
          departureDate: date,
        },
      ],
      adults: qtyList.Adult,
      childs: qtyList.Children,
      infants: qtyList.Infant,
      cabinClass: 1,
      preferredCarriers: airlines !== undefined ? airlines.split(",") : [],
      prohibitedCarriers: [],
      childrenAges: [],
    };
    const getData = async () => {
      setLoading(true);
      const response = await axios.post(
        environment.searchFlight,
        searchParamRoundWay
      );
      console.log(response.data.item1);
      setFetchFlighData(await response.data.item1);
      setLoading(false);
    };
    getData();
  };
  // console.log(new Date().toISOString().slice(0, 10));
  // console.log(new Date(journeyDate).toISOString().slice(0, 10));
  // const previousDayData = () => {
  //   var dataI = new Date(journeyDate);
  //   var i = dataI.valueOf() - (86400000*previousDays);
  //   dataI = new Date(i);
  //   console.log(previousDays);
  //   const date = moment(dataI).format().slice(0,10);
  //   console.log(date);
  //   let searchParamOnedWay = {
  //     routes: [
  //       {
  //         origin: originCode[0],
  //         destination: destinationCode[0],
  //         departureDate: date,
  //       },
  //     ],
  //     adults: qtyList.Adult,
  //     childs: qtyList.Children,
  //     infants: qtyList.Infant,
  //     cabinClass: 1,
  //     preferredCarriers: airlines !== undefined ? airlines.split(",") : [],
  //     prohibitedCarriers: [],
  //     childrenAges: [],
  //   };
  //   const getData = async () => {
  //     setLoading(true);
  //     const response = await axios.post(
  //       environment.searchFlight,
  //       searchParamOnedWay
  //     );
  //     console.log(response.data.item1);
  //     setFetchFlighData(await response.data.item1);
  //     setLoading(false);
  //   };
  //   // getData();
  // }

  // const filterData = (id) =>{
  //   if(id===1){
  //     setFetchFlighData(fetchFlighData.airSearchResponses.sort((a, b) => Number(a.totalPrice) < Number(b.totalPrice) ? 1 : -1))
  //   }
  // }
  // console.log(fetchFlighData);
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-5 bg-color">
        <div className="container-fluid modify-search bg-white mt-5">
          <div className="row mt-5 px-5 py-2">
            <div className="col-lg-7 my-auto text-start">
              <span style={{ color: "#231f45" }}>
                <h5 className="fw-bold d-inline">
                  <span className="me-2">
                    <i className="fas fa-plane-departure"></i>
                  </span>
                  {originCode[0]} (
                  {searchData.origin.substring(
                    0,
                    searchData.origin.indexOf(" ")
                  )}
                  ){" "}
                </h5>{" "}
                <h5 className="fw-bold d-inline mx-2">-</h5>{" "}
                <h5 className="fw-bold d-inline">
                  <span className="me-2">
                    <i className="fas fa-plane-arrival"></i>
                  </span>
                  {destinationCode[0]} (
                  {searchData.destination.substring(
                    0,
                    searchData.destination.indexOf(" ")
                  )}
                  )
                </h5>
                <h6 className="fw-bold d-inline">({searchData.travelClass})</h6>
                <h6>
                  Departing : {searchData.journeyDate}{" "}
                  {searchData.returnDate === "null" &&
                  searchData.tripTypeModify === "One Way"
                    ? " "
                    : " | Returning: " + searchData.returnDate + " "}
                  |{" "}
                  <span className="fw-bold" style={{ fontSize: "12px" }}>
                    {searchData.qtyList.Adult > 0
                      ? "ADT: " + searchData.qtyList.Adult
                      : " "}{" "}
                    {searchData.qtyList.Children > 0
                      ? "CHD: " + searchData.qtyList.Children
                      : " "}{" "}
                    {searchData.qtyList.Infant > 0
                      ? "INF: " + searchData.qtyList.Infant
                      : " "}
                  </span>
                </h6>
              </span>
            </div>
            <div className="col-lg-3"></div>
            <div className="col-lg-2 my-auto">
              {changeText ? (
                <>
                  <button
                    className="btn btn-danger btn-sm text-white float-end fw-bold py-2 px-4 me-4 rounded" id="hide"
                    onClick={() => {
                      setChangeText(false);
                      hideAgain();
                    }}
                  >
                    Hide search
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn btn-danger btn-sm text-white float-end fw-bold search-again py-2 px-4 me-4 rounded" id="show"
                    onClick={() => {
                      setChangeText(true);
                      showAgain();
                    }}
                  >
                    Modify search
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="slide-toggle pb-3">
            <div className="container mt-4 pt-1">
              <div className="row">
                <div style={{ marginBottom: "30px" }}>
                  <div id="form-bg">
                    <form onSubmit={handleSearchFlight}>
                      <div className="row">
                        <div className="col-lg-12 pb-3 pt-3">
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
                          <div className="row">
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
                        <div className="col-lg-3 col-md-3 col-sm-12 col-12 mb-1">
                          <div className="t-datepicker class_0 bg-light rounded">
                            <div
                              className="t-check-in"
                              id="departureDate"
                              style={{
                                minHeight: "100%",
                                borderRight: "1px solid gray",
                              }}
                            ></div>
                            <div className="t-check-out" id="returnDate"></div>
                          </div>
                        </div>
                        <div className="col-lg-2 col-md-3 col-sm-12 col-12 mb-1">
                          <div className="row row mb-1 rounded">
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
                                className="form-select inputgroup"
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
                                    Passenger{" "}
                                    {adultCount + childCount + infantCount}
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
                                        Adult
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
                                          infantCount > 0 &&
                                          adultCount === infantCount
                                            ? () => {
                                                setAdultCount(adultCount - 1);
                                                setInfantCount(infantCount - 1);
                                              }
                                            : () =>
                                                setAdultCount(adultCount - 1)
                                        }
                                        disabled={
                                          adultCount === 1 ? true : false
                                        }
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
                                        onClick={() =>
                                          setAdultCount(adultCount + 1)
                                        }
                                        disabled={
                                          totalPassenger === 9 ? true : false
                                        }
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
                                        disabled={
                                          childCount === 0 ? true : false
                                        }
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
                                        disabled={
                                          totalPassenger === 9 ? true : false
                                        }
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
                                                  <span>
                                                    Child {index + 1} Age
                                                  </span>
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
                                                value={val.age}
                                                // onChange={(e) =>
                                                //   handleChildAge(e, index)
                                                // }
                                                required
                                              >
                                                <option hidden></option>
                                                <option>2</option>
                                                <option>3</option>
                                                <option>4</option>
                                                <option>5</option>
                                                <option>6</option>
                                                <option>7</option>
                                                <option>8</option>
                                                <option>9</option>
                                                <option>10</option>
                                                <option>11</option>
                                              </select>
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
                                        onClick={() =>
                                          setInfantCount(infantCount - 1)
                                        }
                                        disabled={
                                          infantCount === 0 ? true : false
                                        }
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
                                            ? () =>
                                                setInfantCount(infantCount + 1)
                                            : () => {}
                                        }
                                        disabled={
                                          infantCount === 9 ? true : false
                                        }
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
                            id="search-flight"
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
                          <div className="row" id="multiCity1">
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

                          <div
                            className="row"
                            id="multiCity2"
                            style={{ display: "none" }}
                          >
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
                          <div
                            className="row"
                            id="multiCity3"
                            style={{ display: "none" }}
                          >
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
                          <div
                            className="row"
                            id="multiCity4"
                            style={{ display: "none" }}
                          >
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
                                      placeholder="Depart from"
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
                          <div
                            className="row"
                            id="multiCity5"
                            style={{ display: "none" }}
                          >
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
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="bg-color">
        <div className="container py-3 content-width">
          <div className="row">
            <div className="col-lg-3"></div>
            <div className="col-lg-9">
              <div className="row mx-3">
                <div className="col-lg-6 text-start">
                  <button
                    className="btn btn-danger btn-sm rounded me-3"
                    onClick={() => {
                      filterWithDays(2, tripType);
                      // setPreviousDays(previousDays + 1);
                    }}
                    disabled={
                      new Date().toISOString().slice(0, 10) ===
                      new Date(currentDate).toISOString().slice(0, 10)
                        ? true
                        : false
                    }
                  >
                    <span className="ms-1">
                      <i class="fa fa-hand-o-left" aria-hidden="true"></i>
                    </span>{" "}
                    Previous Day
                  </button>
                  <button
                    className="btn btn-danger btn-sm rounded me-3"
                    onClick={() => {
                      filterWithDays(1, tripType);
                      
                    }}
                    disabled={
                      tripType === "One Way"
                        ? false
                        : new Date(currentRDate).toISOString().slice(0, 10) ===
                          new Date(currentDate).toISOString().slice(0, 10)
                        ? true
                        : false
                    }
                  >
                    Next Day{" "}
                    <span className="ms-1">
                      <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
                <div className="col-lg-6 text-end">
                  <button
                    className="btn btn-danger btn-sm rounded me-3"
                    onClick={() => {
                      filterWithReturnDays(2);
                      // setPreviousDays(previousDays + 1);
                    }}
                    disabled={
                      tripType === "One Way"
                        ? true
                        : new Date(currentRDate).toISOString().slice(0, 10) ===
                          new Date(currentDate).toISOString().slice(0, 10)
                        ? true
                        : false
                    }
                  >
                    <span className="ms-1">
                      <i class="fa fa-hand-o-left" aria-hidden="true"></i>
                    </span>{" "}
                    Previous Day
                  </button>
                  <button
                    className="btn btn-danger btn-sm rounded"
                    onClick={() => {
                      filterWithReturnDays(1);
                   
                    }}
                    disabled={tripType === "One Way" ? true : false}
                  >
                    Next Day{" "}
                    <span className="ms-1">
                      <i class="fa fa-hand-o-right" aria-hidden="true"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div style={{ minHeight: "600px" }}>
        {fetchFlighData !== null && fetchFlighData !== undefined ? (
          loading ? (
            <Loading
              flag={0}
              loading={loading}
              originCode={originCode}
              destinationCode={destinationCode}
              tripType={tripType}
              journeyDate={journeyDate}
              returnDate={returnDate}
              qtyList={qtyList}
              tripTypeModify={tripTypeModify}
            ></Loading>
          ) : (
            <>
              <FlightPage
                fetchFlighData={fetchFlighData}
                // fetchRoundWay={fetchRoundWay}
                // fecthMulti={fecthMulti}
                originCode={originCode}
                loading={loading}
                destinationCode={destinationCode}
                tripType={tripType}
                journeyDate={journeyDate}
              ></FlightPage>
            </>
          )
        ) : (
          loading ? <>
           <Loading
              flag={0}
              loading={loading}
              originCode={originCode}
              destinationCode={destinationCode}
              tripType={tripType}
            ></Loading>
          </> :
          <>
            <NoFlight loading={loading}></NoFlight>
          </>
        )}
      </div>
      <Footer></Footer>
    </div>
  );
};

export default AllFlightPage;
