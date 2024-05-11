
import { useLocation, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading && !user) {
    return (
      <div className="text-center flex justify-center gap-2">
        <h1 className="my-10 text-4xl">Loading</h1>
        <span className="loading loading-bars loading-lg"></span>
      </div>
    );
  }
  if (!user) {
    return <Navigate to={`/login`} state={location.pathname} />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
