import axios from "axios";
import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { environment } from "../../environment";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import "./PackageDetails.css";

const PackageDetails = () => {
  const { Id } = useParams();
  // console.log(Id);
  let packageList = [
    {
      packID: 1001,
      details: [
        {
          packDetailsID: 20001,
          title: "SUMMER GATEWAY AT DUBAI FOR 4 DAYS 3 NIGHTS",
          package: null,
          bannerImg:
            "https://www.triplover.com/ClientData/TopVisitedPlaces/Dubai_202111061303298133.jpg",
          rightSideImgOne:
            "https://img.traveltriangle.com/blog/wp-content/uploads/2017/09/aquaventure-parmk1.jpg",
          rightSideImgTwo:
            "https://www.visitdubai.com/-/media/dotsite/images/6-0-research-and-insights/2019/jul-2019/dtcm-dubai-tourism-performance-report-jul19-header-atlantis-sky-view-small.jpg",
          rightSideImgThree:
            "https://www.holidify.com/images/cmsuploads/compressed/the-palm-962785_960_720_20190929183908.jpg",
          descriptions: [
            { text: "03 nights accommodation in centrally located hotel" },
            { text: "Daily buffet breakfast at the hotel" },
            { text: "Return airport transfers" },
            { text: "Half day Dubai city tour" },
            { text: "Desert Safari with BBQ dinner and live entertainment" },
            { text: "Dubai creak dhow cruise with buffet dinner" },
            { text: "All above tours and tranfers on sharing basis" },
            { text: "All applicable hotel taxes" },
          ],
          totalPrice: 15500,
          hotel: {
            hotelType: null,
            hotelText: null,
          },
          location: "Dubai",
          validation: "Validity 30th,September",
        },
      ],
    },
    {
      packID: 1002,
      details: [
        {
          packDetailsID: 20002,
          title: "BANGKOK PATTAYA 5 DAYS 4 NIGHTS",
          package: "BREAKFAST WITH ROOMS INCLUDED",
          bannerImg:
            "https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg",
          rightSideImgOne:
            "https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg",
          rightSideImgTwo:
            "https://theculturetrip.com/wp-content/uploads/2019/12/tour_img-1142054-24.jpg",
          rightSideImgThree:
            "https://www.planetware.com/wpimages/2021/05/thailand-bangkok-top-attractions-wat-suthat.jpg",
          descriptions: [
            { text: "02 nights stay in Pattaya" },
            { text: "02 night stay in Bangkok" },
            {
              text: "Bangkok airport - Pattaya hotel - Bangkok hotel - Bangkok airport",
            },
            { text: "Coral islan + lunch on sharing basis" },
            { text: "Half day city tour of bangkok on sharing basis" },
            { text: "All taxes" },
          ],
          totalPrice: 15700,
          hotel: {
            hotelType: "4 Star Hotels",
            hotelText:
              "Sunbeam Pattaya or Similar | Ambassador Hotel bangkok or similar",
          },
          location: "Thailand",
          validation: "Validity 30th,September",
        },
        {
          packDetailsID: 20003,
          title: "BANGKOK PHUKET 7 DAYS 6 NIGHTS",
          package: "BREAKFAST WITH ROOMS INCLUDED",
          bannerImg:
            "https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg",
          rightSideImgOne:
            "https://www.golftripz.com/blog/wp-content/uploads/2019/06/BANGKOK-770x490.jpg",
          rightSideImgTwo:
            "https://theculturetrip.com/wp-content/uploads/2019/12/tour_img-1142054-24.jpg",
          rightSideImgThree:
            "https://www.planetware.com/wpimages/2021/05/thailand-bangkok-top-attractions-wat-suthat.jpg",
          descriptions: [
            { text: "02 night stay in Bangkok" },
            { text: "04 nights stay in Phuket" },
            {
              text: "Phi Phi islad + lunch on big boat on sharing basis",
            },
            { text: "Half day city tour of Bangkok on sharing basis" },
            { text: "Phuket airport - Phuket hotel - Phuket airport" },
            { text: "Bangkok airport - Bangkok hotel - Bangkok airport" },
            { text: "All taxes" },
          ],
          totalPrice: 26000,
          hotel: {
            hotelType: "4 Star Hotels",
            hotelText:
              " Novotel Phuket/Novotel Vintage Phuket or similar | Ambassador hotel bangkok or similar",
          },
          location: "Thailand",
          validation: "Validity 30th,September",
        },
      ],
    },
    {
      packID: 1003,
      details: [
        {
          packDetailsID: 20004,
          title: "HULHUMALE 3 DAYS 2 NIGHTS",
          package: null,
          bannerImg:
            "https://pyt-blogs.imgix.net/2021/12/beach-gedb05081c_1920.jpg?auto=format&ixlib=php-3.3.0",
          rightSideImgOne:
            "https://www.worthview.com/wp-content/uploads/2018/08/Dream-Places.jpeg",
          rightSideImgTwo:
            "https://hoteliermaldives.com/wp-content/uploads/Shutterstock-Maldives-Beach-Palm-Tree-lowres.jpg",
          rightSideImgThree:
            "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/11/19152709/shutterstock_1902416098-min-1351x900.jpg",
          descriptions: [
            { text: "Daily breakfast" },
            { text: "Airport to hotel to airport transportation" },
          ],
          totalPrice: 9000,
          hotel: {
            hotelType: "3 Star Hotels",
            hotelText: "Vista Beach hotel or similar",
          },
          location: "Maldives",
          validation: "Validity 30th,September",
        },
        {
          packDetailsID: 20005,
          title: "MAAFUSHI ISLAND 3 DAYS 2 NIGHTS",
          package: null,
          bannerImg:
            "https://pyt-blogs.imgix.net/2021/12/beach-gedb05081c_1920.jpg?auto=format&ixlib=php-3.3.0",
          rightSideImgOne:
            "https://www.worthview.com/wp-content/uploads/2018/08/Dream-Places.jpeg",
          rightSideImgTwo:
            "https://hoteliermaldives.com/wp-content/uploads/Shutterstock-Maldives-Beach-Palm-Tree-lowres.jpg",
          rightSideImgThree:
            "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2021/11/19152709/shutterstock_1902416098-min-1351x900.jpg",
          descriptions: [
            { text: "Daily breakfast" },
            { text: "Airport to hotel to airport transportation" },
          ],
          totalPrice: 13500,
          hotel: {
            hotelType: "3 Star Hotels",
            hotelText: "Icom Marina hotel or similar",
          },
          location: "Maldives",
          validation: "Validity 30th,September",
        },
      ],
    },
    {
      packID: 1004,
      details: [
        {
          packDetailsID: 20006,
          title: "KUALA LAMPUR - LANGKAWI 5 DAYS 4 NIGHTS",
          package: null,
          bannerImg:
            "https://media.cntraveller.com/photos/6193e2965502655976f78f59/16:9/w_5120,h_2880,c_limit/Malaysia-503847689-conde-nast-traveller-16nov21%20Getty.jpg",
          rightSideImgOne:
            "https://www.roadaffair.com/wp-content/uploads/2018/09/pulau-perhentian-besar-malaysia-shutterstock_688381156.jpg",
          rightSideImgTwo:
            "https://theculturetrip.com/wp-content/uploads/2021/05/malacca-city_pw6tdc.jpg",
          rightSideImgThree:
            "https://www.thediscoveriesof.com/wp-content/uploads/2022/03/Georgetown_Malaysia_shutterstock_586492775.jpg.webp",
          descriptions: [
            { text: "Daily breakfast" },
            { text: "Airport to hotel to airport transportation" },
            { text: "Return airport transfers" },
            { text: "Half day Dubai city tour" },
            { text: "Desert Safari with BBQ dinner and live entertainment" },
            { text: "Dubai creak dhow cruise with buffet dinner" },
            { text: "All above tours and tranfers on sharing basis" },
            { text: "All applicable hotel taxes" },
          ],
          totalPrice: 12500,
          hotel: {
            hotelType: "3 Star Hotels",
            hotelText: "EDC kuala lampur | bella vista hotel or similar",
          },
          location: "Malaysia",
          validation: "Validity 30th,September",
        },
      ],
    },
  ];
  window.scrollTo(0, 0);

  // const [bookingData, setBookingData] = useState({});
  const [selectPac, setSelectPac] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [journeyDate, setJourneyDate] = useState();
  const [adult, setAdult] = useState(1);
  const [child, setChild] = useState(0);
  const [infant, setInfant] = useState(0);

  // const [packCode, setPackCode] = useState();
  // const handleOnBlur = (e) => {
  //   const field = e.target.name;
  //   const value = e.target.value;
  //   const newBookingData = {
  //     ...bookingData,
  //     title: selectPac.title,
  //     packCode: selectPac.packDetailsID,
  //     isRemoved: false,
  //   };
  //   let obj = {
  //     name : name,
  //     email : email,
  //     phone : phone,
  //     message : message,
  //     title: selectPac.title,
  //     packCode: selectPac.packDetailsID,
  //   }
  //   newBookingData[field] = value;
  //   console.log(field, value, newRegisterData);
  //   setBookingData(obj);
  // };

  // console.log(bookingData);

  const handleBooking = (e) => {
    let bookingData = {
      name: name,
      email: email,
      phone: phone,
      message: message,
      title: selectPac.title,
      code: selectPac.packDetailsID,
      journeyDate: journeyDate,
      adult : adult,
      child : child,
      infant : infant
    };
    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setJourneyDate("");
    setAdult(1);
    setChild(0);
    setInfant(0);
    console.log(bookingData);
    axios
      .post(environment.packageQuery, bookingData, environment.headerToken)
      .then((response) => {
        console.log(response);
        if (response.data.isSuccess === true) {
          toast.success("Booking request successfully sent!");
        } else {
          toast.error("Something is wrong! Please try again!");
        }
      });
    // console.log(registerData)
    // registerUser(registerData);
    e.preventDefault();
  };

  return (
    <div className="bg-color pt-5">
      <Navbar></Navbar>
      <ToastContainer />
      {packageList.map((item, index) => {
        return (
          <>
            {parseInt(item.packID) === parseInt(Id) ? (
              <>
                {item.details.map((item, idx) => {
                  return (
                    <>
                      <div className="container p-5 border bg-white my-5 rounded box-shadow">
                        <div className="row">
                          <div className="col-lg-5 p-0 position-relative">
                            <img
                              src={item.bannerImg}
                              class="d-block w-100"
                              alt="..."
                              style={{ height: "307px" }}
                            />
                            <div
                              class="position-absolute"
                              style={{ left: "16px", top: "12px" }}
                            >
                              <span
                                className="btn btn-danger btn-sm rounded"
                                style={{ fontSize: "10px" }}
                              >
                                <span className="me-1">
                                  <i
                                    class="fa fa-clock-o"
                                    aria-hidden="true"
                                  ></i>
                                </span>
                                Validity 30th,September
                              </span>
                            </div>
                          </div>
                          <div
                            className="col-lg-2"
                            style={{ padding: "0px 7px" }}
                          >
                            <div className="col-lg-12 mb-2">
                              <img
                                src={item.rightSideImgOne}
                                class="d-block w-75 h-75"
                                alt="..."
                              />
                            </div>
                            <div className="col-lg-12 my-2">
                              <img
                                src={item.rightSideImgTwo}
                                class="d-block w-75 h-75"
                                alt="..."
                              />
                            </div>
                            <div className="col-lg-12 mt-2">
                              <img
                                src={item.rightSideImgThree}
                                class="d-block w-75 h-75"
                                alt="..."
                              />
                            </div>
                          </div>
                          <div
                            className="col-lg-5 text-start ps-3"
                            style={{ fontSize: "14px" }}
                          >
                            <h5
                              className="fw-bold"
                              style={{ fontSize: "15px" }}
                            >
                              {item.title}
                            </h5>
                            <ul>
                              {item.descriptions.map((item) => {
                                return (
                                  <>
                                    <li>{item.text}</li>
                                  </>
                                );
                              })}
                            </ul>
                            <h6 className="ms-2" style={{ fontSize: "14px" }}>
                              <span className="me-1">
                                <i
                                  class="fa fa-map-marker"
                                  aria-hidden="true"
                                ></i>
                              </span>
                              {item.location}
                            </h6>

                            <div className="mt-3">
                              <div className="row">
                                <div className="col-lg-6">
                                  <span className="btn btn-danger btn-sm rounded me-2">
                                    <span className="me-1">
                                      <i className="fas fa-plane fa-sm"></i>
                                      <i class="fas fa-plus mx-1"></i>
                                      <i className="fas fa-hotel"></i>
                                    </span>
                                  </span>
                                  <span
                                    className="btn btn-danger btn-sm rounded"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdrop"
                                    onClick={() => setSelectPac(item)}
                                  >
                                    Book now
                                  </span>
                                </div>
                                <div className="col-lg-6 text-end">
                                  <h5>
                                    BDT {item.totalPrice}{" "}
                                    <span style={{ fontSize: "12px" }}>PP</span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            ) : (
              <></>
            )}
          </>
        );
      })}

      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" style={{ maxWidth: "500px" }}>
          <div class="modal-content">
            <div class="modal-header">
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  setName("");
                  setEmail("");
                  setPhone("");
                  setMessage("");
                  setJourneyDate("");
                  setAdult(1);
                  setChild(0);
                  setInfant(0);
                }}
              ></button>
            </div>
            <div class="modal-body" style={{ backgroundColor: "#e5e5e54f" }}>
              <h6
                class="text-start py-3 text-white px-2 rounded"
                style={{ backgroundColor: "#02034b" }}
              >
                {selectPac.title}{" "}
                <span className="mx-2">
                  <i class="fa fa-map-marker" aria-hidden="true"></i>
                </span>
                {selectPac.location}
              </h6>
              <form onSubmit={handleBooking}>
                <div class="container-fluid">
                  <div class="row">
                    <input
                      type="hidden"
                      name="title"
                      defaultValue={selectPac.title}
                      class="form-control rounded"
                      id="recipient-name"
                      // ref={()=>setTitle(item.title)}
                    />
                    <input
                      type="hidden"
                      name="packCode"
                      defaultValue={selectPac.packDetailsID}
                      class="form-control rounded"
                      id="recipient-name"
                      // ref={()=>setPackCode(item.packDetailsID)}
                    />
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Email
                        </label>
                        <input
                          type="text"
                          name="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Phone
                        </label>
                        <input
                          type="number"
                          name="phone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                    <div class="col-lg-6">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Journey Date
                        </label>
                        <input
                          type="date"
                          name="journeyDate"
                          value={journeyDate}
                          onChange={(e) => setJourneyDate(e.target.value)}
                          class="form-control rounded"
                          id="recipient-name"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Adult
                        </label>
                        <select
                          name="adult"
                          className="form-select rounded"
                          onChange={(e) => {
                            const number = e.target.value;
                            setAdult(number);
                          }}
                          required
                        >
                          <option value="1" selected>1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                        </select>
                      </div>
                    </div>
                    <div class="col-lg-3">
                    <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Child
                        </label>
                        <select
                          name="adult"
                          className="form-select rounded"
                          onChange={(e) => {
                            const number = e.target.value;
                            setChild(number);
                          }}
                          required
                        >
                          <option value="0" selected>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>
                    </div>
                    </div>
                    <div class="col-lg-3">
                      <div class="mb-3">
                        <label
                          for="recipient-name"
                          class="col-form-label float-start"
                        >
                          Infant
                        </label>
                        <select
                          name="adult"
                          className="form-select rounded"
                          onChange={(e) => {
                            const number = e.target.value;
                            setInfant(number);
                          }}
                          required
                        >
                          <option value="0" selected>0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                        </select>
                    </div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-12">
                      <div class="mb-3">
                        <label
                          for="message-text"
                          class="col-form-label float-start"
                        >
                          Message
                        </label>
                        <textarea
                          class="form-control rounded"
                          id="message-text"
                          name="message"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          required
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    class="btn btn-danger btn-sm rounded float-start mb-3"
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
            {/* <div class="modal-footer">
              <button
                type="button"
                class="btn btn-danger btn-sm rounded"
                data-bs-dismiss="modal"
              >
                Send
              </button>
            </div> */}
          </div>
        </div>
      </div>

      <Footer></Footer>
    </div>
  );
};
export default PackageDetails;
