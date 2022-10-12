import { child, get, getDatabase, ref } from "firebase/database";

export const useFirebaseRealTime = () => {
  const dbRealTime = getDatabase();

  const handleCheckIsExist = async (type, idDetail) => {
    const getData = ref(dbRealTime);
    let newRsult = [];

    let check = false;
    let currentKey = "";
    let currentComment = {};
    await get(child(getData, type)).then((snapshot) => {
      const fetched = snapshot.val();
      console.log({ fetched });
      for (const [key, value] of Object.entries(fetched)) {
        console.log({ value });
        if (+value.id_post === +idDetail) {
          currentComment = { ...value };
          check = true;
          currentKey = key;
        }
      }
    });
    console.log({ currentComment });

    return { check, currentKey, currentComment };
  };
  return {
    handleCheckIsExist,
  };
};
