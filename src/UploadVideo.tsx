import React from "react";
import "./UploadVideo.css";
import { VideoDetails, VideoPreviewTemplate } from "./VideosList";

const UploadVideo = ({}) => {
  const [video, setVideo] = React.useState<VideoDetails>({
    previewUrl: "https://i.ytimg.com/vi/BlNwQdqdRig/hqdefault.jpg",
    title: "функціональний TypeScript: функція curry",
    author: "@AleksandrSugak",
  });

  const updateVideo = (data: Partial<VideoDetails>) => {
    setVideo({ ...video, ...data });
  };

  return (
    <div>
      <div className="form-container">
        <h2>Edit Video Details</h2>
        <form id="video-details-form">
          <div className="form-group">
            <label htmlFor="video-url">Video URL</label>
            <input
              type="text"
              id="video-url"
              name="video-url"
              value={video.previewUrl}
              onChange={(e) => updateVideo({ previewUrl: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="video-title">Video Title</label>
            <input
              type="text"
              id="video-title"
              name="video-title"
              value={video.title}
              onChange={(e) => updateVideo({ title: e.target.value })}
            />
          </div>
          <div className="form-group">
            <label htmlFor="video-author">Video Author</label>
            <input
              type="text"
              id="video-author"
              name="video-author"
              value={video.author}
              onChange={(e) => updateVideo({ author: e.target.value })}
            />
          </div>
        </form>
      </div>
      <div className="previewContainer">
        <VideoPreviewTemplate videoDetails={video} />
      </div>
    </div>
  );
};

export default UploadVideo;
