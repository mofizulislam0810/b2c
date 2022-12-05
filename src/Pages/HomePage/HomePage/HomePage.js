import React, { useEffect } from "react";
import Footer from "../../SharedComponent/Footer/Footer";
import Navbar from "../../SharedComponent/NavBar/Navbar";
import SearchFlight from "../SearchFlight.js/SearchFlight";
import "./Home.css";
import $ from "jquery";
import bannerImg from "../../../images/bgImage/ImageFile_201610051727496802.jpg";
import Bangkok from "../../../images/bgImage/Diner-croisière-Bangkok-840x560.jpg";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import imgOne from "../../../images/banner/WhatsApp Image 2022-06-25 at 4.14.58 PM.jpeg";
import imgTwo from "../../../images/banner/WhatsApp Image 2022-06-25 at 4.14.59 PM (1).jpeg";
import imgThree from "../../../images/banner/WhatsApp Image 2022-06-25 at 4.14.59 PM.jpeg";
import imgFour from "../../../images/banner/WhatsApp Image 2022-06-25 at 4.15.01 PM.jpeg";
import imgFive from "../../../images/banner/WhatsApp Image 2022-06-25 at 4.15.03 PM.jpeg";
import axios from "axios";
import { useState } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  let promotionalOfferList = [
    {
      offerId: 1,
      title: "Daily flights to Dhaka-Kolkata route",
      description:
        "US-Bangla Airlines, one of the largest private airline is operating flights to Kolkata with Boeing 737-800 aircraft.",
      image: imgOne,
    },
    {
      offerId: 2,
      title: "Wheel chair services Free",
      description:
        "Now on US Bangla offers free wheel chair services at Chennai airport.",
      image: imgTwo,
    },
    {
      offerId: 3,
      title: "Fly Vistara with Premium Economy class",
      description:
        "Enjoy more legroom to relax and work with priority services and enhanced baggage allowance.",
      image: imgThree,
    },
    {
      offerId: 4,
      title: "Up to BDT 3,000 Discount on Flight Booking",
      description: "For all EBL Visa cards. Till 31 Jul’22.",
      image: imgFour,
    },
    {
      offerId: 5,
      title: "Great Offers to UAE",
      description:
        "Etihad Offers starting fare at $814 for Business class travel.",
      image: imgFive,
    },
  ];

  let packageList = [
    {
      packID: 1001,
      bannerImg:
        "https://www.triplover.com/ClientData/TopVisitedPlaces/Dubai_202111061303298133.jpg",
      locationName: "Dubai",
      title: "SUMMER GATEWAY FOR 4 DAYS 3 NIGHTS",
      totalPrice: 15500,
    },
    {
      packID: 1002,
      bannerImg:
        "https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg",
      locationName: "Thailand",
      title: "BANGKOK PATTAYA 5 DAYS 4 NIGHTS",
      totalPrice: 15700,
    },
    {
      packID: 1003,
      bannerImg:
        "https://pyt-blogs.imgix.net/2021/12/beach-gedb05081c_1920.jpg?auto=format&ixlib=php-3.3.0",
      locationName: "Maldives",
      title: "HULHUMALE 3 DAYS 2 NIGHTS",
      totalPrice: 9000,
    },
    {
      packID: 1004,
      bannerImg:
        "https://media.cntraveller.com/photos/6193e2965502655976f78f59/16:9/w_5120,h_2880,c_limit/Malaysia-503847689-conde-nast-traveller-16nov21%20Getty.jpg",
      locationName: "Malaysia",
      title: "KUALA LAMPUR - LANGKAWI 5 DAYS 4 NIGHTS",
      totalPrice: 12500,
    },
  ];

  var settings = {
    slidesToShow: 3,
    slidesToScroll: 1,
    infinite: true,
    autoplay: true,
    breakpoint: 1024,
    centerMode: true,
  };
  useEffect(() => {
    $("#flight-panal").addClass("bottom-border");

    $("#flight-panal").click(function () {
      $("#flight-panal").addClass("bottom-border");
      $("#hotel-panal").removeClass("bottom-border");
      $("#car-panal").removeClass("bottom-border");
      $("#charter-panal").removeClass("bottom-border");
      $("#holiday-panal").removeClass("bottom-border");
    });

    $("#hotel-panal").click(function () {
      $("#hotel-panal").addClass("bottom-border");
      $("#flight-panal").removeClass("bottom-border");
      $("#car-panal").removeClass("bottom-border");
      $("#charter-panal").removeClass("bottom-border");
      $("#holiday-panal").removeClass("bottom-border");
    });

    $("#car-panal").click(function () {
      $("#car-panal").addClass("bottom-border");
      $("#flight-panal").removeClass("bottom-border");
      $("#hotel-panal").removeClass("bottom-border");
      $("#charter-panal").removeClass("bottom-border");
      $("#holiday-panal").removeClass("bottom-border");
    });

    $("#charter-panal").click(function () {
      $("#charter-panal").addClass("bottom-border");
      $("#flight-panal").removeClass("bottom-border");
      $("#hotel-panal").removeClass("bottom-border");
      $("#car-panal").removeClass("bottom-border");
      $("#holiday-panal").removeClass("bottom-border");
    });
    $("#holiday-panal").click(function () {
      $("#holiday-panal").addClass("bottom-border");
      $("#charter-panal").removeClass("bottom-border");
      $("#flight-panal").removeClass("bottom-border");
      $("#hotel-panal").removeClass("bottom-border");
      $("#car-panal").removeClass("bottom-border");
    });
  }, []);

  // const handleTrackFlight = async () => {
  //   const response = await axios.get("https://api.flightstats.com/flex/schedules/rest/v1/json/flight/EK/587/departing/2022/07/20?appId=ff021144&appKey=26ae9054890f883b0ad93f628ab210f6");
  //   console.log(response);
  // };

  const [tab, setTab] = useState("FLIGHT");

  return (
    <div>
      <div className="bg-home">
        <Navbar></Navbar>
        <div className="bg-color">
          <div className="container pt-5">
            <div className="row pt-5">
              <div className="col-lg-12 pt-5 mx-auto " style={{ width: "30%" }}>
                <div
                  className="d-flex justify-content-center p-2"
                  style={{
                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                    borderRadius: "5px",
                  }}
                >
                  <div
                    className="bottom-border me-4 p-1"
                    id="flight-panal"
                    style={{ cursor: "pointer" }}
                    onClick={() => setTab("FLIGHT")}
                  >
                    <span className="text-white me-1">
                      <i className="fas fa-plane"></i>
                    </span>
                    <span className="ms-1 fs-5 text-white">Flight</span>
                  </div>

                  <div
                    className="me-4 p-1"
                    id="hotel-panal"
                    style={{ cursor: "pointer" }}
                    onClick={() => setTab("HOTEL")}
                  >
                    <span className="text-white me-1">
                      <i className="fas fa-hotel"></i>
                    </span>
                    <span className="ms-1 fs-5 text-white">Hotel</span>
                  </div>

                  <div
                    className="me-4 p-1"
                    id="car-panal"
                    style={{ cursor: "pointer" }}
                    onClick={() => setTab("VISA")}
                  >
                    <span className="text-white me-1">
                      <i class="fas fa-passport"></i>
                    </span>
                    <span className="ms-1 fs-5 text-white">Visa</span>
                  </div>
                  {/* <div
                    className="me-4 p-1"
                    id="holiday-panal"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="text-white me-1">
                    <i class="fas fa-umbrella-beach"></i>
                    </span>
                    <span className="ms-1 fs-5 text-white">Holiday</span>
                  </div>
                  <div
                    className="me-4 p-1"
                    id="charter-panal"
                    style={{ cursor: "pointer" }}
                  >
                    <span className="text-white me-1">
                      <i class="fa fa-plane" aria-hidden="true"></i>
                    </span>
                    <span className="ms-1 fs-5 text-white">Charter</span>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <SearchFlight tab={tab}></SearchFlight>
        </div>
      </div>

      {/* <div className="bg-color">
        <div className="container pt-5">
          <div className="row">
            <div className="col-lg-3">
            <button className="btn btn-primary btn-sm rounded" onClick={handleTrackFlight}>Track Flight</button>
            </div>
          </div>
        </div>
      </div> */}

      <div className="bg-color">
        <div class="container pt-5">
          <h2 class="text-dark fw-bold text-start pb-3">Promotional Offers</h2>

          <section class="pb-5">
            <div id="cards_landscape_wrap-2">
              <div class="container">
                <div class="row">
                  <Slider {...settings}>
                    {promotionalOfferList.map((item, index) => {
                      return (
                        <div>
                          <div
                            class="bg-white rounded-3 p-3"
                            style={{ maxWidth: "97%" }}
                          >
                            <div class="d-flex">
                              <div class="text-start px-2">
                                <h5
                                  className="fw-bold"
                                  style={{ fontSize: "15px" }}
                                >
                                  {item.title}
                                </h5>
                                <h6
                                  style={{ fontSize: "13px", color: "#4f5153" }}
                                >
                                  {item.description}
                                </h6>
                              </div>
                              <div class="shadow">
                                <img
                                  src={item.image}
                                  class="d-block rounded-3"
                                  alt="..."
                                  style={{ width: "150px", height: "130px" }}
                                />
                              </div>
                            </div>
                            <Link
                              to={`/promotionoffer/${item.offerId}`}
                              class="btn btn-primary btn-sm rounded float-start details-button"
                            >
                              Details
                            </Link>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <div className="bg-color">
        <div class="container pt-2">
          <h2 class="text-dark fw-bold text-start pb-3">
            Most Popular Destinations
          </h2>

          <div class="row">
            <div class="col-lg-8">
              <div class="card">
                <div class="image">
                  <img
                    class="img-fluid w-100"
                    src="https://i.ibb.co/VgLF55D/slider-1.jpg"
                    alt="Cairo"
                  />
                  {/* <div
                    id="carouselExampleDark"
                    class="carousel carousel-dark slide"
                    data-bs-ride="carousel"
                  >
                    <div class="carousel-indicators text-white">
                      <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="0"
                        class="active"
                        aria-current="true"
                        aria-label="Slide 1"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="1"
                        aria-label="Slide 2"
                      ></button>
                      <button
                        type="button"
                        data-bs-target="#carouselExampleDark"
                        data-bs-slide-to="2"
                        aria-label="Slide 3"
                      ></button>
                    </div>
                    <div class="carousel-inner">
                      <div
                        class="carousel-item active"
                        data-bs-interval="10000"
                      >
                        <img
                          src="https://i.ibb.co/VgLF55D/slider-1.jpg"
                          class="d-block w-100"
                          alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block text-white">
                          <h5>First slide label</h5>
                          <p class="text-white">
                            Some representative placeholder content for the
                            first slide.
                          </p>
                        </div>
                      </div>
                      <div class="carousel-item" data-bs-interval="2000">
                        <img
                          src="https://i.ibb.co/9p3Cnk9/slider-2.jpg"
                          class="d-block w-100"
                          alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block text-white">
                          <h5>Second slide label</h5>
                          <p class="text-white">
                            Some representative placeholder content for the
                            second slide.
                          </p>
                        </div>
                      </div>
                      <div class="carousel-item">
                        <img
                          src="https://i.ibb.co/sC4SgqP/slider-3.jpg"
                          class="d-block w-100"
                          alt="..."
                        />
                        <div class="carousel-caption d-none d-md-block text-white">
                          <h5>Third slide label</h5>
                          <p class="text-white">
                            Some representative placeholder content for the
                            third slide.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      class="carousel-control-prev"
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide="prev"
                    >
                      <span
                        class="carousel-control-prev-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Previous</span>
                    </button>
                    <button
                      class="carousel-control-next"
                      type="button"
                      data-bs-target="#carouselExampleDark"
                      data-bs-slide="next"
                    >
                      <span
                        class="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span class="visually-hidden">Next</span>
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="card">
                <div class="image">
                  <img
                    class="img-fluid w-100"
                    src="https://i.ibb.co/sC4SgqP/slider-3.jpg"
                    alt="Cairo"
                  />
                </div>
              </div>
            </div>
          </div>
          <h2 class="text-dark fw-bold text-start pt-5">Holiday Packages</h2>
          <section class="pb-5">
            <div id="cards_landscape_wrap-2">
              <div class="container">
                <div class="row">
                  {packageList.map((item, index) => {
                    return (
                      <>
                        {" "}
                        <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                          <Link to={`/packagedetails/${item.packID}`}>
                            <div class="card-flyer">
                              <div class="text-box">
                                <div class="image-box">
                                  <img src={item.bannerImg} alt="" />
                                </div>
                                <div class="text-container text-start ">
                                  <h6>
                                    <span className="me-1">
                                      <i
                                        class="fa fa-map-marker"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    {item.locationName}
                                  </h6>
                                  <h6
                                    class="fw-bold mb-0 text-secondary"
                                    style={{ fontSize: "9px" }}
                                  >
                                    {item.title}
                                  </h6>
                                  <p class="fw-bold m-0 text-secondary">
                                    <span style={{ fontSize: "9px" }}>
                                      Starts From{" "}
                                      <span
                                        style={{ fontSize: "13px", color: "" }}
                                      >
                                        BDT {item.totalPrice}{" "}
                                      </span>
                                      PP
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default HomePage;
