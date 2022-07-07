import { useEffect, useRef, useState } from "react";
import { projectFirestore } from "../firebase/Config";

export const useCollection = (collection, query) => {
  const [schedule, setSchedule] = useState();
  const [_error, setError] = useState(null);
  const [_isPending, setIsPending] = useState(false);
  useEffect(() => {
    setIsPending(true);
    let ref = projectFirestore.collection(collection).where(...query);
    const unsup = ref.onSnapshot(
      (snapshot) => {
        setSchedule(snapshot.docs[0].data());
        setIsPending(false);
      },
      (err) => {
        console.log(err);
        setIsPending(false);
        setError(err);
      }
    );
    return () => {
      unsup();
    };
  }, []);
  return { schedule, _error, _isPending };
};
