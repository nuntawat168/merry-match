import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/authentication';
import successIcon from "../assets/icon/success.png";
import { useNavigate } from "react-router-dom";
import { fetchMerryLimit } from './FetchMerryLimit';
import Navbar from './Navbar';
import platinumIcon from "../assets/icon/platinum.svg";
import basicIcon from "../assets/icon/basic.svg";
import premiumIcon from "../assets/icon/premium.svg";

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
      const pack_icon = userPackageDetail[0].package_icon.split('/')[1];
      let package_icon_src = '';
      file = 'public/img_name.svg';
      const imageUrl = `https://gacngpsoekbrifxahpkg.supabase.co/storage/v1/object/public/Files/${file}`;
      pack_icon.includes('platinum') ? package_icon_src = platinumIcon : pack_icon.includes('basic') ? package_icon_src = basicIcon : pack_icon.includes('premium') ? package_icon_src = premiumIcon : '';
      setPackageIcon(imageUrl);
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
        <div className="font-nunito w-full flex flex-col items-center">
          <Navbar />
          <section className='w-[1440px] flex'>
            <div className="mt-28 ml-40">
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
                    onClick={() => navigate('/membership')}
                    className="flex items-center justify-center w-[190px] h-[48px] border bg-red-500 rounded-3xl text-white relative duration-1000 after:content-[''] after:bg-red-300 after:h-[3px] after:w-[0%] after:absolute after:bottom-[10px] after:rounded-xl after:duration-500 hover:scale-110   hover:after:w-[70%]">
                    Check Membership
                  </button>
                </div>
              </div>
              <div className="text-white w-[357px] h-[454px] border rounded-3xl bg-linear ml-28 mt-28 border-gray-200 grid grid-rows-[25%_20%_20%_10%_1%_24%]">
                <div className='ml-10 mt-10 w-[60px] h-[60px] rounded-2xl bg-gray-100 flex justify-center items-center'>
                  <img src={packageIcon} alt="package icon" className="w-[36px] h-[36px]" />
                </div>
                <div className="ml-10  text-[32px] font-bold">
                  {packageName}
                <div className="text-[20px] font-normal">{`THB ${packagePrice}.00 `}<span className="text-[16px] font-light">/Month</span>
                  </div>
                </div>
                <div className="ml-10 flex">
                  <img src={successIcon} alt="success icon" className='w-[24px] h-[24px] mr-[12px]' />
                  <p>‘Merry’ more than a daily limited</p>
                </div>
                <div className="ml-10 -mt-14 flex">
                  <img src={successIcon} alt="success icon" className='w-[24px] h-[24px] mr-[12px]'/>
                  <p>{`Up to ${packageLimit} Merry per day`}</p>
                </div> 
                <hr className=" border-gray-300 ml-10 mr-10 -mt-10 " />
                <div className="ml-10 mt-10 grid-cols-2">
                  <div className="flex justify-between -mt-10 ">
                    <div className="flex text-purple-200 ">Start Membership</div>
                    <div className="flex mr-10 ">{packageStart}</div>
                  </div>
                  <div className="flex justify-between mt-2  ">
                    <div className="flex text-purple-200 ">Next billing</div>
                    <div className="flex mr-10">{packageEnd}</div> 
                  </div>
                </div>
              </div>
          </section>
        </div>
      );
}

export default PaymentSuccess;