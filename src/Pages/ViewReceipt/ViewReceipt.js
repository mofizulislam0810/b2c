import axios from "axios";
import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import ReactDOMServer from "react-dom/server";
import { useLocation } from "react-router-dom";
import ReactToPrint from "react-to-print";
import { environment } from "../../environment";
import useAuth from "../../hooks/useAuth";
import tllLogo from "../../images/logo/logo-combined.png";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import htmlToPdfmake from "html-to-pdfmake";
import jsPDF from "jspdf";
import $ from "jquery";
import html2canvas from "html2canvas";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

const ViewReceipt = () => {
  //   const ref = React.createRef();
  //   const options = {
  //     orientation: 'landscape',
  //     unit: 'in',
  //     format: [8,14.1]
  // };
  const { user } = useAuth();
  const componentRef = useRef();
  const location = useLocation();
  const [receiptList, setReceiptList] = useState([]);
  const handleGetList = () => {
    const getReceiptList = async () => {
      let sendObj = location.search.split("=")[1];
      console.log(sendObj);
      const url = environment.getTicketingDetails + "/" + sendObj;
      console.log(url);
      const response = await axios.get(
        environment.paymentLogList + "/" + sendObj,
        environment.headerToken
      );
      setReceiptList(await response.data);
    };
    getReceiptList();
  };
  console.log(receiptList);
  useEffect(() => {
    handleGetList();
  }, []);

  const printDocument = () => {
    // let element = (
    //   <div style={{ display: "flex", flexWrap: "wrap" }}>Sample Text</div>
    // );
    // window.html2canvas = html2canvas;
    // const doc = new jsPDF("p", "pt", "letter");
    // doc.html(ReactDOMServer.renderToString(element), {
    //   callback: function (doc) {
    //     doc.save('sample.pdf');
    //   }
    // });

    // const doc = new jsPDF();
    // doc.addHTML($('#receipt')[0], 15, 15, {
    //   'background': '#fff',
    // }, function() {
    //   doc.save('sample-file.pdf');
    // });
    // var doc = new jsPDF("p", "pt", "a4");
    // doc.html(document.querySelector("#proposalPrint")).save("mypdf.pdf");

    var dd = {
      content: [
        {
          text: "This is a header (whole paragraph uses the same header style)\n\n",
          style: "header",
        },
        {
          text: [
            "It is however possible to provide an array of texts ",
            "to the paragraph (instead of a single string) and have ",
            { text: "a better ", fontSize: 15, bold: true },
            "control over it. \nEach inline can be ",
            { text: "styled ", fontSize: 20 },
            { text: "independently ", italics: true, fontSize: 40 },
            "then.\n\n",
          ],
        },
        { text: "Mixing named styles and style-overrides", style: "header" },
        {
          style: "bigger",
          italics: false,
          text: [
            "We can also mix named-styles and style-overrides at both paragraph and inline level. ",
            'For example, this paragraph uses the "bigger" style, which changes fontSize to 15 and sets italics to true. ',
            "Texts are not italics though. It's because we've overriden italics back to false at ",
            "the paragraph level. \n\n",
            "We can also change the style of a single inline. Let's use a named style called header: ",
            { text: "like here.\n", style: "header" },
            "It got bigger and bold.\n\n",
            "OK, now we're going to mix named styles and style-overrides at the inline level. ",
            "We'll use header style (it makes texts bigger and bold), but we'll override ",
            "bold back to false: ",
            { text: "wow! it works!", style: "header", bold: false },
            "\n\nMake sure to take a look into the sources to understand what's going on here.",
          ],
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
    };
    pdfMake.createPdf(dd).download();
  };
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-5 bg-color">
        <div className="container py-5">
          <div className="bg-white">
            <div className="card box-shadow">
              <div className="card-header">
                <span className="float-start fw-bold fs-5">
                  Receipt Details
                </span>

                <span className="float-end">
                  {/* <Pdf targetRef={ref} filename="code-example.pdf" options={options} x={.5} y={.5}>
                    {({ toPdf }) => (
                      <button className="btn btn-sm btn-secondary float-right me-1 d-print-none" onClick={toPdf}> <span className="me-1">
                      <i class="fa fa-download" aria-hidden="true"></i>
                    </span>Download Pdf</button>
                    )}
                  </Pdf> */}
                  <button
                    className="btn btn-sm btn-secondary float-right me-1 d-print-none"
                    onClick={printDocument}
                  >
                    <span className="me-1">
                      <i class="fa fa-download" aria-hidden="true"></i>
                    </span>
                    Download
                  </button>
                  <button className="btn btn-sm btn-secondary float-right me-1 d-print-none">
                    <span className="me-1">
                      <i class="fa fa-envelope" aria-hidden="true"></i>
                    </span>
                    Email
                  </button>
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
                <div class="row text-center">
                  <h5>RECEIPT</h5>
                </div>
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
                    <tr className="d-flex">
                      <td className="bg-white">
                        <tr>
                          <td
                            className="text-start fw-bold"
                            style={{ width: "15%" }}
                          >
                            Customer Name
                          </td>
                          <td className="w-50 text-start">
                            <span className="mx-2">:</span>
                            {user?.fullName}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="text-start fw-bold"
                            style={{ width: "15%" }}
                          >
                            {" "}
                            Address
                          </td>
                          <td className="w-50 text-start">
                            <span className="mx-2">:</span>2678 Still Pastures
                            Drive Fort Mill, SC 29715
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="text-start fw-bold"
                            style={{ width: "15%" }}
                          >
                            {" "}
                            Phone Number
                          </td>
                          <td className="w-50 text-start">
                            <span className="mx-2">:</span>
                            {user?.mobile}
                          </td>
                        </tr>
                      </td>
                      <td className="bg-white">
                        <tr>
                          <td
                            className="text-end fw-bold"
                            style={{ width: "20%" }}
                          >
                            Receipt Number <span className="mx-2">:</span>
                          </td>
                          <td className="text-end" style={{ width: "7%" }}>
                            RCPT-259621
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="text-end fw-bold"
                            style={{ width: "20%" }}
                          >
                            Issue Date <span className="mx-2">:</span>
                          </td>
                          <td className="text-end" style={{ width: "7%" }}>
                            {moment(receiptList?.issueDate).format(
                              "DD-MMMM-YYYY"
                            )}
                          </td>
                        </tr>
                        <tr>
                          <td
                            className="text-end fw-bold"
                            style={{ width: "20%" }}
                          >
                            {" "}
                            Issued By<span className="mx-2">:</span>
                          </td>
                          <td className="text-end" style={{ width: "7%" }}>
                            Auto
                          </td>
                        </tr>
                      </td>
                    </tr>
                  </tbody>
                </table>

                <table
                  class="table table-borderless  my-1 table-sm"
                  style={{ fontSize: "10px" }}
                >
                  <tbody>
                    <tr></tr>
                  </tbody>
                </table>
                <table
                  class="table table-bordered my-1 table-sm"
                  style={{ width: "100%", fontSize: "10px" }}
                >
                  <thead className="text-center thead">
                    <tr>
                      <th className="text-start">Purpose</th>
                      <th className="text-end">Amount(BDT)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-start">
                        {receiptList?.purpose}
                      </td>
                      <td className="text-end fw-b">{receiptList?.amount}</td>
                    </tr>
                    <tr>
                      <td colSpan={1} className="text-end fw-bold">
                        Total: BDT {receiptList?.totalAmount}
                      </td>
                    </tr>
                  </tbody>
                </table>

                <div className="container pb-5">
                  <div class="row text-start ms-1">
                    <b className="p-0">Terms & Conditions :</b>
                    <ul style={{ fontSize: "10px" }}>
                      <li>
                        This is a computer generated statement, hence does not
                        require any signature
                      </li>
                      <li>
                        {" "}
                        Refunds & Cancellations are subject to Airline's
                        approval.
                      </li>
                      <li>
                        Kindly check all details carefully to avoid unnecessary
                        complications.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ViewReceipt;
