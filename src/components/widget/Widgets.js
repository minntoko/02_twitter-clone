import { Search } from "@mui/icons-material";
import React, { memo } from "react";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";
import "./Widgets.css";

const Widgets = memo(() => {
  return (
    <div className="widgets">
      <div className="widgets__serchContainer">
        <div className="widgets__search">
          <Search className="widgets__searchIcon" />
          <input type="text" placeholder="キーワード検索" />
        </div>
      </div>

      <div className="widgets__widgetContainer">
        <h2>いまどうしてる？</h2>

        {/* ライブラリを追加 */}
        <TwitterTweetEmbed tweetId={"1650079992045527041"} />
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="AppStoreJP"
          options={{ height: 400, Width: 160 }}

        />
        <div className="widgets__shareButton">
          <TwitterShareButton
            url={"https://twitter.com/Apple"}
            options={{ text: "#React勉強中", via: "Apple" }}
          />
        </div>
      </div>
    </div>
  );
});

export default Widgets;
