import axios from "axios";
import moment from "moment";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import $ from "jquery";
import useAuth from "../../hooks/useAuth";

const TrackFlight = () => {
  const {obj,setObj} = useAuth();
  console.log(obj);
  // console.log(dateFormate);
  const navigation = useNavigate();
  const handleSubmitData = (e) => {
    navigation("/flighttracker");
    e.preventDefault();
  };

  $(function () {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();
    var minDate = year + "-" + month + "-" + day;
    $("#txtDate").attr("min", minDate);
  });

  $(function () {
    var dtToday = new Date();
    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate() + 3;
    var year = dtToday.getFullYear();
    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();
    var maxDate = year + "-" + month + "-" + day;
    $("#txtDate").attr("max", maxDate);
  });

  return (
    <div>
      <div className="bg-color">
        <Navbar></Navbar>
        <div className="container py-5">
          <div className="row  my-5">
            {/* <strong>Amount</strong>{" "}
                <input type={"number"} className="form-control"></input>
                <strong>Charge:</strong> % <br />
                <strong>Total Amount:</strong> <br /> */}
            <div className="col-lg-12 bg-white mt-5">
              <form
                className="mx-5 my-5"
                encType="multipart/form-data"
                // style={{ minHeight: "500px" }}
                onSubmit={handleSubmitData}
              >
                <div className="card text-start pt-3">
                  <div
                    className="card-header fw-bold"
                    style={{ color: "#02046a" }}
                  >
                    Search by Flight
                  </div>
                  <div className="card-body">
                    <div className="row mb-3">
                      <div className="col-lg-4">
                        <label class="form-label">
                          Airline <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          onChange={(e) =>
                            setObj({
                              ...obj,
                              airlineName: e.target.value,
                            })
                          }
                          required
                        ></input>
                      </div>
                      <div className="col-lg-4">
                        <label class="form-label">
                          Flight Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control rounded"
                          onChange={(e) =>
                            setObj({
                              ...obj,
                              flightCode: e.target.value,
                            })
                          }
                          required
                        ></input>
                      </div>
                      <div className="col-lg-4">
                        <label class="form-label">
                          Date <span className="text-danger">*</span>
                        </label>
                        <input
                          type="date"
                          className="form-control rounded"
                          value={obj.date}
                          id="txtDate"
                          // min="2018-01-01"
                          // max={new Date().toISOString().split("T")[0]}
                          onChange={(e) =>
                            setObj({
                              ...obj,
                              date: e.target.value,
                            })
                          }
                          required
                        ></input>
                      </div>
                    </div>
                    <div className="row my-1">
                      <div className="col-lg-12  text-center">
                        <button
                          type="submit"
                          className="btn btn-primary rounded px-3 w-25"
                        >
                          Search
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </div>
  );
};

export default TrackFlight;
