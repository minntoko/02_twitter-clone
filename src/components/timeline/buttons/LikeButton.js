import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { memo, useState } from "react";
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

// id, userIdを受け取る
const LikeButton = memo (({ id, userId }) => {
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
    const getLikeData = async () => {
      let likeDatas = [];
      const likeCollection = collection(db, "likes");
      const q = query(likeCollection, where("tweet_id", "==", id)); // エラー発生
      onSnapshot(q, (querySnapshot) => {
        likeDatas = querySnapshot.docs.map((doc) => doc.data());
        setLikeCount(likeDatas.length);
        likeDatas.forEach((likeData) => {
          if (likeData.user_id === userId && likeData.tweet_id === id) {
            console.log(`いいねしています${id}`);
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
        where("tweet_id", "==", id),
        where("user_id", "==", userId)
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
        like_id: uuidv4(),
        user_id: userId,
        tweet_id: id,
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
