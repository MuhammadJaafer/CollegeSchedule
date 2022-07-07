import { useState } from "react";
import { projectAuth } from "../firebase/Config";
import { useAuthContext } from "./useAuthContext";
import { useFirestore } from "./useFirestore";
export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const { initSchedule } = useFirestore("schedules");
  const signup = async (email, password, displayName) => {
    setIsPending(true);
    setError(null);
    try {
      //signup user
      const res = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );

      //if no res throw error

      if (!res) throw new Error("Could not complete signup");
      //add display nae to user

      await res.user.updateProfile({ displayName });
      // initial first schedules
      await initSchedule(res.user.uid);
      // send the user to the context

      dispatch({ type: "LOGIN", payload: res.user });
      setIsPending(false);
      setError(null);
    } catch (err) {
      setError(err.message.slice(10));
      console.log(err.message.slice(10));
      setIsPending(false);
      dispatch({ type: "ERROR" });
    }
  };
  return { error, isPending, signup };
};
