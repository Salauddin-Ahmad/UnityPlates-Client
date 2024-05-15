import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const MyFoodRequests = () => {
  const [reqFoods, setReqFoods] = useState([]);
  const userI = useAuth();
  const userEmail = userI.user.email;
  const axiosSecure = useAxiosSecure();

  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/getMyFoods/${userEmail}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       setReqFoods(res.data);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching requested foods:", error);
  //     });
  // }, [userEmail]);

  useEffect(() => {
    axiosSecure
      .get(`/getMyFoods/${userEmail}`)
      .then((res) => {
        setReqFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching requested foods:", error);
      });
  }, [userEmail, axiosSecure]);
  


  return (
    <>
      <Helmet>
        <title> UnityPlates | Food Requests </title>
        <meta name="description" content="Login to your SkyLineEstates account." />
      </Helmet>

      <div className="my-6">
        <h1 className="text-center text-bold text-2xl mb-6">
          Requested Foods <span>{reqFoods.length}</span>
        </h1>
        <table className="table-auto w-full">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border-4 border-yellow-500">Donator </th>
              <th className="px-4 py-2 border-4 border-yellow-500">Pickup Location</th>
              <th className="px-4 py-2 border-4 border-yellow-500">Expired Date</th>
              <th className="px-4 py-2 border-4 border-yellow-500">Requested Date</th>
              <th className="px-4 py-2 border-4 border-yellow-500">Donated Amount</th>
              <th className="px-4 py-2 border-4 border-yellow-500">Additional Notes</th>
            </tr>
          </thead>
          <tbody>
            {reqFoods.map((food) => (
              <tr key={food._id}>
                <td className="px-4 py-2 border-4 border-green-700 ">{food.userDetails.name}  <img className="w-10 h-10 rounded-xl" src={food.userDetails.photo} alt="" /></td>
                <td className="px-4 py-2 border-4 border-green-700">{food.pickupLocation}</td>
                <td className="px-4 py-2 border-4 border-green-700">{food.expiredDate}</td>
                <td className="px-4 py-2 border-4 border-green-700">{food.requestedDate}</td>
                <td className="px-4 py-2 border-4 border-green-700">{food.foodQuantity}</td>
                <td className="px-4 py-2 border-4 border-green-700">{food.additionalNotes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyFoodRequests;
