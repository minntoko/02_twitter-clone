import { useEffect, useState, useContext } from "react";
import { UserDataContext } from "../../providers/userDataProvider";
import { TweetContext } from "../../providers/tweetProvider";
import db from "../../../firebase";
import Post from "../../timeline/Post";
import {
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";
import "./tweets.css";

const Liketweet = () => {
  const tweets = useContext(TweetContext);
  const { userData } = useContext(UserDataContext);
  const [likeTweets, setLikeTweets] = useState([]);
  
  useEffect(() => {
    // console.log(tweets);
    const likeCollection = collection(db, "likes");
    const q = query(likeCollection, where("userId", "==", userData.userId));
    onSnapshot(q, (querySnapshot) => {
      const updatedLikeTweets = querySnapshot.docs.map((doc) => doc.data());
      // tweetのtweetIdとlikeTweetsのtweetIdが同じものをフィルタリングする
      const filteredTweets = tweets.filter((tweet) =>
        updatedLikeTweets.some((liketweet) => tweet.tweetId === liketweet.tweetId)
      );
      setLikeTweets(filteredTweets);
    });
  }, []);
  

  return (
    <div>
      {likeTweets.map((tweet) => (
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
};

export default Liketweet;
