import  { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Modal from './Modal';

const FoodDetails = () => {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!modalOpen);
  }

  const handleClose =  () => setModalOpen(false)

  useEffect(() => {
    // Fetch food details based on id when component mounts
    fetch(`${import.meta.env.VITE_API_URL}/fooddetails/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setFoodDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching food details:", error);
      });
  }, [id]);

  const handleRequestButtonClick = () => {
    toggleModal(); // Toggle the modal when the button is clicked
  };

  return (
    <div className="mb-8 relative">
      {foodDetails ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto border rounded-md px-2 shadow-lg shadow-stone-600">
          <div>
            <img className="w-full rounded-lg" src={foodDetails.image} alt={foodDetails.foodName} />
          </div>
          <div className="px-2 lg:px-4 space-y-1 mt-2">
            <h2><span className="font-bold">Food Name:</span> {foodDetails.foodName}</h2>
            <p><span className="font-bold">Food Quantity:</span> {foodDetails.foodQuantity}</p>
            <p><span className="font-bold">Expired Date/Time:</span> {foodDetails.expiredDate}</p>
            {/* Display donor information */}
            <h2>Donor Information:</h2>
            <p><span className="font-bold">Donor Name:</span> {foodDetails.userDetails.name}</p>
            <p><span className="font-bold">Food Pickup Location:</span> {foodDetails.pickupLocation}</p>
            {/* Request Button */}
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={handleRequestButtonClick}>Request</button>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      {/* Modal */}
      {modalOpen && <Modal 
      foodDetails={foodDetails}
      onClose={handleClose} />}
    </div>
  );
};

export default FoodDetails;
