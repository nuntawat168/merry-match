import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authentication';
import successIcon from "../assets/icon/success.png";
import { useNavigate } from "react-router-dom";
import { fetchMerryLimit } from './FetchMerryLimit';

function PaymentSuccess() {
    const { state } = useAuth()
    const navigate = useNavigate();
    const [packageIcon, setPackageIcon] = useState(null);
    const [packageName, setPackageName] = useState(null);
    const [packagePrice, setPackagePrice] = useState(null);
    const [packageStart, setPackageStart] = useState(null);
    const [packageEnd, setPackageEnd] = useState(null);
    const [packageLimit, setPackageLimit] = useState(null);

    const sendPaymentDataToServer = async (paymentData) => {
        try{   
          const response = await axios.post('http://localhost:4000/payment', { paymentData, state });   
          if (response.status === 201) {
            console.log('Successfully send payment data');
          } else {
            console.error('Cannot send payment data to server');
          }
        } catch(error) {
          console.error('An error occurred while sending payment data:', error);
        }
      }

    const getPackageDetail = async () => {
      const { userPackageDetail } = await fetchMerryLimit();    
      setPackageIcon(userPackageDetail[0].package_icon);
      setPackageName(userPackageDetail[0].package_name);
      setPackagePrice(userPackageDetail[0].package_price);
      let start_date = userPackageDetail[0].start_date.split('T')[0].split('-')
      start_date = start_date[2] + '/' + start_date[1] + '/' + start_date[0]
      setPackageStart(start_date);
      let end_date = userPackageDetail[0].end_date.split('T')[0].split('-')
      end_date = end_date[2] + '/' + end_date[1] + '/' + end_date[0]
      setPackageEnd(end_date);    
      setPackageLimit(userPackageDetail[0].package_limit);
    }
    
    
      useEffect(() => {   
        const clientSecret = new URLSearchParams(window.location.search).get(
          'payment_intent'
        );
    
        if (!clientSecret) {
          return;
        }
        sendPaymentDataToServer(clientSecret);
        getPackageDetail()
      }, []);

      return (
        <div className=" font-nunito">
          <div className="grid grid-cols-[50%_50%] mt-28 ml-40">
            <div className="grid grid-rows-[20%_3%_10%_10%_57%] gap-y-5">
              <img src={successIcon} alt="success" className='mt-10 w-[80px] h-[80px]' />
              <div className="mt-10 h-[21px] font-extrabold text-beige-700 text-[14px]">
                PAYMENT SUCCESS
              </div>
              <div className="font-nunito font-extrabold mt-6 text-[46px] text-purple-500">
                Welcome Merry Membership!
              </div>
              <div className="font-nunito font-extrabold mt-6 text-[46px] text-purple-500">
                Thank you for joining us
              </div>
              {/* button */}
              <div className="flex justify-start mt-20 gap-10">
                <button
                  onClick={() => navigate("/match")} 
                  className="flex items-center justify-center rounded-3xl border bg-red-100 w-[150px] h-[48px] text-[16px] font-extrabold text-red-600 relative duration-1000 after:content-[''] after:bg-red-300 after:h-[3px] after:w-[0%] after:absolute after:bottom-[10px] after:rounded-xl after:duration-500 hover:scale-110   hover:after:w-[70%] "
                >
                  Back to home
                </button>
                <button 
                  // เติม onclick ไปหน้า check membership ตรงนี้
                  className="flex items-center justify-center w-[190px] h-[48px] border bg-red-500 rounded-3xl text-white relative duration-1000 after:content-[''] after:bg-red-300 after:h-[3px] after:w-[0%] after:absolute after:bottom-[10px] after:rounded-xl after:duration-500 hover:scale-110   hover:after:w-[70%]">
                  Check Membership
                </button>
              </div>
            </div>
            <div className="text-white w-[357px] h-[454px] border rounded-3xl bg-linear ml-28  border-gray-200 grid grid-rows-[25%_20%_20%_10%_1%_24%]">
              <img src={packageIcon} alt="package icon" className="ml-10 mt-10 w-[60px] h-[60px] border rounded-2xl border-gray-100" />
              <div className="ml-10  text-[32px]">
                {packageName}
              <div className="text-[20px]">{`THB ${packagePrice}.00 `}<span className="text-[16px]">/Month</span>
                </div>
              </div>
              <div className="ml-10 ">‘Merry’ more than a daily limited</div>
              <div className="ml-10 -mt-14 ">{`Up to ${packageLimit} Merry per day`}</div> 
              <hr className=" border-gray-300 ml-10 mr-10 -mt-10 " />
              <div className="ml-10 mt-10 grid-cols-2">
                <div className="flex justify-between -mt-10 ">
                  <div className="flex  ">Start Membership</div>
                  <div className="flex mr-10 ">{packageStart}</div>
                </div>
                <div className="flex justify-between mt-2  ">
                  <div className="flex">Next billing</div>
                  <div className="flex mr-10">{packageEnd}</div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      );
}

export default PaymentSuccess;