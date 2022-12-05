import { useState, useEffect } from "react";
import axios from "axios";
import { environment } from "../environment";
import { toast } from "react-toastify";
const useAuthentication = () => {

  const [bookData, setBookData] = useState([]);
  const [ticketData, setTicketData] = useState([]);
  const token = JSON.parse(localStorage.getItem("token"));
  // console.log(token);
  const [login, setLogin] = useState(token && token?.token !== undefined ? true : false);
  const [doDepartureIndex, setDoDepartureIndex] = useState(0);
  const [doReturnIndex, setDoReturnIndex] = useState(0);
  const [search, setSearch] = useState({});
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [choosePaymentOption, setChoosePaymentOption] = useState("SSL");
  const [obj, setObj] = useState({
    airlineName: "",
    flightCode: 0,
    date: new Date().toISOString().split("T")[0],
  });
  // const tokenData = JSON.parse(localStorage.getItem('token'));
  // if(tokenData?.token !== null){
  //     setLogin(true);
  //   }

  // console.log("---" +login);
  const [gatewayCharge, setGatewayCharge] = useState();

  const handleOnCharge = async () => {
    await axios
      .get(environment.gatewayCharge, environment.headerToken)
      .then((response) => {
        setGatewayCharge(response.data);
        // localStorage.setItem("gatewayCharge", JSON.stringify(response.data));
      })
      .catch((err) => {
        // toast.error("Sorry! Please try again");
      });
  };
  const onClickLogout = (navigate) => {
    localStorage.removeItem("token");
    setLogin(false);
    navigate("/login");
    // window.location.reload();
    // alert('ok');
  };
  const onClickLoginButton = async(loginData, location, navigate) => {
    await axios
      .post(environment.login, loginData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.isSuccess === true) {
          localStorage.setItem("token", JSON.stringify(response.data.data));
          const destination = location.state?.from || "/";
          navigate(destination);
          window.location.reload();
          setLogin(true);
        } else {
          toast.error("Email or password is wrong!");
        }
      })
      .catch((err) => {
        toast.error("Sorry! Please try again");
      });

    //console.log(loginData)
    //    let datat = {
    //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6ImthbXJ1bC5jc2VwdUBnbWFpbC5jb20iLCJuYmYiOjE2NDY5MDk2NjgsImV4cCI6MTY0NjkxMTQ2OCwiaWF0IjoxNjQ2OTA5NjY4fQ.rqz8GCO5oi8eeDw3ao5f0pLSQH0BsI8n9UI95SddFMw",
    //     "refreshToken": null,
    //     "expireIn": "2022-03-10T11:24:28.2451394Z",
    //     "error": null
    // };
    //     localStorage.setItem('token', JSON.stringify(datat))
  };

  const registerUser = (registerData) => {
    console.log(registerData);
  };

  const domesticDeparture = (id) => {
    setDoDepartureIndex(id);
  };

  const domesticReturn = (id) => {
    setDoReturnIndex(id);
  };

  useEffect(() => {
    if(login){
      handleOnCharge();
    }
  }, []);

console.log(gatewayCharge);

  return {
    login,
    onClickLogout,
    onClickLoginButton,
    registerUser,
    domesticDeparture,
    doDepartureIndex,
    domesticReturn,
    doReturnIndex,
    setBookData,
    setLoading,
    user,
    setUser,
    setTicketData,
    bookData,
    ticketData,
    loading,
    gatewayCharge,
    setLogin,
    setChoosePaymentOption,
    choosePaymentOption,
    setObj,
    obj
  };
};

export default useAuthentication;
