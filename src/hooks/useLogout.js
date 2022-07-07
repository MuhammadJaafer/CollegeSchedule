import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";
export const useLogout = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const logout = async () => {
    setIsPending(true);
    setError(null);
    try {
      //signout user;
      await projectAuth.signOut();
      dispatch({ type: "LOGOUT" });
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message.slice(10));
      console.log(err.message.slice(10));
      setIsPending(false);
      dispatch({ type: "ERROR" });
    }
  };
  return { error, isPending, logout };
};
