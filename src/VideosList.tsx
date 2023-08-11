import React from "react";
import "./VideosList.css";

type VideoDetails = {
  previewUrl: string;
  title: string;
  author: string;
};

type StreamDetails = VideoDetails & { watching: number };

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

const loadStreamDetails = (id: string): Promise<StreamDetails> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          previewUrl: "https://i.ytimg.com/vi/gYszgvLdxpI/hqdefault.jpg",
          title: "SOLID на практике - нужен или нет?",
          author: "@AleksandrSugak",
          watching: 12000,
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

const useStreamDetails = (videoId: string) => {
  const [videoDetails, setVideoDetails] = React.useState<StreamDetails>();
  React.useEffect(() => {
    loadStreamDetails(videoId).then((vd) => setVideoDetails(vd));
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

type VideoPreviewProps = {
  videoId: string;
  videoDetailsGetter?: typeof useVideoDetails;
  ImagePreviewComponent?: React.FunctionComponent<{
    videoDetails: VideoDetails;
  }>;
  DescriptionComponent?: React.FunctionComponent<{
    videoDetails: VideoDetails;
  }>;
  LoaderComponet?: React.FunctionComponent<{}>;
};

const VideoPreview = ({
  videoId,
  videoDetailsGetter = useVideoDetails,
  ImagePreviewComponent = VideoPreviewImage,
  DescriptionComponent = VideoDescription,
  LoaderComponet = Loader,
}: VideoPreviewProps) => {
  const videoDetails = videoDetailsGetter(videoId);
  return videoDetails ? (
    <div style={{ display: "flex" }}>
      <ImagePreviewComponent videoDetails={videoDetails} />
      <div style={{ paddingLeft: "10px" }}>
        <DescriptionComponent videoDetails={videoDetails} />
      </div>
    </div>
  ) : (
    <LoaderComponet />
  );
};

const VideosList = ({}) => {
  return (
    <div className="listWrapper">
      <VideoPreview videoId={"testVideo"} />
      <br />
      <VideoPreview
        videoId={"testStream"}
        videoDetailsGetter={useStreamDetails}
        DescriptionComponent={StreamDescription as any}
      />
    </div>
  );
};

export default VideosList;
