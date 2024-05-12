/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
const Modal = ({ onClose, confirmReq, foodDetails }) => {

  const { id } = useParams();
  // const [startDate, setStartDate] = useState(new Date())
  // Get the current date
 const [patchedFoods, setPatchedFoods] = useState([]);
 console.log(patchedFoods)

  useEffect(() => {
    // patch the food with new data
    axios.patch(`${import.meta.env.VITE_API_URL}/fooddetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPatchedFoods(data);
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
      });
  }, [id]);





  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm
flex flex-col justify-center items-center"
      >
        <div className="bg-white  px-10   rounded-lg ">
          <div className="py-5">
            {/* MARK: foodDetails */}
            <div className="mx-auto">
              <img
                className=" ml-4 w-[350px] rounded-lg"
                src={foodDetails.image}
                alt={foodDetails.foodName}
              />
            </div>
            <div className="px-2 lg:px-4 space-y-1 mt-2">
              <h2>
                <span className="font-bold">Food Name:</span>{" "}
                {foodDetails.foodName}
              </h2>

              <h2>
                <span className="font-bold">Food ID:</span> {foodDetails._id}
              </h2>
              <p>
                <span className="font-bold">Food Quantity:</span>{" "}
                {foodDetails.foodQuantity}
              </p>
              <p>
                <span className="font-bold">Expired Date/Time:</span>{" "}
                {foodDetails.expiredDate}
              </p>

              {/* date picker */}
              {/* <div className='flex flex-col gap-2'>
              <label className='text-gray-700'>Deadline</label>
              <DatePicker
                className='border p-2 rounded-md'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />
            </div> */}

              {/* Display donor information */}
              <p>
                <span className="font-bold">Donor Name:</span>{" "}
                {foodDetails.userDetails.name}
              </p>
              <p>
                <span className="font-bold">Email</span>{" "}
                {foodDetails.userDetails.email}
              </p>
              <p>
                <span className="font-bold">Food Pickup Location:</span>{" "}
                {foodDetails.pickupLocation}
              </p>

              <p>
                <span className="font-bold">Additional Notes:</span>{" "}
                {foodDetails.additionalNotes}
              </p>
            </div>
          </div>

          <div className="flex flex-col-1 gap-10 pl-10 py-6">
            <button className="btn bg-green-700" onClick={confirmReq}>
              Confirm Requset
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
