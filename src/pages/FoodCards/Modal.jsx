/* eslint-disable react/prop-types */
import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Modal = ({ onClose, foodDetails }) => {
  const user = useAuth()
  console.log(user.user.email)
  const [additionalNotes, setAdditionalNotes] = useState(foodDetails.additionalNotes);

  const confirmReq = async () => {
    try {
      // Get the current date and time
      const requestedDate = new Date().toISOString();

      // Get the requestor's email
      const requestorEmail = user.user.email;
      console.log(requestorEmail)

      // Delete the existing food item from the current database
      await axios.delete(`${import.meta.env.VITE_API_URL}/deletefood/${foodDetails._id}`);

      // Prepare the updated food item
      const updatedFoodDetails = {
        ...foodDetails,
        additionalNotes,
        status: 'requested',
        requestedDate,
        requestorEmail
      };

      // Post the updated food item to t    he new endpoint
      await axios.post(`${import.meta.env.VITE_API_URL}/requestedfoods`, updatedFoodDetails);

      // Close the modal
      onClose();
       // Show a toast notification
       toast.success('Requested For Food Successfully');
      } catch (error) {
        console.error('Error confirming request:', error);
      }
  };

  return (
    <>
      {/* Modal content */}
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="bg-white px-10 rounded-lg">
          {/* Content */}
          <div className="py-5">
            {/* Display food details */}
            <div className="mx-auto">
              {/* Image */}
              <img className="ml-4 w-[350px] rounded-lg" src={foodDetails.image} alt={foodDetails.foodName} />
            </div>
            <div className="px-2 lg:px-4 space-y-1 mt-2">
              {/* Other details */}
              <h2><span className="font-bold">Food Name:</span> {foodDetails.foodName}</h2>
              <h2><span className="font-bold">Food ID:</span> {foodDetails._id}</h2>
              <p><span className="font-bold">Food Quantity:</span> {foodDetails.foodQuantity}</p>
              <p><span className="font-bold">Expired Date/Time:</span> {foodDetails.expiredDate}</p>
              <p><span className="font-bold">Donor Name:</span> {foodDetails.userDetails.name}</p>
              <p><span className="font-bold">Donor Email:</span> {foodDetails.userDetails.email}</p>
              <p><span className="font-bold">Food Pickup Location:</span> {foodDetails.pickupLocation}</p>
              {/* Additional notes input field */}
              <p><span className="font-bold">Additional Notes:</span> <input type="text" className="bg-slate-100 border text-black" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} /></p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-1 gap-10 pl-10 py-6">
          <NavLink to={'/foodrequests'}>
          <button className="btn bg-green-700" onClick={confirmReq}>Confirm Request</button>
          </NavLink>
            <button className="btn bg-red-700" onClick={onClose}>Cancel Operation</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
