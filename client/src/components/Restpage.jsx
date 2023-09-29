import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements, } from '@stripe/react-stripe-js';
import axios from 'axios';

function Restpage() {
    // const stripe = useStripe();

    const sendPaymentDataToServer = async (paymentData) => {
        try{   
          const response = await axios.post('http://localhost:4000/payment/160', { paymentData });
          console.log("console payment data: ", paymentData)
    
          if (response.status === 201) {
            console.log('ส่งข้อมูลไปหลังบ้านได้แล้วนะ');
          } else {
            console.error('ส่งช้อมูลไปไม่ได้ ทำยังไงต่อกันดี');
          }
        } catch(error) {
          console.error('An error occurred while sending payment data:', error);
        }
      }
    
      useEffect(() => {
        
        // if (!stripe) {
        //   return;
        // }
    
        const clientSecret = new URLSearchParams(window.location.search).get(
          'payment_intent'
        );
    
        if (!clientSecret) {
          return;
        }
        sendPaymentDataToServer(clientSecret);
    
        // stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
        //   console.log('payment intent', paymentIntent); //ก้อนนี้คือข้อมูล 
        // //   switch (paymentIntent.status) {
        // //     case 'succeeded':
        // //       setMessage('Payment succeeded!');
        // //       sendPaymentDataToServer(paymentIntent);
        // //       // เขียนจากหน้าบ้านเพื่อ post เข้า database
        // //       break;
        // //     case 'processing':
        // //       setMessage('Your payment is processing.');
        // //       break;
        // //     case 'requires_payment_method':
        // //       setMessage('Your payment was not successful, please try again.');
        // //       break;
        // //     default:
        // //       setMessage('Something went wrong.');
        // //       break;
        // //   }
        // });
      }, []);

    return (
        <div>Hiiiiiii</div>
    )
}

export default Restpage;