
import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/Root";
import Error from "../components/Error";
import AvailableFoods from "../pages/AvailableFoods/AvailableFoods";
import AddFood from "../pages/AddFoods/AddFood";
import Login from "../pages/Authentication/Login";
import SignUp from "../pages/Authentication/SignUp";

const router = createBrowserRouter([
    {
      path: "/",
      errorElement: <Error></Error>,
      element: <Root></Root>,
      children: [
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
          path: '/managefoods'
        },
        {
          path: '/foodrequests'
        }
      ],
    },
  ]);

 export default router;
