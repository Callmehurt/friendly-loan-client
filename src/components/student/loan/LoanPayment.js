import React, {useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import LoanPaymentForm from "./LoanPaymentForm";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";

const LoanPayment = ({interestAmount, principalAmount, loanDetail, fetchLoanDetail}) => {

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const handlePay = async (e) => {
    e.preventDefault();
    

    const payableAmount = (parseFloat(interestAmount) + parseFloat(principalAmount)).toFixed(2);
    
    const res = await axiosPrivate.post('payment/create-payment-intent', {
        amount: payableAmount
    })
    setStripePromise(loadStripe("pk_test_51PLrF22NkpF8PrgLxQ6m16K4jDbULe0KBleA4dwDHtXEeYD9RHdnVSd7O8L5HGGQqH3Ke7AhBo0lLzrI6zeHoGYi00WXG2oZZS"));
    setClientSecret(res.data.clientSecret);
  }


  const handleCancel = async (e) => {
    e.preventDefault();
    setStripePromise(null);
    setClientSecret("");
  }

  return (
    <>
      <div>
        <div className="p-2">
            <h6>Loan settlement includes interest amount as well</h6>
            <p><strong>Interest Amount: £ {interestAmount}</strong></p>
            <p><strong>Principal Amount: £ {principalAmount}</strong></p>
            <form onSubmit={handlePay} style={{ marginTop: '20px' }}>
                {
                    clientSecret ? (
                        <button className="pay_button" type="button" onClick={handleCancel}>Cancel</button>
                    ): <button className="pay_button" type="submit">Pay</button>
                }
            </form>
            {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={{ clientSecret }}>
                <LoanPaymentForm fetchLoanDetail={fetchLoanDetail} loanDetail={loanDetail}/>
            </Elements>
            )}
        </div>
      </div>
    </>
  );
}

export default LoanPayment;