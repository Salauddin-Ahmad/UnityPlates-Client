import useAuth from "@/hooks/useAuth";
import useAxiosSecure from "@/hooks/useAxiosSecure";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const ManageMyFoods = () => {
  const [control, setControl] = useState(false);
  const [foods, setFoods] = useState([]);
  const axiosSecure = useAxiosSecure();

  // console.log(foods)

  const users = useAuth();
  const user = users.user;
  const email = user.email;
  console.log(email);

  // normal fetch all the food by email from db
  // useEffect(() => {
  //   axios
  //     .get(`${import.meta.env.VITE_API_URL}/manageAllFoods/${email}`, {
  //       withCredentials: true,
  //     })
  //     .then((res) => {
  //       // console.log(res.data);
  //       setFoods(res.data);
  //     });
  // }, [email, control]);


  // Fetch with Custom axiosSecure hook
  useEffect(() => {
    axiosSecure
      .get(`/manageAllFoods/${email}`)
      .then((res) => {
        setFoods(res.data);
      })
      .catch((error) => {
        console.error("Error fetching all foods:", error);
      });
  }, [email, control, axiosSecure]);
  

  const handleDelete = (id) => {
    Swal.fire({
      title: "Do you want to delete this item?",
      showCancelButton: true,
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        // Proceed with the deletion
        // Delete the existing food item from the current database
        axios
          .delete(`${import.meta.env.VITE_API_URL}/deletefood/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              // Update state to remove the deleted item from the list
              setFoods((prevFoods) =>
                prevFoods.filter((food) => food._id !== id)
              );
              Swal.fire("Deleted!", "The item has been deleted.", "success");
            } else {
              Swal.fire("Error", "Failed to delete the item.", "error");
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire(
              "Error",
              "An error occurred while deleting the item.",
              "error"
            );
          });
      } else if (result.isDenied) {
        // Handle case where deletion is canceled
        Swal.fire("Cancelled", "Deletion cancelled.", "info");
      }
    });
  };

  return (
    <>
      <Helmet>
        <title> SkyLineEstates | Manage Foods </title>
        <meta
          name="ManageFoods"
          content="Manage All the Foods."
        />
      </Helmet>

      <div className="overflow-x-auto lg:mx-20 xl:mx-24 min-h-[420px]">
        <table className="table-auto">
          {/* head of the table */}
          <thead className="border w-full">
            <tr>
              <th className="hidden sm:table-cell px-4 py-2 border-4 border-yellow-600">
                Image
              </th>
              <th className="px-4 py-2 border-4 border-yellow-600 ">
                Food Name
              </th>
              <th className="px-4 py-2 border-4 border-yellow-600">
                Pickup Location
              </th>
              <th className="hidden sm:table-cell  px-4 py-2 border-4 border-yellow-600">
                additionalNotes
              </th>
              <th className="px-4 py-2 border-4 border-yellow-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods?.map((data) => (
              <tr className="border" key={data._id}>
                <td className="hidden sm:table-cell px-4 py-2 border-4 border-yellow-700">
                  <img
                    className="w-[230px] h-[120px] rounded-md"
                    src={data.image}
                    alt=""
                  />
                </td>
                <td className="lg:px-4 py-2 lg:text-lg lg:font-extrabold font sans border-4 border-yellow-700">
                  {data.foodName}
                </td>
                <td className="lg:px-4 py-2 border-4 border-yellow-700">
                  {" "}
                  {data.pickupLocation}
                </td>
                <td className="hidden sm:table-cell lg:px-4 py-2 border-4 border-yellow-700">
                  {" "}
                  {data.additionalNotes}
                </td>
                <td className="lg:px-4 py-2 border-4 border-yellow-700">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link to={`/updateFood/${data._id}`}>
                      <button className="btn bg-blue-600">Update</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(data._id)}
                      className="btn bg-red-800"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageMyFoods;

