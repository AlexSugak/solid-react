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

type AsyncData<T> = { kind: "loadingInProgress" } | { kind: "ready"; value: T };

type VideoDetailsHook<T extends VideoDetails> = (
  videoId: string
) => AsyncData<T>;

const useVideoDetails: VideoDetailsHook<VideoDetails> = (videoId) => {
  const [videoDetails, setVideoDetails] = React.useState<
    AsyncData<VideoDetails>
  >({ kind: "loadingInProgress" });
  React.useEffect(() => {
    loadVideoDetails(videoId).then((vd) =>
      setVideoDetails({ kind: "ready", value: vd })
    );
  }, [videoId]);

  return videoDetails;
};

const useStreamDetails: VideoDetailsHook<StreamDetails> = (videoId) => {
  const [videoDetails, setVideoDetails] = React.useState<
    AsyncData<StreamDetails>
  >({ kind: "loadingInProgress" });
  React.useEffect(() => {
    loadStreamDetails(videoId).then((vd) =>
      setVideoDetails({ kind: "ready", value: vd })
    );
  }, [videoId]);

  return videoDetails;
};

const Loader = ({}) => {
  return <span>{"loading..."}</span>;
};

const VideoPreviewImage = ({
  videoDetails: { previewUrl },
}: {
  videoDetails: Pick<VideoDetails, "previewUrl">;
}) => {
  return <img className="videoImg" alt="video preview" src={previewUrl} />;
};

const VideoDescriptionWrapper = ({ children }: React.PropsWithChildren) => {
  return <div style={{ paddingLeft: "10px" }}>{children}</div>;
};

const VideoDescription = ({
  videoDetails,
}: {
  videoDetails: Pick<VideoDetails, "author" | "title">;
}) => {
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
      <div style={{ color: "#808080" }}>{videoDetails.watching}</div>
      <span className="liveBadge">LIVE</span>
    </>
  );
};

const WithLoader = <T,>({
  children,
  data,
}: {
  data: AsyncData<T>;
  children: (data: T) => React.ReactElement;
}) => {
  return data.kind === "loadingInProgress" ? <Loader /> : children(data.value);
};

// const VideoPreviewWithLoader = <T extends VideoDetails>({
//   videoDetails,
// }: {
//   videoDetails: AsyncData<T>;
// }) => {
//   <WithLoader data={videoDetails}>
//     {(videoDetails) => <VideoPreview videoDetails={videoDetails} />}
//   </WithLoader>;
// };

const VideoPreviewCard = <T extends VideoDetails>({
  videoDetails,
  VideoDescriptionComponent = VideoDescription,
}: {
  videoDetails: T;
  VideoDescriptionComponent?: React.FunctionComponent<{
    videoDetails: T;
  }>;
}) => {
  return (
    <div style={{ display: "flex" }}>
      <VideoPreviewImage videoDetails={videoDetails} />
      <VideoDescriptionWrapper>
        <VideoDescriptionComponent videoDetails={videoDetails} />
      </VideoDescriptionWrapper>
    </div>
  );
};

const VideoPreview = <T extends VideoDetails>({
  videoDetails,
  VideoDescriptionComponent = VideoDescription,
}: {
  videoDetails: AsyncData<T>;
  VideoDescriptionComponent?: React.FunctionComponent<{
    videoDetails: T;
  }>;
}) => {
  return videoDetails.kind === "loadingInProgress" ? (
    <Loader />
  ) : (
    <VideoPreviewCard
      videoDetails={videoDetails.value}
      VideoDescriptionComponent={VideoDescriptionComponent}
    />
  );
};

const defaultVideoPreview = VideoPreview;

const getSelfLoadingVideoPreview =
  <T extends VideoDetails>(useVideoDetailsHook: VideoDetailsHook<T>) =>
  ({
    videoId,
    VideoPreviewComponent = defaultVideoPreview,
  }: {
    videoId: string;
    VideoPreviewComponent?: React.FunctionComponent<{
      videoDetails: AsyncData<T>;
    }>;
  }) => {
    const videoDetails = useVideoDetailsHook(videoId);
    return <VideoPreviewComponent videoDetails={videoDetails} />;
  };

const SelfLoadingVideoPreview = getSelfLoadingVideoPreview(useVideoDetails);
const SelfLoadingStreamPreview = getSelfLoadingVideoPreview(useStreamDetails);

const StreamPreview = ({
  videoDetails,
}: {
  videoDetails: AsyncData<StreamDetails>;
}) => {
  return (
    <VideoPreview
      videoDetails={videoDetails}
      VideoDescriptionComponent={StreamDescription}
    />
  );
};

const loadAllVideos = () =>
  Promise.all([loadVideoDetails("a"), loadStreamDetails("b")]);

const VideosList = ({}) => {
  return (
    <div className="listWrapper">
      <SelfLoadingVideoPreview videoId={"testVideo"} />
      <br />
      <SelfLoadingVideoPreview videoId={"testVideo"} />
      <br />
      <SelfLoadingStreamPreview
        VideoPreviewComponent={StreamPreview}
        videoId={"testVideo"}
      />
    </div>
  );
};

type VideoPreviewRenderers = {
  video: (videoDetails: VideoDetails) => React.ReactElement;
  stream: (videoDetails: StreamDetails) => React.ReactElement;
  // ...
};

type AllVideos =
  | {
      kind: "video";
      value: VideoDetails;
    }
  | {
      kind: "stream";
      value: StreamDetails;
    }; // ...

const renders: VideoPreviewRenderers = {
  video: (videoDetails) => <VideoPreviewCard videoDetails={videoDetails} />,
  stream: (videoDetails) => (
    <VideoPreviewCard
      videoDetails={videoDetails}
      VideoDescriptionComponent={StreamDescription}
    />
  ),
};

const AllVideosList = ({}) => {
  const [videos, setVideos] = React.useState<(VideoDetails | StreamDetails)[]>(
    []
  );
  React.useEffect(() => {
    loadAllVideos().then(setVideos);
  }, []);

  return (
    <div className="listWrapper">
      {videos.map((v) =>
        "watching" in v ? (
          <VideoPreviewCard
            videoDetails={v}
            VideoDescriptionComponent={StreamDescription}
          />
        ) : (
          <VideoPreviewCard videoDetails={v} />
        )
      )}
    </div>
  );
};

export default AllVideosList;
