import Topnav from "../component/topnav/topnav";
import TitleL from "../component/text/title-l";
import TitleM from "../component/text/title-m";
import PlaylistCardS from "../component/cards/playlist-card-s";
import PlaylistCardM from "../component/cards/playlist-card-m";
import React, { useState } from "react";
import ReactDOM from "react-dom";
// import styles from "./home.module.css";

import { PLAYLIST } from "../data/index";
import "./styles.css";

function Dashboard() {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  return (
    <div>
        
    </div>
  );
}

export default Dashboard;
