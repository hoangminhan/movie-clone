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
          notification.error({
            message: "Xóa khỏi danh sách bookmark",
          });
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
    }
  };
  return {
    handleAddBookMarked,
  };
};
