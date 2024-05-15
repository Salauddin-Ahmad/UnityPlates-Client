import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const FoodCards = () => {
  const [foods, setFoods] = useState([]);
  // console.log(foods);
    useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/foods`)
      .then((res) => {
        // console.log(res.data);
        setFoods(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
        <Helmet>
        <title> UnityPlates </title>
        <meta name="HOME" content="HOME" />
      </Helmet>

<div className=" my-8">
  <h1 className=" font-bold text-3xl text-center">Featured Foods </h1>
  <p className="text-base w-[85%] mx-auto">Welcome to our Featured Foods section, where acts of generosity come to life. Here, youll find a heartwarming collection of donated foods from our compassionate community members. Each item represents a story of care, compassion, and solidarity, ready to nourish those in need. Whether its a homemade meal, fresh produce, or pantry staples, these featured foods embody the spirit of giving. Explore our curated selection and join us in spreading kindness, one meal at a time.</p>
</div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {foods.map((food) => (
          <div
            key={food._id}
            className="bg-orange-100 shadow-lg shadow-stone-600 rounded-md text-gray-600 p-4"
          >
            <img
              src={food.image}
              alt={food.foodName}
              className="card-img-top w-full h-[200px]  mb-1 rounded-md"
            />
            <h3 className="text-xl font-bold">{food.foodName}</h3>

            {/*MARK: donator info*/}
            <div className="text-lg">
             
              <div className="flex items-center gap-8 ">
              <p><span className="text-bold"></span>Donator: {food.userDetails.name}</p>
                <img
                  className="h-14 border-2 border-slate-600 rounded-xl"
                  src={food.userDetails.photo}
                  alt=""
                />
              </div>
            </div>
            <p className="text-lg">
              Could be Served to {food.foodQuantity} People
            </p>
            <p className="text-lg">Pickup Location: {food.pickupLocation}</p>
            <p className="text-lg">Expiry Date: {food.expiredDate}</p>
            <p className="text-lg">Additional note: {food.additionalNotes}</p>
            <Link to={`/foodDetails/${food._id}`}>
              <button className="btn btn-accent mt-2">View Details</button>
            </Link>
          </div>
        ))}

    <div className="md:col-span-3 lg:col-span-3 w-full flex  justify-center mb-5">
     <Link to={`/availabefoods`}>
          <button className="btn btn-accent mt-2">Show All Available Foods</button>
        </Link>
    </div>
      </div>
    </>
  );
};

export default FoodCards;
