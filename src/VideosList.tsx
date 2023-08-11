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
  videoId: string;
  renderImagePreview?: (video: T) => React.ReactElement;
  renderDescription?: (video: T) => React.ReactElement;
  LoaderComponet?: React.FunctionComponent<{}>;
};

const getVideoPreview =
  <T extends VideoDetails>(
    videoDetailsGetter: (videoId: string) => T | undefined
  ) =>
  ({
    videoId,
    renderImagePreview = (video) => (
      <VideoPreviewImage previewUrl={video.previewUrl} />
    ),
    renderDescription = (video) => <VideoDescription {...video} />,
    LoaderComponet = Loader,
  }: VideoPreviewProps<T>) => {
    const videoDetails = videoDetailsGetter(videoId);
    return videoDetails ? (
      <div style={{ display: "flex" }}>
        {renderImagePreview(videoDetails)}
        <div style={{ paddingLeft: "10px" }}>
          {renderDescription(videoDetails)}
        </div>
      </div>
    ) : (
      <LoaderComponet />
    );
  };

const VideoPreview = getVideoPreview(useVideoDetails);
const StreamPreview = getVideoPreview(useStreamDetails);

const VideosList = ({}) => {
  return (
    <div className="listWrapper">
      <VideoPreview videoId={"testVideo"} />
      <br />
      <StreamPreview
        videoId={"testStream"}
        renderDescription={(video) => <StreamDescription {...video} />}
      />
    </div>
  );
};

export default VideosList;
