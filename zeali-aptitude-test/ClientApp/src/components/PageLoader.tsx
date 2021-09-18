import { Backdrop } from "@material-ui/core";
import ReactAudioPlayer from "react-audio-player";

const backdropStyle = {
  maxWidth: 500,
  margin: "auto",
  zIndex: 2,
  background: "#3b5998",
};

const textStyle = {
  color: "white",
};

type PageLoadProps = {
  label: string;
  start: boolean;
};

const PageLoader = ({ label, start }: PageLoadProps) => {
  const takeTestSound = require("../assets/TakeTest.ogg").default;
  const endTestSound = require("../assets/EndTest.ogg").default;

  return (
    <>
      <ReactAudioPlayer
        src={start ? takeTestSound : endTestSound}
        autoPlay={true}
      />

      <Backdrop open style={backdropStyle}>
        <h1 style={textStyle}>{label}</h1>
      </Backdrop>
    </>
  );
};

export default PageLoader;
