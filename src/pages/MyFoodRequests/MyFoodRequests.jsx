import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const MyFoodRequests = () => {

  const userI = useAuth();
  const userEmail = userI.user.email;
  const axiosSecure = useAxiosSecure();

  const getData = async () => {
    const { data } = await axiosSecure.get(`/getMyFoods/${userEmail}`);
    return data;
  };

  const {
    data: reqFoods = [],
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryFn: getData,
    queryKey: ["reqFoods"],
  });
console.log(reqFoods)

  if (isLoading) return <p>Data is still loading....</p>;
  if (isError || error){
    console.log(error,isError)
  }
  return (
    <>
      <Helmet>
        <title> UnityPlates | Food Requests </title>
        <meta
          name="description"
          content="Login to your SkyLineEstates account."
        />
      </Helmet>

      <div className="my-6">
        <h1 className="text-center text-bold text-2xl mb-6">
          Requested Foods <span>{reqFoods.length}</span>
        </h1>
        <table className="table-auto w-full">
          <thead>
            <tr className="">
              <th className="px-4 py-2 border-4 border-yellow-500">Donator </th>
              <th className="px-4 py-2 border-4 border-yellow-500">
                Pickup Location
              </th>
              <th className="px-4 py-2 border-4 border-yellow-500">
                Expired Date
              </th>
              <th className="px-4 py-2 border-4 border-yellow-500">
                Requested Date
              </th>
              <th className="px-4 py-2 border-4 border-yellow-500">
                Donated Amount
              </th>
              <th className="px-4 py-2 border-4 border-yellow-500">
                Additional Notes
              </th>
            </tr>
          </thead>
          <tbody>
            {reqFoods.map((food) => (
              <tr key={food._id}>
                <td className="px-4 py-2 border-4 border-green-700 ">
                  {food.userDetails.name}{" "}
                  <img
                    className="w-10 h-10 rounded-xl"
                    src={food.userDetails.photo}
                    alt=""
                  />
                </td>
                <td className="px-4 py-2 border-4 border-green-700">
                  {food.pickupLocation}
                </td>
                <td className="px-4 py-2 border-4 border-green-700">
                  {food.expiredDate}
                </td>
                <td className="px-4 py-2 border-4 border-green-700">
                  {food.requestedDate}
                </td>
                <td className="px-4 py-2 border-4 border-green-700">
                  {food.foodQuantity}
                </td>
                <td className="px-4 py-2 border-4 border-green-700">
                  {food.additionalNotes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MyFoodRequests;
