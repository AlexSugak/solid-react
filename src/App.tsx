import React from "react";
import "./App.css";
import VideosList from "./VideosList";

function App() {
  return (
    <div className="wrapper">
      <header className="header">SOLID React</header>
      <div className="content-wrapper">
        <aside className="sidebar">Sidebar</aside>
        <main className="main-content">
          <VideosList />
        </main>
      </div>
      <footer className="footer">&copy;&nbsp;Oleksandr Suhak&nbsp;🇺🇦</footer>
    </div>
  );
}

export default App;