import { message, notification } from "antd";
import { UserContext } from "contexts";
import {
  addDoc,
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useContext } from "react";

export const useAddList = () => {
  const stateContext = useContext(UserContext);
  const { currentDataUser, currentTabGlobal } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;

  const handleAddBookMarked = async (data) => {
    const db = getFirestore();
    let indexCurrentUser = "";
    const userRef = collection(db, "user");
    const resultQuery = query(userRef, where("user_id", "==", dataUser.uid));

    const querySnapshot = await getDocs(resultQuery);

    let checkExist = false;
    querySnapshot.forEach((doc) => {
      indexCurrentUser = doc.id;
      doc.data().bookmark.forEach((item) => {
        if (item.id === data.id) {
          checkExist = true;
        }
      });
    });
    const userRefUpdate = doc(db, "user", indexCurrentUser);

    if (checkExist) {
      await updateDoc(userRefUpdate, {
        bookmark: arrayRemove({
          id: data.id,
          type: tabGlobal === "/" ? "movie" : "tv",
          rate: data.vote_average,
          url: data.poster_path,
          title: data?.title ? data?.title : data?.name,
          user_id: dataUser.uid,
        }),
      });
      notification.success({
        message: "Xoa khoi list bookmark",
      });
    } else {
      await updateDoc(userRefUpdate, {
        bookmark: arrayUnion({
          id: data.id,
          type: tabGlobal === "/" ? "movie" : "tv",
          rate: data.vote_average,
          url: data.poster_path,
          title: data?.title ? data?.title : data?.name,
          user_id: dataUser.uid,
        }),
      });
      notification.success({
        message: "Thêm thành công vào list bookmark",
      });
    }
  };
  const handleAddHistory = async (data) => {
    const db = getFirestore();

    const queryDb = query(
      collection(db, "history"),
      where("user_id", "==", dataUser.uid),
      where("id", "==", data.id)
    );
    const dataResult = await getDocs(queryDb);
    let checkExist = false;
    dataResult.forEach((doc) => {
      if (data.id === doc.data().id) {
        checkExist = true;
      }
    });
    if (checkExist) {
      return;
    } else {
      try {
        await addDoc(collection(db, "history"), {
          name: data.title ? data.title : data.name,
          rate: data.vote_average,
          user_id: dataUser.uid,
          type: tabGlobal === "/" ? "movie" : "tv",
          id: data.id,
          url: data.poster_path,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  return {
    handleAddBookMarked,
    handleAddHistory,
  };
};
