import {
  collection,
  doc,
  getDoc,
  getFirestore,
  onSnapshot,
  where,
} from "firebase/firestore";
import { useState } from "react";

export const useFirebaseRealTime = () => {
  const [dataCollection, setDataCollection] = useState();
  const handleCheckIsExist = async (collection, idDetail) => {
    // doc(collection, "detail", idDetail)
    try {
      onSnapshot(
        collection(collection, "detail", where("id_detail", "==", idDetail)),
        (doc) => {
          console.log(doc.data());
          setDataCollection({ ...doc.data() });
        }
      );
    } catch (error) {
      console.log(error);
      setDataCollection(error);
    }

    return dataCollection;
  };
  return {
    handleCheckIsExist,
  };
};
