import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { memo, useState, useContext } from "react";
import { UserDataContext } from "../../providers/userDataProvider";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
  onSnapshot,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../../firebase";
import "./Buttons.css";


const LikeButton = memo (({ tweetId }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const { userData } = useContext(UserDataContext);

    const getLikeData = async () => {
      let likeDatas = [];
      const likeCollection = collection(db, "likes");
      const q = query(likeCollection, where("tweetId", "==", tweetId));
      onSnapshot(q, (querySnapshot) => {
        setLike(false);
        likeDatas = querySnapshot.docs.map((doc) => doc.data());
        setLikeCount(likeDatas.length);
        likeDatas.forEach((likeData) => {
          if (likeData.userId === userData.userId && likeData.tweetId === tweetId) {
            setLike(true);
          }
        });
      });
    };
    getLikeData();

  const likeSwitch = () => {
    setLike(like ? false : true);
  };

  const likeCountUp = async () => {
    if (like) {
      setLikeCount(likeCount - 1);
      const likeCollection = collection(db, "likes");
      const q = query(
        likeCollection,
        where("tweetId", "==", tweetId),
        where("userId", "==", userData.userId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        const userLikeRef = doc(db, "likes", document.id);
        await deleteDoc(userLikeRef);
      });
      setLike(false);
    } else {
      setLikeCount(likeCount + 1);
      addDoc(collection(db, "likes"), {
        likeId: uuidv4(),
        userId: userData.userId,
        tweetId: tweetId,
        created_at: serverTimestamp(),
      });
    }
  };

  return (
    <div
      className="likeBox"
      onClick={() => {
        likeSwitch();
        likeCountUp();
      }}
    >
      <div className={`post__likeButton ${like ? "post__likeActive" : ""}`}>
        {like ? (
          <FavoriteIcon fontSize="small" />
        ) : (
          <FavoriteBorder fontSize="small" />
        )}
      </div>
      <span
        className={`likeButton__likeCount ${
          likeCount !== 0 ? "likeButton__likeActive" : ""
        }`}
      >
        {likeCount}
      </span>
    </div>
  );
});

export default LikeButton;
