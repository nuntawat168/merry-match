import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements, } from '@stripe/react-stripe-js';
import axios from 'axios';

export default function CheckoutForm() {
  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [clientSecret, setClientSecret] = useState(null);

  // const sendPaymentDataToServer = async (paymentData) => {
  //   try{
  //     const response = await axios.post('http://localhost:4000/payment/160', paymentData);
  //     console.log("console payment data: ", paymentData)

  //     if (response.status === 201) {
  //       console.log('ส่งข้อมูลไปหลังบ้านได้แล้วนะ');
  //     } else {
  //       console.error('ส่งช้อมูลไปไม่ได้ ทำยังไงต่อกันดี');
  //     }
  //   } catch(error) {
  //     console.error('An error occurred while sending payment data:', error);
  //   }
  // }

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );
    setClientSecret(clientSecret);

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      console.log('payment intent', paymentIntent); //ก้อนนี้คือข้อมูล 
      switch (paymentIntent.status) {
        case 'succeeded':
          setMessage('Payment succeeded!');
          // เขียนจากหน้าบ้านเพื่อ post เข้า database
          break;
        case 'processing':
          setMessage('Your payment is processing.');
          break;
        case 'requires_payment_method':
          setMessage('Your payment was not successful, please try again.');
          break;
        default:
          setMessage('Something went wrong.');
          break;
      }
    });
  }, [stripe]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/rest?`},
    });

    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred.');
    }

    setIsLoading(false);
  };

  return (
    <div className='h-[590] w-full border border-gray-400 rounded-3xl flex flex-col py-[40px] px-[24px]'>
      <section>
        <form id='payment-form' onSubmit={handleSubmit}>
          <div>
            <PaymentElement
              id='payment-element'
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#333',
                    '::placeholder': {
                      color: '#ccc',
                    },
                  },
                },
              }}
            />
          </div>
          <div className='mt-[32px]'>
            <section className='flex justify-between'>
              <button className='text-red-500 font-bold'>
                Cancel
              </button>
              
                <button 
                  disabled={isLoading || !stripe || !elements} 
                  id='submit'
                  className='py-[12px] px-[24px] bg-red-500 rounded-full text-white font-bold)'
                >
                  <span id='button-text'>
                    {isLoading ? <div className='spinner' id='spinner'></div> : 'Payment Confirm'}
                  </span>
                </button>
            </section>
          </div>          
          {/* Show any error or success messages */}
          {message && <div id='payment-message'>{message}</div>}
        </form>
      </section>   
    </div>
  );
}
