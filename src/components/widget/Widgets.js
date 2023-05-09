import { Search } from "@mui/icons-material";
import React from "react";
import {
  TwitterTimelineEmbed,
  TwitterTweetEmbed,
} from "react-twitter-embed";

function Widgets() {
  return (
    <div className="widgets">
      <div className="widgets__search">
        <Search className="widgets__searchIcon" />
        <input type="text" placeholder="キーワード検索" />
      </div>

      <div className="widgets__widgetContainer">
        <h2>いまどうしてる？</h2>

        {/* ライブラリを追加 */}
        <TwitterTweetEmbed tweetId={"1650079992045527041"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="minntoko0822"
          options={{ height: 400 }}
        />
        <TwitterShareButton
          url={"https://twitter.com/minntoko0822"}
          options={{ text: "#React勉強中", via: "minntoko0822" }}
        />
      </div>
    </div>
  );
}

export default Widgets;
