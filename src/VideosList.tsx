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

type VideoPreviewImageProps = Pick<VideoDetails, "previewUrl">;
const VideoPreviewImage = ({ previewUrl }: VideoPreviewImageProps) => {
  return <img className="videoImg" alt="video preview" src={previewUrl} />;
};

type VideoDescriptionProps = Pick<VideoDetails, "title" | "author">;
const VideoDescription = ({ title, author }: VideoDescriptionProps) => {
  return (
    <>
      <div style={{ fontWeight: "bold" }}>{title}</div>
      <div style={{ color: "#808080" }}>{author}</div>
    </>
  );
};

type StreamDescriptionProps = VideoDescriptionProps &
  Pick<StreamDetails, "watching">;
const StreamDescription = ({ watching, ...rest }: StreamDescriptionProps) => {
  return (
    <>
      <VideoDescription {...rest} />
      <div style={{ color: "#808080" }}>{watching} watching</div>
      <span className="liveBadge">live</span>
    </>
  );
};

const Loader = ({}) => <span>{"loading..."}</span>;

type VideoPreviewProps<T extends VideoDetails> = {
  videoDetails: T;
  renderImagePreview?: (video: T) => React.ReactElement;
  renderDescription?: (video: T) => React.ReactElement;
};

const VideoPreviewTemplate = <T extends VideoDetails>({
  videoDetails,
  renderImagePreview = (video) => (
    <VideoPreviewImage previewUrl={video.previewUrl} />
  ),
  renderDescription = (video) => <VideoDescription {...video} />,
}: VideoPreviewProps<T>) => {
  return (
    <div style={{ display: "flex" }}>
      {renderImagePreview(videoDetails)}
      <div style={{ paddingLeft: "10px" }}>
        {renderDescription(videoDetails)}
      </div>
    </div>
  );
};

const SelfLoadingVideoPreview = <T extends VideoDetails>({
  videoId,
  useVideoDetails,
  renderVideoPreview = (video) => <VideoPreviewTemplate videoDetails={video} />,
  LoaderComponent = Loader,
}: {
  videoId: string;
  useVideoDetails: (videoId: string) => T;
  renderVideoPreview?: (video: T) => React.ReactElement;
  LoaderComponent?: React.FunctionComponent<{}>;
}) => {
  const videoDetails = useVideoDetails(videoId);
  return videoDetails ? renderVideoPreview(videoDetails) : <LoaderComponent />;
};

const loadData = () =>
  Promise.all([loadVideoDetails("video"), loadStreamDetails("stream")]);

const VideosList = ({}) => {
  const [videos, setVideos] = React.useState<VideoDetails[]>([]);
  React.useEffect(() => {
    loadData().then(setVideos);
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {videos.map((video) => {
        if ("watching" in video) {
          return (
            <VideoPreviewTemplate
              videoDetails={video as StreamDetails}
              renderDescription={(video) => <StreamDescription {...video} />}
            />
          );
        }

        return <VideoPreviewTemplate videoDetails={video} />;
      })}
    </div>
  );
};

export default VideosList;
