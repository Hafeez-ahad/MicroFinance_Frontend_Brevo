import React from "react";
import { Audio, ThreeDots, CirclesWithBar } from "react-loader-spinner";

const practise = () => {
  return (
    <div
      >
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="black"
        radius="9"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass="loader-div"
      />
    </div>
  );
};

export default practise;
