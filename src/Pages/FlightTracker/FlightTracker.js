import axios from "axios";
import moment from "moment";
import React, { useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";

const FlightTracker = () => {
  const {obj,setObj,setLoading,loading} = useAuth();
  const dateFormate = moment(obj.date).format("YYYY/MM/DD");
  const getTrackerDetails = async() =>{
    setLoading(true);
    const response = axios.get(
      `https://api.flightstats.com/flex/schedules/rest/v1/json/flight/${obj.airlineName}/${obj.flightCode}/departing/${dateFormate}?appId=ff021144&appKey=26ae9054890f883b0ad93f628ab210f6`
    );
    console.log(
      `https://api.flightstats.com/flex/schedules/rest/v1/json/flight/${obj.airlineName}/${obj.flightCode}/departing/${dateFormate}?appId=ff021144&appKey=26ae9054890f883b0ad93f628ab210f6`
    );
    console.log(response);
    setLoading(false);
    setObj({
      airlineName: "",
      flightCode: 0,
      date: new Date().toISOString().split("T")[0],
    });
  }

  useEffect(()=>{
    getTrackerDetails()
  },[])

  if(loading){
    
  }
  return (
    <div>
      <Navbar></Navbar>
      <div className="pt-5 bg-color">
        <div className="container py-5" style={{ maxWidth: "65%" }}>
          <div
            className="row rounded-top"
            style={{
              backgroundColor: "#3c67af"
            }}
          >
            <div className="col-lg-4 text-start py-2">
              <div className="ps-3">
                <span className="h3 text-white">EK 587</span>
                <br></br>
                <span className="h6 text-white">Emirates</span>
              </div>
            </div>
            <div className="col-lg-4 d-flex justify-content-center py-2">
              <div>
                <span className="h3 text-white">DAC</span>
                <br></br>
                <span className="text-white">Dhaka</span>
              </div>
              <div className="mx-3 my-auto text-white">
                <i class="fas fa-circle fa-xs"></i>
                ---------------
                <i className="fas fa-plane fa-sm"></i>
              </div>
              <div>
                <span className="h3 text-white">DXB</span>
                <br></br>
                <span className="text-white">Dubai</span>
              </div>
            </div>
            <div className="col-lg-4 text-end py-2"  style={{
              backgroundColor: "#585d62"
            }}>
              <span className="h2 text-white">Scheduled</span>
              <br></br>
              <span className="h6 text-white">On time</span>
            </div>
          </div>
          <div className="row bg-white pb-3 rounded-bottom">
            <div className="d-flex justify-content-center p-0">
              <div
                className="bg-secondary m-3 rounded"
                style={{ minWidth: "45%" }}
              >
                <div className="mt-2 text-white">
                  <h4 className="m-0">Dhaka, BD</h4>
                  <h6 className="m-0">
                    Hazrat Shahjalal International Airport
                  </h6>
                </div>
                <div className="my-3 text-white">
                  <h6 className="m-0">Flight Departure Times</h6>
                  <h6 className="m-0">20-Jul-2022</h6>
                </div>
                <div className="row">
                  <div className="col-lg-6 text-center text-white">
                    <h5 className="m-0">Scheduled</h5>
                    <h2>
                      19:30<span className="h6">+06</span>
                    </h2>
                  </div>
                  <div className="col-lg-6 text-center text-white">
                    <h5 className="m-0">Estimated</h5>
                    <h2 className="m-0">--</h2>
                  </div>
                </div>
                <div className="row px-3 pb-2">
                  <div className="col-lg-6 border-top border-end text-center text-white pt-2 border-3">
                    <h5 className="m-0">Terminal</h5>
                    <h6 className="m-0">2</h6>
                  </div>
                  <div className="col-lg-6 border-top text-center text-white pt-2 border-3">
                    <h5 className="m-0">Gate</h5>
                    <h6 className="m-0">N/A</h6>
                  </div>
                </div>
              </div>
              <div
                className="bg-secondary m-3 rounded"
                style={{ minWidth: "45%" }}
              >
                <div className="mt-2 text-white">
                  <h4 className="m-0">Dhaka, BD</h4>
                  <h6 className="m-0">
                    Hazrat Shahjalal International Airport
                  </h6>
                </div>
                <div className="my-3 text-white">
                  <h6 className="m-0">Flight Departure Times</h6>
                  <h6 className="m-0">20-Jul-2022</h6>
                </div>
                <div className="row">
                  <div className="col-lg-6 text-center text-white">
                    <h5 className="m-0">Scheduled</h5>
                    <h2>
                      19:30<span className="h6">+06</span>
                    </h2>
                  </div>
                  <div className="col-lg-6 text-center text-white">
                    <h5 className="m-0">Estimated</h5>
                    <h2 className="m-0">--</h2>
                  </div>
                </div>
                <div className="row px-3 pb-2">
                  <div className="col-lg-6 border-top border-end text-center text-white pt-2 border-3">
                    <h5 className="m-0">Terminal</h5>
                    <h6 className="m-0">2</h6>
                  </div>
                  <div className="col-lg-6 border-top text-center text-white pt-2 border-3">
                    <h5 className="m-0">Gate</h5>
                    <h6 className="m-0">N/A</h6>
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

export default FlightTracker;
