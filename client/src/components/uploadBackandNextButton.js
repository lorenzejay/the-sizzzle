import React from "react";
import { Link } from "react-router-dom";
import Button from "./button";

const UploadBackandNextButton = ({ backPath, nextPath, state, disabled }) => {
  return (
    <section className="flex justify-between my-5">
      <Link className="flex" to={{ pathname: backPath, state }}>
        <Button className="">Back</Button>
      </Link>
      <Link
        to={{
          pathname: nextPath,
          state,
        }}
        className="flex"
      >
        <Button className="" disabled={disabled}>
          Next
        </Button>
      </Link>
    </section>
  );
};

export default UploadBackandNextButton;
