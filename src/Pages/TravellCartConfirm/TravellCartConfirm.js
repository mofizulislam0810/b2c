import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import ShowModal from "../FlightPage/ShowModal/ShowModal";
import Navbar from "../SharedComponent/NavBar/Navbar";
import $ from "jquery";
import DurationFormat from "../SharedComponent/Utility/DurationFormat";
import axios from 'axios';
import { environment } from "../../environment";


const TravellCartConfirm = () => {
  const navigate = useNavigate();
  const filterParam = JSON.parse(sessionStorage.getItem('Database'));
  const flightType = filterParam.flightType;
  const direction0 = JSON.parse(localStorage.getItem("direction0"));
  const direction1 = JSON.parse(localStorage.getItem("direction1"));
  const direction2 = JSON.parse(localStorage.getItem("direction2"));
  const direction3 = JSON.parse(localStorage.getItem("direction3"));
  const direction4 = JSON.parse(localStorage.getItem("direction4"));
  const direction5 = JSON.parse(localStorage.getItem("direction5"));

  const totalPrice = JSON.parse(localStorage.getItem("totalPrice"));
  const bookingComponents = JSON.parse(
    localStorage.getItem("bookingComponents")
  );
  const adult = JSON.parse(localStorage.getItem("adult"));
  const child = JSON.parse(localStorage.getItem("child"));
  const infant = JSON.parse(localStorage.getItem("infant"));
  const contact = JSON.parse(localStorage.getItem("contact"));
  const refundable = JSON.parse(localStorage.getItem("refundable"));
  const uniqueTransID = JSON.parse(localStorage.getItem("uniqueTransID"));
  const itemCodeRef = JSON.parse(localStorage.getItem("itemCodeRef"));
  const origin = filterParam.origin;
  const departure = origin.split(",");
  const destination = filterParam.destination;
  const arrival = destination.split(",");

  const bookingData  = () => {
    let sendObj = {
      passengerInfoes: [
        
      ],
      uniqueTransID: uniqueTransID,
      itemCodeRef: itemCodeRef,
      segmentCodeRefs: [],
      PriceCodeRef:"",
      isChangedPriceChacked: false
  };
    
  adult.map((item)=>{
    let passengerObj=  {
      "nameElement": {
          "title": item.title,
          "firstName": item.firstName,
          "lastName": item.lastName,
          "middleName": item.middleName
      },
      "contactInfo": {
          "email": contact[0].email,
          "phone": contact[0].mobailNumber,
          "phoneCountryCode": "+880",
          "countryCode": "BD",
          "cityName": "Dhaka"
      },
      "documentInfo": {
          "documentType": item.document,
          "documentNumber": item.passportNumber,
          "expireDate": item.passportYear +'-'+ item.passportMonth.split('-')[0].trim()+'-'+item.passportDate ,
          "frequentFlyerNumber": "",
          "issuingCountry": "BD",
          "nationality": "BD"
      },
      "passengerType": "ADT",
      "gender": "Male",
      "dateOfBirth": item.year +'-'+ item.month.split('-')[0].trim()+'-'+item.date,
      "passengerKey": "01",
      "isLeadPassenger": true
  };
  sendObj.passengerInfoes.push(passengerObj);
  });
  child.map((item)=>{
    let passengerObj=  {
      "nameElement": {
          "title": item.title,
          "firstName": item.firstName,
          "lastName": item.lastName,
          "middleName": item.middleName
      },
      "contactInfo": {
          "email": contact[0].email,
          "phone": contact[0].mobailNumber,
          "phoneCountryCode": contact[0].mobailCode,
          "countryCode": "BD",
          "cityName": "Dhaka"
      },
      "documentInfo": {
          "documentType": item.document,
          "documentNumber": item.passportNumber,
          "expireDate": item.passportYear +'-'+ item.passportMonth.split('-')[0].trim()+'-'+item.passportDate ,
          "frequentFlyerNumber": "",
          "issuingCountry": "BD",
          "nationality": "BD"
      },
      "passengerType": "CNN",
      "gender": "Male",
      "dateOfBirth": "1990-03-14",
      "passengerKey": "01",
      "isLeadPassenger": true
  };
  sendObj.passengerInfoes.push(passengerObj);
  });
  infant.map((item)=>{
    let passengerObj=  {
      "nameElement": {
          "title": item.title,
          "firstName": item.firstName,
          "lastName": item.lastName,
          "middleName": item.middleName
      },
      "contactInfo": {
          "email": contact[0].email,
          "phone": contact[0].mobailNumber,
          "phoneCountryCode": contact[0].mobailCode,
          "countryCode": "BD",
          "cityName": "Dhaka"
      },
      "documentInfo": {
          "documentType": item.document,
          "documentNumber": item.passportNumber,
          "expireDate": item.passportYear +'-'+ item.passportMonth.split('-')[0].trim()+'-'+item.passportDate ,
          "frequentFlyerNumber": "",
          "issuingCountry": "BD",
          "nationality": "BD"
      },
      "passengerType": "INF",
      "gender": "Male",
      "dateOfBirth": "1990-03-14",
      "passengerKey": "01",
      "isLeadPassenger": true
  };
  sendObj.passengerInfoes.push(passengerObj);
  });

  
//   sendObj={
//     "passengerInfoes": [
//         {
//             "nameElement": {
//                 "title": "Mr",
//                 "firstName": "Kamrul",
//                 "lastName": "Hasan",
//                 "middleName": ""
//             },
//             "contactInfo": {
//                 "email": "kamrul.csepu@gmail.com",
//                 "phone": "1922358358",
//                 "phoneCountryCode": "+880",
//                 "countryCode": "BD",
//                 "cityName": "Dhaka"
//             },
//             "documentInfo": {
//                 "documentType": "Passport",
//                 "documentNumber": "SDFG1234567",
//                 "expireDate": "2024-12-12",
//                 "frequentFlyerNumber": "",
//                 "issuingCountry": "BD",
//                 "nationality": "BD"
//             },
//             "passengerType": "ADT",
//             "gender": "Male",
//             "dateOfBirth": "1990-03-14",
//             "passengerKey": "01",
//             "isLeadPassenger": true
//         }
//     ],
//     "uniqueTransID": "USB1043982675",
//     "itemCodeRef": "VVNCMTA0Mzk4MjY3NS02Mzc4MzYxMDk1OTIwNzIyNTZ8SXRpbl8yLTEwM3xVU0JhbmdsYQ==",
//     "segmentCodeRefs": [],
//     "isChangedPriceChacked": false
// };
  // console.log(sendObj);
  localStorage.setItem('passengerPack',JSON.stringify(sendObj));
  async function fetchOptions() {
    // var configData = JSON.parse(localStorage.getItem("flightConfirm"));
    // if(configData!==undefined){
    //   return configData;
    // }else{
    // return 
    await axios.post(environment.bookFlight, sendObj)
      .then(response => {   
        if(response.data.item2.isSuccess === true){
          // console.log(response);
          localStorage.setItem('flightConfirm',JSON.stringify(response.data));
          navigate('/success');
        }else{
          navigate('/fail');
        }
      });
  }
  // axios.post(environment.bookFlight, sendObj)
  // .then(response => console.log(response))
  // .then(response => {localStorage.setItem('flightConfirm',JSON.stringify(response))})
  // .catch(e => console.log(e));
   fetchOptions();
  }


  // var numberPattern = /\d+/g;
  // const numberFare = bookingComponents[0].totalPrice.match(numberPattern);
  // //console.log(numberFare);
  // const numberTex = bookingComponents[0].taxes.match(numberPattern);
  const ImageUrlD = `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction0.PlatingCarrier}.png`;
  const ImageUrlR =
    Object.keys(direction1).length > 0
      ? `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${direction1.PlatingCarrier}.png`
      : ``;
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

  return (
    <>
      <Navbar></Navbar>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-1"></div>
          <div className="col-lg-6">
            <div className="accordion" id="accordionPanelsStayOpenExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseOne"
                    aria-expanded="true"
                    aria-controls="panelsStayOpen-collapseOne"
                  >
                    Adult ({adult.length})
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="panelsStayOpen-headingOne"
                >
                  <div className="accordion-body">
                  {adult.map((p, index) => {
                                    return (
                                      <>
                                        <h5 className="text-warning text-start">
                                           Adult {index + 1} detail
                                           <hr></hr>
                                        </h5>
                                        <div className="row">
                                          <div className="row">
                                            <h5 className="text-start">
                                              <u>Traveller details</u>
                                              <br />
                                            </h5>
                                          </div>
                                          <div className="col-md-12">
                                            <table className="table table-hover table-bordered">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Full name</th>
                                                  <th scope="col">Date of birth</th>
                                                  <th scope="col">Nationality</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.title +
                                                  " " +
                                                  p.firstName +
                                                  " " +
                                                  p.middleName +
                                                  " " +
                                                  p.lastName}</td>
                                                  <td>{p.date +
                                                  " " +
                                                  p.month +
                                                  " " +
                                                  p.year}</td>
                                                  <td>{p.nationality}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                        <div className="my-4">
                                          <h5 className="text-start">
                                            <u>Passport Document</u>
                                          </h5>
                                        </div>

                                        <div className="row">
                                          <div className="col-lg-12">
                                          <table className="table table-hover table-bordered">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Document Type</th>
                                                  <th scope="col">Passport Number</th>
                                                  <th scope="col">Issuing Country</th>
                                                  <th scope="col">Passport Expiry Date</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.document}</td>
                                                  <td>{p.passportNumber}</td>
                                                  <td>{p.issuingCountry}</td>
                                                  <td>{p.passportDate +
                                                  " " +
                                                  p.passportMonth +
                                                  " " +
                                                  p.passportYear}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                        {/* <div className="my-3" id={"baggage-infoa"+index}>
                                    <h6 className="text-success fw-bold text-start">Baggage Info</h6>
                                </div> */}
                                        {/* <div className="container border-bottom" id={"toggle-baggagea"+index}> */}
                                        {/* <div className="row">
                                    <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, {departure[1]}
                                            </span>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                    <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, {arrival[1]}
                                            </span>
                                    </div>
                                </div> */}
                                        {/* <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                        {direction0.segments[0].baggage[0].amount +' '+ direction0.segments[0].baggage[0].units}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}
                                        {/* {Object.keys(direction1).length>0? <><div className="row my-3"> */}
                                        {/* <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, {arrival[1]}
                                            </span>
                                    </div> */}
                                        {/* <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div> */}
                                        {/* <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, {departure[1]}
                                            </span>
                                    </div> */}
                                        {/* </div> */}
                                        {/* <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                          {direction1.segments[0].baggage[0].amount +' '+ direction1.segments[0].baggage[0].units}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div></> : <></>} */}

                                        {/* </div> */}
                                        <hr></hr>
                                      </>
                                    );
                        })}
                  </div>
                </div>
              </div>
              {child.length>0? <div className="accordion-item">
                <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseTwo"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseTwo"
                  >
                    Child ({child.length})
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingTwo"
                >
                  <div className="accordion-body">
                  {child.map((p, index) => {
                                    return (
                                      <>
                                        <h5 className="text-warning text-start">
                                           Child {index + 1} detail
                                           <hr></hr>
                                        </h5>
                                        <div className="row">
                                          <div className="row">
                                            <h5 className="text-start">
                                              <u>Traveller details</u>
                                              <br />
                                            </h5>
                                          </div>
                                          <div className="col-md-12">
                                            <table className="table table-hover table-bordered">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Full name</th>
                                                  <th scope="col">Date of birth</th>
                                                  <th scope="col">Nationality</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.title +
                                                  " " +
                                                  p.firstName +
                                                  " " +
                                                  p.middleName +
                                                  " " +
                                                  p.lastName}</td>
                                                  <td>{p.date +
                                                  " " +
                                                  p.month +
                                                  " " +
                                                  p.year}</td>
                                                  <td>{p.nationality}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                        <div className="my-4">
                                          <h5 className="text-start">
                                            <u>Passport Document</u>
                                          </h5>
                                        </div>

                                        <div className="row">
                                          <div className="col-lg-12">
                                          <table className="table table-hover table-bordered">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Document Type</th>
                                                  <th scope="col">Passport Number</th>
                                                  <th scope="col">Issuing Country</th>
                                                  <th scope="col">Passport Expiry Date</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.document}</td>
                                                  <td>{p.passportNumber}</td>
                                                  <td>{p.issuingCountry}</td>
                                                  <td>{p.passportDate +
                                                  " " +
                                                  p.passportMonth +
                                                  " " +
                                                  p.passportYear}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                        {/* <div className="my-3" id={"baggage-infoa"+index}>
                                    <h6 className="text-success fw-bold text-start">Baggage Info</h6>
                                </div> */}
                                        {/* <div className="container border-bottom" id={"toggle-baggagea"+index}> */}
                                        {/* <div className="row">
                                    <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, {departure[1]}
                                            </span>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                    <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, {arrival[1]}
                                            </span>
                                    </div>
                                </div> */}
                                        {/* <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                        {direction0.segments[0].baggage[0].amount +' '+ direction0.segments[0].baggage[0].units}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}
                                        {/* {Object.keys(direction1).length>0? <><div className="row my-3"> */}
                                        {/* <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, {arrival[1]}
                                            </span>
                                    </div> */}
                                        {/* <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div> */}
                                        {/* <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, {departure[1]}
                                            </span>
                                    </div> */}
                                        {/* </div> */}
                                        {/* <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                          {direction1.segments[0].baggage[0].amount +' '+ direction1.segments[0].baggage[0].units}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div></> : <></>} */}

                                        {/* </div> */}
                                        <hr></hr>
                                      </>
                                    );
                        })}
                  </div>
                </div>
              </div>:<></>}
             
              {infant.length>0? <div className="accordion-item"  >
                <h2 className="accordion-header" id="panelsStayOpen-headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#panelsStayOpen-collapseThree"
                    aria-expanded="false"
                    aria-controls="panelsStayOpen-collapseThree"
                  >
                    Infant ({infant.length})
                  </button>
                </h2>
                <div
                  id="panelsStayOpen-collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="panelsStayOpen-headingThree"
                >
                  <div className="accordion-body">
                  {infant.map((p, index) => {
                                    return (
                                      <>
                                        <h5 className="text-warning text-start">
                                           Infant {index + 1} detail
                                           <hr></hr>
                                        </h5>
                                        <div className="row">
                                          <div className="row">
                                            <h5 className="text-start">
                                              <u>Traveller details</u>
                                              <br />
                                            </h5>
                                          </div>
                                          <div className="col-md-12">
                                            <table className="table table-hover table-bordered">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Full name</th>
                                                  <th scope="col">Date of birth</th>
                                                  <th scope="col">Nationality</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.title +
                                                  " " +
                                                  p.firstName +
                                                  " " +
                                                  p.middleName +
                                                  " " +
                                                  p.lastName}</td>
                                                  <td>{p.date +
                                                  " " +
                                                  p.month +
                                                  " " +
                                                  p.year}</td>
                                                  <td>{p.nationality}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>

                                        <div className="my-4">
                                          <h5 className="text-start">
                                            <u>Passport Document</u>
                                          </h5>
                                        </div>

                                        <div className="row">
                                          <div className="col-lg-12">
                                          <table className="table table-hover table-bordered">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Document Type</th>
                                                  <th scope="col">Passport Number</th>
                                                  <th scope="col">Issuing Country</th>
                                                  <th scope="col">Passport Expiry Date</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.document}</td>
                                                  <td>{p.passportNumber}</td>
                                                  <td>{p.issuingCountry}</td>
                                                  <td>{p.passportDate +
                                                  " " +
                                                  p.passportMonth +
                                                  " " +
                                                  p.passportYear}</td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                        {/* <div className="my-3" id={"baggage-infoa"+index}>
                                    <h6 className="text-success fw-bold text-start">Baggage Info</h6>
                                </div> */}
                                        {/* <div className="container border-bottom" id={"toggle-baggagea"+index}> */}
                                        {/* <div className="row">
                                    <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, {departure[1]}
                                            </span>
                                    </div>
                                    <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div>
                                    <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, {arrival[1]}
                                            </span>
                                    </div>
                                </div> */}
                                        {/* <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                        {direction0.segments[0].baggage[0].amount +' '+ direction0.segments[0].baggage[0].units}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div> */}
                                        {/* {Object.keys(direction1).length>0? <><div className="row my-3"> */}
                                        {/* <div className="col-lg-4 text-start">
                                        <i className="fas fa-plane"></i>
                                            <span className="d-inline fs-6 fw-bold ms-1">
                                                Departure, {arrival[1]}
                                            </span>
                                    </div> */}
                                        {/* <div className="col-lg-1">
                                        <i className="fas fa-arrow-right"></i>
                                    </div> */}
                                        {/* <div className="col-lg-3">
                                            <span className="d-inline fs-6 fw-bold">
                                                Arrival, {departure[1]}
                                            </span>
                                    </div> */}
                                        {/* </div> */}
                                        {/* <div className="row pb-2">
                                    <div className="col-lg-7">
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Cabin baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                            7KG (max 1 Bag)
                                        </span>
                                        </div>
                                    </div>
                                    <div className="row my-2">
                                        <div className="col-lg-6 text-start">
                                        <i className="fas fa-briefcase fa-sm"></i>
                                        <span className="d-inline fs-6 ms-1">Checked baggage</span>
                                        </div>
                                        <div className="col-lg-6">
                                        <span className="d-inline fs-6 float-end">
                                          {direction1.segments[0].baggage[0].amount +' '+ direction1.segments[0].baggage[0].units}
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                </div></> : <></>} */}

                                        {/* </div> */}
                                        <hr></hr>
                                      </>
                                    );
                        })}
                  </div>
                </div>
              </div>:<></>}
             
            </div>
            <div className="card my-5">
                    <div className="card-body">
                        <div className="card-title h5 text-start">Contact details</div>                 
                        {contact.map((p, index) => {
                                    return (
                                        <>
                                           <div className="row">
                                                <div className="col-md-12">
                                                <table className="table table-hover">
                                              <thead>
                                                <tr>
                                                  <th scope="col">Full name</th>
                                                  <th scope="col">Email</th>
                                                  <th scope="col">Phone number</th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                <tr>
                                                  <td> {p.title +
                                                  " " +
                                                  p.firstName +
                                                  " " +
                                                  p.lastName}</td>
                                                  <td>{p.email}</td>
                                                  <td>{p.mobailCode+" "+p.mobailNumber}</td>
                                                </tr>
                                              </tbody>
                                              </table>            
                                            </div>
                                        </div>                
                                      </>
							);
                        })}
                        {/* <div>{JSON.stringify(contact, null, 2)}</div> */}
                    </div>
                </div> 
          </div>
          <div className="col-lg-4">
            <div className="container">
              <div className="row border ps-3 py-3">
                <div className="col-lg-6 text-start">
                  <span className="card-title fw-bold">Flight summary</span>
                </div>
                <div className="col-lg-6 text-end">
                <Link
              to=""
              className="my-auto flight-name text-center ms-4"
              data-bs-toggle="modal"
              data-bs-target={"#exampleModal" + 0}
            >
              Flight Details
            </Link>
                </div>
                <div className="row p-2">
                {
            
            flightType > 2 ? 
            <>
            <>
            <div className="col-lg-1 my-auto me-3">
              <img src={ImageUrlD} alt="" width="40px" height="40px" />
            </div>

            <div className="col-lg-2 my-auto">
              <span className="fw-bold">
                {direction0.segments[0].departure.substr(11, 5)}
              </span>
              <p className="my-auto">{direction0.from}</p>
            </div>
            <div className="col-lg-6 my-auto">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <span className="text-danger fw-bold font-size">
                    {direction0.stops === 0
                      ? "Direct"
                      : direction0.stops + " Stop"}
                  </span>
                </div>
                <div className="col-lg-12">
                  <span className="text-black-50">
                    -----------------------------
                    <i className="fas fa-plane fa-sm"></i>
                  </span>
                </div>
                <div className="col-lg-12 text-center ms-4">
                  <span className="text-black-50 me-5">
                    <i className="fas fa-clock fa-sm"></i>
                    <span className="ms-1 font-size">
                      {DurationFormat(
                        direction0.segments[0].details[0].travelTime
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-2 my-auto">
              <span className="fw-bold">
                {direction0.segments[
                  direction0.segments.length - 1
                ].arrival.substr(11, 5)}
              </span>
              <p className="my-auto">{direction0.to}</p>
            </div>
            
            </> 
            <>
<div className="col-lg-1 my-auto me-3">
  <img src={ImageUrlD} alt="" width="40px" height="40px" />
</div>

<div className="col-lg-2 my-auto">
  <span className="fw-bold">
    {direction1.segments[0].departure.substr(11, 5)}
  </span>
  <p className="my-auto">{direction1.from}</p>
</div>
<div className="col-lg-6 my-auto">
  <div className="row">
    <div className="col-lg-12 text-center">
      <span className="text-danger fw-bold font-size">
        {direction1.stops === 0
          ? "Direct"
          : direction1.stops + " Stop"}
      </span>
    </div>
    <div className="col-lg-12">
      <span className="text-black-50">
        -----------------------------
        <i className="fas fa-plane fa-sm"></i>
      </span>
    </div>
    <div className="col-lg-12 text-center ms-4">
      <span className="text-black-50 me-5">
        <i className="fas fa-clock fa-sm"></i>
        <span className="ms-1 font-size">
          {DurationFormat(
            direction1.segments[0].details[0].travelTime
          )}
        </span>
      </span>
    </div>
  </div>
</div>
<div className="col-lg-2 my-auto">
  <span className="fw-bold">
    {direction1.segments[
      direction1.segments.length - 1
    ].arrival.substr(11, 5)}
  </span>
  <p className="my-auto">{direction1.to}</p>
</div>

            </> 
            {
            direction2.segments!==undefined? 
           <>    
    <div className="col-lg-1 my-auto me-3">
        <img src={ImageUrlD} alt="" width="40px" height="40px" />
      </div>
      
      <div className="col-lg-2 my-auto">
        <span className="fw-bold">
          {direction2.segments[0].departure.substr(11, 5)}
        </span>
        <p className="my-auto">{direction2.from}</p>
      </div>
      <div className="col-lg-6 my-auto">
        <div className="row">
          <div className="col-lg-12 text-center">
            <span className="text-danger fw-bold font-size">
            {direction2.stops === 0
          ? "Direct"
          : direction2.stops + " Stop"}
            </span>
          </div>
          <div className="col-lg-12">
            <span className="text-black-50">
              -----------------------------
              <i className="fas fa-plane fa-sm"></i>
            </span>
          </div>
          <div className="col-lg-12 text-center ms-4">
            <span className="text-black-50 me-5">
              <i className="fas fa-clock fa-sm"></i>
              <span className="ms-1 font-size">
                {DurationFormat(
                  direction2.segments[0].details[0].travelTime
                )}
              </span>
            </span>
          </div>
        </div>
      </div>
      <div className="col-lg-2 my-auto">
        <span className="fw-bold">
          {direction2.segments[
            direction2.segments.length - 1
          ].arrival.substr(11, 5)}
        </span>
        <p className="my-auto">{direction2.to}</p>
      </div>
           </>:<></>
            }

            {
              direction3.segments!==undefined? 
                <>    
              <div className="col-lg-1 my-auto me-3">
              <img src={ImageUrlD} alt="" width="40px" height="40px" />
              </div>

              <div className="col-lg-2 my-auto">
              <span className="fw-bold">
                {direction3.segments[0].departure.substr(11, 5)}
              </span>
              <p className="my-auto">{direction3.from}</p>
              </div>
              <div className="col-lg-6 my-auto">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <span className="text-danger fw-bold font-size">
                  {direction3.stops === 0
          ? "Direct"
          : direction3.stops + " Stop"}
                  </span>
                </div>
                <div className="col-lg-12">
                  <span className="text-black-50">
                    -----------------------------
                    <i className="fas fa-plane fa-sm"></i>
                  </span>
                </div>
                <div className="col-lg-12 text-center ms-4">
                  <span className="text-black-50 me-5">
                    <i className="fas fa-clock fa-sm"></i>
                    <span className="ms-1 font-size">
                      {DurationFormat(
                        direction3.segments[0].details[0].travelTime
                      )}
                    </span>
                  </span>
                </div>
              </div>
              </div>
              <div className="col-lg-2 my-auto">
              <span className="fw-bold">
                {direction3.segments[
                  direction3.segments.length - 1
                ].arrival.substr(11, 5)}
              </span>
              <p className="my-auto">{direction3.to}</p>
              </div>
                </>:<></>
            }

            {
                direction4.segments!==undefined? 
              <>    
            <div className="col-lg-1 my-auto me-3">
            <img src={ImageUrlD} alt="" width="40px" height="40px" />
            </div>

            <div className="col-lg-2 my-auto">
            <span className="fw-bold">
              {direction4.segments[0].departure.substr(11, 5)}
            </span>
            <p className="my-auto">{direction4.from}</p>
            </div>
            <div className="col-lg-6 my-auto">
            <div className="row">
              <div className="col-lg-12 text-center">
                <span className="text-danger fw-bold font-size">
                {direction4.stops === 0
          ? "Direct"
          : direction4.stops + " Stop"}
                </span>
              </div>
              <div className="col-lg-12">
                <span className="text-black-50">
                  -----------------------------
                  <i className="fas fa-plane fa-sm"></i>
                </span>
              </div>
              <div className="col-lg-12 text-center ms-4">
                <span className="text-black-50 me-5">
                  <i className="fas fa-clock fa-sm"></i>
                  <span className="ms-1 font-size">
                    {DurationFormat(
                      direction4.segments[0].details[0].travelTime
                    )}
                  </span>
                </span>
              </div>
            </div>
            </div>
            <div className="col-lg-2 my-auto">
            <span className="fw-bold">
              {direction4.segments[
                direction4.segments.length - 1
              ].arrival.substr(11, 5)}
            </span>
            <p className="my-auto">{direction4.to}</p>
            </div>
              </>:<></>
            }

            {
                direction5.segments!==undefined? 
              <>    
            <div className="col-lg-1 my-auto me-3">
            <img src={ImageUrlD} alt="" width="40px" height="40px" />
            </div>

            <div className="col-lg-2 my-auto">
            <span className="fw-bold">
              {direction5.segments[0].departure.substr(11, 5)}
            </span>
            <p className="my-auto">{direction5.from}</p>
            </div>
            <div className="col-lg-6 my-auto">
            <div className="row">
              <div className="col-lg-12 text-center">
                <span className="text-danger fw-bold font-size">
                {direction5.stops === 0
          ? "Direct"
          : direction5.stops + " Stop"}
                </span>
              </div>
              <div className="col-lg-12">
                <span className="text-black-50">
                  -----------------------------
                  <i className="fas fa-plane fa-sm"></i>
                </span>
              </div>
              <div className="col-lg-12 text-center ms-4">
                <span className="text-black-50 me-5">
                  <i className="fas fa-clock fa-sm"></i>
                  <span className="ms-1 font-size">
                    {DurationFormat(
                      direction5.segments[0].details[0].travelTime
                    )}
                  </span>
                </span>
              </div>
            </div>
            </div>
            <div className="col-lg-2 my-auto">
            <span className="fw-bold">
              {direction5.segments[
                direction5.segments.length - 1
              ].arrival.substr(11, 5)}
            </span>
            <p className="my-auto">{direction5.to}</p>
            </div>
              </>:<></>
            }

            </> : 
            <>
            <div className="col-lg-1 my-auto me-3">
              <img src={ImageUrlD} alt="" width="40px" height="40px" />
            </div>

            <div className="col-lg-2 my-auto">
              <span className="fw-bold">
                {direction0.segments[0].departure.substr(11, 5)}
              </span>
              <p className="my-auto">{direction0.from}</p>
            </div>
            <div className="col-lg-6 my-auto">
              <div className="row">
                <div className="col-lg-12 text-center">
                  <span className="text-danger fw-bold font-size">
                  {direction0.stops === 0
          ? "Direct"
          : direction0.stops + " Stop"}
                  </span>
                </div>
                <div className="col-lg-12">
                  <span className="text-black-50">
                    -----------------------------
                    <i className="fas fa-plane fa-sm"></i>
                  </span>
                </div>
                <div className="col-lg-12 text-center ms-4">
                  <span className="text-black-50 me-5">
                    <i className="fas fa-clock fa-sm"></i>
                    <span className="ms-1 font-size">
                      {DurationFormat(
                        direction0.segments[0].details[0].travelTime
                      )}
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-2 my-auto">
              <span className="fw-bold">
                {direction0.segments[
                  direction0.segments.length - 1
                ].arrival.substr(11, 5)}
              </span>
              <p className="my-auto">{direction0.to}</p>
            </div>
            
            </>
               }
                  <div></div>
              {
              flightType > 2 ? 
              <>
              </> : 
              <>
              {Object.keys(direction1).length > 0 ? (
              <>
                <hr />{" "}
                <div className="col-lg-1 my-auto me-3">
                  <img src={ImageUrlR} alt="" width="40px" height="40px" />
                </div>
                <div className="col-lg-2 my-auto">
                  <span className="fw-bold">
                    {direction1.segments[0].departure.substr(11, 5)}
                  </span>
                  <p className="my-auto">{direction1.from}</p>
                </div>
                <div className="col-lg-6 my-auto">
                  <div className="row">
                    <div className="col-lg-12 text-center">
                      <span className="text-danger fw-bold font-size">
                      {direction1.stops === 0
          ? "Direct"
          : direction1.stops + " Stop"}
                      </span>
                    </div>
                    <div className="col-lg-12">
                      <span className="text-black-50">
                        -----------------------------
                        <i className="fas fa-plane fa-sm"></i>
                      </span>
                    </div>
                    <div className="col-lg-12 text-center ms-4">
                      <span className="text-black-50 me-5">
                        <i className="fas fa-clock fa-sm"></i>
                        <span className="ms-1 font-size">
                          {DurationFormat(
                            direction1.segments[0].details[0].travelTime
                          )}
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="col-lg-2 my-auto">
                  <span className="fw-bold">
                    {direction1.segments[
                      direction1.segments.length - 1
                    ].arrival.substr(11, 5)}
                  </span>
                  <p className="my-auto">{direction1.to}</p>
                </div>
              </>
            ) : (
              <></>
            )}
              </>
            }
                </div>
              </div>
              <div className="row border ps-3 py-3">
                <h5 className="fw-bold">Fare details</h5>
                <div className="row mt-2">
                  <div className="col-lg-6">
                    <h6 className="text-start">{adult.length} Adult</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">
                      BDT {adult.length * totalPrice.adt.totalPrice}
                    </h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start">Taxes & fees</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">BDT 0</h6>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <h6 className="text-start">VAT</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end">BDT 0</h6>
                  </div>
                </div>
                <div className="row border-top mt-2">
                  <div className="col-lg-6">
                    <h6 className="text-start fw-bold">Total(incl. VAT)</h6>
                  </div>
                  <div className="col-lg-6">
                    <h6 className="text-end fw-bold">
                      BDT{" "}
                      {adult.length * totalPrice.adt.totalPrice}
                    </h6>
                  </div>
                  <button type="submit" className="btn btn-danger w-100" onClick={bookingData}>
                    Confirm
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
        totalPrice={totalPrice}
        bookingComponents={bookingComponents}
        refundable={refundable}
      ></ShowModal>
      </div>
    </>
  );
};

export default TravellCartConfirm;
