import React from "react";
import "./VideosList.css";

type VideoDetails = {
  previewUrl: string;
  title: string;
  author: string;
};

const loadVideoDetails = (id: string): Promise<VideoDetails> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          previewUrl: "https://i.ytimg.com/vi/BlNwQdqdRig/hqdefault.jpg",
          title: "функціональний TypeScript: функція curry",
          author: "@AleksandrSugak",
        }),
      500
    )
  );
};

const VideoPreview = ({ videoId }: { videoId: string }) => {
  const [videoDetails, setVideoDetails] = React.useState<VideoDetails>();
  React.useEffect(() => {
    loadVideoDetails(videoId).then((vd) => setVideoDetails(vd));
  }, [videoId]);
  return videoDetails ? (
    <div style={{ display: "flex" }}>
      <img
        className="videoImg"
        alt="video preview"
        src={videoDetails.previewUrl}
      />
      <div style={{ paddingLeft: "10px" }}>
        <div style={{ fontWeight: "bold" }}>{videoDetails.title}</div>
        <div style={{ color: "#808080" }}>{videoDetails.author}</div>
      </div>
    </div>
  ) : (
    <span>{"loading..."}</span>
  );
};

const VideosList = ({}) => {
  return (
    <div className="listWrapper">
      <VideoPreview videoId={"testVideo"} />
    </div>
  );
};

export default VideosList;
