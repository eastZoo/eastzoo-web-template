import { Navigate } from "react-router-dom";
import { readAccessToken } from "@/lib/functions/authFunctions";

interface PrivateRouteProps {
  component: React.ReactNode;
  authenticated?: string | null;
}

const PrivateRoute = ({ component, authenticated }: PrivateRouteProps) => {
  if (authenticated) {
    return <>{component}</>;
  } else {
    return <Navigate to="/auth/login" />;
  }
};

export default PrivateRoute;
