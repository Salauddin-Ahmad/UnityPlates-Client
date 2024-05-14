import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const MyFoodRequests = () => {
  const [reqFoods, setReqFoods] = useState([]);
  const userI = useAuth();
  const userEmail = userI.user.email;
  console.log(userEmail)
  console.log(reqFoods)

  
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/getMyFoods/${userEmail}`,
      {
        withCredentials: true,
      }
    )
      .then((res) => {
        setReqFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching requested foods:", error);
      });
  }, [userEmail]);

  // fronend logic to  Filter requested foods based on the logged-in user's email
  // const filteredReqFoods = reqFoods.filter((food) => food.requestorEmail === userEmail);

  return (
    <>
        <Helmet>
        <title> UnityPlates | Food Requests </title>
        <meta name="description" content="Login to your SkyLineEstates account." />
      </Helmet>

      <div className="my-6">
        <h1 className="text-center text-bold text-2xl mb-10">
          Requested Foods <span>{reqFoods.length}</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {reqFoods.map((food) => (
            <div className="text-lg border rounded-lg p-6  bg-orange-100" key={food._id}>
              <h1 className="text-xl text-center font-bold">Requsted Food Information</h1>
              <h1 className="">
                <span className="font-bold">Donator Name: </span> {food.userDetails.name}
              </h1>
              <h1 className="">
                <span className="font-bold">Pickup Location: </span> {food.pickupLocation}
              </h1>
              <h1 className="">
                <span className="font-bold">Expired Date: </span> {food.expiredDate}
              </h1>
              <h1 className="">
                <span className="font-bold">Requested Date: </span> {food.requestedDate}
              </h1>
              <h1 className="">
                <span className="font-bold">Donated Amount: </span> {food.foodQuantity}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MyFoodRequests;
