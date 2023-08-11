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

const useVideoDetails = (videoId: string) => {
  const [videoDetails, setVideoDetails] = React.useState<VideoDetails>();
  React.useEffect(() => {
    loadVideoDetails(videoId).then((vd) => setVideoDetails(vd));
  }, [videoId]);

  return videoDetails;
};

const VideoPreviewImage = ({
  videoDetails,
}: {
  videoDetails: VideoDetails;
}) => {
  return (
    <img
      className="videoImg"
      alt="video preview"
      src={videoDetails.previewUrl}
    />
  );
};

const VideoDescription = ({ videoDetails }: { videoDetails: VideoDetails }) => {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>{videoDetails.title}</div>
      <div style={{ color: "#808080" }}>{videoDetails.author}</div>
    </>
  );
};

const Loader = ({}) => <span>{"loading..."}</span>;

const VideoPreview = ({ videoId }: { videoId: string }) => {
  const videoDetails = useVideoDetails(videoId);
  return videoDetails ? (
    <div style={{ display: "flex" }}>
      <VideoPreviewImage videoDetails={videoDetails} />
      <div style={{ paddingLeft: "10px" }}>
        <VideoDescription videoDetails={videoDetails} />
      </div>
    </div>
  ) : (
    <Loader />
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
