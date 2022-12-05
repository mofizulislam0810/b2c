import React, { useState, useEffect } from "react";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import moment from "moment";
import { environment } from "../../environment";
import axios from "axios";
import Loading from "../Loading/Loading";
import "./BookingList.css";
import ReactPaginate from "react-paginate";
const BookingList = () => {
  const [loading, setLoading] = useState(false);
  const [bookingSatus, setBookingStatus] = useState("Ticketed");
  let [bookingList, setBookingList] = useState([]);
  let [pendingList, setPendingList] = useState([]);
  let [cancleList, setCancleList] = useState([]);
  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(20);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let [pageCountP, setPageCountP] = useState(0);
  let [pageSizeP, setPageSizeP] = useState(10);
  let [currentPageNumberP, setCurrentPageNumberP] = useState(1);
  let [pageCountC, setPageCountC] = useState(0);
  let [pageSizeC, setPageSizeC] = useState(10);
  let [currentPageNumberC, setCurrentPageNumberC] = useState(1);
  const getBookingList = async (currentPage) => {
    let sendObj = {
      pnr: "",
      uniqueTransID: "",
      status: "",
      fromDate: "",
      toDate: "",
      ticketNumber: "",
    };
    setLoading(true);
    const response = await axios.post(
      environment.getTicketingList +
        `?currentPageNumber=${currentPage}&pageSize=${pageSize}`,
      sendObj,
      environment.headerToken
    );
    //ticketingList= response.data;
    setBookingList(await response.data.data);
    setPageCount(await response.data.totalPages);
    console.log(bookingList);
    setLoading(false);
  };
  const getPendingList = async (currentPage) => {
    const response = await axios.get(
      environment.getTicketPending +
        `?currentPageNumber=${currentPage}&pageSize=${pageSizeP}`,
      environment.headerToken
    );
    //ticketingList= response.data;
    setPendingList(await response.data.data);
    setPageCountP(await response.data.totalPages);
    // console.log(bookingList);
  };
  const getCancelList = async (currentPage) => {
    const response = await axios.post(
      environment.getTicketCancle +
        `?currentPageNumber=${currentPage}&pageSize=${pageSizeC}`,{
          pnr: "",
          uniqueTransID: "",
          status: "",
          fromDate: "",
          toDate: "",
          ticketNumber: "",
          isApp: false
        },
      environment.headerToken
    );
    //ticketingList= response.data;
    console.log(response);
    setCancleList(await response.data.data);
    setPageCountC(await response.data.totalPages);
    // console.log(bookingList);
  };
  // console.log(pendingList);

  const handleViewBooking = (utid) => {
    window.open("/successticket?utid=" + utid, "_blank");
    //navigate("/ticket?utid="+utid,'_blank');
  };

  useEffect(() => {
    getBookingList(currentPageNumber);
    getPendingList(currentPageNumberP);
    getCancelList(currentPageNumberC)
  }, [currentPageNumber, currentPageNumberP, currentPageNumberC]);

  const handlePageClick = async (data) => {
    console.log(data);
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
    // const commentsFormServer = await getBookingList(currentPage);

    // setBookingList(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  const handlePageClickP = async (data) => {
    console.log(data);
    let currentPage = data.selected + 1;
    setCurrentPageNumberP(currentPage);
    // const commentsFormServer = await getBookingList(currentPage);

    // setBookingList(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };

  const handlePageClickC = async (data) => {
    console.log(data);
    let currentPage = data.selected + 1;
    setCurrentPageNumberC(currentPage);
    // const commentsFormServer = await getBookingList(currentPage);

    // setBookingList(commentsFormServer);
    // scroll to the top
    //window.scrollTo(0, 0)
  };
  // if (loading) {
  //   return <Loading flag={3} loading={loading}></Loading>;
  // }
  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-color py-5">
        {/* <Loading loading={loading}></Loading> */}
        <div className="card px-5 pt-5">
          <div className="card-header bg-white">
            <span className="float-start fw-bold fs-5">My Bookings</span>
          </div>
          <div className="card-body bg-white">
            <div className="m-4">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tp1">
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link active text-dark"
                        id="home-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#home"
                        type="button"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        Ticketed
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-dark"
                        id="profile-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#profile"
                        type="button"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Pending
                      </button>
                    </li>
                    <li class="nav-item" role="presentation">
                      <button
                        class="nav-link text-dark"
                        id="cancle-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#cancle"
                        type="button"
                        role="tab"
                        aria-controls="cancle"
                        aria-selected="false"
                      >
                        Cancel
                      </button>
                    </li>
                  </ul>
                  <div class="tab-content" id="myTabContent">
                    <div
                      class="tab-pane fade show active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <>
                        <div className="mx-2 py-2">
                          <table
                            className="table table-bordered table-striped table-sm table-fixed bg-white"
                            style={{ width: "100%", fontSize: "13px" }}
                          >
                            {loading ? (
                              <div className="p-4">
                                <div class="spinner-border" role="status">
                                  <span class="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <thead className="text-center fw-bold table-header thead">
                                  <tr>
                                    <th>Booking ID</th>
                                    <th>Booking Date</th>
                                    <th>Passenger Name</th>
                                    <th>Airline</th>
                                    <th>Route</th>
                                    <th>Journey</th>
                                    <th>PNR</th>
                                    <th>Status</th>
                                    <th>Mode</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody
                                  style={{
                                    height: "600px",
                                    overflowX: "scroll",
                                  }}
                                >
                                  {bookingList.length > 0 ? (
                                    bookingList.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          {/* <td style={{width:"50px"}}>{((currentPageNumber-1)*pageSize)+index + 1}</td> */}
                                          <td>{item.uniqueTransID}</td>
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {moment(item.issueDate).format(
                                              "DD-MM-YYYY hh:mm:ss"
                                            )}
                                          </td>
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {item.paxName}
                                          </td>
                                          <td
                                            style={{ whiteSpace: "nowrap" }}
                                            title={item.airlineName}
                                          >
                                            {item.platingCarrier}
                                          </td>
                                          <td>
                                            {item.origin}/{item.destination}
                                          </td>
                                          <td>{item.journeyType}</td>
                                          <td>{item.pnr}</td>
                                          <td>{item.status}</td>
                                          <td>
                                            {item.isApp === false
                                              ? "Web Mode"
                                              : "App Mode"}
                                          </td>
                                          <td>
                                            <a
                                              style={{
                                                backgroundColor: "#3c67af",
                                                fontSize: "10px",
                                              }}
                                              href="javascript:void(0)"
                                              className="btn btn-primary btn-sm rounded"
                                              title="View Booking"
                                              onClick={() =>
                                                handleViewBooking(
                                                  item.uniqueTransID
                                                )
                                              }
                                            >
                                              View Booking
                                            </a>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </tbody>
                              </>
                            )}

                            <div className="row float-end pt-2">
                              <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCount}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClick}
                                containerClassName={
                                  "pagination justify-content-center me-4"
                                }
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                              />
                            </div>
                          </table>
                        </div>
                      </>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <>
                        <div className="mx-2 py-2">
                          <table
                            className="table table-bordered table-striped table-sm table-fixed bg-white"
                            style={{ width: "100%", fontSize: "13px" }}
                          >
                            {loading ? (
                              <div className="p-4">
                                <div class="spinner-border" role="status">
                                  <span class="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <thead className="text-center fw-bold table-header thead">
                                  <tr>
                                    <th>Booking ID</th>
                                    {/* <th>Booking Date</th> */}
                                    <th>Passenger Name</th>
                                    <th>Airline</th>
                                    <th>Route</th>
                                    <th>Journey</th>
                                    <th>Mode</th>
                                    <th>For Support</th>
                                  </tr>
                                </thead>
                                <tbody
                                  style={{
                                    height: "600px",
                                    overflowX: "scroll",
                                  }}
                                >
                                  {pendingList.length > 0 ? (
                                    pendingList.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                          {/* <td style={{width:"50px"}}>{((currentPageNumber-1)*pageSize)+index + 1}</td> */}
                                          <td>{item.uniqueTransID}</td>
                                          {/* <td style={{ whiteSpace: "nowrap" }}>
                                      {moment(item.issueDate).format(
                                        "DD-MM-YYYY hh:mm:ss A"
                                      )}
                                    </td> */}
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {item.paxName}
                                          </td>
                                          <td style={{ whiteSpace: "nowrap" }}>
                                            {item.airlineName +
                                              " (" +
                                              item.platingCarrier +
                                              ")"}
                                          </td>
                                          <td>
                                            {item.origin}/{item.destination}
                                          </td>
                                          <td>{item.journeyType}</td>
                                          <td>
                                            {item.isApp === false
                                              ? "Web Mode"
                                              : "App Mode"}
                                          </td>
                                          <td>
                                            <span title="+8809613345345">
                                              <i class="fa fa-phone"></i>
                                            </span>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </tbody>
                              </>
                            )}
                            <div className="row float-end pt-2">
                              <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCountP}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClickP}
                                containerClassName={
                                  "pagination justify-content-center me-4"
                                }
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                              />
                            </div>
                          </table>
                        </div>
                      </>
                    </div>
                    <div
                      class="tab-pane fade"
                      id="cancle"
                      role="tabpanel"
                      aria-labelledby="cancle-tab"
                    >
                      <>
                        <div className="mx-2 py-2">
                          <table
                            className="table table-bordered table-striped table-sm table-fixed bg-white"
                            style={{ width: "100%", fontSize: "13px" }}
                          >
                            {loading ? (
                              <div className="p-4">
                                <div class="spinner-border" role="status">
                                  <span class="visually-hidden">
                                    Loading...
                                  </span>
                                </div>
                              </div>
                            ) : (
                              <>
                                <thead className="text-center fw-bold table-header thead">
                                  <tr>
                                    <th>Booking ID</th>
                                    <th>Booking Date</th>
                                    <th>Passenger Name</th>
                                    <th>Airline</th>
                                    <th>Route</th>
                                    <th>Journey</th>
                                    <th>PNR</th>
                                    <th>Status</th>
                                    <th>Mode</th>
                                    <th>Action</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {cancleList.length > 0 ? (
                                    cancleList.map((item, index) => {
                                      return (
                                        <tr key={index}>
                                        {/* <td style={{width:"50px"}}>{((currentPageNumber-1)*pageSize)+index + 1}</td> */}
                                        <td>{item.uniqueTransID}</td>
                                        <td style={{ whiteSpace: "nowrap" }}>
                                          {moment(item.issueDate).format(
                                            "DD-MM-YYYY hh:mm:ss"
                                          )}
                                        </td>
                                        <td style={{ whiteSpace: "nowrap" }}>
                                          {item.paxName}
                                        </td>
                                        <td
                                          style={{ whiteSpace: "nowrap" }}
                                          title={item.airlineName}
                                        >
                                          {item.platingCarrier}
                                        </td>
                                        <td>
                                          {item.origin}/{item.destination}
                                        </td>
                                        <td>{item.journeyType}</td>
                                        <td>{item.pnr}</td>
                                        <td>{item.status}</td>
                                        <td>
                                          {item.isApp === false
                                            ? "Web Mode"
                                            : "App Mode"}
                                        </td>
                                        <td>
                                          <a
                                            style={{
                                              backgroundColor: "#3c67af",
                                              fontSize: "10px",
                                            }}
                                            href="javascript:void(0)"
                                            className="btn btn-primary btn-sm rounded"
                                            title="View Booking"
                                            onClick={() =>
                                              handleViewBooking(
                                                item.uniqueTransID
                                              )
                                            }
                                          >
                                            View Booking
                                          </a>
                                        </td>
                                      </tr>
                                      );
                                    })
                                  ) : (
                                    <></>
                                  )}
                                </tbody>
                              </>
                            )}
                            <div className="row float-end pt-2">
                              <ReactPaginate
                                previousLabel={"previous"}
                                nextLabel={"next"}
                                breakLabel={"..."}
                                pageCount={pageCountC}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={3}
                                onPageChange={handlePageClickC}
                                containerClassName={
                                  "pagination justify-content-center me-4"
                                }
                                pageClassName={"page-item"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"page-item"}
                                previousLinkClassName={"page-link"}
                                nextClassName={"page-item"}
                                nextLinkClassName={"page-link"}
                                breakClassName={"page-item"}
                                breakLinkClassName={"page-link"}
                                activeClassName={"active"}
                              />
                            </div>
                          </table>
                        </div>
                      </>
                    </div>
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

export default BookingList;
