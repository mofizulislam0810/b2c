import React, { useEffect, useState } from "react";
import Navbar from "../SharedComponent/NavBar/Navbar";
import img from "../../images/profileImage/a279ec6b.png";
import "./ProfilePage.css";
import { Link } from "react-router-dom";
import Footer from "../SharedComponent/Footer/Footer";
import useAuth from "../../hooks/useAuth";
import courtries from "../../JSON/countries.json";
import axios from "axios";
import { environment } from "../../environment";
import { toast, ToastContainer } from "react-toastify";
import ReactPaginate from "react-paginate";

const ProfilePage = () => {
  const { user } = useAuth();
  // console.log(user);
  let [logoName, setLogoName] = useState();
  let [userId, setUserId] = useState();
  const [passengerInfo, setPassengerInfo] = useState({
    title: "Mr",
    first: "",
    last: "",
    gender: "male",
    email: "",
    passengerType: "ADT",
    phone: "",
    dateOfBirth: "",
    nationality: "BD",
    passportNumber: "",
    documentIssuingCountry: "",
    passportExpireDate: "",
    passportCopy: "",
    visaCopy: "",
    phoneCountryCode: "+88",
    cityName:""
  });

  const [userInfo, setUserInfo] = useState({});

  useEffect(()=>{
    setUserInfo({
      id: user?.id,
      fullName: user?.fullName,
      gender: user?.gender,
      mobile: user?.mobile,
      email: user?.email,
      address: user?.address
    })
  },[user])
  const [profileImage, setProfileImage] = useState(
    {
      file: '',
      imagePreviewUrl: "https://bootdey.com/img/Content/avatar/avatar7.png",
    }
  );

  const [imageSave, setImageSave] = useState(false);

  // const quickPackList = [
  //   {
  //     title: "Mr",
  //     firstName: "Ratul",
  //     lastName: "Islam",
  //     gender: "male",
  //     email: "ratul@gmail.com",
  //     passengerType: "ADT",
  //     phoneNumber: "01625898741",
  //     dateOfBirth: "1995-05-25",
  //     nationality: "BD",
  //     passportNumber: "",
  //     issuingCountry: "BD",
  //     passportExpireDate: "",
  //     passportCopy: "",
  //     visaCopy: "",
  //   },
  //   {
  //     title: "Master",
  //     firstName: "Tutul",
  //     lastName: "Islam",
  //     gender: "male",
  //     email: "tutul@gmail.com",
  //     passengerType: "CNN",
  //     phoneNumber: "01625898741",
  //     dateOfBirth: "2003-05-20",
  //     nationality: "BD",
  //     passportNumber: "",
  //     issuingCountry: "",
  //     passportExpireDate: "",
  //     passportCopy: "",
  //     visaCopy: "",
  //   },
  //   {
  //     title: "Ms",
  //     firstName: "Soneya",
  //     lastName: "Islam",
  //     gender: "female",
  //     email: "ratul@gmail.com",
  //     passengerType: "ADT",
  //     phoneNumber: "01625898741",
  //     dateOfBirth: "1996-08-02",
  //     nationality: "BD",
  //     passportNumber: "",
  //     issuingCountry: "",
  //     passportExpireDate: "",
  //     passportCopy: "",
  //     visaCopy: "",
  //   }
  // ]

  const handleEditItem = (item) => {
    console.log(item);
    setPassengerInfo({
      action: "edit",
      title: item.title,
      firstName: item.firstName,
      lastName: item.lastName,
      gender: item.gender,
      email: item.email,
      passengerType: item.passengerType,
      phoneNumber: item.phoneNumber,
      dateOfBirth: item.dateOfBirth,
      nationality: item.nationality,
      passportNumber: item.passportNumber,
      issuingCountry: item.issuingCountry,
      passportExpireDate: item.passportExpireDate,
      passportCopy: "",
      visaCopy: "",
    })
  };

  let [pageCount, setPageCount] = useState(0);
  let [pageSize, setPageSize] = useState(10);
  let [currentPageNumber, setCurrentPageNumber] = useState(1);
  let [currentItem, setCurrentItem] = useState({});
  let [passengerList, setPassengerList] = useState([]);
  // let [passengerType, setPassengerType] = useState("ADT");
  let [title, setTitle] = useState("");
  let [firstName, setFirstName] = useState("");
  let [middleName, setMiddleName] = useState("");
  let [lastName, setLastName] = useState("");
  let [dobDay, setDOBDay] = useState("");
  let [dobMonth, setDOBMonth] = useState("");
  let [dobYear, setDOBYear] = useState("");
  let [nationality, setNationality] = useState("BD");
  let [gender, setGender] = useState("Male");
  let [passportNo, setPassportNo] = useState("");
  let [issuingCountry, setIssuingCountry] = useState("");
  let [peDay, setPEDay] = useState("");
  let [peMonth, setPEMonth] = useState("");
  let [peYear, setPEYear] = useState("");
  let [phone, setPhone] = useState("");
  let [email, setEmail] = useState("");
  let [phoneCountryCode, setPhoneCountryCode] = useState("+88");
  let [cityName, setCityName] = useState("");
  let yearList = [];
  let [passportFileName, setPassportFileName] = useState("");
  let [visaFileName, setVisaFileName] = useState("");
  const handlePassportFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      fileExt === "jpg" ||
      fileExt === "jpeg" ||
      fileExt === "png" ||
      fileExt === "pdf"
    ) {
      var formData = new FormData();
      formData.append(`file`, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const postData = async () => {
        const response = await axios.post(
          environment.passengerupload + "/1/" + passportNo,
          formData,
          config
        );
        setPassportFileName(response.data.fileName);
      };
      postData();
    } else {
      toast.error("Sorry! file format not valid..");
    }
  };
  const handleVisaFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      fileExt === "jpg" ||
      fileExt === "jpeg" ||
      fileExt === "png" ||
      fileExt === "pdf"
    ) {
      setVisaFileName(file.name);
      var formData = new FormData();

      formData.append(`file`, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const postData = async () => {
        const response = await axios.post(
          environment.passengerupload + "/2/" + passportNo,
          formData,
          config
        );
        setVisaFileName(response.data.fileName);
      };
      postData();
    } else {
      toast.error("Sorry! file format not valid..");
    }
  };
  const handleSubmit = async() => {
    const response = await axios.post(environment.savePassenger,passengerInfo,environment.headerToken);
    if(response.data > 0){
      toast.success("Passenger saved successfully");
      setPassengerInfo({
        title: "Mr",
        first: "",
        last: "",
        gender: "male",
        email: "",
        passengerType: "ADT",
        phone: "",
        dateOfBirth: "",
        nationality: "BD",
        passportNumber: "",
        documentIssuingCountry: "",
        passportExpireDate: "",
        passportCopy: "",
        visaCopy: "",
        phoneCountryCode: "+88",
        cityName:""
      })
    }
    console.log(response);
  };

  const handleEditSubmit = async() => {
    // console.log(userInfo);
    const response  = await axios.put(environment.profileEdit,userInfo,environment.headerToken);
    console.log(response);
    if(response.data.isSuccess === true){
      toast.success("Data update successfully");
      setUserInfo(...userInfo)
    }
  }


  const logoFileUpload = (file) => {
    let fileExt = file.name.split(".").pop().toLowerCase();
    if (
      !(
        fileExt === "jpg" ||
        fileExt === "jpeg" ||
        fileExt === "png"
      )
    ) {
      toast.error("Sorry! Invalid file type..");
    }
    else {
      var formData = new FormData();
      formData.append(`file`, file);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      const postData = async () => {
        const response = await axios.post(
          environment.passengerupload + "/" + user?.id,
          formData,
          config
        ).then((res => {
          setLogoName(file.name);
          sessionStorage.setItem("logoName", file.name);
          window.location.reload();
        }));
      }
      postData();
    }
  }

  const handleGetPassengers = (currentPage) => {
    const getData = async () => {
      let sendObj = {
        AgentId: sessionStorage.getItem("agentId") ?? 0,
        SearchText: "",
      };
      const response = await axios.post(
        environment.getPassengers + `?pageNumber=${currentPage}&pageSize=${pageSize}`,
        environment.headerToken
      );
      console.log(response.data.data)
      setPassengerList(response.data.data);
      setPageCount(await response.data.totalPages);
      console.log(response.data);
    };
    getData();
  };
  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;
    setCurrentPageNumber(currentPage);
  };

useEffect(()=>{
  // handleGetUser();
  handleGetPassengers(currentPageNumber)
},[currentPageNumber])

  return (
    <div>
      <Navbar></Navbar>
      <ToastContainer />
      <div className="bg-color">
        <div class="container " style={{ paddingTop: "5%" }}>
          <div class="main-body py-5">
            <div class="row">
              <div class="col-md-4 mb-3">
                <div class="card bg-white">
                  <div class="card-body bg-white mx-5">
                    <div class="">

                      <label htmlFor="photo-upload" className="">
                       
                        {
                          user?.logoName === undefined && user?.logoName === null ? 
                          <>
                              <img
                              alt="img01"
                              className="mx-auto mb-3 rounded"
                              src={img}
                              style={{ width: "50%", height: "50%" }}
                            ></img>
                          </> : 
                          <>
                              <img
                              alt="img01"
                              className="mx-auto mb-3 rounded"
                              src={
                                environment.s3Link + user?.logoName
                              }
                              style={{  width: "50%", height: "50%"  }}
                        ></img>
                          </>
                      }
                          {/* <img for="photo-upload" src={profileImage.imagePreviewUrl}  width="100%" height="100%"/> */}
                     <input type={'file'} className='form-control' accept=".jpg, .jpeg, .png, .pdf"
                        onChange={(e) =>
                          logoFileUpload(
                            e.target.files[0]
                          )
                        }></input>                       
                      </label>

                      {/* {
                        imageSave ? <> <button class="btn btn-primary btn-sm rounded" onClick={handleSaveIamge}>Save</button></> : <></>
                      } */}

                      {/* <div class="container-box">
                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Avatar" class="image rounded-circle" style={{ width: "100%" }} />
                        <div class="middle">
                          <div class="text" data-bs-toggle="modal"
                            data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></div>
                        </div>
                      </div> */}

                      {/* <img
                        src="https://bootdey.com/img/Content/avatar/avatar7.png"
                        alt="Admin"
                        class="rounded-circle"
                        width="150"
                      /> */}
                      <div class="mt-3">
                        <h4>{user?.fullName}</h4>
                        <p class="text-secondary mb-1"> {user?.mobile}</p>
                        {/* <p class="text-muted font-size-sm">
                        Bay Area, San Francisco, CA
                      </p> */}
                        {/* <button class="btn btn-primary">Follow</button> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-md-8 bg-white ">
                <div className="d-flex align-items-center pt-3">
                  <h4>Passenger Info</h4>
                  <span className="btn btn-sm btn-secondary ms-2 rounded" data-bs-toggle="modal"
                    data-bs-target="#passengarModal"><i class="fas fa-edit"></i></span>
                </div>
                <hr></hr>
                <table class="table table-hover table-bordered table-sm pb-3" style={{ fontSize: "13px" }}>
                  <tbody className="p-2">
                    <tr>
                      <td class="text-start">Name</td>
                      <td class="text-start">
                        {userInfo?.fullName}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Gender</td>
                      <td class="text-start">{userInfo?.gender}</td>
                    </tr>
                    <tr>
                      <td class="text-start">Address</td>
                      <td class="text-start">
                        {userInfo?.address}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Email</td>
                      <td class="text-start">
                        {userInfo?.email}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Phone</td>
                      <td class="text-start">
                        {userInfo?.mobile}
                      </td>
                    </tr>
                    {/* <tr>
                      <td class="text-start">Passport Number</td>
                      <td class="text-start">
                        {userInfo?.passportNumber}
                      </td>
                    </tr>
                    <tr>
                      <td class="text-start">Passport Expired Date</td>
                      <td class="text-start">
                        {userInfo?.passportExpireDate}
                      </td>
                    </tr> */}
                  </tbody>
                </table>


                {/* <h4 class="text-start">Traveler Info</h4><hr></hr>
                <div class="ps-2">
                  <button
                    className="btn btn-sm btn-secondary float-start mb-3 rounded"
                    data-bs-toggle="modal"
                    data-bs-target="#accountModal"
                    onClick={() => setPassengerInfo({
                      ...passengerInfo,
                    }
                    )}
                  >
                     Add Traveler
                  </button>
                </div>
                <table class="table table-bordered table-striped table-sm px-2 mb-5" style={{ fontSize: "12px" }}>
                  <thead>
                    <tr>
                      <th scope="col">SL</th>
                      <th scope="col">Full Name</th>
                      <th scope="col">Gender</th>
                      <th scope="col">Email</th>
                      <th scope="col">Passenger Type</th>
                      <th scope="col" class="text-nowrap">Passport Number</th>
                      <th class="text-nowrap">Passport Exp. Date</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      passengerList.map((item, index) => {
                        return (
                          <tr>
                            <td scope="row">{index + 1}</td>
                            <td>{item.title + " " + item.firstName + " " + item.lastName}</td>
                            <td>{item.gender}</td>
                            <td>{item.email}</td>
                            <td>{item.passengerType}</td>
                            <td>{item.passportNumber === "" ? "N/A" : item.passportNumber}</td>
                            <td>{item.passportExpireDate === "" ? "N/A" : item.passportNumber}</td>
                            <td><span class="me-3" data-bs-toggle="modal"
                              data-bs-target="#accountModal" onClick={() => handleEditItem(item)}><i class="fas fa-edit"></i></span><span><i class="fas fa-trash"></i></span></td>
                          </tr>
                        );
                      })
                    }
                  </tbody>
                </table>
                <ReactPaginate
                      previousLabel={"previous"}
                      nextLabel={"next"}
                      breakLabel={"..."}
                      pageCount={pageCount}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={3}
                      onPageChange={handlePageClick}
                      containerClassName={"pagination justify-content-center"}
                      pageClassName={"page-item"}
                      pageLinkClassName={"page-link"}
                      previousClassName={"page-item"}
                      previousLinkClassName={"page-link"}
                      nextClassName={"page-item"}
                      nextLinkClassName={"page-link"}
                      breakClassName={"page-item"}
                      breakLinkClassName={"page-link"}
                      activeClassName={"active"}
                    /> */}
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="accountModal"
          tabIndex={-1}
          aria-labelledby="accountModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="accountModalLabel">
                  Add Passenger
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setPassengerInfo({
                    ...passengerInfo
                  })}
                ></button>
              </div>
              <div className="modal-body">
                <div className="border p-2 my-3">
                  {/* <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <select
                        id="name"
                        placeholder="Passenger Type"
                        className="form-select titel-width rounded"
                        onChange={(e) => setPassengerInfo({
                          ...passengerInfo,
                          passengerType : e.target.value})}
                        required
                        value={passengerInfopassengerType}
                      >
                        <option value="ADT"> Adult</option>
                        <option value="CNN"> Child</option>
                        <option value="INF"> Infant</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                  <div className="row py-1">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                          First name <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            name="firstName"
                            className="form-control rounded"
                            onChange={(e) =>
                              setPassengerInfo({
                                ...passengerInfo,
                                first: e.target.value,
                              })
                            }
                            value={passengerInfo.first}
                            required
                            autoComplete="off"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold" type="">
                          Last name <span className="text-danger">*</span>
                        </label>
                        <input
                          name="lastName"
                          className="form-control rounded"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              last: e.target.value,
                            })
                          }
                          value={passengerInfo.last}
                          required
                          autoComplete="off"
                          placeholder="Last Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Email
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="email"
                          className="form-control rounded"
                          name="email"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              email: e.target.value,
                            })
                          }
                          value={passengerInfo.email}
                          required
                          autoComplete="off"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                          Passenger Type <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <select
                            id="name"
                            placeholder="Passenger Type"
                            className="form-select titel-width rounded"
                            onChange={(e) =>
                              setPassengerInfo({
                                ...passengerInfo,
                                passengerType: e.target.value,
                                title: e.target.value === "ADT" ? "Mr" : "Master",
                                gender: "male",
                              })
                            }
                            required
                            value={passengerInfo.passengerType}
                          >
                            <option value="ADT"> Adult</option>
                            <option value="CNN"> Child</option>
                            <option value="INF"> Infant</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {passengerInfo.passengerType === "ADT" ? (
                      <>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-label float-start fw-bold"
                              type=""
                            >
                              Gender <span className="text-danger">*</span>
                            </label>
                            <div className="input-group mb-3">
                              <div class="form-check">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault1"
                                  checked={passengerInfo.gender === "male"}
                                  value="male"
                                  onClick={(e) =>
                                    setPassengerInfo({
                                      ...passengerInfo,
                                      gender: e.target.value,
                                      title: "Mr",
                                    })
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault1"
                                >
                                  Male
                                </label>
                              </div>
                              <div class="form-check ms-2">
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  checked={passengerInfo.gender === "female"}
                                  value="female"
                                  name="flexRadioDefault"
                                  id="flexRadioDefault2"
                                  onClick={(e) =>
                                    setPassengerInfo({
                                      ...passengerInfo,
                                      gender: e.target.value,
                                      title: "Ms",
                                    })
                                  }
                                />
                                <label
                                  class="form-check-label"
                                  for="flexRadioDefault2"
                                >
                                  Female
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4">
                          <div className="form-group">
                            <label
                              className="form-label float-start fw-bold"
                              type=""
                            >
                              Title <span className="text-danger">*</span>
                            </label>
                            <div className="input-group mb-3">
                              {passengerInfo.gender === "male" ? (
                                <>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault1"
                                      id="flexRadioDefault1"
                                      checked={passengerInfo.title === "Mr"}
                                      value="Mr"
                                      readOnly
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault1"
                                    >
                                      Mr
                                    </label>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div class="form-check">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault1"
                                      id="flexRadioDefault3"
                                      checked={passengerInfo.title === "Ms"}
                                      value="Ms"
                                      onChange={(e) =>
                                        setPassengerInfo({
                                          ...passengerInfo,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault3"
                                    >
                                      Ms
                                    </label>
                                  </div>
                                  <div class="form-check ms-2">
                                    <input
                                      class="form-check-input"
                                      type="radio"
                                      name="flexRadioDefault1"
                                      id="flexRadioDefault4"
                                      checked={passengerInfo.title === "Mrs"}
                                      value="Mrs"
                                      onChange={(e) =>
                                        setPassengerInfo({
                                          ...passengerInfo,
                                          title: e.target.value,
                                        })
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexRadioDefault4"
                                    >
                                      Mrs
                                    </label>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Gender <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault1"
                                    checked={passengerInfo.gender === "male"}
                                    value="male"
                                    onClick={(e) =>
                                      setPassengerInfo({
                                        ...passengerInfo,
                                        gender: e.target.value,
                                        title: "Master",
                                      })
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexRadioDefault1"
                                  >
                                    Male
                                  </label>
                                </div>
                                <div class="form-check ms-2">
                                  <input
                                    class="form-check-input"
                                    type="radio"
                                    checked={passengerInfo.gender === "female"}
                                    value="female"
                                    name="flexRadioDefault"
                                    id="flexRadioDefault2"
                                    onClick={(e) =>
                                      setPassengerInfo({
                                        ...passengerInfo,
                                        gender: e.target.value,
                                        title: "Miss",
                                      })
                                    }
                                  />
                                  <label
                                    class="form-check-label"
                                    for="flexRadioDefault2"
                                  >
                                    Female
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="form-group">
                              <label
                                className="form-label float-start fw-bold"
                                type=""
                              >
                                Title <span className="text-danger">*</span>
                              </label>
                              <div className="input-group mb-3">
                                {passengerInfo.gender === "male" ? (
                                  <>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault1"
                                        id="flexRadioDefault1"
                                        checked={passengerInfo.title === "Master"}
                                        value="Master"
                                        readOnly
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault1"
                                      >
                                        Master
                                      </label>
                                    </div>
                                  </>
                                ) : (
                                  <>
                                    <div class="form-check">
                                      <input
                                        class="form-check-input"
                                        type="radio"
                                        name="flexRadioDefault1"
                                        id="flexRadioDefault4"
                                        checked={passengerInfo.title === "Miss"}
                                        value="Miss"
                                        onChange={(e) =>
                                          setPassengerInfo({
                                            ...passengerInfo,
                                            title: e.target.value,
                                          })
                                        }
                                      />
                                      <label
                                        class="form-check-label"
                                        for="flexRadioDefault4"
                                      >
                                        Miss
                                      </label>
                                    </div>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </>
                      </>
                    )}
                  </div>

                  <div className="row py-1">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Phone Number <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control rounded"
                          name="passport-number"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              phone: e.target.value,
                            })
                          }
                          value={passengerInfo.phone}
                          required
                          autoComplete="off"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold" type="">
                          Date of birth
                          <span className="text-danger">*</span>
                        </label>
                        <div className="input-group d-flex">
                          <input
                            type="date"
                            className="form-control rounded"
                            name="passport-number"
                            onChange={(e) =>
                              setPassengerInfo({
                                ...passengerInfo,
                                dateOfBirth: e.target.value,
                              })
                            }
                            value={passengerInfo.dateOfBirth}
                            required
                            autoComplete="off"
                            placeholder="Phone"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold" type="">
                          Nationality <span className="text-danger">*</span>
                        </label>
                        <div className="input-group mb-3">
                          <select
                            name="nationality"
                            className="form-select rounded"
                            onChange={(e) =>
                              setPassengerInfo({
                                ...passengerInfo,
                                nationality: e.target.value,
                              })
                            }
                            value={passengerInfo.nationality}
                            required
                          >
                            {courtries.map((item, index) => {
                              return (
                                <option key={index} value={item.code}>
                                  {item.name}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row py-1">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Passport number <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="text"
                          className="form-control rounded"
                          name="passport-number"
                          required
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              passportNumber: e.target.value,
                            })
                          }
                          value={passengerInfo.passportNo}
                          autoComplete="off"
                          placeholder="Passport Number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Issuing country <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <select
                          className="form-select rounded"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              documentIssuingCountry: e.target.value,
                            })
                          }
                          value={passengerInfo.documentIssuingCountry}
                          required
                        >
                          <option value="">Issuing Country</option>
                          {courtries.map((item, index) => {
                            return (
                              <option key={index} value={item.code}>
                                {item.name}
                              </option>
                            );
                          })}
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Passport Expiry Date{" "}
                          <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="input-group mb-3 d-flex">
                        <input
                          type="date"
                          className="form-control rounded"
                          name="passport-number"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              passportExpireDate: e.target.value,
                            })
                          }
                          value={passengerInfo.passportExpireDate}
                          required
                          autoComplete="off"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Passport Copy
                        </label>
                      </div>
                      <div className="input-group mb-3 d-flex">
                        <input
                          type={"file"}
                          className="form-control rounded"
                          accept=".jpg, .jpeg, .png, .pdf"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              passportCopy: e.target.files[0],
                            })
                          }
                        />
                        {/* {passportNo !== "" ? (
                        <input
                          type={"file"}
                          accept=".jpg, .jpeg, .png, .pdf"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              passportCopy: e.target.files[0],
                            })
                          }
                         
                        ></input>
                      ) : (
                        <></>
                      )} */}
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Visa Copy
                        </label>
                      </div>
                      <div className="input-group mb-3 d-flex">
                        <input
                          type={"file"}
                          className="form-control rounded"
                          accept=".jpg, .jpeg, .png, .pdf"
                          onChange={(e) =>
                            setPassengerInfo({
                              ...passengerInfo,
                              visaCopy: e.target.files[0],
                            })
                          }
                        />
                        {/* {passportNo !== "" ? (
                        <input
                          type={"file"}
                          accept=".jpg, .jpeg, .png, .pdf"
                          onChange={(e) =>
                            handleVisaFileUpload(e.target.files[0])
                          }
                        ></input>
                      ) : (
                        <></>
                      )} */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary fw-bold btn-sm"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-danger fw-bold btn-sm"
                  onClick={() => handleSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal fade"
          id="passengarModal"
          tabIndex={-1}
          aria-labelledby="passengarModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="passengarModalLabel">
                  Edit Passenger Info
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setUserInfo({
                    ...userInfo
                  })}
                ></button>
              </div>
              <div className="modal-body">
                <div className="border p-2 my-3">
                  <div className="row py-1">
                    <div className="col-md-4">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                          Full Name <span className="text-danger">*</span>
                        </label>
                        <div className="input-group">
                          <input
                            name="fullName"
                            className="form-control rounded"
                            onChange={(e) =>
                              setUserInfo({
                                ...userInfo,
                                fullName: e.target.value,
                              })
                            }
                            value={userInfo?.fullName}
                            required
                            autoComplete="off"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Email
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="email"
                          className="form-control rounded"
                          name="email"
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              name: e.target.value,
                            })
                          }
                          value={userInfo?.email}
                          disabled
                          autoComplete="off"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          type=""
                        >
                          Gender <span className="text-danger">*</span>
                        </label>
                        <div className="input-group mb-3">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="flexRadioDefault11"
                              id="flexRadioDefault11"
                              value="male"
                              onClick={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  gender: e.target.value,
                                })
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault11"
                            >
                              Male
                            </label>
                          </div>
                          <div class="form-check ms-2">
                            <input
                              class="form-check-input"
                              type="radio"
                              value="female"
                              name="flexRadioDefault11"
                              id="flexRadioDefault12"
                              onClick={(e) =>
                                setUserInfo({
                                  ...userInfo,
                                  gender: e.target.value,
                                })
                              }
                            />
                            <label
                              class="form-check-label"
                              for="flexRadioDefault12"
                            >
                              Female
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row py-1">
                    <div className="col-lg-4">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Phone Number <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <input
                          type="number"
                          className="form-control rounded"
                          name="passport-number"
                          value={userInfo?.mobile}
                          disabled
                          autoComplete="off"
                          placeholder="Phone"
                        />
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="form-group">
                        <label
                          className="form-label float-start fw-bold"
                          htmlFor=""
                        >
                          Address <span className="text-danger">*</span>
                        </label>
                      </div>
                      <div className="input-group mb-3">
                        <textarea
                          className="form-control rounded"
                          name="passport-number"
                          required
                          onChange={(e) =>
                            setUserInfo({
                              ...userInfo,
                              address: e.target.value,
                            })
                          }
                          value={userInfo?.address}
                          autoComplete="off"
                          placeholder="Address"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary fw-bold btn-sm rounded"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-secondary fw-bold btn-sm rounded"
                  onClick={() => handleEditSubmit()}
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* <div
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
          <div class="modal-content" style={{ minHeight: "200px" }}>
            <div class="modal-body">
              <div class="text-center my-4">
                <div class="container">
                  <div class="row">
                  <div className="col-md-12">
                      <div className="form-group">
                        <label className="form-label float-start fw-bold">
                          Profile Image <span className="text-danger">*</span>
                        </label>
                          <div className="input-group">
                            <input
                              type="file"
                              name="profileImage"
                              className="form-control rounded"
                              // onChange={(e) =>
                              //   setUserInfo({
                              //     ...userInfo,
                              //     name: e.target.value,
                              //   })
                              // }
                              // value={userInfo.name}
                              required
                              autoComplete="off"
                              placeholder="First Name"
                            />
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="row mt-2">
                    <div class="col-md-12 text-center">
                      <button class="btn btn-primary btn-sm rounded" data-bs-dismiss="modal">Submit</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}


      </div>

      <Footer></Footer>
    </div>
  );
};

export default ProfilePage;