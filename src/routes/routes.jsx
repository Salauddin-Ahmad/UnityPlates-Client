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
import PrivateRoute from "./PrivateRoute";
import FoodCards from "../pages/FoodCards/FoodCards";
import FoodDetails from "../pages/FoodCards/FoodDetails";
import UpdateFood from "@/pages/ManageFOODS/UpdateFood";
import Testimonial from "@/components/Testimonial";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <Error></Error>,
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: (
          <>
            <Sliders></Sliders>
            <FoodCards></FoodCards>
            <Testimonial></Testimonial>
          </>
        ),
      },
      {
        path: "/foodDetails/:id",
        element: <PrivateRoute>
          <FoodDetails></FoodDetails>
        </PrivateRoute>,
      },
      {
        path: "/updateFood/:id",
        element: <PrivateRoute>
          <UpdateFood></UpdateFood>
        </PrivateRoute>,
      },
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
        element: (
          <PrivateRoute>
            <AddFood></AddFood>
          </PrivateRoute>
        ),
      },
      {
        path: "/managefoods",
        element: (
          <PrivateRoute>
            <ManageMyFoods></ManageMyFoods>
          </PrivateRoute>
        ),
      },
      {
        path: "/foodrequests",
        element: (
          <PrivateRoute>
            <MyFoodRequests></MyFoodRequests>
          </PrivateRoute>
        ),
      },
    ],
  },
]);

export default router;
