import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      //login user
      const res = await projectAuth.signInWithEmailAndPassword(email, password);

      //if no res throw error

      if (!res) throw new Error("Could not complete signup");
      // send the user to the context

      dispatch({ type: "LOGIN", payload: res.user });
      console.log(res.user);
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message.slice(10));
      console.log(err.message.slice(10));
      setIsPending(false);
      dispatch({ type: "ERROR" });
    }
  };
  return { error, isPending, login };
};
