import useAuth from '@/hooks/useAuth';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageMyFoods = () => {
    const [control, setControl] = useState(false);
    const [foods, setFoods] = useState([]);
    // console.log(foods)

    const users = useAuth();
    const user = users.user
    const email = user.email
    console.log(email);

    // fetch all the food by email from db
    useEffect(() => {
        axios.get(`${import.meta.env.VITE_API_URL}/manageAllFoods/${email}`)
        .then((res) => {
            // console.log(res.data);
            setFoods(res.data);
        })
    },[email,control])

const handleDelete = () => {

}

    
    return (
<>
<div className="overflow-x-auto lg:mx-20 xl:mx-24 ">
    <table className="table-auto">

        {/* head of the table */}
      <thead className="border w-full">
        <tr>
          <th className="hidden sm:table-cell px-4 py-2 border-4 border-yellow-600">Image</th>
          <th className="px-4 py-2 border-4 border-yellow-600 ">Food Name</th>
          <th className="px-4 py-2 border-4 border-yellow-600">Pickup Location</th>
          <th className="hidden sm:table-cell  px-4 py-2 border-4 border-yellow-600">additionalNotes</th>
          <th className="px-4 py-2 border-4 border-yellow-600">Actions</th>
          
        </tr>
      </thead>


      <tbody>
        {foods?.map((data) => (
          <tr className="border" key={data._id}>
            <td className="hidden sm:table-cell px-4 py-2 border-4 border-yellow-700">
              <img className="w-[230px] h-[120px] rounded-md" src={data.image} alt="" />
            </td>
            <td className="lg:px-4 py-2 lg:text-lg lg:font-extrabold font sans border-4 border-yellow-700">{data.foodName}</td>
            <td className="lg:px-4 py-2 border-4 border-yellow-700"> {data.pickupLocation}</td>
            <td className="hidden sm:table-cell lg:px-4 py-2 border-4 border-yellow-700"> {data.additionalNotes}</td>
            <td className="lg:px-4 py-2 border-4 border-yellow-700">
              <div className="flex flex-col sm:flex-row gap-2">
                <Link to={`/updateFood/${data._id}`}>
                  <button className="btn bg-blue-600">Update</button>
                </Link>
                <button onClick={() => handleDelete(data._id)} className="btn bg-red-800">Delete</button>
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