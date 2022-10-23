import {
  arrayRemove,
  collection,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useState } from "react";
import { useNotification } from "./use-notification";

export const useFirebaseRealTime = () => {
  const { handlePopupNotification } = useNotification();

  const [dataCollection, setDataCollection] = useState();
  const handleCheckIsExist = async (collection, idDetail) => {
    // doc(collection, "detail", idDetail)
    try {
      onSnapshot(
        collection(collection, "detail", where("id_detail", "==", idDetail)),
        (doc) => {
          setDataCollection({ ...doc.data() });
        }
      );
    } catch (error) {
      setDataCollection(error);
    }

    return dataCollection;
  };

  // delete one  history || bookmark
  const handleDeleteOneBookmarkOrHistory = async (
    dataDelete,
    collectionName,
    condition,
    typeDocument
  ) => {
    const dbfireStore = getFirestore();
    const queryDb = query(
      collection(dbfireStore, collectionName),
      where("user_id", "==", condition)
    );
    let key = "";

    const dataResult = await getDocs(queryDb);
    dataResult.forEach((doc) => {
      key = doc.id;
    });
    const userRef = doc(dbfireStore, collectionName, key);
    updateDoc(userRef, {
      [typeDocument]: arrayRemove(dataDelete),
    });
    handlePopupNotification("Xoa thanh cong", "success");
  };

  // delete all history || bookmark
  const handleDeleteAllBookmarkOrHistory = async (
    collectionName,
    condition,
    type,
    typeDocument
  ) => {
    const dbfireStore = getFirestore();
    let listDataDelete = [];
    let key = "";

    const queryDb = query(
      collection(dbfireStore, collectionName),
      where("user_id", "==", condition)
    );

    const dataResult = await getDocs(queryDb);

    if (type !== "multi") {
      dataResult.forEach((doc) => {
        key = doc.id;
        if (typeDocument === "history") {
          listDataDelete = doc.data().history.filter((item, index) => {
            return item.type === type;
          });
        } else {
          listDataDelete = doc.data().bookmark.filter((item, index) => {
            return item.type === type;
          });
        }
      });
      const userRef = doc(dbfireStore, collectionName, key);
      listDataDelete.forEach((item) => {
        updateDoc(userRef, {
          [typeDocument]: arrayRemove(item),
        });
      });

      handlePopupNotification("Xoa thanh cong", "success");
    } else {
      dataResult.forEach((doc) => {
        key = doc.id;
        if (typeDocument === "history") {
          listDataDelete = doc.data().history.filter((item, index) => {
            return item;
          });
        } else {
          listDataDelete = doc.data().bookmark.filter((item, index) => {
            return item;
          });
        }
      });
      const userRef = doc(dbfireStore, collectionName, key);
      listDataDelete.forEach((item) => {
        updateDoc(userRef, {
          [typeDocument]: arrayRemove(item),
        });
      });

      handlePopupNotification("Xoa thanh cong", "success");
    }
  };
  return {
    handleCheckIsExist,
    handleDeleteOneBookmarkOrHistory,
    handleDeleteAllBookmarkOrHistory,
  };
};
