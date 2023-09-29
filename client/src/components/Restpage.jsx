import { useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authentication';

function Restpage() {
    const { state } = useAuth()

    const sendPaymentDataToServer = async (paymentData) => {
        try{   
          const response = await axios.post('http://localhost:4000/payment', { paymentData, state });   
          if (response.status === 201) {
            console.log('Successfully send data');
          } else {
            console.error('Cannot send data');
          }
        } catch(error) {
          console.error('An error occurred while sending payment data:', error);
        }
      }
    
      useEffect(() => {   
        const clientSecret = new URLSearchParams(window.location.search).get(
          'payment_intent'
        );
    
        if (!clientSecret) {
          return;
        }
        sendPaymentDataToServer(clientSecret);
      }, []);

    return (
        <div>Hiiiiiii เดี๋ยวย้ายของแบมแบมมาใส่</div>
    )
}

export default Restpage;