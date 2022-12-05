import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AuthProvider from "./context/AuthProvider/AuthProvider";
import BookingList from "./Pages/BookingList/BookingList";
import BookingListView from "./Pages/BookingListView/BookingListView";
import DomesticFlightPage from "./Pages/DomesticFlightPage/DomesticFlightPage/DomesticFlightPage";
import FailPage from "./Pages/FailPage/FailPage";
import FailTicket from "./Pages/FailTicket/FailTicket";
import AllFlightPage from "./Pages/FlightPage/AllFlightPage/AllFlightPage";
import FlightTracker from "./Pages/FlightTracker/FlightTracker";
import HomePage from "./Pages/HomePage/HomePage/HomePage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MakePayment from "./Pages/MakePayment/MakePayment";
import MyTransactions from "./Pages/MyTransactions/MyTransactions";
import BankDetails from "./Pages/Optional/BankDetails/BankDetails";
import Contact from "./Pages/Optional/Contact/Contact";
import FAQ from "./Pages/Optional/FAQ/FAQ";
import PrivacyPolicy from "./Pages/Optional/PrivacyPolicy/PrivacyPolicy";
import RefundAndCancellation from "./Pages/Optional/RefundAndCancellation/RefundAndCancellation";
import TermCondition from "./Pages/Optional/TermCondition/TermCondition";
import PackageDetails from "./Pages/PackageDetails/PackageDetails";
import PackageDetailsD from "./Pages/PackageDetails/PackageDetailsD";
import PackageDetailsM from "./Pages/PackageDetails/PackageDetailsM";
import PackageDetailsMaly from "./Pages/PackageDetails/PackageDetailsMaly";
import PackageDetailst from "./Pages/PackageDetails/PackageDetailst";
import PrivateRoute from "./Pages/PrivateRoute/PrivateRoute";
import ProfilePage from "./Pages/ProfilePage/ProfilePage";
import PromotionOfferDetails from "./Pages/PromotionOfferDetails/PromotionOfferDetails";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import ShowJsonData from "./Pages/ShowJsonData/ShowJsonData";
import SuccessPage from "./Pages/SuccessPage/SuccessPage";
import SuccessTicket from "./Pages/SuccessTicket/SuccessTicket";
import TicketPage from "./Pages/TicketPage/TicketPage";
import TrackFlight from "./Pages/TrackFlight/TrackFlight";
import TravellCartConfirm from "./Pages/TravellCartConfirm/TravellCartConfirm";
import TravellCartPage from "./Pages/TravellCartPage/TravellCartPage/TravellCartPage";
import ViewReceipt from "./Pages/ViewReceipt/ViewReceipt";
import VisaInfo from "./Pages/VisaInfo/VisaInfo";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/flightsearch" element={<AllFlightPage />} />
            <Route path="/visainfo" element={<VisaInfo />} />
            <Route
              path="/domesticflightsearch"
              element={<DomesticFlightPage />}
            />
            <Route path="/showdata" element={<ShowJsonData />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/bankdetail" element={<BankDetails />} />
            <Route path="/privacypolicy" element={<PrivacyPolicy />} />
            <Route path="/termandcondition" element={<TermCondition />} />
            <Route
              path="/refundandcancellation"
              element={<RefundAndCancellation />}
            />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/packagedetails" element={<PackageDetails />}>
              <Route path=":Id" element={<PackageDetails />} />
            </Route>
            <Route path="/promotionoffer" element={<PromotionOfferDetails />}>
              <Route path=":Id" element={<PromotionOfferDetails />} />
            </Route>
            <Route path="/packagedetailsd" element={<PackageDetailsD />} />
            <Route path="/packagedetailst" element={<PackageDetailst />} />
            <Route path="/packagedetailsm" element={<PackageDetailsM />} />
            <Route
              path="/packagedetailsmaly"
              element={<PackageDetailsMaly />}
            />

            <Route
              path="/travellcart"
              element={
                <PrivateRoute>
                  <TravellCartPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/travellcartconfirm"
              element={
                <PrivateRoute>
                  <TravellCartConfirm />
                </PrivateRoute>
              }
            />
            {/* <Route path="/travellcart" element={<TravellCartPage />} />
            <Route path="/travellcartconfirm" element={<TravellCartConfirm/>}/> */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <ProfilePage />
                </PrivateRoute>
              }
            />
            <Route
              path="/successbooking"
              element={
                <PrivateRoute>
                  <SuccessPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/ticket"
              element={
                <PrivateRoute>
                  <TicketPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/successticket"
              element={
                <PrivateRoute>
                  <SuccessTicket />
                </PrivateRoute>
              }
            />
            <Route
              path="/processticket"
              element={
                <PrivateRoute>
                  <FailTicket />
                </PrivateRoute>
              }
            />
            <Route
              path="/fail"
              element={
                <PrivateRoute>
                  <FailPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookingList"
              element={
                <PrivateRoute>
                  <BookingList />
                </PrivateRoute>
              }
            />
            <Route
              path="/bookingListView"
              element={
                <PrivateRoute>
                  <BookingListView />
                </PrivateRoute>
              }
            />
            <Route
              path="/makepayment"
              element={
                <PrivateRoute>
                  <MakePayment />
                </PrivateRoute>
              }
            />
            <Route
              path="/mytransaction"
              element={
                <PrivateRoute>
                  <MyTransactions />
                </PrivateRoute>
              }
            />
            <Route
              path="/successpayment"
              element={
                <PrivateRoute>
                  <ViewReceipt />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/flighttracker" element={<FlightTracker />} />
            <Route path="/trackflight" element={<TrackFlight />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
