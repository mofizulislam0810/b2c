import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { environment } from "../../environment";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";

const MyTransactions = () => {
  const [transactionsList, setTransactionsList] = useState([]);
  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(20);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  const getTransactionList = async (currentPage) => {
    const response = await axios.get(
      environment.paymentLogList +
        `?currentPageNumber=${currentPage}&pageSize=${pageSize}`,
      environment.headerToken
    );
    //ticketingList= response.data;
    setTransactionsList(await response.data.data);
    console.log(transactionsList);
  };
  console.log(transactionsList);

  const handleViewReceipt = (utid) => {
    window.open("/successpayment?res=" + utid);
  };

  useEffect(() => {
    getTransactionList(currentPageNumber);
  }, [currentPageNumber]);

  const handlePageClick = async (data) => {
    console.log(data);
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="bg-color py-5">
        {/* <Loading loading={loading}></Loading> */}
        <div className="card px-5 pt-5">
          <div className="card-body bg-white">
            <div className="m-4">
              <div className="tab-content">
                <div className="tab-pane fade show active" id="tp1">
                  {/* <div className="mt-2 text-start bg-light p-2">
                    <button
                      class="btn text-white btn-sm rounded me-2"
                      type="button"
                      style={{
                        backgroundColor: "#3c67af",
                      }}
                    >
                      My Transactions
                    </button>
                  </div> */}
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
                        My Transactions
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
                            <thead className="text-center fw-bold">
                              <tr>
                                <th>Purpose</th>
                                <th>Amount</th>
                                <th>Charge</th>
                                <th>Total amount</th>
                                <th>Payment gateway</th>
                                <th>Receipt</th>
                              </tr>
                            </thead>
                            <tbody
                              style={{ height: "600px", overflowX: "scroll" }}
                            >
                              {transactionsList.length > 0 ? (
                                transactionsList.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      {/* <td style={{width:"50px"}}>{((currentPageNumber-1)*pageSize)+index + 1}</td> */}
                                      <td>{item.purpose}</td>
                                      <td>{item.amount}</td>
                                      <td>{item.charge}</td>
                                      <td>{item.totalAmount}</td>
                                      <td>{item.paymentGateway}</td>
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
                                            handleViewReceipt(item.id)
                                          }
                                        >
                                          View Receipt
                                        </a>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <></>
                              )}
                            </tbody>
                          </table>
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
                                "pagination justify-content-center"
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

export default MyTransactions;
