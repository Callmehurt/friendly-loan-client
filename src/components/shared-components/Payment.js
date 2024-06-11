import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "./PaymentForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  const axiosPrivate = useAxiosPrivate();

  const handlePay = async () => {
    const res = await axiosPrivate.post('payment/create-payment-intent', {
        amount: 10
    })

    console.log(res);
    setStripePromise(loadStripe("pk_test_51PLrF22NkpF8PrgLxQ6m16K4jDbULe0KBleA4dwDHtXEeYD9RHdnVSd7O8L5HGGQqH3Ke7AhBo0lLzrI6zeHoGYi00WXG2oZZS"));
    setClientSecret(res.data.clientSecret);
  }


//   useEffect(() => {
//     const handlePay = async () => {
//         const res = await axiosPrivate.post('payment/create-payment-intent', {
//             amount: 10
//         })
    
//         console.log(res);
//         setClientSecret(res.data.clientSecret);
//       }

//       handlePay();
//   }, [])

  return (
    <>
      <h1>React Stripe and the Payment Element</h1>
      <button onClick={handlePay}>Pay</button>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;