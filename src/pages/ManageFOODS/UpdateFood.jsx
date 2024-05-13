import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UpdateFood = () => {
    const { id } = useParams();
    const [foodData, setFoodData] = useState([]);
    console.log(foodData);
    useEffect(() => {
        axios
        .get(`${import.meta.env.VITE_API_URL}/fooddetails/${id}`)
        .then((res) => {
            // console.log(res.data);
            setFoodData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    // Convert foodData object to an array and then get its length
    const foodDataLength = Object.keys(foodData).length;

    return (
        <div>
            <h1>hello {foodDataLength}</h1>
        </div>
    );
};

export default UpdateFood;
