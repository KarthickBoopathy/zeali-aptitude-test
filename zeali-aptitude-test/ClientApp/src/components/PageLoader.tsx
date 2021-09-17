import { Backdrop } from "@material-ui/core";
import { useEffect, useState } from "react";

const backdropStyle = {
  maxWidth: 500,
  margin: "auto",
  zIndex: 2,
  background: "#73a2b6",
};

const textStyle = {
  color: "white"
};

export const PageLoader = () => {
  const [pageLoad, SetPageLoad] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      SetPageLoad(false);
    }, 1000);
  }, []);

  return (
    <>
      {pageLoad ? (
        <Backdrop open style={backdropStyle}>
          <h1 style={textStyle}>Zeali</h1>
        </Backdrop>
      ) : (
        <></>
      )}
    </>
  );
};

export default PageLoader;
