import axios from 'axios';
import React from 'react'
import { useBkash } from 'react-bkash';
import { useNavigate } from "react-router-dom";
import { environment } from "../../environment";

const BkashButton = ({paymentRequest}) => {
   
    // console.log("+++++++++++++")
    // console.log(paymentRequest)

    const navigate = useNavigate();
    const bkashFunction = () =>{
        triggerBkash();
    }

    const { error, loading, triggerBkash } = useBkash({
        onSuccess: (data) => {
        //   if(data==undefined){
        //     // alert("Sorry! Please try again");
        //   }
        //  else{
        //   alert("Thanks! Payment success");
        //  }
              //$("iframe[name='bKash_checkout_app']").hide();
              if(data.data.isSuccess==false){
                alert(data.data.message);
             }
        },
        onClose: () => {
          console.log("Bkash iFrame closed");
        },
        bkashScriptURL:
          "https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js", // https://scripts.sandbox.bka.sh/versions/1.2.0-beta/checkout/bKash-checkout-sandbox.js
        amount:  paymentRequest.amount,
        onCreatePayment: async () => {
       
          return await axios
            .post(environment.paymentCheckoutBkash, JSON.parse(sessionStorage.getItem("paymentRequest")),environment.headerToken)
            .then((response) => {
              // console.log(response)
              return {
                paymentID: response.data.paymentID,
                createTime: response.data.createTime,
                orgLogo: response.data.orgLogo,
                orgName: response.data.orgName,
                transactionStatus: response.data.transactionStatus,
                amount: response.data.amount,
                currency: response.data.currency,
                intent: response.data.intent,
                merchantInvoiceNumber: response.data.merchantInvoiceNumber
              };
            })
            .catch((err) => {
              //alert("Sorry! Please try again");
            });
        },
        onExecutePayment: async (paymentID) => {
          // console.log(paymentID)
          let reqObj = { "paymentID": paymentID };
          return await axios
            .post(environment.paymentCheckoutConfirmationBkash, reqObj,environment.headerToken)
            .then((response) => {
              console.log(response);
              if(response.data.isSuccess === true){
                navigate("/successpayment?res="+response.data.res);
                window.location.reload();
              }
              // $("iframe[name='bKash_checkout_app']").hide();
            })
            .catch((err) => {
              // alert("Sorry! Please try again");
            });;
          // it doesn't matter what you return here, any errors thrown here will be available on error return value of the useBkash hook
        }
      });

    
    

  return (
    <button
     type="button"
    className="btn btn-primary rounded px-3"
     onClick={()=>bkashFunction()}
     >
         Pay now Bkash
    </button> 
  )
}

export default BkashButton