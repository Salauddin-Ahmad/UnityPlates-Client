import axios from "axios";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
// import {  useNavigate } from "react-router-dom";
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useState } from "react";
const AddFood = () => {
  const [startDate, setStartDate] = useState(new Date())
  const userr = useAuth();
  const user = userr.user;

  // navigation 
  // const navigate = useNavigate();
  console.log();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const foodName = form.foodName.value;
    const image = form.image.value;
    const foodQuantity = parseFloat(form.foodQuantity.value);
    const pickupLocation = form.pickupLocation.value;
    const expiredDate = startDate;
    const additionalNotes = form.additionalNotes.value;
    const status = 'available';

    // user info from authProvider
    const userDetails = {
      email: user?.email,
      name: user?.displayName,
      photo: user?.photoURL,
    };

    const foodData = {
      foodName,
      image,
      foodQuantity,
      pickupLocation,
      expiredDate,
      additionalNotes,
      userDetails,
      status,
    };
    console.log(foodData);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/postedfoods`,
        foodData
      );
      console.log(data);
      toast.success("Food Added Successfully!");
      // navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section className="">
      <div className="py-8 px-4 mx-auto max-w-2xl bg-stone-300 rounded-xl">
        <h2 className="mb-4 text-xl text-center font-bold">
          Please Add The Foods
          <div className="">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 sm:gap-6">
                {/* MARK: food name*/}
                <div className="w-full">
                  {" "}
                  <label
                    htmlFor="Food Name"
                    className="block mb-2 text-sm font-medium text-left mt-1"
                  >
                    Food Name
                  </label>{" "}
                  <input
                    type="text"
                    name="foodName"
                    id="foodName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Name of the Food"
                    required
                  />
                </div>

                {/* MARK: IMAGE */}
                <div className="w-full">
                  {" "}
                  <label
                    htmlFor="Food Image"
                    className="block mb-2 text-sm font-medium text-left mt-1"
                  >
                    Food Image
                  </label>{" "}
                  <input
                    type="text"
                    name="image"
                    id="image"
                    className="bg-gray-50 border  border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Image Url"
                    required
                  />
                </div>

                {/* MARK: Food Quantity*/}
                <div className="w-full">
                  {" "}
                  <label
                    htmlFor="Food Quantity"
                    className="block mb-2 text-sm font-medium text-left mt-1"
                  >
                    Food Quantity
                  </label>{" "}
                  <input
                    type="number"
                    name="foodQuantity"
                    id="foodQuantity"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Food Quantity"
                    required
                  />
                </div>

                {/* MARK: Pickup Location*/}
                <div className="w-full">
                  {" "}
                  <label
                    htmlFor="Pickup Location"
                    className="block mb-2 text-sm font-medium text-left mt-1"
                  >
                    Pickup Location
                  </label>{" "}
                  <input
                    type="text"
                    name="pickupLocation"
                    id="pickupLocation"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Pickup Location"
                    required
                  />
                </div>

                {/* MARK:  Expired Date/Time */}
                <div className="w-full">
                  {" "}
                  <label
                    htmlFor=" Expired Date/Time"
                    className="block mb-2 text-sm font-medium text-left mt-1"
                  >
                    Expiry Date
                  </label>{" "}
                  {/* <input
                    type="text"
                    name="expiredDate"
                    id="expiredDate"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder=" Expired Date/Time"
                    required
                  /> */}
                  <DatePicker
                className='border px-[20px] py-2 bg-slate-700 rounded-xl'
                selected={startDate}
                onChange={date => setStartDate(date)}
              />

                </div>
                

                {/* MARK: Additional Notes */}
                <div className="w-full">
                  {" "}
                  <label
                    htmlFor="Additional Notes"
                    className="block mb-2 text-sm font-medium text-left mt-1"
                  >
                    Additional Notes
                  </label>{" "}
                  <input
                    type="text"
                    name="additionalNotes"
                    id="additionalNotes"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Additional Notes"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-center mt-10">
                <button
                  type="submit"
                  className="btn btn-primary w-full"
                >
                  Add Food
                </button>
              </div>
            </form>
          </div>
        </h2>
      </div>
    </section>
  );
};

export default AddFood;
