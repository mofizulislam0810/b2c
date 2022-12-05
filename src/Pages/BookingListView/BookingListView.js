import axios from "axios";
import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router";
import { environment } from "../../environment";
import Loading from "../Loading/Loading";
import moment from "moment";
import tllLogo from "../../images/logo/logo-combined.png";
import ReactToPrint from "react-to-print";
import Navbar from "../SharedComponent/NavBar/Navbar";
import Footer from "../SharedComponent/Footer/Footer";

const BookingListView = () => {
  const componentRef = useRef();
  const [loading, setLoading] = useState(false);
  let [ticketingList, setTicketingList] = useState([]);
  let [passengerList, setPassengerList] = useState([]);
  let [userInfo, setUserInfo] = useState([]);
  const location = useLocation();
  const getUserInfo = async () => {
    setLoading(true);
    const response = await axios.get(
      environment.currentUserInfo,
      environment.headerToken
    );
    console.log(response);
    setUserInfo(response.data);
    setLoading(false);
  };
  const handleGetList = () => {
    setLoading(true);
    const getTicketingList = async () => {
      let sendObj = { transactionId: location.search.split("=")[1] };
      console.log(sendObj);
      const response = await axios.get(
        environment.getTicketingList + "/" +
        sendObj,
        environment.headerToken
      );
      setTicketingList(response.data);
      console.log(response.data);
      handleGetPassengerList(
        response.data[0]?.passengerIds,
        response.data[0]?.uniqueTransID
      );
    };
    getTicketingList();
  };

  const handleGetPassengerList = (ids, trid) => {
    const getPassengerList = async () => {
      const response = await axios.get(
        environment.passengerListByIds + "/" + ids + "/" + trid,
        environment.headerToken
      );
      passengerList = response.data;
      setPassengerList(response.data);
      setLoading(false);
    };
    getPassengerList();
  };
  useEffect(() => {
    handleGetList();
    getUserInfo();
  }, []);

  if (loading) {
    return <Loading flag={3} loading={loading}></Loading>;
  }
  return (
    <div>
        <Navbar></Navbar>
      <Loading loading={loading}></Loading>
      <div className="bg-light pb-3">
      <div className="container pt-3">
        <div className="row">
          <div className="col-lg-12">
            <h4 className="fw-bold text-center text-white bg-secondary p-2">
              Booking Information
            </h4>
            {/* <a className='btn btn-warning' href='/queues'>Back to List</a> */}
          </div>
        </div>
      </div>
      <div className="container mt-3 py-2">
        <div id="ui-view" data-select2-id="ui-view">
          <div>
            <div className="card box-shadow">
              <div className="card-header">
                
                  <div className="float-end" id="menu-item">
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn btn-sm btn-secondary float-right mr-1 d-print-none">
                          <span className="me-1">
                            <i className="fa fa-print"></i>
                          </span>
                          Print
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                  </div>
                  {/* <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                          data-bs-toggle="modal"
                          data-bs-target="#priceModal"
                        >
                          Edit Price
                        </a>
                      </li>
                      <li id="menu-item">
                        <a
                          href="javascript:void(0)"
                          className="btn btn-sm btn-secondary float-right mr-1 d-print-none"
                        >
                          Download
                        </a>
                      </li> */}
                
                {/* <span className="ms-3">
                  PNR : {ticketingList.length > 0 ? ticketingList[0]?.pnr : ""}
                  <strong> </strong>
                </span>
                <input
                  className="ms-3"
                  type={"checkbox"}
                  onChange={(e) => {
                    setIsFareHide(e.target.checked);
                  }}
                />{" "}
                Hide Fare Information */}
              </div>
              <div className="card-body" ref={componentRef}>
                <table class="table table-borderless mt-2 table-sm">
                  <tbody>
                    <tr>
                      <td className="text-start">
                        <img
                          alt="img01"
                          className="p-2"
                          src={tllLogo}
                          style={{ width: "150px", height: "50px" }}
                        ></img>
                      </td>
                      <td className="text-end">
                        <address>
                          {userInfo?.fullName}
                          <br />
                          {userInfo?.email}
                          <br />
                          {/* Baridhara Diplomatic Zone, Dhaka-1212, Bangladesh.
                              <br /> */}
                          +88{userInfo?.mobile}
                        </address>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="row mb-4">
                  <div className="col-lg-8">
                    <table class="table table-bordered my-2 mb-3 table-sm">
                      <thead>
                        <tr className="text-center">
                          <th>PASSENGER NAME</th>
                          <th>TYPE</th>
                          <th>TICKET NUMBER</th>
                        </tr>
                      </thead>
                      <tbody>
                        {passengerList.map((item, index) => {
                          return (
                            <tr className="text-center">
                              <td>
                                {item.title +
                                  " " +
                                  item.first +
                                  " " +
                                  item.middle +
                                  " " +
                                  item.last}
                              </td>
                              <td>{item.passengerType}</td>
                              <td>{item.ticketNumbers}</td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-lg-4">
                    <table class="table table-bordered my-2 mb-3 table-sm">
                      <tbody>
                        <tr>
                          <td className="fw-bold">TLL REFERENCE</td>
                          <td>TLL-220101987654</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">FLIGHT TYPE</td>
                          <td>Internation</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">JOURNEY TYPE</td>
                          <td>{ticketingList[0]?.journeyType}</td>
                        </tr>
                        <tr>
                          <td className="fw-bold">STATUS</td>
                          <td>Confirm</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="table-responsive-sm">
                  <p className="bg-dark p-2 text-start text-white">FLIGHT DETAILS</p>
                  {ticketingList.length > 0 ? (
                    <>
                      <table class="table table-borderless my-2 mb-3 table-sm lh-1">
                        <tbody>
                          <tr>
                            <td className="fw-bold align-middle" colSpan={3}>
                              <img
                                src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList[0].airlineCode}.png`}
                                className=""
                                alt=""
                                width="40px"
                                height="40px"
                              />
                              <span className="ms-2">
                                {ticketingList[0].airlineName}
                              </span>
                              <span
                                className="ms-2"
                                style={{ fontSize: "12px" }}
                              >
                                {/* ({item.plane[0]}) */}
                              </span>
                            </td>
                            <td>
                              <tr>
                                <td>DEPARTS - {ticketingList[0].origin}</td>
                              </tr>
                              <tr>
                                <td>
                                  ARRIVES - {ticketingList[0].destination}
                                </td>
                              </tr>
                            </td>

                            {/* <td>TLL-220101987654</td> */}
                          </tr>

                          <tr>
                            <td className="fw-bold lh-1">
                              <h5 className="fw-bold">
                                {ticketingList[0].origin}{" "}
                              </h5>
                              <h6>
                                {" "}
                                {moment(ticketingList[0].departure).format(
                                  "hh:mm:ss"
                                )}
                              </h6>
                              <h6>
                                <strong>
                                  {" "}
                                  {moment(ticketingList[0].departure).format(
                                    "DD-MMMM-yyyy ddd"
                                  )}
                                </strong>
                              </h6>
                            </td>
                            <td className="align-middle">
                              {" "}
                              <i class="fas fa-circle fa-xs"></i>
                              ------------------{" "}
                              <i className="fas fa-plane fa-sm"></i>
                            </td>
                            <td className="fw-bold">
                              <h5 className="fw-bold">
                                {ticketingList[0].destination}
                              </h5>
                              <h6>
                                {moment(ticketingList[0].arrival).format(
                                  "hh:mm:ss"
                                )}
                              </h6>
                              <h6>
                                <strong>
                                  {" "}
                                  {moment(ticketingList[0].arrival).format(
                                    "DD-MMMM-yyyy ddd"
                                  )}
                                </strong>
                              </h6>
                            </td>
                            <td className="align-middle">
                              <tr>
                                <td>BAGGAGE:</td>
                                <td> ADT25K, CHD-25K, INF-10K</td>
                              </tr>
                              <tr>
                                <td>AIRLINE PNR: </td>
                                <td>{ticketingList[0].pnr}</td>
                              </tr>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <></>
                  )}
                </div>

                <div className="table-responsive-sm">
                  <p className="bg-dark p-2 text-start text-white">FARE DETAILS</p>

                  <table class="table table-bordered my-2 mb-3 table-sm lh-1 text-center">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Base Price</th>
                        <th>Tax</th>
                        <th>AIT</th>
                        <th>Discount</th>

                        <th>Pax</th>
                        <th>Agent Additional Price</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {passengerList.map((item, index) => (
                        <>
                          {item.passengerType === "ADT" ? (
                            <>
                              <tr>
                                <td>Adult</td>
                                <td>{item.basePrice}</td>
                                <td>{item.tax}</td>

                                <td>{item.ait}</td>
                                <td>{item.discount}</td>
                                <td>{item.passengerCount}</td>
                                <td>{item.agentAdditionalPrice}</td>
                                <td className="fw-bold">
                                  BDT {item.totalPrice * item.passengerCount}
                                </td>
                              </tr>
                            </>
                          ) : item.passengerType === "CNN" ? (
                            <>
                              <tr>
                                <td>Child</td>
                                <td>{item.basePrice}</td>
                                <td>{item.tax}</td>

                                <td>{item.ait}</td>
                                <td>{item.discount}</td>
                                <td>{item.passengerCount}</td>
                                <td>{item.agentAdditionalPrice}</td>
                                <td className="fw-bold">
                                  BDT {item.totalPrice * item.passengerCount}
                                </td>
                              </tr>
                            </>
                          ) : item.passengerType === "INF" ? (
                            <>
                              <tr>
                                <td>Infant</td>
                                <td>{item.basePrice}</td>
                                <td>{item.tax}</td>

                                <td>{item.ait}</td>
                                <td>{item.discount}</td>
                                <td>{item.passengerCount}</td>
                                <td>{item.agentAdditionalPrice}</td>
                                <td className="fw-bold">
                                  BDT {item.totalPrice * item.passengerCount}
                                </td>
                              </tr>
                            </>
                          ) : (
                            <></>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pb-3">
                  <p className="bg-dark p-2 text-start text-white">
                    IMPORTANT NOTICE FOR TRAVELLERS
                  </p>
                  <p>
                    BAGGAGE DISCOUNTS MAY APPLY BASED ON FREQUENT FLYER
                    STATUS/ONLINE CHECKIN/FORM OF PAYMENT/MILITARY/ETC. Carriage
                    and other services provided by the carrier are subject to
                    conditions of carriage, which are hereby incorporated by
                    reference. These conditions may be obtained from the issuing
                    carrier. Passengers on a journey involving an ultimate
                    destination or a stop in a country other than the country of
                    departure are advised that international treaties known as
                    the Montreal Convention, or its predecessor, the Warsaw
                    Convention, including its amendments (the Warsaw Convention
                    System), may apply to the entire journey, including any
                    portion thereof within a country.
                  </p>
                </div>
              </div>
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default BookingListView;
