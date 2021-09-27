import { Backdrop } from "@material-ui/core";

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
};

const PageLoader = ({ label }: PageLoadProps) => {
  return (
    <>
      <Backdrop open style={backdropStyle}>
        <h1 style={textStyle}>{label}</h1>
      </Backdrop>
    </>
  );
};

export default PageLoader;
