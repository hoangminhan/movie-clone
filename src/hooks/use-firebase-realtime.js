import { AVATAR_EMPTY } from "constant";
import { UserContext } from "contexts";
import { storageMovie } from "firebase-custom";
import { updateProfile } from "firebase/auth";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useContext, useState } from "react";
import { useNotification } from "./use-notification";

export const useFirebaseRealTime = () => {
  const { handlePopupNotification } = useNotification();
  const stateContext = useContext(UserContext);
  const { changeAvatar } = stateContext;
  const [isChangeAvatar, setIsChangeAvatar] = changeAvatar;

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

  // handle check user exits to push into db
  const handleCheckUserExist = async (user) => {
    try {
      // access to db
      const db = getFirestore();
      // reference to doc of collection user
      const snapshot = await getDoc(doc(db, "user", user.uid));
      if (snapshot.exists()) {
      } else {
        const data = {
          user_id: user.uid || "",
          url: user.photoURL || AVATAR_EMPTY,
          name: user.displayName,
          email: user.email || "",
          bookmark: [],
          history: [],
          notification: [],
        };
        // add doc to user collection
        setDoc(doc(db, "user", user.uid), data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleUploadAvatar = async (file, currentUser, typeImage) => {
    const fileRef = ref(storageMovie, currentUser.uid + ".png");

    // update user in firebase store
    const dbfireStore = getFirestore();
    const userRef = doc(dbfireStore, "user", currentUser.uid);
    try {
      await uploadBytes(fileRef, file);
      // get url file avatar
      const photoURL = await getDownloadURL(fileRef);

      await updateProfile(currentUser, { photoURL });
      await updateDoc(userRef, {
        url: photoURL,
      });
      setIsChangeAvatar(!isChangeAvatar);
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddNotification = async (data, idUser) => {
    // reference to db
    const dbfireStore = getFirestore();

    const userRef = doc(dbfireStore, "user", idUser);
    try {
      const docSnap = await getDoc(userRef);
      if (docSnap.exists()) {
        const dataAdd = {
          description: data.description,
          noti_id: data.noti_id,
          title: data.title,
          createAt: data.createAt,
          isReview: data.isReview,
        };
        await updateDoc(userRef, {
          notification: arrayUnion(dataAdd),
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return {
    handleCheckIsExist,
    handleDeleteOneBookmarkOrHistory,
    handleDeleteAllBookmarkOrHistory,
    handleCheckUserExist,
    handleUploadAvatar,
    handleAddNotification,
  };
};
