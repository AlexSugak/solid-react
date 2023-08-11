import React from "react";
import "./VideosList.css";

type VideoDetails = {
  previewUrl: string;
  title: string;
  author: string;
};

type StreamDetails = VideoDetails & { watching: number };

const loadVideoDetails = (
  id: string
): Promise<VideoDetails | StreamDetails> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        id.toLowerCase().includes("stream")
          ? resolve({
              previewUrl: "https://i.ytimg.com/vi/gYszgvLdxpI/hqdefault.jpg",
              title: "SOLID на практике - нужен или нет?",
              author: "@AleksandrSugak",
              watching: 12000,
            })
          : resolve({
              previewUrl: "https://i.ytimg.com/vi/BlNwQdqdRig/hqdefault.jpg",
              title: "функціональний TypeScript: функція curry",
              author: "@AleksandrSugak",
            }),
      500
    )
  );
};

const useVideoDetails = (videoId: string) => {
  const [videoDetails, setVideoDetails] = React.useState<
    VideoDetails | StreamDetails
  >();
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

const StreamDescription = ({
  videoDetails,
}: {
  videoDetails: StreamDetails;
}) => {
  return (
    <>
      <VideoDescription videoDetails={videoDetails} />
      <div style={{ color: "#808080" }}>{videoDetails.watching} watching</div>
      <span className="liveBadge">live</span>
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
        {"watching" in videoDetails ? (
          <StreamDescription videoDetails={videoDetails} />
        ) : (
          <VideoDescription videoDetails={videoDetails} />
        )}
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
      <br />
      <VideoPreview videoId={"testStream"} />
    </div>
  );
};

export default VideosList;
