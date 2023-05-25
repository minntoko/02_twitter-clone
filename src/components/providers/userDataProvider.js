import { createContext, useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import db from "../../firebase";

const UserDataContext = createContext({});
const UserDataProvider = ({ children }) => {
  const [userId, setUserId] = useState("it_engineer");
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      const user = collection(db, "users");
      const q = query(user, where("userId", "==", userId));
      const userSnapshot = await getDocs(q);
      const userData = userSnapshot.docs.map((doc) => doc.data());
      setUserData(userData[0]);
    };
    getUserData();
  }, []);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
};

export { UserDataContext, UserDataProvider };