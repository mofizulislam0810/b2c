import Footer from '../SharedComponent/Footer/Footer';
import Navbar from '../SharedComponent/NavBar/Navbar';
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { environment } from "../../environment";
import axios from "axios";
import React, { useRef, useState } from "react";

import Termscondition from './Terms-condition';
import icon1 from '../../images/icon/icon1.svg'
import icon2 from '../../images/icon/icon2.svg'
import icon3 from '../../images/icon/icon3.svg'
import './promotionDetails.css'
import payment from '../../images/logo/payment.png'
// import image3 from '../../images/logo/Frame 6.png'
import image1 from '../../images/logo/image1.jpg'
import image2 from '../../images/logo/image2.jpg'
import image4 from '../../images/logo/image4.jpg'
import image5 from '../../images/logo/image3.jpg'
import discount from '../../images/logo/discount.png'
import image from '../../images/logo/image.jpg'

const PromotionOfferDetails = () => {
    let promotionalOfferList = [
        {
            offerId: 1,
            image: image1
        },
        {
            offerId: 2,
            image: image2
        },
        {
            offerId: 3,
            image: image
        },
        {
            offerId: 4,
            image: image4
        },
        {
            offerId: 5,
            image: image5
        },
    ];


    const [selectPac, setSelectPac] = useState({});
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [message, setMessage] = useState('');
    const [journeyDate, setJourneyDate] = useState();
    const [adult, setAdult] = useState(1);
    const [child, setChild] = useState(0);
    const [infant, setInfant] = useState(0);

    const handleBooking = (e) => {
        let bookingData = {
            name: name,
            email: email,
            phone: phone,
            message: message,
            title: selectPac.title,
            packCode: selectPac.packDetailsID,
            journeyDate: journeyDate,
            adult: adult,
            child: child,
            infant: infant
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
        e.preventDefault();
    };


    const { Id } = useParams();
    const imageData = promotionalOfferList.filter((prod) => prod.offerId == Id);

    return (
        <div>
            <Navbar></Navbar>
            <>
                <div style={{ width: '100%', overflow: 'hidden', height: '600px', marginTop: '20px' }}>
                    <div className='mt-5' >
                        <div style={{ width: '100%', height: '80vh', position: "relative" }} >
                            <img src={imageData[0].image} alt="Norway"
                                style={{ width: '100%', objectFit: 'cover' }}
                            />
                            <div style={{ position: "absolute", top: "45%", left: "15%" }}>
                                <img src={discount} alt='discount' style={{ width: "360px" }} />
                            </div>
                        </div>
                    </div>

                </div>
                <div style={{ backgroundColor: '#E8F3FE', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <img src={payment} style={{ width: '600px', border: 'none', height: '45px', marginBottom: '5px', marginTop: '4px' }} />
                </div>




                <div style={{ marginTop: '100px' }}>
                    <h1 style={{ paddingBottom: '70px', fontSize: '30px' }}>What is the Offer</h1>
                    <div className='row ' style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', marginLeft: '30px', marginRight: '30px', marginBottom: '40px' }}>

                        <div style={{ backgroundColor: '#f5f7f6', maxWidth: "80%", height: '190px', marginBottom: '10px' }} className='col-md-3  rounded-3 p-3 open'>

                            <svg width="100" height="100" >
                            </svg>
                            <div className='center' style={{ backgroundColor: 'white', height: '120px', width: '120px', borderRadius: '50%', marginLeft: '30%', marginTop: '-170px' }}>
                                <img src={icon2} alt='' style={{ height: '90px', width: '90px', paddingTop: '30px' }} />
                            </div>

                            <h6 style={{ paddingRight: '30px', marginTop: '30px' }}>Offer</h6>
                            <h6 className='text-secondary '>Up to 14% discount on international<br />
                                flight bookings</h6>
                        </div>

                        <div style={{ backgroundColor: '#f5f7f6', marginLeft: '20px', maxWidth: "80%", height: '190px', marginBottom: '10px' }} className='col-md-3  rounded-3 p-3 open'>

                            <svg width="100" height="100" >
                            </svg>
                            <div className='center' style={{ backgroundColor: 'white', height: '120px', width: '120px', borderRadius: '50%', marginLeft: '30%', marginTop: '-170px' }}>
                                <img src={icon1} alt='' style={{ height: '90px', width: '90px', paddingTop: '30px' }} />

                            </div>
                            <h6 style={{ marginTop: '40px' }}>Partner</h6>
                            <h6 className='text-secondary ' >City Bank American Express®</h6>
                        </div>

                        <div style={{ backgroundColor: '#f5f7f6', marginLeft: '20px', maxWidth: "80%", height: '190px', marginBottom: '10px' }} className='col-md-3  rounded-3 p-3 open'>
                            <svg width="100" height="100" >
                            </svg>
                            <div className='center' style={{ backgroundColor: 'white', height: '120px', width: '120px', borderRadius: '50%', marginLeft: '30%', marginTop: '-170px' }}>
                                <img src={icon3} alt='' style={{ height: '90px', width: '90px', paddingTop: '30px' }} />
                            </div>
                            <h6 style={{ marginTop: '40px' }}>Validity</h6>
                            <h6 className='text-secondary ' >  Valid till 21 Oct, 2022</h6>
                        </div>

                    </div>
                </div>


                <div style={{ backgroundColor: '#E8F3FE', height: '' }} >
                    <h3 style={{ paddingTop: '30px', paddingBottom: '30px', fontSize: '30px' }}>How to avail the offer</h3>
                    <div className='container'>


                        <div className='row col-md-12 item ' style={{ display: 'flex' }}>
                            <div className='col-md-3 divItem'>
                                <ul className='text-start itemData'>
                                    <h1 style={{ fontWeight: 'bold', fontsize: '60px', color: '#34ebe8', paddingLeft: '20px' }}>1</h1>
                                    <h4 >Search</h4>
                                    <li style={{ fontSize: '12px' }}>
                                        Select destination, journey date 	&amp;<br />
                                        number of travelers on flight tab
                                    </li>
                                    <li style={{ fontSize: '12px' }}>
                                        Click ‘Search’
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-3 '>
                                <ul className='text-start itemData'>
                                    <h1 style={{ fontWeight: 'bold', fontsize: '60px', color: '#34ebe8', paddingLeft: '20px' }}>2</h1>
                                    <h4>Select</h4>
                                    <li style={{ fontSize: '12px', }}>
                                        Select preferred flight
                                    </li>
                                    <li style={{ fontSize: '12px' }}>
                                        Click ‘Select’
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-3 '>
                                <ul className='text-start itemData'>
                                    <h1 style={{ fontWeight: 'bold', fontsize: '60px', color: '#34ebe8', paddingLeft: '20px' }}>3</h1>
                                    <h4>Book</h4>
                                    <li style={{ fontSize: '12px' }}>
                                        Log in to your profile
                                    </li>
                                    <li style={{ fontSize: '12px' }}>
                                        Provide traveler details
                                    </li>
                                    <li style={{ fontSize: '12px' }}>
                                        Click ‘Confirm’
                                    </li>
                                </ul>
                            </div>
                            <div className='col-md-3 '>
                                <ul className='text-start itemData' >
                                    <h1 style={{ fontWeight: 'bold', fontsize: '60px', color: '#34ebe8', paddingLeft: '20px' }}>4</h1>
                                    <h4>Payment</h4>
                                    <li style={{ fontSize: '12px' }}>
                                        Select preferred payment method
                                    </li>
                                    <li style={{ fontSize: '12px' }}>
                                        Check discount details and click<br />‘Proceed to Payment’
                                    </li>
                                    <li style={{ fontSize: '12px' }}>
                                        Complete payment and get instant <br />confirmation
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </div>
                    <div style={{ justifyContent: 'center', alignItem: 'center', display: 'flex', }}>
                        <a className="btn btn-primary btn-lg rounded float-start details-button" style={{ marginBottom: '-20px' }} data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            BOOK NOW
                        </a>

                    </div>

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

                </div>
                <Termscondition></Termscondition>
            </>
            <Footer></Footer>
        </div >
    );
};

export default PromotionOfferDetails;