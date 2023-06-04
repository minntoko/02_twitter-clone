import { useEffect, useState, useContext, memo } from "react";
import { UserDataContext } from "../../providers/userDataProvider";
import db from "../../../firebase";
import Post from "../../timeline/Post";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
} from "firebase/firestore";
import "./tweets.css";

const Reply = memo(() => {
  const { userData } = useContext(UserDataContext);
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    if (!userData.userId) {
      return;
    }else {
      const tweetsRef = collection(db, "tweets");
      const q = query(
        tweetsRef,
        orderBy("created_at", "desc"),
        where("userId", "==", userData.userId)
      );
      onSnapshot(q, async (queryTweets) => {
        const newTweetPromises = queryTweets.docs.map(async (doc) => {
          const queryTweet = doc.data();
          const tweetId = doc.id;
          return {
            tweetId: tweetId,
            userId: queryTweet.userId,
            displayName: userData.displayName,
            userName: userData.userId,
            verified: userData.verified,
            text: queryTweet.text,
            image: queryTweet.image,
            icon: userData.icon,
          };
        });
        const newTweets = await Promise.all(newTweetPromises);
        setTweets(newTweets);
      });
    }
  }, [userData.userId]);
  return (
    <div className="prof__tweets">
      {tweets.map((tweet) => (
        <Post
          key={tweet.tweetId}
          tweetId={tweet.tweetId}
          userId={tweet.userId}
          displayName={tweet.displayName}
          userName={tweet.userName}
          verified={tweet.verified}
          text={tweet.text}
          image={tweet.image}
          icon={tweet.icon}
        />
      ))}
    </div>
  );
});

export default Reply;