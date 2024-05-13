/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

const AvailableFoods = () => {
    const [allFoods, setAllFoods] = useState([]); // State to hold all available foods
    const [sortedFoods, setSortedFoods] = useState([]); // State to hold filtered and sorted foods
    const [searchText, setSearchText] = useState(''); // State to hold search text
    const [sortOrder, setSortOrder] = useState(true); // State to hold sort order

    useEffect(() => {
        const fetchData = async () => {
            try {
                let endpoint = '/availabefoods'; // Default endpoint
                if (!sortOrder) {
                    endpoint = '/availabefoodsorted';
                }
                const response = await axios.get(`${import.meta.env.VITE_API_URL}${endpoint}`);
                setAllFoods(response.data);
                setSortedFoods(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Fetch data when the component mounts or sortOrder changes
    }, [sortOrder]);

    useEffect(() => {
        if (searchText.trim() === '') {
            // If search text is empty, reset sortedFoods to allFoods
            setSortedFoods(allFoods);
        } else {
            // Fetch data based on search text
            axios.get(`${import.meta.env.VITE_API_URL}/searchfoods/${searchText}`)
                .then(response => {
                    setSortedFoods(response.data);
                })
                .catch(error => {
                    console.error('Error fetching search results:', error);
                });
        }
    }, [searchText, allFoods]);

    const handleSort = () => {
        // Toggle sort order
        setSortOrder(!sortOrder);
    };

    return (
        <div className="container">
            <h1>Available Foods</h1>

            {/* Search Section */}
            <div className="mb-4">
                <input
                    type="text"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search by Food Name"
                    className="p-2 border rounded mr-2"
                />
                <button onClick={handleSort} className="p-2 bg-blue-500 text-white rounded">Sort by Expiry Date</button>
            </div>

            {/* Foods Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {sortedFoods.length > 0 ? (
                    sortedFoods.map(food => (
                        <div key={food._id} className="col mb-4">
                            <FoodItem food={food} />
                        </div>
                    ))
                ) : (
                    <p className="text-center">No foods found</p>
                )}
            </div>
        </div>
    );
};

const FoodItem = ({ food }) => {
    return (
        <div className="card border rounded-xl bg-orange-100 ">
            <img src={food.image} className="card-img-top rounded-xl" alt={food.name} />
            <div className="card-body">
                <h5 className="card-title">Food Name: {food.foodName}</h5>
                <p className="card-text">Donator: <img className=' h-14 rounded-full' src={food.userDetails.photo} alt={food}/> 
                    Name: {food.userDetails.name}</p>
                <p className="card-text">Quantity: {food.foodQuantity}</p>
                <p className="card-text">Pickup Location: {food.pickupLocation}</p>
                <p className="card-text">Expire Date/Time: {food.expiredDate}</p>
                <p className="card-text">Additional Notes: {food.additionalNotes}</p>
                <NavLink to={`/foodDetails/${food._id}`} className="btn btn-primary">View Details</NavLink>
            </div>
        </div>
    );
};

export default AvailableFoods;
