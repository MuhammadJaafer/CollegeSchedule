import { useState } from "react";

import { projectFirestore } from "../firebase/Config";
export const useFirestore = (collection, query) => {
  const init = {
    color: [
      "#aaa",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#aaa",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#aaa",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#aaa",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#aaa",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
      "#8c69ff",
    ],
    text: [
      "00:00 - 00:00",
      "",
      "",
      "",
      "",
      "",
      "00:00 - 00:00",
      "",
      "",
      "",
      "",
      "",
      "00:00 - 00:00",
      "",
      "",
      "",
      "",
      "",
      "00:00 - 00:00",
      "",
      "",
      "",
      "",
      "",
      "00:00 - 00:00",
      "",
      "",
      "",
      "",
      "",
    ],
  };
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [response, setResponse] = useState(false);
  let ref = projectFirestore.collection(collection);
  if (query) {
    ref = ref.where(...query);
  }
  //initial first schedule
  const initSchedule = async (uid) => {
    await ref.add({ ...init, uid });
  };

  // edite cell
  const editCell = async (index, text, color) => {
    setIsPending(true);
    setResponse(false);
    const snapshot = await ref.get();
    let doc = snapshot.docs[0].data();
    doc.text[index] = text;
    doc.color[index] = color;
    try {
      await snapshot.docs[0].ref.update({ ...doc });
      setIsPending(false);
      setResponse(true);
    } catch (err) {
      setIsPending(false);
      setResponse(false);
      setError(err);
      console.log(err);
    }
  };

  // add new row
  const addNewRow = () => {};

  return { initSchedule, editCell, addNewRow, error, isPending, response };
};
