
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../components/Error";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import AddFood from "../pages/AddFoods/AddFood";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";
import ManageMyFoods from "../pages/ManageFOODS/ManageMyFoods";
import MyFoodRequests from "../pages/MyFoodRequests/MyFoodRequests";
import Sliders from "../components/Sliders";

const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error></Error>,
      element: <Root></Root>,
      children: [
        {
          path: "/",
          element: <Sliders></Sliders>,
        }
        ,
        {
            path: "/login",
            element: <Login></Login>,
        },
        {
          path: "/signUp",
          element: <SignUp></SignUp>,
        },
        {
          path: "/availabefoods",
          element: <AvailableFoods></AvailableFoods>,
        },
        {
            path: "/addfood",
            element: <AddFood></AddFood>
        },
        {
          path: '/managefoods',
          element: <ManageMyFoods></ManageMyFoods>
        },
        {
          path: '/foodrequests',
          element: <MyFoodRequests></MyFoodRequests>
        }
      ],
    },
  ]);

 export default router;
