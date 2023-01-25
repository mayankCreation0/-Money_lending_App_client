import { useContext } from "react";
import { Navigate } from "react-router-dom";
import  {context}  from "../AuthContext/context";

function PrivateRoute({ children }) {
  const { authstate } = useContext(context);
  console.log(authstate);
  if (authstate) {
    return children;
  }
  return <Navigate to="/" />;
}

export default PrivateRoute;
