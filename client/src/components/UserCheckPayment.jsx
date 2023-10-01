import { useState, useEffect } from "react";
import { fetchMerryLimit } from "./FetchMerryLimit";
import platinumIcon from "../assets/icon/platinum.svg";
import basicIcon from "../assets/icon/basic.svg";
import premiumIcon from "../assets/icon/premium.svg";

const UserCheckPayment = () => {
  const [packageIcon, setPackageIcon] = useState(null);
  const [packageName, setPackageName] = useState(null);
  const [packagePrice, setPackagePrice] = useState(null);
  const [packageStart, setPackageStart] = useState(null);
  const [packageEnd, setPackageEnd] = useState(null);
  const [packageLimit, setPackageLimit] = useState(null);
  const [status, setStatus] = useState(null);

  const getPackageDetail = async () => {
    const { userPackageDetail } = await fetchMerryLimit();
    console.log(
      "userPackageDetail from getPackageDetail Top",
      userPackageDetail
    );
    const pack_icon = `https://gacngpsoekbrifxahpkg.supabase.co/storage/v1/object/public/Files/${userPackageDetail[0].package_icon}`;
    setPackageIcon(pack_icon);
    setPackageName(userPackageDetail[0].package_name);
    setPackagePrice(userPackageDetail[0].package_price);
    let start_date = userPackageDetail[0].start_date.split("T")[0].split("-");
    start_date = start_date[2] + "/" + start_date[1] + "/" + start_date[0];
    setPackageStart(start_date);
    let end_date = userPackageDetail[0].end_date.split("T")[0].split("-");
    end_date = end_date[2] + "/" + end_date[1] + "/" + end_date[0];
    setPackageEnd(end_date);
    setPackageLimit(userPackageDetail[0].package_limit);

    let end_date_string = userPackageDetail[0].end_date.split("T")[0];
    const package_end_date = new Date(end_date_string);
    const today = new Date();
    today <= package_end_date ? setStatus(true) : setStatus(false);
    console.log(
      "userPackageDetail from getPackageDetail below",
      userPackageDetail
    );
    console.log("subscribe status", status);
  };

  useEffect(() => {
    getPackageDetail();
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="w-[1440px] flex justify-center ml-24">
        <div className="w-[1119px] font-nunito">
          <div className="flex flex-start text-[14px] text-beige-700 font-semibold mt-20">
            MERRY MEMBERSHIP
          </div>
          <div className="grid grid-rows-2 text-start text-[46px] text-purple-500 font-bold">
            <div>Manage your membership</div>
            <div>and payment method</div>
            {/* para 1 */}
            <div className="mt-10">
              <div className="text-[24px] font-nunito font-bold ">
                Merry Membership Package
              </div>
              <div className="grid grid-cols-[10%_30%_30%_30%] mt-3 h-[222px]  w-[930px] border rounded-3xl bg-linear">
                <div className="ml-[36px] h-[78px] mt-[36px]  w-[78px] rounded-3xl flex justify-center items-center bg-gray-100">
                  <img
                    src={packageIcon}
                    alt="package icon"
                    className="w-[36px] h-[36px]"
                  />
                </div>
                <div className="grid grid-rows-[30%_70%]">
                  <div className="ml-10 w-[225px] h-[40px] mt-10  text-[32px] flex items-center font-nunito font-bold text-white ">
                    {packageName}
                  </div>
                  <div className="ml-10 mt-8 text-[20px] font-light text-purple-200">
                    {`THB ${packagePrice}.00`}
                    <span> /Month</span>
                  </div>
                </div>
                <div className="grid grid-rows-[30%_70%]  text-[16px] text-white font-thin">
                  <div className="flex items-center mt-16">
                    ‘Merry’ more than a daily limited{" "}
                  </div>
                  <div className="flex mt-8 ">{`Up to ${packageLimit} Merry per day`}</div>
                </div>
                <div className="font-bold flex justify-center align-middle items-center font-nunito ml-40 w-[80px] h-[32px] border rounded-3xl bg-beige-200 text-[16px] text-beige-600 mt-8 ">
                  {status ? "Active" : "End"}
                </div>
                <hr className="ml-8 w-[866px]  border-purple-300" />{" "}
              </div>
            </div>
          </div>
          {/* para 3 */}
          <div className="mt-20">
            <div className="text-[24px] font-nunito font-bold mb-[24px] text-purple-500">
              Billing History
            </div>
            <div className="grid grid-rows-[10%_5%_85%] w-[930px] h-[1000px] border rounded-3xl border-gray-400 mb-28">
              <div className="ml-10 mt-14 text-[20px] text-gray-700">
                {`Next billing : ${packageEnd}`}
              </div>
              <hr className="mr-10 ml-10" />
              <div>
                <div className="grid grid-cols-2 mr-10 ml-10  ">
                  <div className="flex text-[16px]">{`${packageStart}`}</div>
                  <div className="flex justify-end text-[16px]">
                    {`THB ${packagePrice}.00`}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserCheckPayment;
