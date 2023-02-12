import React from "react";
export const context = React.createContext();
function Appcontext({ children }) {
  const [authstate, setAuthstate] = React.useState(false);
  const fnauthstate = () => {
    setAuthstate(true);
  };
  const falseAuthState =()=>{
    setAuthstate(false);
  }
  return (
    <context.Provider value={{ authstate, fnauthstate, falseAuthState }}>
      {children}
    </context.Provider>
  );
}
export default Appcontext;
