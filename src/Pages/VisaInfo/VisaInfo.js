import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "../SharedComponent/Footer/Footer";
import Navbar from "../SharedComponent/NavBar/Navbar";
// import { Form, Table } from 'react-bootstrap';

const VisaInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const [selectedVisa, setSelectedVisa] = useState(params.get("country"));

  const handleVisaSearch = (e) => {
    e.preventDefault();
    navigate({ pathname: "/visainfo", search: `?country=${selectedVisa}` });
  };

  // GET COUNTRIE LIST
  const [countries, setCountries] = useState();
  useEffect(() => {
    axios
      .get(`http://172.17.17.103:81/api/Dropdown/visa-details/`)
      .then((response) => {
        setCountries(response.data);
      });
  }, []);

  // GET VISA INFO BY COUNTRY ID
  const [data, setData] = useState();
  useEffect(() => {
    axios
      .get(
        `http://172.17.17.103:81/api/VisaDetails/visa-details?id=${selectedVisa}`
      )
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      });
  }, [location]);



  //query send
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  console.log(name, 'name')
  console.log(message, 'message')

  const submitData = (e) => {
    const data = {
      name: name,
      email: email,
      phone: phone,
      message: message
    }
    // console.log('data')
    console.log(data)
    e.preventDefault();
  }



  return (
    <div>
      <Navbar />
      <div className="d-flex justify-content-center m-4 my-5 py-5">
        <div style={{ width: "800px" }}>
          <div className="d-flex gap-2  justify-content-center">
            <select
              name="visa"
              id="visa"
              onChange={(e) => setSelectedVisa(e.target.value)}
              style={{
                height: "50px",
                width: "380px",
                textAlign: "left",
                boxShadow: "none",
                borderRadius: "0.25rem",
                padding: "10px",
              }}
              value={selectedVisa}
            >
              {countries &&
                countries.map((item) => (
                  <option value={item.id}>{item.name}</option>
                ))}
            </select>
            <button
              onClick={handleVisaSearch}
              className="btn btn-primary  fs-6 search-button w-100 rounded"
              style={{ height: "50px" }}
            >
              Show Visa Requirements
            </button>
            <button
              onClick={() => console.log("Send Query")}
              className="btn btn-primary  fs-6 search-button w-50 rounded"
              style={{ height: "50px" }} data-bs-toggle="modal" data-bs-target="#modalLoginForm"
            >
              Send Query
            </button>
          </div>

        </div>

      </div>
      {data &&
        <div className="text-start " style={{ marginLeft: '22%', marginRight: '15%' }}>
          <p style={{ lineHeight: '10px', fontFamily: 'serif', }}><strong>Country:{" "}</strong>{data.countryName}</p>
          <p style={{ lineHeight: '10px', fontFamily: 'serif', }}><b>Capital:{" "}</b>{data.capital}</p>
          <p style={{ fontFamily: 'serif', lineHeight: '10px' }}><b>ExchangeRate:{" "}</b>{data.exchangeRate}</p>
          <p style={{ fontFamily: 'serif', lineHeight: '10px' }}><b>Tele PhoneCode:{" "}</b>{data.telePhoneCode}</p>
          <p style={{ fontFamily: 'serif', lineHeight: '10px' }}><b>Local Time:{" "}</b>{data.localTimes}</p>
          <p style={{ fontFamily: 'serif', lineHeight: '10px' }}><b>Bank Time:{" "}</b>{data.bankTime}</p>

          <h5>Embassy Address</h5>

          <p style={{ fontSize: '12px', paddingTop: '15px', lineHeight: '10px', fontFamily: 'serif', }}
            dangerouslySetInnerHTML={{ __html: data.embassyAddress.replace(/(\r\n|\n|\r|\\n)/gm, '') }}></p>
          {/* visa fee  */}
          <p style={{ fontFamily: 'serif', lineHeight: '10px' }} dangerouslySetInnerHTML={{ __html: data?.othersDescription?.replace(/(''|''|\\n)/gm, '') }} />
          {/* other description */}
          <p dangerouslySetInnerHTML={{ __html: data.visaRequirmentDescription.replace(/(\r\n|\n|\r|\\n)/gm, '') }} style={{ fontFamily: 'serif', lineHeight: '10px' }} />
        </div>
      }
      {
        data &&
        <div class="modal fade " id="modalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
          aria-hidden="true" style={{ width: '450px', alignItem: 'center', marginLeft: '45%', marginTop: '3%' }}>
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header text-center" style={{ backgroundColor: '#b33310' }}>
                <h4 class="modal-title w-100 font-weight-bold" style={{ fontSize: '15px', marginRight: '60px', color: 'white' }}>SEND YOUR VISA REQUIREMENT FOR ({data.countryName})</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>

              </div>
              <div class="modal-body mx-3">
                <form onSubmit={submitData}>
                  <div className="form-group " >
                    <label for="exampleFormControlInput1" style={{ float: 'left', marginTop: '5px' }}>Name</label>
                    <input type='text' class="form-control" name="username" value={name}
                      onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="form-group " >
                    <label for="exampleFormControlInput2" style={{ float: 'left', marginTop: '5px' }}>Email</label>
                    <input type="text" class="form-control" name="Email" value={email}
                      onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  <div className="form-group " >
                    <label for="exampleFormControlInput3" style={{ float: 'left', marginTop: '5px' }}>Phone</label>
                    <input type='number' class="form-control" name="Phone" value={phone}
                      onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  <div _ngcontent-c4="" class="form-group">
                    <label _ngcontent-c4="" style={{ float: 'left', marginTop: '5px' }}>Message</label>
                    <textarea _ngcontent-c4="" class="form-control ng-pristine ng-invalid ng-touched" id="Message" name="Message" type="text" required value={message}
                      onChange={(e) => setMessage(e.target.value)}>
                    </textarea>
                  </div>
                  <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-success" style={{ borderRadius: '5px' }} >Send Now</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" aria-label="Close" style={{ borderRadius: '5px' }}>cancel</button>
                  </div>
                </form>
              </div>


            </div>
          </div>
        </div>
      }
      <Footer />
    </div>
  );
};

export default VisaInfo;
