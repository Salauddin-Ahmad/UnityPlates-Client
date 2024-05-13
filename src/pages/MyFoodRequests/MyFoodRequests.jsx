import useAuth from "@/hooks/useAuth";
import axios from "axios";
import { useEffect, useState } from "react";

const MyFoodRequests = () => {
  const [reqFoods, setReqFoods] = useState(null);
  const userI = useAuth();
  const userEmail = userI.user.email;
  console.log(userEmail);
  console.log(reqFoods);
  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/getMyFoods/${userEmail}`)
    .then((res) => {
      console.log(res.data);
      setReqFoods(res.data);
    });
  }, [userEmail]);

  return (
    <>
      <div>
        {
        
        
        }
      </div>
    </>
  );
};

export default MyFoodRequests;
