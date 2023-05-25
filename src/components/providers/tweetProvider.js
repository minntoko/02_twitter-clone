import { useEffect, useState, createContext } from "react";
import {
  collection,
  query,
  orderBy,
  where,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import db from "../../firebase";

const TweetContext = createContext();
const TweetProvider = ({ children }) => {
  const [tweets, setTweets] = useState([]);
  useEffect(() => {
    const tweetsRef = collection(db, "tweets");
    const q = query(tweetsRef, orderBy("created_at", "desc"));

    onSnapshot(q, async (queryTweets) => {
      const newTweetPromises = queryTweets.docs.map(async (doc) => {
        const queryTweet = doc.data();
        const tweetId = doc.id;

        const userRef = collection(db, "users");
        const tweetQ = query(userRef, where("userId", "==", queryTweet.userId));
        const userSnapshot = await getDocs(tweetQ);
        const userData = userSnapshot.docs.map((doc) => doc.data());
        return {
          tweetId: tweetId,
          userId: queryTweet.userId,
          displayName: userData[0].displayName,
          userName: userData[0].userId,
          verified: userData[0].verified,
          text: queryTweet.text,
          image: queryTweet.image,
          icon: userData[0].icon,
        };
      });

      const newTweets = await Promise.all(newTweetPromises);
      setTweets(newTweets);
    });
  }, []);
  return (
    <TweetContext.Provider value={ tweets }>
      {children}
    </TweetContext.Provider>
  );
};

export { TweetContext, TweetProvider };