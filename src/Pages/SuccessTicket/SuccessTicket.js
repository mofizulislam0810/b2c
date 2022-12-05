import React, { useState, useEffect, useRef } from "react";
import Navbar from "../SharedComponent/NavBar/Navbar";
import moment from "moment";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { environment } from "../../environment";
import tllLogo from "../../images/logo/logo-combined.png";
import ReactToPrint from "react-to-print";
import Footer from "../SharedComponent/Footer/Footer";
import "./SuccessTicket.css";
import airports from "../../JSON/airports.json";
import useAuth from "../../hooks/useAuth";
import Progressbar from "../SharedComponent/Progressbar/Progressbar";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


const SuccessTicket = () => {
  pdfMake.vfs = pdfFonts.pdfMake.vfs;
  const { gatewayCharge } = useAuth();
  let [ticketingList, setTicketingList] = useState();
  // let [passengerList, setPassengerList] = useState([]);
  const searchData = JSON.parse(sessionStorage.getItem("Database"));
  const charge = JSON.parse(localStorage.getItem("charge"));
  const location = useLocation();
  console.log(location);
  let response = location.search.split("=")[1];
  console.log(response);
  const componentRef = useRef();
  const handleGetList = () => {
    const getTicketingList = async () => {
      let sendObj = location.search.split("=")[1];
      console.log(sendObj);
      const url = environment.getTicketingDetails + "/" + sendObj;
      console.log(url);
      const response = await axios.get(
        environment.getTicketingDetails + "/" + sendObj,
        environment.headerToken
      );
      setTicketingList(await response.data);
      console.log(response.data);
    };
    getTicketingList();
  };
  console.log(ticketingList);

  useEffect(() => {
    handleGetList();
  }, []);
  const printTicket = () => {
    var dd = {
      content: [
        {
          text: 'TICKET COPY',
          style: 'header',
          alignment: 'center'
        },
        {
          columns: [
            {
              image: 'mySuperImage', alignment: 'left', fontSize: 8, fit: [100, 100],
            },
            {
              text: 'Triplover Limited\nHouse-95, Suhrawardy Avenue\nBaridhara Diplomatic Zone\nDhaka-1212, Bangladesh.\nPhone: +8809613345345\nEmail: support@triplover.com', alignment: 'right', fontSize: 8
            },

          ]
        },
        '\n',
        {
          columns: [
            {
              text: `Booking Reference :${ticketingList?.pnr}`, alignment: 'left', fontSize: 8
            },
            {
              text: `Issue Date :${moment(ticketingList?.issueDate).format("DD-MMMM-YYYY")}`, alignment: 'right', fontSize: 8
            }
          ]
        },
        '\n',
        {
          alignment: '',
          columns: [
            {
              width: 381,
              fontSize: 8,
              table: {
                body: [
                  [{ text: 'PASSENGER NAME', fillColor: '#CCCCCC' }, { text: 'TYPE', fillColor: '#CCCCCC' }, { text: 'TICKET NUMBER', fillColor: '#CCCCCC' }]]
                  .concat(ticketingList?.ticketInfoes.map((item, index) =>
                    [{ text: item.passengerInfo.nameElement.title + " " + item.passengerInfo.nameElement.firstName + " " + item.passengerInfo.nameElement.lastName }, { text: item.passengerInfo.passengerType }, { text: item.ticketNumbers[0] }])
                  )

              }
            },
            {
              widths: ['*'], fontSize: 8,
              table: {
                body: [
                  [{ text: 'BOOKING ID', fillColor: '#CCCCCC' }, `${ticketingList?.uniqueTransID}`],
                  [{ text: 'FLIGHT TYPE', fillColor: '#CCCCCC' }, `${ticketingList?.flightType}`],
                  [{ text: 'JOURNEY TYPE', fillColor: '#CCCCCC' }, `${ticketingList?.journeyType}`],
                  [{ text: 'STATUS', fillColor: '#CCCCCC' }, `${ticketingList?.status}`],
                ]

              }
            }
          ]
        },
        {
          margin: [0, 15, 0, 5],
          fontSize: 8,
          table: {
            body: [
              [{ text: 'FLIGHT DETAILS', style: 'tableHeader', alignment: 'feft', fillColor: '#CCCCCC' }],
            ],
            widths: ['*']
          }
        },
        
        {
          fontSize: 8,
          table: {
            body: [
              [{ image: 'strawberries', style: 'tableHeader', alignment: 'center', rowSpan: 2,fit: [30, 30] }, { text: ticketingList?.flightInfo.directions[0][0].segments[0].airline+'\n'+ticketingList?.flightInfo.directions[0][0].segments[0].plane[0], rowSpan: 2 }, { text: 'DEPARTS' }, { text: ticketingList?.flightInfo.directions[0][0].segments[0].fromAirport }],
              [{}, {}, { text: 'ARRIVES' }, { text: ticketingList?.flightInfo.directions[0][0].segments[0].toAirport }],
              [{ text: [{ text: ticketingList?.flightInfo.directions[0][0].segments[0].from+" "+ moment(ticketingList?.flightInfo.directions[0][0].segments[0].departure).format("hh:mm A")}, { text: "----------" }, { text: ticketingList?.flightInfo.directions[0][0].segments[0].to+" "+ moment(ticketingList?.flightInfo.directions[0][0].segments[0].arrival).format("hh:mm A"), alignment: 'justify' },], style: 'tableHeader', alignment: 'center', rowSpan: 3, colSpan: 2, margin: [0, 16, 0, 0] }, {}, { text: ticketingList?.flightInfo
                .directions[0][0].platingCarrierCode + ' ' +ticketingList?.flightInfo.directions[0][0].segments[0].flightNumber }, { text: 'ECONOMY' }],
              [{}, {}, { text: 'BAGGAGE' }, { text: 'ADT-20Kg' }],
              [{}, {}, { text: 'AIRLINE PNR' }, { text: ticketingList?.pnr}],
            ],
            widths: [40, '*', 60, '*']
          }
        },
        ticketingList?.flightInfo.directions[1] !== undefined ?
        {
          margin: [0, 5],
          fontSize: 8,
          table: {
            body: [
              [{ image: 'strawberries', style: 'tableHeader', alignment: 'center', rowSpan: 2,fit: [30, 30] }, { text: ticketingList?.flightInfo.directions[1][0].segments[0].airline+'\n'+ticketingList?.flightInfo.directions[1][0].segments[0].plane[0], rowSpan: 2 }, { text: 'DEPARTS' }, { text: ticketingList?.flightInfo.directions[1][0].segments[0].fromAirport }],
              [{}, {}, { text: 'ARRIVES' }, { text: ticketingList?.flightInfo.directions[1][0].segments[0].toAirport }],
              [{ text: [{ text: ticketingList?.flightInfo.directions[1][0].segments[0].from+" "+ moment(ticketingList?.flightInfo.directions[1][0].segments[0].departure).format("hh:mm A")}, { text: "----------" }, { text: ticketingList?.flightInfo.directions[1][0].segments[0].to+" "+ moment(ticketingList?.flightInfo.directions[1][0].segments[0].arrival).format("hh:mm A"), alignment: 'justify' },], style: 'tableHeader', alignment: 'center', rowSpan: 3, colSpan: 2, margin: [0, 16, 0, 0] }, {}, { text: ticketingList?.flightInfo
                .directions[1][0].platingCarrierCode + ' ' +ticketingList?.flightInfo.directions[1][0].segments[0].flightNumber }, { text: 'ECONOMY' }],
              [{}, {}, { text: 'BAGGAGE' }, { text: 'ADT-20Kg' }],
              [{}, {}, { text: 'AIRLINE PNR' }, { text: ticketingList?.pnr}],
            ],
            widths: [40, '*', 60, '*']
          }
        }: '\n',
        {
          margin: [0, 15, 0, 5],
          fontSize: 8,
          table: {
            body: [
              [{ text: 'FARE DETAILS', style: 'tableHeader', alignment: 'feft', fillColor: '#CCCCCC' }],
            ],
            widths: ['*']
          }
        },

        ticketingList?.flightInfo.passengerFares.adt !== null &&  ticketingList?.flightInfo.passengerFares.cnn === null &&  ticketingList?.flightInfo.passengerFares.inf === null ?
        {
          fontSize: 8,
          table: {
            body: [
              [{ text: 'TYPE', style: 'tableHeader', alignment: 'center' }, { text: 'BASE FARE' }, { text: 'TAX' }, { text: 'PERSON' }, { text: 'TOTAL' }],
              [{ text: "Adult" }, { text: ticketingList?.flightInfo.passengerFares.adt.basePrice }, { text: ticketingList?.flightInfo.passengerFares.adt.taxes }, { text: ticketingList?.flightInfo.passengerCounts.adt }, { text: (ticketingList?.flightInfo.passengerFares.adt.basePrice + ticketingList?.flightInfo.passengerFares.adt.taxes) * ticketingList?.flightInfo.passengerCounts.adt }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(+) AIT' }, { text: ticketingList?.flightInfo.bookingComponents[0].ait }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(+) Convenience fee' }, {
                text: Math.round(
                  (ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                    ticketingList?.flightInfo
                      .bookingComponents[0].taxes +
                    ticketingList?.flightInfo
                      .bookingComponents[0].ait) *
                  (4.5 / 100)
                )
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(=) Subtotal' }, {
                text: Math.round(
                  ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                  ticketingList?.flightInfo
                    .bookingComponents[0].taxes +
                  ticketingList?.flightInfo
                    .bookingComponents[0].ait +
                  Math.round(
                    (ticketingList?.flightInfo
                      .bookingComponents[0]
                      .basePrice +
                      ticketingList?.flightInfo
                        .bookingComponents[0].taxes +
                      ticketingList?.flightInfo
                        .bookingComponents[0].ait) *
                    (4.5 / 100)
                  )
                )
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(-) Discount' }, {
                text: ticketingList?.flightInfo
                  .bookingComponents[0].discountPrice
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: 'GRAND TOTAL' }, {
                text: Math.round(
                  ticketingList?.flightInfo
                    .bookingComponents[0].totalPrice +
                  (ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                    ticketingList?.flightInfo
                      .bookingComponents[0].taxes +
                    ticketingList?.flightInfo
                      .bookingComponents[0].ait) *
                  (4.5 / 100)
                )
              }],

            ],
            widths: ['*', '*', '*', '*', '*']
          }
        } : {},
        ticketingList?.flightInfo.passengerFares.adt !== null &&  ticketingList?.flightInfo.passengerFares.cnn !== null &&  ticketingList?.flightInfo.passengerFares.inf === null ?
        {
          fontSize: 8,
          table: {
            body: [
              [{ text: 'TYPE', style: 'tableHeader', alignment: 'center' }, { text: 'BASE FARE' }, { text: 'TAX' }, { text: 'PERSON' }, { text: 'TOTAL' }],
              [{ text: "Adult" }, { text: ticketingList?.flightInfo.passengerFares.adt.basePrice }, { text: ticketingList?.flightInfo.passengerFares.adt.taxes }, { text: ticketingList?.flightInfo.passengerCounts.adt }, { text: (ticketingList?.flightInfo.passengerFares.adt.basePrice + ticketingList?.flightInfo.passengerFares.adt.taxes) * ticketingList?.flightInfo.passengerCounts.adt }],
              [{ text: "Child" }, { text: ticketingList?.flightInfo.passengerFares.cnn.basePrice }, { text: ticketingList?.flightInfo.passengerFares.cnn.taxes }, { text: ticketingList?.flightInfo.passengerCounts.cnn }, { text: (ticketingList?.flightInfo.passengerFares.cnn.basePrice + ticketingList?.flightInfo.passengerFares.cnn.taxes) * ticketingList?.flightInfo.passengerCounts.cnn }],  
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(+) AIT' }, { text: ticketingList?.flightInfo.bookingComponents[0].ait }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(+) Convenience fee' }, {
                text: Math.round(
                  (ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                    ticketingList?.flightInfo
                      .bookingComponents[0].taxes +
                    ticketingList?.flightInfo
                      .bookingComponents[0].ait) *
                  (4.5 / 100)
                )
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(=) Subtotal' }, {
                text: Math.round(
                  ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                  ticketingList?.flightInfo
                    .bookingComponents[0].taxes +
                  ticketingList?.flightInfo
                    .bookingComponents[0].ait +
                  Math.round(
                    (ticketingList?.flightInfo
                      .bookingComponents[0]
                      .basePrice +
                      ticketingList?.flightInfo
                        .bookingComponents[0].taxes +
                      ticketingList?.flightInfo
                        .bookingComponents[0].ait) *
                    (4.5 / 100)
                  )
                )
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(-) Discount' }, {
                text: ticketingList?.flightInfo
                  .bookingComponents[0].discountPrice
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: 'GRAND TOTAL' }, {
                text: Math.round(
                  ticketingList?.flightInfo
                    .bookingComponents[0].totalPrice +
                  (ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                    ticketingList?.flightInfo
                      .bookingComponents[0].taxes +
                    ticketingList?.flightInfo
                      .bookingComponents[0].ait) *
                  (4.5 / 100)
                )
              }],

            ],
            widths: ['*', '*', '*', '*', '*']
          }
        } : {},
        ticketingList?.flightInfo.passengerFares.adt !== null &&  ticketingList?.flightInfo.passengerFares.cnn !== null &&  ticketingList?.flightInfo.passengerFares.inf !== null ?
        {
          fontSize: 8,
          table: {
            body: [
              [{ text: 'TYPE', style: 'tableHeader', alignment: 'center' }, { text: 'BASE FARE' }, { text: 'TAX' }, { text: 'PERSON' }, { text: 'TOTAL' }],
              [{ text: "Adult" }, { text: ticketingList?.flightInfo.passengerFares.adt.basePrice }, { text: ticketingList?.flightInfo.passengerFares.adt.taxes }, { text: ticketingList?.flightInfo.passengerCounts.adt }, { text: (ticketingList?.flightInfo.passengerFares.adt.basePrice + ticketingList?.flightInfo.passengerFares.adt.taxes) * ticketingList?.flightInfo.passengerCounts.adt }],
              [{ text: "Child" }, { text: ticketingList?.flightInfo.passengerFares.cnn.basePrice }, { text: ticketingList?.flightInfo.passengerFares.cnn.taxes }, { text: ticketingList?.flightInfo.passengerCounts.cnn }, { text: (ticketingList?.flightInfo.passengerFares.cnn.basePrice + ticketingList?.flightInfo.passengerFares.cnn.taxes) * ticketingList?.flightInfo.passengerCounts.cnn }], 
              [{ text: "Infant" }, { text: ticketingList?.flightInfo.passengerFares.inf.basePrice }, { text: ticketingList?.flightInfo.passengerFares.inf.taxes }, { text: ticketingList?.flightInfo.passengerCounts.inf }, { text: (ticketingList?.flightInfo.passengerFares.inf.basePrice + ticketingList?.flightInfo.passengerFares.inf.taxes) * ticketingList?.flightInfo.passengerCounts.inf }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(+) AIT' }, { text: ticketingList?.flightInfo.bookingComponents[0].ait }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(+) Convenience fee' }, {
                text: Math.round(
                  (ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                    ticketingList?.flightInfo
                      .bookingComponents[0].taxes +
                    ticketingList?.flightInfo
                      .bookingComponents[0].ait) *
                  (4.5 / 100)
                )
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(=) Subtotal' }, {
                text: Math.round(
                  ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                  ticketingList?.flightInfo
                    .bookingComponents[0].taxes +
                  ticketingList?.flightInfo
                    .bookingComponents[0].ait +
                  Math.round(
                    (ticketingList?.flightInfo
                      .bookingComponents[0]
                      .basePrice +
                      ticketingList?.flightInfo
                        .bookingComponents[0].taxes +
                      ticketingList?.flightInfo
                        .bookingComponents[0].ait) *
                    (4.5 / 100)
                  )
                )
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: '(-) Discount' }, {
                text: ticketingList?.flightInfo
                  .bookingComponents[0].discountPrice
              }],
              [{ text: '', style: 'tableHeader', alignment: 'center', colSpan: 3, border: [false, false, false, false] }, {}, {}, { text: 'GRAND TOTAL' }, {
                text: Math.round(
                  ticketingList?.flightInfo
                    .bookingComponents[0].totalPrice +
                  (ticketingList?.flightInfo
                    .bookingComponents[0].basePrice +
                    ticketingList?.flightInfo
                      .bookingComponents[0].taxes +
                    ticketingList?.flightInfo
                      .bookingComponents[0].ait) *
                  (4.5 / 100)
                )
              }],

            ],
            widths: ['*', '*', '*', '*', '*']
          }
        } : {},

        {
          margin: [0, 15, 0, 5],
          fontSize: 8,
          table: {
            body: [
              [{ text: 'IMPORTANT NOTICE FOR TRAVELLERS', style: 'tableHeader', alignment: 'feft', fillColor: '#CCCCCC' }],
            ],
            widths: ['*']
          }
        },
        {
          text: '* This receipt will be required at check-in, and must be presented to immigration and customs if requested.', fontSize: 8
        },
        {
          text: '* Your identity document / passport is required for all passengers on all flights both domestic and international.', fontSize: 8
        },
        {
          text: '* Please report at check-in counter 1 hour before Domestic flights & 3 hours before International flights.', fontSize: 8
        },
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
        },
        bigger: {
          fontSize: 15,
          italics: true,
        },
      },
      images: {
        mySuperImage: 'data:image/png;base64,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',
    
        // in browser is supported loading images via url (https or http protocol) (minimal version: 0.1.67)
  // snow: `https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[0][0].platingCarrierCode}.png`,
    
        // is supported loading images via url with custom headers (minimal version: 0.2.5)
        strawberries: `https://c.fareportal.com/n/common/air/3x/${ticketingList?.flightInfo.directions[0][0].platingCarrierCode}.png`
      }
    };
    pdfMake.createPdf(dd).open();
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="py-5 bg-color">
        <div className="container pt-5 pb-3">
          <div className="row">
            <div className="col-lg-12">
              <Progressbar flag={3}></Progressbar>
              {/* <h4 className="fw-bold text-center bg-white text-dark p-2">
                THANK YOU
              </h4> */}
              {/* <a className='btn btn-warning' href='/queues'>Back to List</a> */}
            </div>
          </div>
        </div>
        <div className="container py-2">
          <div id="ui-view" data-select2-id="ui-view">
            <div className="bg-white">
              <div className="card box-shadow ">
                <div className="card-header">
                  <span className="float-start fw-bold fs-5">
                    Confirmed Itinerary Details
                  </span>

                  <span className="float-end">
                    <button className="btn btn-sm btn-secondary float-right me-1 d-print-none" onClick={printTicket}>
                      <span className="me-1">
                        <i class="fa fa-download" aria-hidden="true"></i>
                      </span>
                      Download
                    </button>
                    {/* <button className="btn btn-sm btn-secondary float-right me-1 d-print-none">
                      <span className="me-1">
                        <i class="fa fa-envelope" aria-hidden="true"></i>
                      </span>
                      Email
                    </button> */}
                    <ReactToPrint
                      trigger={() => (
                        <button className="btn btn-sm btn-secondary float-right me-1 d-print-none">
                          <span className="me-1">
                            <i className="fa fa-print"></i>
                          </span>
                          Print
                        </button>
                      )}
                      content={() => componentRef.current}
                    />
                  </span>
                </div>
                <div className="card-body" ref={componentRef}>
                  <table class="table table-borderless table-sm">
                    <tbody>
                      <tr>
                        <td className="text-start bg-white">
                          <img
                            alt="img01"
                            className="p-2"
                            src={tllLogo}
                          // style={{ width: "40%", height: "70%" }}
                          ></img>
                        </td>
                        <td className="text-end bg-white">
                          <address>
                            <span className="fw-bold fs-6">
                              Triplover Limited
                            </span>
                            <br />
                            <div
                              className="mt-2"
                              style={{ fontSize: "10px", lineHeight: "12px" }}
                            >
                              House-95, Suhrawardy Avenue
                              <br />
                              Baridhara Diplomatic Zone<br></br>
                              Dhaka-1212, Bangladesh.
                              <br></br>
                              Phone: +8809613345345<br></br>
                              Email: support@triplover.com
                            </div>
                          </address>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <table
                    class="table table-borderless my-1 table-sm"
                    style={{ fontSize: "10px" }}
                  >
                    <tbody>
                      <tr>
                        <td
                          className="text-start bg-white"
                          style={{ width: "10%" }}
                        >
                          Booking Reference :{" "}
                          <span className="fw-bold fs-6">
                            {ticketingList?.pnr}
                          </span>
                        </td>
                        <td
                          className="text-end bg-white"
                          style={{ width: "10%" }}
                        >
                          Issue Date :{" "}
                          <span className="fw-bold">
                            {" "}
                            {moment(ticketingList?.issueDate).format(
                              "DD-MMMM-YYYY"
                            )}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div className="d-flex gap-3 pt-3">
                    <div className="">
                      <table
                        class="table table-borderless table-secondary table-sm"
                        style={{ fontSize: "10px" }}
                      >
                        <thead style={{ width: "100%" }}>
                          <tr className="text-start">
                            <th>PASSENGER NAME</th>
                            <th
                              className="text-center"
                              style={{ width: "10%" }}
                            >
                              TYPE
                            </th>
                            <th style={{ width: "25%" }}>TICKET NUMBER</th>
                            {ticketingList?.flightType === "Domestic" ? (
                              <></>
                            ) : (
                              <th style={{ width: "30%" }}>PASSPORT NUMBER</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {ticketingList?.ticketInfoes.map((item, index) => {
                            return (
                              <tr className="text-start">
                                <td>
                                  {item.passengerInfo.nameElement.title ===
                                    "Mstr"
                                    ? "Master"
                                    : item.passengerInfo.nameElement.title}{" "}
                                  {item.passengerInfo.nameElement.firstName}{" "}
                                  {item.passengerInfo.nameElement.lastName}
                                </td>
                                <td
                                  className="text-center"
                                  style={{ width: "10%" }}
                                >
                                  {item.passengerInfo.passengerType}
                                </td>
                                <td style={{ width: "25%" }}>
                                  {item.ticketNumbers[0]}
                                </td>
                                {ticketingList?.flightType === "Domestic" ? (
                                  <></>
                                ) : (
                                  <td style={{ width: "30%" }}>
                                    {
                                      item.passengerInfo.documentInfo
                                        .documentNumber
                                    }
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="">
                      <table
                        class="table table-borderless table-secondary table-sm float-end"
                        style={{ fontSize: "10px", width: "45%" }}
                      >
                        <tbody className="text-start">
                          <tr>
                            <td className="fw-bold">BOOKING ID</td>
                            <td>{ticketingList?.uniqueTransID}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">FLIGHT TYPE</td>
                            <td>{ticketingList?.flightType}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">JOURNEY TYPE</td>
                            <td>{ticketingList?.journeyType}</td>
                          </tr>
                          <tr>
                            <td className="fw-bold">STATUS</td>
                            <td>{ticketingList?.status}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="table-responsive-sm mt-2">
                    <p
                      className="bg-secondary p-1 fw-bold text-start text-white"
                      style={{ fontSize: "10px" }}
                    >
                      FLIGHT DETAILS
                    </p>
                    <table
                      class="table table-borderless table-sm"
                      style={{ fontSize: "10px", lineHeight: "1px" }}
                    >
                      {ticketingList?.flightInfo.directions[0][0].segments.map(
                        (item, index) => (
                          <tbody>
                            <tr>
                              <td
                                className="fw-bold text-start d-flex bg-white align-items-center"
                                style={{ paddingTop: "2px" }}
                                colSpan={1}
                              >
                                <img
                                  src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[0][0].platingCarrierCode}.png`}
                                  className=""
                                  alt=""
                                  width="40px"
                                  height="40px"
                                />
                                <div className="align-middle">
                                  <h6 className="ms-2 h6-line-height">
                                    {item.airline}
                                  </h6>
                                  <h6
                                    className="ms-2 pt-1 h6-line-height"
                                    style={{
                                      fontSize: "12px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    ({item.plane[0]})
                                  </h6>
                                </div>
                              </td>
                              <td
                                className="bg-white"
                                style={{ lineHeight: "10px" }}
                              >
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px", width: "20%" }}
                                  >
                                    DEPARTS
                                  </td>
                                  <td className="text-start">
                                    {" "}
                                    <span>
                                      {item.fromAirport},{" "}
                                      {item.details[0].originTerminal ===
                                        null ? (
                                        ""
                                      ) : (
                                        <span>
                                          Terminal{" "}
                                          {item.details[0].originTerminal},
                                        </span>
                                      )}
                                      {airports
                                        .filter((f) => f.iata === item.from)
                                        .map((item) => item.city)}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px", width: "20%" }}
                                  >
                                    {" "}
                                    ARRIVES
                                  </td>
                                  <td className="text-start">
                                    {" "}
                                    <sapn>
                                      {item.toAirport},{" "}
                                      {item.details[0].destinationTerminal ===
                                        null ? (
                                        ""
                                      ) : (
                                        <span>
                                          Terminal{" "}
                                          {item.details[0].destinationTerminal},
                                        </span>
                                      )}
                                      {airports
                                        .filter((f) => f.iata === item.to)
                                        .map((item) => item.city)}
                                    </sapn>
                                  </td>
                                </tr>
                              </td>
                            </tr>

                            <tr>
                              <td className="text-start bg-white" colSpan={1}>
                                <tr>
                                  <td>
                                    <h6 className="fw-bold h6-line-height">
                                      {item.from}
                                    </h6>
                                    <h6
                                      className="h6-line-height"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {moment(item.departure).format("hh:mm A")}
                                    </h6>
                                    <h6
                                      className="text-secondary h6-line-height"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {moment(item.departure).format(
                                        "DD-MMMM-yyyy ddd"
                                      )}
                                    </h6>
                                  </td>
                                  <td className="align-middle">
                                    <i class="fas fa-circle fa-xs"></i>
                                    --------------{" "}
                                    <i className="fas fa-plane fa-sm"></i>
                                    {/* <img src={icon} alt="" width={"150px"} height={"50px"}/> */}
                                  </td>
                                  <td>
                                    <h6 className="fw-bold h6-line-height">
                                      {item.to}
                                    </h6>
                                    <h6
                                      className="h6-line-height"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {moment(item.arrival).format("hh:mm A")}
                                    </h6>
                                    <h6
                                      className="text-secondary h6-line-height"
                                      style={{ fontSize: "12px" }}
                                    >
                                      {" "}
                                      {moment(item.arrival).format(
                                        "DD-MMMM-yyyy ddd"
                                      )}
                                    </h6>
                                  </td>
                                </tr>
                              </td>
                              <td
                                className="bg-white"
                                style={{
                                  lineHeight: "10px",
                                  paddingTop: "0px",
                                }}
                              >
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px", width: "20%" }}
                                  >
                                    <span className="fw-bold fs-6">
                                      {
                                        ticketingList?.flightInfo
                                          .directions[0][0].platingCarrierCode
                                      }{" "}
                                      {item.flightNumber}
                                    </span>
                                  </td>
                                  <td className="text-start">
                                    {" "}
                                    <span className="fw-bold fs-6">
                                      {item.serviceClass === "Y"
                                        ? "ECONOMY"
                                        : item.serviceClass === "C"
                                          ? "BUSINESS CLASS"
                                          : item.serviceClass}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px", width: "20%" }}
                                  >
                                    {" "}
                                    BAGGAGE
                                  </td>
                                  <td className="text-start">
                                    {" "}
                                    <span>
                                      ADT-
                                      {item.baggage[0].amount +
                                        item.baggage[0].units}
                                      {ticketingList?.flightInfo.passengerCounts
                                        .cnn > 0 ? (
                                        <>
                                          , CHD-
                                          {item.baggage[0].amount +
                                            item.baggage[0].units}
                                        </>
                                      ) : (
                                        <></>
                                      )}
                                    </span>
                                  </td>
                                </tr>
                                <tr>
                                  <td
                                    className="text-start bg-white"
                                    style={{ fontSize: "11px", width: "20%" }}
                                  >
                                    {" "}
                                    AIRLINE PNR
                                  </td>
                                  <td className="text-start">
                                    {" "}
                                    <span>{ticketingList?.pnr}</span>
                                  </td>
                                </tr>
                              </td>
                            </tr>
                          </tbody>
                        )
                      )}
                    </table>

                    {ticketingList?.flightInfo.directions[1] !== undefined ? (
                      <>
                        <>
                          <hr></hr>
                          <table
                            class="table table-borderless table-sm"
                            style={{ fontSize: "10px", lineHeight: "5px" }}
                          >
                            {ticketingList?.flightInfo.directions[1][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold text-start d-flex bg-white align-items-center"
                                      style={{ paddingTop: "2px" }}
                                      colSpan={1}
                                    >
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[1][0].platingCarrierCode}.png`}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />
                                      <div className="align-middle">
                                        <h6 className="ms-2 h6-line-height">
                                          {item.airline}
                                        </h6>
                                        <h6
                                          className="ms-2 pt-1 h6-line-height"
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          ({item.plane[0]})
                                        </h6>
                                      </div>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{ lineHeight: "10px" }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          DEPARTS
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            {item.fromAirport},{" "}
                                            {item.details[0].originTerminal ===
                                              null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {item.details[0].originTerminal}
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter(
                                                (f) => f.iata === item.from
                                              )
                                              .map((item) => item.city)}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          ARRIVES
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <sapn>
                                            {item.toAirport},{" "}
                                            {item.details[0]
                                              .destinationTerminal === null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {
                                                  item.details[0]
                                                    .destinationTerminal
                                                }
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter((f) => f.iata === item.to)
                                              .map((item) => item.city)}
                                          </sapn>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td
                                      className="text-start bg-white"
                                      colSpan={1}
                                    >
                                      <tr>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.from}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                        <td className="align-middle">
                                          <i class="fas fa-circle fa-xs"></i>
                                          --------------{" "}
                                          <i className="fas fa-plane fa-sm"></i>
                                        </td>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.to}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {moment(item.arrival).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                      </tr>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{
                                        lineHeight: "10px",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          <span className="fw-bold fs-6">
                                            {
                                              ticketingList?.flightInfo
                                                .directions[1][0]
                                                .platingCarrierCode
                                            }{" "}
                                            {item.flightNumber}
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span className="fw-bold fs-6">
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS"
                                                : item.serviceClass}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          BAGGAGE
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            ADT-
                                            {item.baggage[0].amount +
                                              item.baggage[0].units}
                                            {ticketingList?.flightInfo
                                              .passengerCounts.cnn > 0 ? (
                                              <>
                                                , CHD-
                                                {item.baggage[0].amount +
                                                  item.baggage[0].units}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          AIRLINE PNR
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>{ticketingList?.pnr}</span>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </>
                      </>
                    ) : (
                      <></>
                    )}

                    {ticketingList?.flightInfo.directions[2] !== undefined ? (
                      <>
                        <>
                          <hr></hr>
                          <table
                            class="table table-borderless table-sm"
                            style={{ fontSize: "10px", lineHeight: "5px" }}
                          >
                            {ticketingList?.flightInfo.directions[2][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold text-start d-flex bg-white align-items-center"
                                      style={{ paddingTop: "2px" }}
                                      colSpan={1}
                                    >
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[2][0].platingCarrierCode}.png`}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />
                                      <div className="align-middle">
                                        <h6 className="ms-2 h6-line-height">
                                          {item.airline}
                                        </h6>
                                        <h6
                                          className="ms-2 pt-1 h6-line-height"
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          ({item.plane[0]})
                                        </h6>
                                      </div>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{ lineHeight: "10px" }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          DEPARTS
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            {item.fromAirport},{" "}
                                            {item.details[0].originTerminal ===
                                              null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {item.details[0].originTerminal}
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter(
                                                (f) => f.iata === item.from
                                              )
                                              .map((item) => item.city)}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          ARRIVES
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <sapn>
                                            {item.toAirport},{" "}
                                            {item.details[0]
                                              .destinationTerminal === null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {
                                                  item.details[0]
                                                    .destinationTerminal
                                                }
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter((f) => f.iata === item.to)
                                              .map((item) => item.city)}
                                          </sapn>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td
                                      className="text-start bg-white"
                                      colSpan={1}
                                    >
                                      <tr>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.from}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                        <td className="align-middle">
                                          <i class="fas fa-circle fa-xs"></i>
                                          --------------{" "}
                                          <i className="fas fa-plane fa-sm"></i>
                                        </td>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.to}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {moment(item.arrival).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                      </tr>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{
                                        lineHeight: "10px",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          <span className="fw-bold fs-6">
                                            {
                                              ticketingList?.flightInfo
                                                .directions[1][0]
                                                .platingCarrierCode
                                            }{" "}
                                            {item.flightNumber}
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span className="fw-bold fs-6">
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS"
                                                : item.serviceClass}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          BAGGAGE
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            ADT-
                                            {item.baggage[0].amount +
                                              item.baggage[0].units}
                                            {ticketingList?.flightInfo
                                              .passengerCounts.cnn > 0 ? (
                                              <>
                                                , CHD-
                                                {item.baggage[0].amount +
                                                  item.baggage[0].units}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          AIRLINE PNR
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>{ticketingList?.pnr}</span>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </>
                      </>
                    ) : (
                      <></>
                    )}

                    {ticketingList?.flightInfo.directions[3] !== undefined ? (
                      <>
                        <>
                          <hr></hr>
                          <table
                            class="table table-borderless table-sm"
                            style={{ fontSize: "10px", lineHeight: "5px" }}
                          >
                            {ticketingList?.flightInfo.directions[3][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold text-start d-flex bg-white align-items-center"
                                      style={{ paddingTop: "2px" }}
                                      colSpan={1}
                                    >
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[3][0].platingCarrierCode}.png`}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />
                                      <div className="align-middle">
                                        <h6 className="ms-2 h6-line-height">
                                          {item.airline}
                                        </h6>
                                        <h6
                                          className="ms-2 pt-1 h6-line-height"
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          ({item.plane[0]})
                                        </h6>
                                      </div>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{ lineHeight: "10px" }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          DEPARTS
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            {item.fromAirport},{" "}
                                            {item.details[0].originTerminal ===
                                              null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {item.details[0].originTerminal}
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter(
                                                (f) => f.iata === item.from
                                              )
                                              .map((item) => item.city)}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          ARRIVES
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <sapn>
                                            {item.toAirport},{" "}
                                            {item.details[0]
                                              .destinationTerminal === null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {
                                                  item.details[0]
                                                    .destinationTerminal
                                                }
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter((f) => f.iata === item.to)
                                              .map((item) => item.city)}
                                          </sapn>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td
                                      className="text-start bg-white"
                                      colSpan={1}
                                    >
                                      <tr>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.from}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                        <td className="align-middle">
                                          <i class="fas fa-circle fa-xs"></i>
                                          --------------{" "}
                                          <i className="fas fa-plane fa-sm"></i>
                                        </td>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.to}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {moment(item.arrival).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                      </tr>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{
                                        lineHeight: "10px",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          <span className="fw-bold fs-6">
                                            {
                                              ticketingList?.flightInfo
                                                .directions[1][0]
                                                .platingCarrierCode
                                            }{" "}
                                            {item.flightNumber}
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span className="fw-bold fs-6">
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS"
                                                : item.serviceClass}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          BAGGAGE
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            ADT-
                                            {item.baggage[0].amount +
                                              item.baggage[0].units}
                                            {ticketingList?.flightInfo
                                              .passengerCounts.cnn > 0 ? (
                                              <>
                                                , CHD-
                                                {item.baggage[0].amount +
                                                  item.baggage[0].units}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          AIRLINE PNR
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>{ticketingList?.pnr}</span>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </>
                      </>
                    ) : (
                      <></>
                    )}

                   {ticketingList?.flightInfo.directions[4] !== undefined ? (
                      <>
                        <>
                          <hr></hr>
                          <table
                            class="table table-borderless table-sm"
                            style={{ fontSize: "10px", lineHeight: "5px" }}
                          >
                            {ticketingList?.flightInfo.directions[4][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold text-start d-flex bg-white align-items-center"
                                      style={{ paddingTop: "2px" }}
                                      colSpan={1}
                                    >
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[4][0].platingCarrierCode}.png`}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />
                                      <div className="align-middle">
                                        <h6 className="ms-2 h6-line-height">
                                          {item.airline}
                                        </h6>
                                        <h6
                                          className="ms-2 pt-1 h6-line-height"
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          ({item.plane[0]})
                                        </h6>
                                      </div>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{ lineHeight: "10px" }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          DEPARTS
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            {item.fromAirport},{" "}
                                            {item.details[0].originTerminal ===
                                              null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {item.details[0].originTerminal}
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter(
                                                (f) => f.iata === item.from
                                              )
                                              .map((item) => item.city)}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          ARRIVES
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <sapn>
                                            {item.toAirport},{" "}
                                            {item.details[0]
                                              .destinationTerminal === null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {
                                                  item.details[0]
                                                    .destinationTerminal
                                                }
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter((f) => f.iata === item.to)
                                              .map((item) => item.city)}
                                          </sapn>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td
                                      className="text-start bg-white"
                                      colSpan={1}
                                    >
                                      <tr>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.from}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                        <td className="align-middle">
                                          <i class="fas fa-circle fa-xs"></i>
                                          --------------{" "}
                                          <i className="fas fa-plane fa-sm"></i>
                                        </td>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.to}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {moment(item.arrival).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                      </tr>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{
                                        lineHeight: "10px",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          <span className="fw-bold fs-6">
                                            {
                                              ticketingList?.flightInfo
                                                .directions[1][0]
                                                .platingCarrierCode
                                            }{" "}
                                            {item.flightNumber}
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span className="fw-bold fs-6">
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS"
                                                : item.serviceClass}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          BAGGAGE
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            ADT-
                                            {item.baggage[0].amount +
                                              item.baggage[0].units}
                                            {ticketingList?.flightInfo
                                              .passengerCounts.cnn > 0 ? (
                                              <>
                                                , CHD-
                                                {item.baggage[0].amount +
                                                  item.baggage[0].units}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          AIRLINE PNR
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>{ticketingList?.pnr}</span>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </>
                      </>
                    ) : (
                      <></>
                    )}

                   {ticketingList?.flightInfo.directions[5] !== undefined ? (
                      <>
                        <>
                          <hr></hr>
                          <table
                            class="table table-borderless table-sm"
                            style={{ fontSize: "10px", lineHeight: "5px" }}
                          >
                            {ticketingList?.flightInfo.directions[5][0].segments.map(
                              (item, index) => (
                                <tbody>
                                  <tr>
                                    <td
                                      className="fw-bold text-start d-flex bg-white align-items-center"
                                      style={{ paddingTop: "2px" }}
                                      colSpan={1}
                                    >
                                      <img
                                        src={`https://tbbd-flight.s3.ap-southeast-1.amazonaws.com/airlines-logo/${ticketingList?.flightInfo.directions[5][0].platingCarrierCode}.png`}
                                        className=""
                                        alt=""
                                        width="40px"
                                        height="40px"
                                      />
                                      <div className="align-middle">
                                        <h6 className="ms-2 h6-line-height">
                                          {item.airline}
                                        </h6>
                                        <h6
                                          className="ms-2 pt-1 h6-line-height"
                                          style={{
                                            fontSize: "12px",
                                            marginBottom: "0px",
                                          }}
                                        >
                                          ({item.plane[0]})
                                        </h6>
                                      </div>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{ lineHeight: "10px" }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          DEPARTS
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            {item.fromAirport},{" "}
                                            {item.details[0].originTerminal ===
                                              null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {item.details[0].originTerminal}
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter(
                                                (f) => f.iata === item.from
                                              )
                                              .map((item) => item.city)}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          ARRIVES
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <sapn>
                                            {item.toAirport},{" "}
                                            {item.details[0]
                                              .destinationTerminal === null ? (
                                              ""
                                            ) : (
                                              <span>
                                                Terminal{" "}
                                                {
                                                  item.details[0]
                                                    .destinationTerminal
                                                }
                                                ,
                                              </span>
                                            )}
                                            {airports
                                              .filter((f) => f.iata === item.to)
                                              .map((item) => item.city)}
                                          </sapn>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td
                                      className="text-start bg-white"
                                      colSpan={1}
                                    >
                                      <tr>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.from}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.departure).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                        <td className="align-middle">
                                          <i class="fas fa-circle fa-xs"></i>
                                          --------------{" "}
                                          <i className="fas fa-plane fa-sm"></i>
                                        </td>
                                        <td>
                                          <h6 className="fw-bold h6-line-height">
                                            {item.to}
                                          </h6>
                                          <h6
                                            className="h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {moment(item.arrival).format(
                                              "hh:mm A"
                                            )}
                                          </h6>
                                          <h6
                                            className="text-secondary h6-line-height"
                                            style={{ fontSize: "12px" }}
                                          >
                                            {" "}
                                            {moment(item.arrival).format(
                                              "DD-MMMM-yyyy ddd"
                                            )}
                                          </h6>
                                        </td>
                                      </tr>
                                    </td>
                                    <td
                                      className="bg-white"
                                      style={{
                                        lineHeight: "10px",
                                        paddingTop: "0px",
                                      }}
                                    >
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          <span className="fw-bold fs-6">
                                            {
                                              ticketingList?.flightInfo
                                                .directions[1][0]
                                                .platingCarrierCode
                                            }{" "}
                                            {item.flightNumber}
                                          </span>
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span className="fw-bold fs-6">
                                            {item.serviceClass === "Y"
                                              ? "ECONOMY"
                                              : item.serviceClass === "C"
                                                ? "BUSINESS CLASS"
                                                : item.serviceClass}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          BAGGAGE
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>
                                            ADT-
                                            {item.baggage[0].amount +
                                              item.baggage[0].units}
                                            {ticketingList?.flightInfo
                                              .passengerCounts.cnn > 0 ? (
                                              <>
                                                , CHD-
                                                {item.baggage[0].amount +
                                                  item.baggage[0].units}
                                              </>
                                            ) : (
                                              <></>
                                            )}
                                          </span>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          className="text-start bg-white"
                                          style={{
                                            fontSize: "11px",
                                            width: "20%",
                                          }}
                                        >
                                          {" "}
                                          AIRLINE PNR
                                        </td>
                                        <td className="text-start">
                                          {" "}
                                          <span>{ticketingList?.pnr}</span>
                                        </td>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            )}
                          </table>
                        </>
                      </>
                    ) : (
                      <></>
                    )}



                  </div>

                  <table
                    class="table table-borderless table-sm float-end"
                    style={{ fontSize: "10px", width: "100%" }}
                  >
                    <tbody className="text-start">
                      <tr>
                        <td>
                          <div className="mt-2">
                            <p
                              className="bg-secondary p-1 fw-bold text-start text-white"
                              style={{ fontSize: "10px", marginBottom: "6px" }}
                            >
                              IMPORTANT NOTICE FOR TRAVELLERS
                            </p>
                            <p
                              style={{ fontSize: "10px", lineHeight: "12px" }}
                              className="text-start pt-0 ps-2"
                            >
                              {/* Most Airlines impose penalties and change fees for
                              reservation changes, especially for NO Show
                              tickets. Please advise your local contact number
                              at the destination to your agent or Airline to
                              ensure you can be kept informed if any changes in
                              your flights occur. Please ensure your Travel
                              Documents are valid over 6 months for the date of
                              departure from the origin city. */}
                              * This receipt will be required at check-in, and
                              must be presented to immigration and customs if
                              requested.
                              <br></br>* Your identity document / passport is
                              required for all passengers on all flights both
                              domestic and international.
                              <br></br>* Please report at check-in counter 1
                              hour before Domestic flights & 3 hours before
                              International flights.
                            </p>
                          </div>
                        </td>
                        <td>
                          <div className="table-responsive-sm mt-2">
                            <p
                              className="bg-secondary  p-1 fw-bold text-start text-white"
                              style={{ fontSize: "10px", marginBottom: "7px" }}
                            >
                              FARE DETAILS
                            </p>

                            <table
                              class="table table-borderless table-secondary table-sm text-end"
                              style={{ fontSize: "10px" }}
                            >
                              <thead style={{ width: "100%" }}>
                                <tr>
                                  <th
                                    className="text-start"
                                    style={{ width: "10%" }}
                                  >
                                    TYPE
                                  </th>
                                  <th style={{ width: "10%" }}>BASE FARE</th>
                                  <th style={{ width: "10%" }}>TAX</th>
                                  <th style={{ width: "13%" }}>PERSON</th>
                                  <th style={{ width: "15%" }}>TOTAL</th>
                                </tr>
                              </thead>
                              <tbody>
                                {ticketingList?.flightInfo.passengerFares
                                  .adt !== null ? (
                                  <>
                                    <tr>
                                      <td
                                        className="text-start"
                                        style={{ width: "10%" }}
                                      >
                                        Adult
                                      </td>
                                      <td style={{ width: "10%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerFares.adt.basePrice
                                        }
                                      </td>

                                      <td style={{ width: "10%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerFares.adt.taxes
                                        }
                                      </td>
                                      <td style={{ width: "13%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerCounts.adt
                                        }
                                      </td>
                                      <td style={{ width: "15%" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT
                                        </span>{" "}
                                        <span>
                                          {(ticketingList?.flightInfo
                                            .passengerFares.adt.basePrice +
                                            ticketingList?.flightInfo
                                              .passengerFares.adt.taxes) *
                                            ticketingList?.flightInfo
                                              .passengerCounts.adt}
                                        </span>
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <></>
                                )}
                                {ticketingList?.flightInfo.passengerFares
                                  .cnn !== null ? (
                                  <>
                                    <tr>
                                      <td
                                        className="text-start"
                                        style={{ width: "10%" }}
                                      >
                                        Child
                                      </td>
                                      <td style={{ width: "10%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerFares.cnn.basePrice
                                        }
                                      </td>

                                      <td style={{ width: "10%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerFares.cnn.taxes
                                        }
                                      </td>

                                      <td style={{ width: "13%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerCounts.cnn
                                        }
                                      </td>
                                      <td style={{ width: "15%" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT
                                        </span>
                                        {(ticketingList?.flightInfo
                                          .passengerFares.cnn.basePrice +
                                          ticketingList?.flightInfo
                                            .passengerFares.cnn.taxes) *
                                          ticketingList?.flightInfo
                                            .passengerCounts.cnn}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <></>
                                )}

                                {ticketingList?.flightInfo.passengerFares
                                  .inf !== null ? (
                                  <>
                                    <tr>
                                      <td
                                        className="text-start"
                                        style={{ width: "10%" }}
                                      >
                                        Infant
                                      </td>
                                      <td style={{ width: "10%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerFares.inf.basePrice
                                        }
                                      </td>

                                      <td style={{ width: "10%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerFares.inf.taxes
                                        }
                                      </td>

                                      <td style={{ width: "13%" }}>
                                        {
                                          ticketingList?.flightInfo
                                            .passengerCounts.inf
                                        }
                                      </td>
                                      <td style={{ width: "15%" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT
                                        </span>
                                        {(ticketingList?.flightInfo
                                          .passengerFares.inf.basePrice +
                                          ticketingList?.flightInfo
                                            .passengerFares.inf.taxes) *
                                          ticketingList?.flightInfo
                                            .passengerCounts.inf}
                                      </td>
                                    </tr>
                                  </>
                                ) : (
                                  <></>
                                )}

                                <tr>
                                  <td colSpan={4} className="bg-white"></td>
                                  <td
                                    style={{ width: "48.5%", padding: "0px" }}
                                  >
                                    <tr>
                                      <td
                                        style={{
                                          width: "46%",
                                          border: "1px solid white",
                                        }}
                                      >
                                        (+) AIT
                                      </td>
                                      <td style={{ border: "1px solid white" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT{" "}
                                        </span>
                                        {
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].ait
                                        }
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          width: "46%",
                                          border: "1px solid white",
                                        }}
                                      >
                                        (+) Convenience fee
                                      </td>
                                      <td style={{ border: "1px solid white" }}>
                                        {" "}
                                        <span style={{ fontSize: "10px" }}>
                                          BDT{" "}
                                        </span>
                                        {Math.round(
                                          (ticketingList?.flightInfo
                                            .bookingComponents[0].basePrice +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].taxes +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].ait) *
                                          (4.5 / 100)
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          width: "46%",
                                          border: "1px solid white",
                                        }}
                                      >
                                        (=) Subtotal
                                      </td>
                                      <td style={{ border: "1px solid white" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT{" "}
                                        </span>
                                        {Math.round(
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].basePrice +
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].taxes +
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].ait +
                                          Math.round(
                                            (ticketingList?.flightInfo
                                              .bookingComponents[0]
                                              .basePrice +
                                              ticketingList?.flightInfo
                                                .bookingComponents[0].taxes +
                                              ticketingList?.flightInfo
                                                .bookingComponents[0].ait) *
                                            (4.5 / 100)
                                          )
                                        )}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td
                                        style={{
                                          width: "46%",
                                          border: "1px solid white",
                                        }}
                                      >
                                        (-) Discount
                                      </td>
                                      <td style={{ border: "1px solid white" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT{" "}
                                        </span>
                                        {
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].discountPrice
                                        }
                                      </td>
                                    </tr>
                                    <tr className="fw-bold">
                                      <td
                                        style={{
                                          width: "46%",
                                          border: "1px solid white",
                                        }}
                                      >
                                        GRAND TOTAL
                                      </td>
                                      <td style={{ border: "1px solid white" }}>
                                        <span style={{ fontSize: "10px" }}>
                                          BDT{" "}
                                        </span>
                                        {Math.round(
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].totalPrice +
                                          (ticketingList?.flightInfo
                                            .bookingComponents[0].basePrice +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].taxes +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].ait) *
                                          (4.5 / 100)
                                        )}
                                      </td>
                                    </tr>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* <div className="container">
                    <div className="row">
                      <div className="col-lg-6 ps-0">
                        <div className="table-responsive-sm mt-2">
                          <p
                            className="bg-secondary  p-1 fw-bold text-start text-white"
                            style={{ fontSize: "10px",marginBottom:"7px" }}
                          >
                            FARE DETAILS
                          </p>

                          <table
                            class="table table-borderless table-secondary table-sm text-end"
                            style={{ fontSize: "10px" }}
                          >
                            <thead style={{width:"100%"}}>
                              <tr>
                                <th className="text-start"style={{ width: "10%" }}>Type</th>
                                <th style={{ width: "10%" }}>Base Fare</th>
                                <th style={{ width: "10%" }}>Tax</th>
                                <th style={{ width: "13%" }}>Person</th>
                                <th style={{ width: "15%" }}>Total</th>
                              </tr>
                            </thead>
                            <tbody>
                              {ticketingList?.flightInfo.passengerFares.adt !==
                              null ? (
                                <>
                                  <tr>
                                    <td className="text-start" style={{ width: "10%" }}>Adult</td>
                                    <td style={{ width: "10%" }}>
                                      {
                                        ticketingList?.flightInfo.passengerFares
                                          .adt.basePrice
                                      }
                                    </td>

                                    <td style={{ width: "10%" }}>
                                      {
                                        ticketingList?.flightInfo.passengerFares
                                          .adt.taxes
                                      }
                                    </td>
                                    <td style={{ width: "13%" }}>
                                      {
                                        ticketingList?.flightInfo
                                          .passengerCounts.adt
                                      }
                                    </td>
                                    <td
                                      className="fw-bold"
                                      style={{ width: "15%" }}
                                    >
                                      BDT{" "}
                                      {ticketingList?.flightInfo.passengerFares
                                        .adt.totalPrice *
                                        ticketingList?.flightInfo
                                          .passengerCounts.adt}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                              {ticketingList?.flightInfo.passengerFares.cnn !==
                              null ? (
                                <>
                                  <tr>
                                    <td className="text-start" style={{ width: "10%" }}>Child</td>
                                    <td style={{ width: "10%" }}>
                                      {
                                        ticketingList?.flightInfo.passengerFares
                                          .cnn.basePrice
                                      }
                                    </td>

                                    <td style={{ width: "10%" }}>
                                      {
                                        ticketingList?.flightInfo.passengerFares
                                          .cnn.taxes
                                      }
                                    </td>

                                    <td style={{ width: "13%" }}>
                                      {
                                        ticketingList?.flightInfo
                                          .passengerCounts.cnn
                                      }
                                    </td>
                                    <td
                                      className="fw-bold"
                                      style={{ width: "15%" }}
                                    >
                                      BDT{" "}
                                      {ticketingList?.flightInfo.passengerFares
                                        .cnn.totalPrice *
                                        ticketingList?.flightInfo
                                          .passengerCounts.cnn}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}

                              {ticketingList?.flightInfo.passengerFares.inf !==
                              null ? (
                                <>
                                  <tr>
                                    <td className="text-start" style={{ width: "10%" }}>Infant</td>
                                    <td style={{ width: "10%" }}>
                                      {
                                        ticketingList?.flightInfo.passengerFares
                                          .inf.basePrice
                                      }
                                    </td>

                                    <td style={{ width: "10%" }}>
                                      {
                                        ticketingList?.flightInfo.passengerFares
                                          .inf.taxes
                                      }
                                    </td>

                                    <td style={{ width: "13%" }}>
                                      {
                                        ticketingList?.flightInfo
                                          .passengerCounts.inf
                                      }
                                    </td>
                                    <td
                                      className="fw-bold"
                                      style={{ width: "15%" }}
                                    >
                                      BDT{" "}
                                      {ticketingList?.flightInfo.passengerFares
                                        .inf.totalPrice *
                                        ticketingList?.flightInfo
                                          .passengerCounts.inf}
                                    </td>
                                  </tr>
                                </>
                              ) : (
                                <></>
                              )}
                              <tr>
                                <td colSpan={4} className="bg-white"></td>
                                <td style={{ width: "48.5%", padding: "0px" }}>
                                  <tr>
                                    <td style={{width: "46%", border: "1px solid white" }}>
                                      (+) AIT
                                    </td>
                                    <td style={{border: "1px solid white" }}>
                                      {
                                        ticketingList?.flightInfo
                                          .bookingComponents[0].ait
                                      }
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{width: "46%", border: "1px solid white" }}>
                                      (+) Convinience fee
                                    </td>
                                    <td style={{border: "1px solid white" }}>
                                      {" "}
                                      {Math.round(
                                        (ticketingList?.flightInfo
                                          .bookingComponents[0].basePrice +
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].taxes +
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].ait) *
                                          (gatewayCharge?.charge / 100)
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{width: "46%", border: "1px solid white" }}>
                                      Subtotal
                                    </td>
                                    <td style={{border: "1px solid white" }}>
                                      {Math.round(
                                        ticketingList?.flightInfo
                                          .bookingComponents[0].basePrice +
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].taxes +
                                          ticketingList?.flightInfo
                                            .bookingComponents[0].ait +
                                          (ticketingList?.flightInfo
                                            .bookingComponents[0].basePrice +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].taxes +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].ait) *
                                            (gatewayCharge?.charge / 100)
                                      )}
                                    </td>
                                  </tr>
                                  <tr>
                                    <td style={{width: "46%", border: "1px solid white" }}>
                                      (-) Discount
                                    </td>
                                    <td style={{ border: "1px solid white" }}>
                                      {
                                        ticketingList?.flightInfo
                                          .bookingComponents[0].discountPrice
                                      }
                                    </td>
                                  </tr>
                                  <tr className="fw-bold">
                                    <td style={{width: "46%", border: "1px solid white" }}>
                                      Grand Total
                                    </td>
                                    <td style={{ border: "1px solid white" }}>
                                      {Math.round(
                                        ticketingList?.flightInfo
                                          .bookingComponents[0].totalPrice +
                                          (ticketingList?.flightInfo
                                            .bookingComponents[0].basePrice +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].taxes +
                                            ticketingList?.flightInfo
                                              .bookingComponents[0].ait) *
                                            (gatewayCharge?.charge / 100)
                                      )}
                                    </td>
                                  </tr>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div className="col-lg-6 px-0">
                      <div className="mt-2">
                    <p
                      className="bg-secondary p-1 fw-bold text-start text-white"
                      style={{ fontSize: "10px",marginBottom:"6px" }}
                    >
                      IMPORTANT NOTICE FOR TRAVELLERS
                    </p>
                    <p style={{ fontSize: "10px" }} className="text-start pt-0 ps-2">
                    Most Airlines impose penalties and change fees for reservation changes, especially for NO Show tickets. Please advise your local contact number at the destination to your agent or Airline to ensure you can be kept informed if any changes in your flights occur. Please ensure your Travel Documents are valid over 6 months for the date of departure from the origin city.
                    
                    <br></br><br></br>* This receipt will be required at check-in, and must be presented to immigration and customs if requested.
                    <br></br>* Your identity document / passport is required for all passengers on all flights both domestic and international.
                    <br></br>* Please report at check-in counter 1 hour before Domestic flights & 3 hours before International flights. 
                    </p>
                  </div>
                      </div>
                    </div>
                  </div> */}
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

export default SuccessTicket;
