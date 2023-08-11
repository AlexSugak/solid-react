import React from "react";
import "./App.css";
import VideosList from "./VideosList";
import UploadVideo from "./UploadVideo";

function App() {
  const [activePage, setActivePage] = React.useState<
    "videosList" | "uploadVideo"
  >("videosList");

  return (
    <div className="wrapper">
      <header className="header">SOLID React</header>
      <div className="content-wrapper">
        <aside className="sidebar">
          <div>
            <a
              href="#"
              onClick={(e) => {
                setActivePage("videosList");
                e.preventDefault();
              }}
            >
              Videos list
            </a>
          </div>
          <div>
            <a
              href="#"
              onClick={(e) => {
                setActivePage("uploadVideo");
                e.preventDefault();
              }}
            >
              Upload video
            </a>
          </div>
        </aside>
        <main className="main-content">
          {activePage === "videosList" ? <VideosList /> : <UploadVideo />}
        </main>
      </div>
      <footer className="footer">&copy;&nbsp;Oleksandr Suhak&nbsp;🇺🇦</footer>
    </div>
  );
}

export default App;
