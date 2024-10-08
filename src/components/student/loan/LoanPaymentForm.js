import '../../../styles/payment.css'
import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { notifyError, notifySuccess } from '../../../toast.notification';
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';


const LoanPaymentForm = ({fetchLoanDetail, loanDetail}) => {

  const stripe = useStripe();
  const elements = useElements();
  const axiosPrivate = useAxiosPrivate();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);


  const settleLoan = async (paymentId, amount) => {
    try{

      const res = await axiosPrivate.post('/loan/make/repayment', {
        reference: loanDetail.reference,
        paymentAmount: amount,
        principalAmount: loanDetail.principalAmount,
        interestAmount: amount - loanDetail.principalAmount,
      });

      if(res?.status === 200){
        fetchLoanDetail();
        notifySuccess(res.data.message);
        document.getElementById('payment-form').style.display = 'none';
      }
    }catch(err){
      console.log(err);
      notifyError('Something went wrong while registering contribution');
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsProcessing(true);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: 'if_required'
    });

    if (error?.type === "card_error" || error?.type === "validation_error") {
      setMessage(error.message);
    } else if(paymentIntent && paymentIntent.status === 'succeeded'){
        const paymentId = paymentIntent.id;
        const amount = parseFloat(paymentIntent.amount)/100;
        setMessage('Payment successful');
        await settleLoan(paymentId, amount);
    }
    else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isProcessing || !stripe || !elements} id="submit">
        <span id="button-text">
          {isProcessing ? "Processing ... " : "Pay now"}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}

export default LoanPaymentForm;