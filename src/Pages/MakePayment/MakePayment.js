import axios from "axios";
import React, { useEffect, useState } from "react";
import { useBkash } from "react-bkash";
import { toast, ToastContainer } from "react-toastify";
import { environment } from "../../environment";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
import "./MakePayment.css";
import $ from 'jquery';

import useAuth from "../../hooks/useAuth";
import BkashButton from "./BkashButton";
const MakePayment = () => {
  // const [amount, setAmount] = useState(0)
  const { gatewayCharge } = useAuth();
  
  const [formData, setFormData] = useState({
    purpose: "Reissue charge",
    amount: 0,
    charge: 0,
    totalAmount: 0,
    paymentGateway: "SSL",
  });

  console.log(formData);

  // const gatewayCharge = JSON.parse(sessionStorage.getItem("gatewayCharge"));
  // const charge = gatewayCharge?.filter(
  //   (item) => item.name === formData.paymentGateway
  // );
  let charge = [];
if(gatewayCharge !== undefined){
   charge = gatewayCharge?.filter(
    (item) => item.name === formData.paymentGateway
  );
  console.log(charge !== undefined ? charge[0].charge : 0);
}
  const handleSubmitData = (e) => {
    if(formData.paymentGateway === "SSL"){
      axios
      .post(environment.paymentLog, formData, environment.headerToken)
      .then((response) => {
        if (response.data.isSuccess === true)
         {
          window.location = response.data.sslUrl
        };
      })
      .catch((err) => {
        // toast.error("Sorry! Please try again");
      });
    }else if(formData.paymentGateway === "Brac"){
      axios
      .post(environment.paymentCheckoutBrac, formData, environment.headerToken)
      .then((response) => {
        if (response.data.IsSuccess === true)
         {
          window.open(response.data.Data,"_self")
        };
      })
      .catch((err) => {
        // toast.error("Sorry! Please try again");
      });
    }
   
    e.preventDefault();
  };

  let [idToken, setIdToken] = useState('');
  const [paymentRequest,setPaymentRequest] = useState({
    amount: formData.amount, //max two decimal points allowed 
    intent: 'authorization',
    token: idToken,
    purpose: "Reissue charge",
    charge: 0,
    totalAmount: 0,
    paymentGateway: "Bkash",
  })

 

  const token = async () => {
    await axios
      .post("http://localhost:7236/api/bKash/GetLogin")
      .then((response) => {
        setIdToken(response.data.id_token);
        paymentRequest.token=response.data.data.id_token;
        setPaymentRequest(paymentRequest);
      })
      .catch((err) => {
        // toast.error("Sorry! Please try again");
      });
  }

  useEffect(() => {
    token();
  }, [])

  
console.log(paymentRequest);
  // console.log(environment.paymentLog);
  // console.log(environment.paymentCheckoutBkash);

  sessionStorage.setItem("paymentRequest",JSON.stringify(paymentRequest));
  sessionStorage.setItem("amount",JSON.stringify(paymentRequest.amount));
  



  return (
    <div>
      <ToastContainer />
      <div className="bg-color">
        <Navbar></Navbar>
        <div className="container pt-5">
          <div className="row bg-white my-5">
            {/* <strong>Amount</strong>{" "}
              <input type={"number"} className="form-control"></input>
              <strong>Charge:</strong> % <br />
              <strong>Total Amount:</strong> <br /> */}
            <div className="col-lg-12">
              <form
                className="mx-5 my-3"
                encType="multipart/form-data"
                // style={{ minHeight: "500px" }}
                onSubmit={handleSubmitData}
              >
                <div className="card text-start pt-3">
                  <div
                    className="card-header fw-bold"
                    style={{ color: "#02046a" }}
                  >
                    Make Payment
                  </div>
                  <div className="card-body">
                    <div className="row my-3">
                      <div className="col-lg-6">
                        <fieldset
                          class="border rounded"
                          style={{ padding: "2%" }}
                        >
                          <legend class="float-none w-auto">
                            Purpose <span className="text-danger">*</span>
                          </legend>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input me-1 radio-type"
                              type="radio"
                              name="inlineRadioOptionsOne"
                              id="purpose1"
                              checked={formData.purpose === "Reissue charge"}
                              value="Reissue charge"
                              onClick={(e) =>
                                {
                                  setFormData({
                                    ...formData,
                                    purpose: e.target.value,
                                    charge: charge[0]?.charge,
                                  })
                                  setPaymentRequest({
                                    ...paymentRequest,
                                    purpose:e.target.value
                                  })
                                }
                              }
                            />
                            <label
                              className="form-check-label fs-6 me-2"
                              htmlFor="purpose1"
                            >
                              Reissue charge
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input me-1 radio-type"
                              type="radio"
                              name="inlineRadioOptionsOne"
                              id="purpose2"
                              checked={formData.purpose === "Other service charge"}
                              value="Other service charge"
                              onClick={(e) =>{
                                setFormData({
                                  ...formData,
                                  purpose: e.target.value,
                                  charge: charge[0]?.charge,
                                });
                                setPaymentRequest({
                                  ...paymentRequest,
                                  purpose:e.target.value
                                })
                               }                                
                              }
                            />
                            <label
                              className="form-check-label fs-6 me-2"
                              htmlFor="purpose2"
                            >
                              Other service charge
                            </label>
                          </div>
                          {/* <div className="form-check form-check-inline">
                          <input
                            className="form-check-input me-1 radio-type"
                            type="radio"
                            name="inlineRadioOptionsOne"
                            id="purpose3"
                            value={3}
                            checked={formData.purpose === 3}
                            onClick={(e) => setFormData({ purpose : e.target.value})}
                          />
                          <label
                            className="form-check-label fs-6 me-2"
                            htmlFor="purpose3"
                          >
                            Other
                          </label>
                        </div> */}
                        </fieldset>
                      </div>

                      <div className="col-lg-6">
                        <fieldset class="border p-2 rounded">
                          <legend class="float-none w-auto">
                            Paywith <span className="text-danger">*</span>
                          </legend>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input me-1 radio-type"
                              type="radio"
                              name="inlineRadioOptionsTwo"
                              id="option1"
                              checked={formData.paymentGateway === "SSL"}
                              value="SSL"
                              onClick={(e) =>
                                setFormData({
                                  ...formData,
                                  paymentGateway: e.target.value,
                                  charge: gatewayCharge?.filter(
                                    (item) => item.name === e.target.value
                                  )[0].charge,
                                  totalAmount:
                                    parseInt(formData.amount) +
                                    parseInt(formData.amount) *
                                    (gatewayCharge?.filter(
                                      (item) => item.name === e.target.value
                                    )[0]?.charge /
                                      100),
                                })
                              }
                            />
                            <label
                              className="form-check-label fs-6 me-2"
                              htmlFor="option1"
                            >
                              <img
                                src={require("../../images/payment/Screenshot 2022-06-29 110437.png")}
                                alt=""
                                width={"50px"}
                                height={"30px"}
                              />{" "}
                              <span className="mx-1"></span>
                              <img
                                src={require("../../images/payment/Screenshot 2022-06-29 110501.png")}
                                alt=""
                                width={"50px"}
                                height={"30px"}
                              />
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input me-1 radio-type"
                              checked={formData.paymentGateway === "Bkash"}
                              type="radio"
                              name="inlineRadioOptionsTwo"
                              id="option2"
                              value="Bkash"
                              onClick={(e) =>
                                setFormData({
                                  ...formData,
                                  paymentGateway: e.target.value,
                                  charge: gatewayCharge?.filter(
                                    (item) => item.name === e.target.value
                                  )[0]?.charge,
                                  totalAmount:
                                    parseInt(formData.amount) +
                                    parseInt(formData.amount) *
                                    (gatewayCharge?.filter(
                                      (item) => item.name === e.target.value
                                    )[0]?.charge /
                                      100),
                                })
                              }
                            />
                            <label
                              className="form-check-label fs-6 me-2"
                              htmlFor="option2"
                            >
                              <img
                                src={require("../../images/payment/bkash-logo-250D6142D9.png")}
                                alt=""
                                width={"50px"}
                                height={"30px"}
                              />
                            </label>
                          </div>
                          <div className="form-check form-check-inline">
                            <input
                              className="form-check-input me-1 radio-type"
                              checked={formData.paymentGateway === "Brac"}
                              type="radio"
                              name="inlineRadioOptionsTwo"
                              id="option3"
                              value="Brac"
                              onClick={(e) =>
                                setFormData({
                                  ...formData,
                                  paymentGateway: e.target.value,
                                  charge: gatewayCharge?.filter(
                                    (item) => item.name === e.target.value
                                  )[0]?.charge,
                                  totalAmount:
                                    parseInt(formData.amount) +
                                    parseInt(formData.amount) *
                                    (gatewayCharge?.filter(
                                      (item) => item.name === e.target.value
                                    )[0]?.charge /
                                      100),
                                })
                              }
                            />
                            <label
                              className="form-check-label fs-6 me-2"
                              htmlFor="option3"
                            >
                              <img
                                src={"https://www.ifcamc.org/sites/amc/files/BRAC_Bank.png"}
                                alt=""
                                width={"50px"}
                                height={"30px"}
                              />
                            </label>
                          </div>
                        </fieldset>
                      </div>
                    </div>
                    <div className="row mb-3">
                      <div className="col-lg-5">
                        <label class="form-label">
                          Enter amount <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control rounded"
                          // value={amount}
                          onChange={(e) =>{
                            // setAmount(e.target.value)
                            setFormData({
                              ...formData,
                              amount: e.target.value,
                              charge: charge[0]?.charge,
                              totalAmount:
                                parseInt(e.target.value) +
                                parseInt(e.target.value) *
                                (charge[0]?.charge / 100),
                            });
                            setPaymentRequest({
                              ...paymentRequest,
                              amount: e.target.value
                            })
                          }
                            
                          }
                          required
                        ></input>
                      </div>
                      {/* <div className="col-lg-4">
                        <label class="form-label">
                          Charge <span className="text-danger">*</span>
                        </label>
                        <input
                          type="number"
                          className="form-control rounded"
                          value={charge[0].charge}
                          disabled
                        ></input>
                      </div> */}
                      <div className="col-lg-5">
                        <label class="form-label">
                          Total payable with gateway charge
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          value={
                            parseInt(formData.amount) +
                            parseInt(formData.amount) * (charge[0]?.charge / 100)
                          }
                          disabled
                        ></input>
                      </div>
                      <div className="col-lg-2" style={{ marginTop: "2rem" }}>
                        {
                          formData.paymentGateway === "Bkash" ? 
                          
                          <BkashButton paymentRequest={paymentRequest}/>
                          
                          : <button
                            type="submit"
                            className="btn btn-primary rounded px-3"
                          >
                            Pay now
                          </button>
                        }
                      </div>
                    </div>
                    {/* <div className="row mb-3">
                      <div className="col-lg-4">
                        <label class="form-label">
                          UniqueTransID <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          required
                        ></input>
                      </div>
                      <div className="col-lg-4">
                        <label class="form-label">
                          PNR <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          required
                        ></input>
                      </div>
                      <div className="col-lg-4">
                        <label class="form-label">
                          Ticket Number <span className="text-danger">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control rounded"
                          required
                        ></input>
                      </div>
                    </div> */}
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

export default MakePayment;
