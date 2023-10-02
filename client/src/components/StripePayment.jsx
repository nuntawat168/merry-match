import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";
import CheckoutForm from "./CheckoutForm";
import Navbar from "./Navbar";
import packIcon from "../assets/icon/package.svg";
import { UseGlobalContext } from "../contexts/usecontexts";

const stripePromise = loadStripe(
  "pk_test_51NuxGCAr6dsWC1udch1DGbzxKP9PdyRsE6FwRecNnPEDWMGtS99sD2T1dMqxf79UnDz92VvX4LJl88dS3gf4hr2E00GVcHSPBY"
);

export default function StripePayment() {
  const [clientSecret, setClientSecret] = useState("");
  const { dataPackage, savePackage } = UseGlobalContext();

  const createPaymentIntent = async () => {
    const data = await axios.post(
      "https://merry-match.onrender.com/payment/create-payment-intent",
      {
        price: dataPackage[savePackage].package_price,
        limit: dataPackage[savePackage].package_limit,
        package_id: dataPackage[savePackage].package_id,
      }
    );

    setClientSecret(data.data.clientSecret);
  };

  useEffect(() => {
    createPaymentIntent();
  }, []);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#C70039",
      colorBackground: "#fff",
    },
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div>
      <Navbar />
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <section className="w-full flex justify-center">
            <div className="w-[1440]">
              <div className="w-[928px] flex justify-between mt-[80px]">
                <section className="w-[358px] h-[244px] bg-gray-100 rounded-3xl py-[32px] px-[24px]">
                  <div className="flex flex-col justify-between">
                    <div className="flex mb-[24px]">
                      <img
                        src={packIcon}
                        alt="package icon"
                        className="mr-[12px] w-[24px] h-[24px]"
                      />
                      <p className="text-gray-700 text-[20px]">
                        Merry Membership
                      </p>
                    </div>
                    <div>
                      <section className="py-[12px] flex justify-between text-gray-700">
                        <p>Package</p>
                        <p>Price (Monthly)</p>
                      </section>
                      <section className="py-[24px] border-t-[1px] border-gray-400 flex justify-between text-[20px] font-bold">
                        <p className="text-gray-900">
                          {dataPackage[savePackage].package_name}
                        </p>
                        <p className="text-red-900">{`THB ${dataPackage[savePackage].package_price}.00`}</p>
                      </section>
                    </div>
                  </div>
                </section>
                <section className="rounded-3xl w-[548px]">
                  <CheckoutForm />
                </section>
              </div>
            </div>
          </section>
        </Elements>
      )}
    </div>
  );
}
