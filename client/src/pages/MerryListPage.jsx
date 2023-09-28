// import Footer from "../components/Footer";
// import Navbar from "../components/Navbar";
// import MatchLists from "../components/MatchLists";
// import { MatchListsProvider } from "../contexts/matchListsContext";
// import { fetchMerryLimit } from "../components/FetchMerryLimit";
// import { useState, useEffect } from "react";

// function MerryListPage() {
//   const [merryLimit, setMerryLimit] = useState(null);
//   const [packageLimit, setPackageLimit] = useState(null);

//   // fetch merry limit
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { userPackageLimit, userMerryLimit } = await fetchMerryLimit();
//         setPackageLimit(userPackageLimit);
//         setMerryLimit(userMerryLimit);
//       } catch (error) {
//         console.log("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [merryLimit]);

//   return (
//     <MatchListsProvider>
//       <Navbar />
//       <main className="w-full bg-main flex justify-center font-nunito">
//         <section className="w-[1440px] bg-main flex justify-center">
//           <div className="w-[930px] mb-[171px] mt-[80px]">
//             <section className="bg-main flex justify-between items-end mb-[80px]">
//               <div className="text-purple-500 text-[46px] font-extrabold">
//                 <p className="text-[14px] text-beige-700 font-medium">
//                   MERRY LIST
//                 </p>
//                 <h1>Let’s know each other</h1>
//                 <h1>with Merry!</h1>
//               </div>
//               <div className="px-[24px]">
//                 <div className="text-[16px] flex">
//                   <p className="text-gray-700 mr-[10px]">Merry limit today</p>
//                   <p className="text-red-400">{`${merryLimit}/${packageLimit}`}</p>
//                 </div>
//                 <p className="text-end text-gray-600 text-[12px]">
//                   Reset in 12h...
//                 </p>
//               </div>
//             </section>
//             <section>
//               <MatchLists />
//             </section>
//           </div>
//         </section>
//       </main>
//       <Footer />
//     </MatchListsProvider>
//   );
// }

// export default MerryListPage;
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MatchLists from "../components/MatchLists";
import { MatchListsProvider } from "../contexts/matchListsContext";
import { fetchMerryLimit } from "../components/FetchMerryLimit";

function MerryListPage() {
  const [merryLimit, setMerryLimit] = useState(null);
  const [packageLimit, setPackageLimit] = useState(null);
  const [timeUntilMidnight, setTimeUntilMidnight] = useState(null);

  // fetch merry limit
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { userPackageLimit, userMerryLimit } = await fetchMerryLimit();
        setPackageLimit(userPackageLimit);
        setMerryLimit(userMerryLimit);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const calculateTimeUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0); // เวลาเที่ยงคืน

      // คำนวณระยะเวลาที่เหลือจากเวลาปัจจุบันไปถึงเที่ยงคืน
      const timeUntilMidnightMilliseconds = midnight - now;

      // แปลงเวลาที่เหลือเป็นชั่วโมง, นาที, วินาที
      const hours = Math.floor(
        timeUntilMidnightMilliseconds / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (timeUntilMidnightMilliseconds / (1000 * 60)) % 60
      );
      const seconds = Math.floor((timeUntilMidnightMilliseconds / 1000) % 60);

      // แสดงผลในรูปแบบข้อความ
      const timeString = `${hours}h ${minutes}m ${seconds}s`;

      setTimeUntilMidnight(timeString);

      // ถ้าถึงเที่ยงคืนแล้ว
      if (timeUntilMidnightMilliseconds <= 0) {
        // รีเซ็ตค่า merryLimit เป็นค่าเริ่มต้นที่คุณต้องการ
        setMerryLimit(packageLimit);
        clearInterval(interval);
      }
    };

    const interval = setInterval(calculateTimeUntilMidnight, 1000);

    return () => clearInterval(interval);
  }, [packageLimit]);

  return (
    <MatchListsProvider>
      <Navbar />
      <main className="w-full bg-main flex justify-center font-nunito">
        <section className="w-[1440px] bg-main flex justify-center">
          <div className="w-[930px] mb-[171px] mt-[80px]">
            <section className="bg-main flex justify-between items-end mb-[80px]">
              <div className="text-purple-500 text-[46px] font-extrabold">
                <p className="text-[14px] text-beige-700 font-medium">
                  MERRY LIST
                </p>
                <h1>Let’s know each other</h1>
                <h1>with Merry!</h1>
              </div>
              <div className="px-[24px]">
                <div className="text-[16px] flex">
                  <p className="text-gray-700 mr-[10px]">Merry limit today</p>
                  <p className="text-red-400">{`${merryLimit}/${packageLimit}`}</p>
                </div>
                <p className="text-end text-gray-600 text-[12px]">
                  Reset in {timeUntilMidnight}...
                </p>
              </div>
            </section>
            <section>
              <MatchLists />
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </MatchListsProvider>
  );
}

export default MerryListPage;
