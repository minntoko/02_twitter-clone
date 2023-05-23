import { FavoriteBorder } from "@mui/icons-material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import {
  addDoc,
  doc,
  deleteDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import db from "../../../firebase";
import "./Buttons.css";

const LikeButton = ({ id, userId }) => {
  // いいねボタンの状態をデータベースからuser_idとtweet_idを利用してツイートごとに判定する
  // いいねの数をデータベースからtweet_idを利用してツイートごとにカウントする
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  useEffect(() => {
    const getLikeData = async () => {
      const likeCollection = collection(db, "likes");
      const q = query(likeCollection, where("tweet_id", "==", id));
      const likeSnapshot = await getDocs(q);
      const likeDatas = likeSnapshot.docs.map((doc) => doc.data());
      setLikeCount(likeDatas.length);
      // いいねボタンの状態を判定する
      likeDatas.forEach((likeData) => {
        if (likeData.user_id === userId) {
          setLike(true);
        }
      });
    };
    getLikeData();
  }, [id, userId]);

  const likeSwitch = () => {
    setLike(like ? false : true);
  };

  const likeCountUp = async () => {
    if (like) {
      setLikeCount(likeCount - 1);
      // いいねを取り消したときにデータベースから削除する
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
};

export default LikeButton;
