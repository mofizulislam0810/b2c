import React, { useEffect } from "react";
// import "./Loading.css";
import img from "../../images/icon/Loader.gif";
// import video from "../../images/icon/1920x644.mp4";
// import airports from "../../JSON/airports.json";
import $ from "jquery";
import airports from "../../JSON/airports.json";

const Loading = ({ flag, loading }) => {
  //   const searchData = JSON.parse(localStorage.getItem('Database'));
  //   const originCode = airports
  //   .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.origin)
  //   .map((item) => item.iata);
  // const destinationCode = airports
  //   .filter((f) => f.city + " - " + f.country + ", " + f.name === searchData.destination)
  //   .map((item) => item.iata);
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
  useEffect(() => {
    if (loading) {
      $("#modal-open").click();
    } else {
      $(".modal-backdrop").remove();
      $("body").removeClass("modal-open");
      $("body").removeAttr("style");
    }
  }, []);
  return (
    <div>
      <span
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        id="modal-open"
      ></span>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered "
          style={{ maxWidth: "300px" }}
        >
          <div class="modal-content" style={{ minHeight: "300px" }}>
            <div class="modal-body">
              <div class="text-center my-4">
                {flag === 0 ? (
                  <>
                    <img
                      src={img}
                      className="img-fluid my-2"
                      alt="fly plan"
                      width={"60%"}
                    />
                    <p className="fw-bold text-center pt-2">
                      Searching for the best flights
                    </p>
                    {/* <video width="320" height="240" controls>
  <source src={video} type="video/mp4" />
</video> */}
                    <h5 className="text-center fw-bold mt-4">
                      {originCode[0]}
                      {searchData.tripTypeModify === "One Way" ? (
                        <span class="mx-2">
                          <i class="fas fa-arrow-right"></i>
                        </span>
                      ) : (
                        <span class="mx-2">
                          <i class="fas fa-exchange-alt"></i>
                        </span>
                      )}{" "}
                      {destinationCode[0]}
                    </h5>
                    <h6 className="text-center my-2">
                      {searchData.tripTypeModify === "One Way" ? (
                        <span>{searchData.journeyDate}</span>
                      ) : (
                        <span>
                          {searchData.journeyDate}{" "}
                          <i class="fas fa-arrow-right mx-2"></i>{" "}
                          {searchData.returnDate}
                        </span>
                      )}{" "}
                    </h6>
                    <span
                      className="text-center my-2"
                      style={{ fontSize: "12px" }}
                    >
                      {searchData.qtyList.Adult > 0
                        ? "Adults " + searchData.qtyList.Adult
                        : " "}{" "}
                      {searchData.qtyList.Children > 0
                        ? "Children " + searchData.qtyList.Children
                        : " "}{" "}
                      {searchData.qtyList.Infant > 0
                        ? "Infants " + searchData.qtyList.Infant
                        : " "}
                      <span className="mx-1">|</span>
                      {searchData.tripTypeModify}
                    </span>
                  </>
                ) : flag === 1 ? (
                  <>
                    <p className="fw-bold text-center pt-5">
                      Please wait for booking
                    </p>
                    <img
                      src={img}
                      className="img-fluid my-2"
                      alt="fly plan"
                      width={"60%"}
                    />
                  </>
                ) : flag === 2 ? (
                  <>
                    <p className="fw-bold text-center pt-5">
                      Please wait for ticketing
                    </p>
                    <img
                      src={img}
                      className="img-fluid my-2"
                      alt="fly plan"
                      width={"60%"}
                    />
                  </>
                ) : flag === 3 ? (
                  <>
                    <p className="fw-bold text-center pt-5 fs-5">Please wait</p>
                    <img
                      src={img}
                      className="img-fluid my-2"
                      alt="fly plan"
                      width={"60%"}
                    />
                  </>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
