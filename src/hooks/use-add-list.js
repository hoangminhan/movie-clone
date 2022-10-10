import { message, notification } from "antd";
import { UserContext } from "contexts";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import { useContext } from "react";

export const useAddList = () => {
  const stateContext = useContext(UserContext);
  const { currentDataUser, currentTabGlobal } = stateContext;
  const [dataUser, setDataUser] = currentDataUser;
  const [tabGlobal, setTabGlobal] = currentTabGlobal;
  const db = getFirestore();

  const handleAddBookMarked = async (data) => {
    let dataDelete = {};
    const querySnapsot = query(
      collection(db, "bookmark"),
      where("user_id", "==", dataUser?.uid)
    );
    const querySnapshot = await getDocs(querySnapsot);
    let checkExist = false;
    querySnapshot.forEach((doc) => {
      if (data.id === doc.data().id) {
        checkExist = true;
        dataDelete = { ...doc.data(), id_field: doc.id };
      }
    });
    if (checkExist) {
      const itemDeleteRef = doc(db, "bookmark", dataDelete.id_field);
      deleteDoc(itemDeleteRef)
        .then((data) => {
          console.log({ data });
          notification.error({
            message: "Xóa khỏi danh sách bookmark",
          });
          return;
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      await addDoc(collection(db, "bookmark"), {
        id: data.id,
        type: tabGlobal === "/" ? "movie" : "tv",
        rate: data.vote_average,
        url: data.poster_path,
        title: data?.title ? data?.title : data?.name,
        user_id: dataUser.uid,
      });
      notification.success({
        message: "Thêm thành công vào list bookmark",
      });
      return;
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
