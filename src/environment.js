// const baseURL='http://52.221.202.198:83/';
// const baseURL = 'http://54.169.108.46:81/';
// const baseURL = "http://172.17.17.103:81/";
const baseURL='http://localhost:7236/';
const baseApiURL = baseURL + "api/";
const flightApiURL = baseURL + "api/";
const tokenData = JSON.parse(localStorage.getItem("token"));
let headerToken = { headers: { Authorization: "Bearer " + tokenData?.token } };
export const environment = {
  headerToken: headerToken,
  register: baseApiURL + "user/B2CRegister",
  login: baseApiURL + "user/b2clogin",
  currentUserInfo: baseApiURL + "user/GetCurrentUser",
  logoFileUpload: baseApiURL + "user/uploadB2B",
  profileEdit: baseApiURL + "user/B2CProfileEdit",
  // headerToken:headerToken,
  weatherList: baseURL + "weatherforecast",
  userList: baseApiURL + "user",
  searchFlight: baseApiURL + "Search",
  bookFlight: baseApiURL + "Book",
  ticketingFlight: baseApiURL + "Ticket",
  priceCheck: baseApiURL + "RePrice",
  bookingLog: baseApiURL + "BookB2C/BookingLog",

  getTicketingList: baseApiURL + "ReportB2C/AirTicketingWeb",
  getTicketingDetails: baseApiURL + "ReportB2C/AirTicketingDetails",
  passengerListByIds: baseApiURL + "report/PassengerListByIds",
  gatewayCharge: baseApiURL + "paymentgateway/gatewaycharges",
  externalUser: baseApiURL + "User/B2CExternalLogin",
  packageQuery: baseApiURL + "PackageQuery",

  // payment gateway list
  paymentLogList: baseApiURL + "B2CPaymentLog",

  // payment gateway
  paymentLog: baseApiURL + "B2CPaymentLog/Checkout",
  paymentCheckoutBrac: baseApiURL + "B2CPaymentLog/CheckoutBrac",
  paymentCheckoutBkash: baseApiURL + "B2CPaymentLog/CheckoutBkash",
  paymentCheckoutConfirmationBkash:
    baseApiURL + "B2CPaymentLog/ConfirmationBkash",

  paymentCheckout: baseApiURL + "BookB2C/Checkout",
  bookCheckoutBrac: baseApiURL + "BookB2C/CheckoutBrac",
  bookCheckoutBkash: baseApiURL + "BookB2C/CheckoutBkash",
  bookCheckoutConfirmationBkash: baseApiURL + "BookB2C/ConfirmationBkash",

  getTicketPending: baseApiURL + "ReportB2C/AirTicketingPending",
  getTicketCancle: baseApiURL + "ReportB2C/AirTicketingCancelled",
  // passengerupload : baseApiURL + 'AgentInfo/passengerupload',
  passengerupload: baseApiURL + "B2CInfo/upload",

  s3Link: "https://tlluploaddocument.s3.ap-southeast-1.amazonaws.com/",
  staticImg: "wwwroot/Uploads/Users/",
  bkashToken: "bKash/GetLogin"
};
