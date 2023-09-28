// import React, { useEffect } from "react";
// import { useState } from "react";
// // import drag from "../assets/icon/drag.svg";
// // import edit from "../assets/icon/edit.svg";
// // import deleteicon from "../assets/icon/delete.svg";
// // import axios from "axios";
// import { Link } from "react-router-dom";
// import seach from "../assets/icon/vector.svg";
// import { Select } from "@chakra-ui/react";

// const AdminComplaintList = () => {
//   const [selectedColor, setSelectedColor] = useState("");
//   return (
//     <div>
//       <section className="w-full  pr-24 flex justify-between h-[10%] px-[60px] py-[16px] ">
//         <div className="flex flex-col justify-center font-bold text-2xl text-gray-900 ">
//           Complanit List
//         </div>
//         <div className="relative flex gap-1.5 ">
//           <input
//             className="flex pl-10 w-[320px] h-[48px] border border-gray-300 rounded-lg  "
//             type="text"
//             id="FilterTextBox"
//             name="FilterTextBox"
//             placeholder="Search..."
//           />
//           <button type="submit">
//             <img
//               className="flex absolute left-2 top-2.5    w-[30px] h-[30px] "
//               src={seach}
//             />
//           </button>
//           <Select
//             className={`${
//               selectedColor === "option1"
//                 ? "text-beige-700"
//                 : selectedColor === "option2"
//                 ? "text-yellow-500"
//                 : selectedColor === "option3"
//                 ? "text-green-500"
//                 : selectedColor === "option4"
//                 ? "text-gray-700"
//                 : " bg-gray-400 text-gray-400"
//             } `}
//             size="lg"
//             placeholder="All status"
//             onChange={(e) => setSelectedColor(e.target.value)}
//           >
//             <option
//               className="w-[46px] h-[26px] border rounded-lg bg-beige-100 text-beige-700  "
//               value="option1"
//             >
//               New
//             </option>
//             <option
//               className="w-[46px] h-[26px] border rounded-lg  bg-yellow-100 text-yellow-500  "
//               value="option2"
//             >
//               Pending
//             </option>
//             <option
//               className="w-[46px] h-[26px] border rounded-lg bg-green-100 text-green-500"
//               value="option3"
//             >
//               Resolved
//             </option>
//             <option
//               className="w-[46px] h-[26px] border rounded-lg bg-gray-200 text-gray-700"
//               value="option4"
//             >
//               Cancel
//             </option>
//           </Select>
//         </div>
//       </section>
//       <section>
//         <div className="font-nunito grid grid-flow-row bg-gray-100 ">
//           {/* first curve */}
//           <div className="text-[14px] items-center   bg-gray-400  text-gray-800  mt-10 pl-2   grid grid-cols-[15%_20%_38%_15%_12%] bg-gray400 w-[85%] h-[42px] mx-auto text-gray800 font-bold  rounded-t-xl">
//             <span className="flex ml-5">User</span>
//             <span className="flex ml-5">Issue</span>
//             <span>Description</span>
//             <span>Date Submitted</span>
//             <span>Status</span>
//           </div>
//           {/* normal-paragraph 1 */}
//           <div className="text-[14px] items-center   bg-white  text-gray-800  pl-2   grid grid-cols-[15%_20%_38%_15%_12%]  w-[85%] h-[42px] mx-auto text-gray800 font-bold last:rounded-b-xl">
//             <span className="flex ml-5">User</span>
//             <span className="flex ml-5">Issue</span>
//             <span>Description</span>
//             <span>Date Submitted</span>
//             <span>Status</span>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default AdminComplaintList;

import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Link } from "react-router-dom";
import search from "../assets/icon/vector.svg";
import { Select } from "@chakra-ui/react";

const AdminComplaintList = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/complaint");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      }
    };

    fetchData();
  }, []);

  // Filter complaints based on selected status and search term
  const filteredComplaints = complaints
    .filter(
      (complaint) =>
        (selectedColor ? complaint.status === selectedColor : true) &&
        (searchTerm
          ? complaint.issue.toLowerCase().includes(searchTerm.toLowerCase())
          : true)
    )
    .sort((a, b) => new Date(b.date_submitted) - new Date(a.date_submitted));

  const markComplaintAsPending = async (complaintId) => {
    try {
      // Fetch the complaint with the given complaintId
      const response = await axios.get(
        `http://localhost:4000/complaint/${complaintId}`
      );
      const complaint = response.data;

      // Check if the current status is "New"
      if (complaint.status === "New") {
        // Update the status to "Pending"
        await axios.put(
          `http://localhost:4000/complaint/${complaintId}/status`,
          {
            status: "Pending",
          }
        );

        // Update the local state to reflect the change in status
        setComplaints((prevComplaints) =>
          prevComplaints.map((prevComplaint) =>
            prevComplaint.complaint_id === complaintId
              ? { ...prevComplaint, status: "Pending" }
              : prevComplaint
          )
        );
      }
    } catch (error) {
      console.error("Error updating complaint status:", error);
    }
  };

  return (
    <div>
      <section className="w-full  pr-24 flex justify-between h-[10%] px-[60px] py-[16px] ">
        <div className="flex flex-col justify-center font-bold text-2xl text-gray-900 ">
          Complaint List
        </div>
        <div className="relative flex gap-1.5 ">
          <input
            className="flex pl-10 w-[320px] h-[48px] border border-gray-300 rounded-lg"
            type="text"
            id="FilterTextBox"
            name="FilterTextBox"
            placeholder="Search..."
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />

          <button type="submit">
            <img
              className="flex absolute left-2 top-2.5    w-[30px] h-[30px] "
              src={search}
            />
          </button>
          <Select
            className={`${
              selectedColor === "New"
                ? "text-beige-700"
                : selectedColor === "Pending"
                ? "text-yellow-500"
                : selectedColor === "Resolved"
                ? "text-green-500"
                : selectedColor === "Cancel"
                ? "text-gray-700"
                : " bg-gray-400 text-gray-400"
            } `}
            size="lg"
            placeholder="All status"
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option
              className="w-[46px] h-[26px] border rounded-lg bg-beige-100 text-beige-700  "
              value="New"
            >
              New
            </option>
            <option
              className="w-[46px] h-[26px] border rounded-lg  bg-yellow-100 text-yellow-500  "
              value="Pending"
            >
              Pending
            </option>
            <option
              className="w-[46px] h-[26px] border rounded-lg bg-green-100 text-green-500"
              value="Resolved"
            >
              Resolved
            </option>
            <option
              className="w-[46px] h-[26px] border rounded-lg bg-gray-200 text-gray-700"
              value="Cancel"
            >
              Cancel
            </option>
          </Select>
        </div>
      </section>
      <section>
        <div className="font-nunito grid grid-flow-row bg-gray-100 ">
          {/* Table headers */}
          <div className="text-[14px] items-center bg-gray-400 text-gray-800 mt-10 pl-2 grid grid-cols-[15%_20%_38%_15%_12%] bg-gray400 w-[85%] h-[42px] mx-auto text-gray800 font-bold rounded-t-xl">
            <span className="flex ml-5">User</span>
            <span className="flex ml-5">Issue</span>
            <span>Description</span>
            <span>Date Submitted</span>
            <span>Status</span>
          </div>
          {filteredComplaints.map((complaint) => (
            <Link
              to={`/complaint/detail/${complaint.complaint_id}`}
              key={complaint.complaint_id}
            >
              <div
                key={complaint.complaint_id}
                onClick={() => markComplaintAsPending(complaint.complaint_id)}
                className="text-[16px] items-center bg-white pl-2 grid grid-cols-[15%_20%_38%_15%_12%] w-[85%] h-[90px] mx-auto  font-normal  mb-0.5  mx-auto items-center align-middle  bg-white last:rounded-b-xl"
              >
                <span className="flex ml-5">{complaint.username}</span>
                <span className="flex ml-5">
                  {complaint.issue.length > 20
                    ? complaint.issue.substring(0, 20) + "..."
                    : complaint.issue}
                </span>
                <span>
                  {complaint.description.length > 50
                    ? complaint.description.substring(0, 50) + "..."
                    : complaint.description}
                </span>
                <span>
                  {new Date(complaint.date_submitted).toLocaleString().split(',')[0]}
                </span>
                <span
                  className={`${
                    complaint.status === "New"
                      ? "text-[12px] border rounded-lg  bg-beige-100 text-beige-700 w-[46px] h-[26px] pl-2.5 pt-1"
                      : complaint.status === "Pending"
                      ? "text-[12px] border rounded-lg  bg-yellow-100 text-yellow-500 w-[65px] h-[26px] pl-2.5 pt-1"
                      : complaint.status === "Cancel"
                      ? "text-[12px] border rounded-lg  bg-gray-200 text-gray-700 w-[57px] h-[26px] pl-2.5 pt-1"
                      : complaint.status === "Resolved"
                      ? "text-[12px] border rounded-lg  bg-[#E7FFE7] text-[#197418] w-[70px] h-[26px] pl-2.5 pt-1"
                      : ""
                  }`}
                >
                  {complaint.status}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AdminComplaintList;
