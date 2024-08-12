import React, {useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { notifyError } from "../../toast.notification";

const Payment = ({refetch}) => {

  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [payingAmount, setPayingAmount] = useState(0);

  const axiosPrivate = useAxiosPrivate();

  const handlePay = async (e) => {
    e.preventDefault();
    if(payingAmount < 20){
      notifyError('Minimum Paying amount is £20');
      return null;
    }

    console.log(payingAmount);
    const res = await axiosPrivate.post('payment/create-payment-intent', {
        amount: payingAmount
    })
    setStripePromise(loadStripe("pk_test_51PLrF22NkpF8PrgLxQ6m16K4jDbULe0KBleA4dwDHtXEeYD9RHdnVSd7O8L5HGGQqH3Ke7AhBo0lLzrI6zeHoGYi00WXG2oZZS"));
    setClientSecret(res.data.clientSecret);
  }

  const handleRefetech = () => {
    refetch();
  }

  return (
    <>
      <div>
        <h6>You do not have contribution for this month!</h6>
        <form onSubmit={handlePay} style={{ marginTop: '20px' }}>
          <label>Desirable Amount</label>
          <input className="form-control" value={payingAmount} onChange={(e) => setPayingAmount(e.target.value)} />
          <button className="pay_button" type="submit">Pay</button>
        </form>
        {clientSecret && stripePromise && (
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <PaymentForm handleRefetech={handleRefetech} />
          </Elements>
        )}
      </div>
    </>
  );
}

export default Payment;