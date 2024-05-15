
/* eslint-disable react/prop-types */
import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const Modal = ({ onClose, foodDetails }) => {
  const user = useAuth();
  const email = user.user.email
  const [additionalNotes, setAdditionalNotes] = useState(
    foodDetails.additionalNotes
  );
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutateAsync: requestFood,
    isLoading: isRequesting,
    isError: isRequestError,
    error: requestError,
  } = useMutation({
    mutationFn: async () => {
      // Delete the existing food item from the current database
      await axiosSecure.delete(`/deletefood/${foodDetails._id}`);

      // Get the current date and time
      const requestedDate = new Date().toISOString();

      // Get the requestor's email
      const requestorEmail = user.user.email;

      // Prepare the updated food item
      const updatedFoodDetails = {
        ...foodDetails,
        additionalNotes,
        status: "requested",
        requestedDate,
        requestorEmail,
      };

      // Post the updated food item to the new endpoint
      const response = await axiosSecure.post(
        "/requestedfoods",
        updatedFoodDetails
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Requested For Food Successfully");
      onClose();
      navigate("/foodrequests");
      queryClient.invalidateQueries(["foodDetails-" + foodDetails._id]);
    },
    onError: (err) => {
      console.error("Error confirming request:", err);
      toast.error("An error occurred while requesting the food item.");
    },
  });

  const handleConfirmRequest = () => {
    requestFood();
  };

  return (
    <>
      {/* Modal content */}
      <div className="fixed  inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col justify-center items-center z-50">
        <div className="bg-white px-12 rounded-lg">
          {/* Content */}
          <div className="py-4">
            {/* Display food details */}
            <div className="mx-auto">
              {/* Image */}
              <img
                className="ml-4 w-[300px] rounded-lg"
                src={foodDetails.image}
                alt={foodDetails.foodName}
              />
            </div>
            <div className="px-2 lg:px-4 space-y-1 mt-2">
              {/* Other details */}
              {/* <h2><span className="font-bold">Food Name:</span> {foodDetails.foodName}</h2> */}
             
             <div className="flex items-center gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
                Food Name:
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={foodDetails.foodName}
              />
             </div>
  
             <div className="flex items-center gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
             Food ID: 
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={foodDetails._id}
              />
             </div>

             <div className="flex items-center  gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
             Expired Date/Time: 
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={foodDetails._id}
              />
             </div>
  
             <div className="flex items-center gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
             Donor Name:
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={foodDetails.userDetails.name}
              />
             </div>

             <div className="flex items-center gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
             Donor Email:
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={foodDetails.userDetails.email}
              />
             </div>

             <div className="flex items-center gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
             User Email:
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={email}
              />
             </div>

             <div className="flex items-center gap-3">
             <label htmlFor="Additional Notes" className="block font-bold">
             Pickup Location:
              </label>{" "}
              <input
                type="text"
                className="bg-slate-100 border p-1 text-black"
                value={foodDetails.pickupLocation}
              />
             </div>
      
              {/* Additional notes input field */}
              <p>
                <span className="font-bold">Additional Notes:</span>{" "}
                <input
                  type="text"
                  className="bg-slate-100 border p-1 text-black"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                />
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col-1 gap-10 pl-10 py-6">
            <button
              className={`btn bg-green-700 ${isRequesting ? "loading" : ""}`}
              onClick={handleConfirmRequest}
              disabled={isRequesting}
            >
              Confirm Request
            </button>
            <button className="btn bg-red-700" onClick={onClose}>
              Cancel Operation
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
