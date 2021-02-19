import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";
import UploadProgressSlider from "../components/uploadProgressTimeline";
import { Link } from "react-router-dom";
import PaddingWrapper from "../components/paddingWrapper";

const Upload = ({ history, location }) => {
  // console.log(location.state);
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  //if a user goes back from recipe upload
  useEffect(() => {
    if (location.state) {
      setPreviewSource(location.state.imageSrc);
      setTitle(location.state.title);
    }
  }, [location]);

  const handleFileInputState = (e) => {
    //grabs the first file
    const file = e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //convers images into a string
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  return (
    <Layout>
      <PaddingWrapper>
        <form className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold uppercase my-10 text-center">
            Post your dishes <span>🔥</span>
          </h1>
          <UploadProgressSlider step1={true} step2={false} step3={false} step4={false} />

          {previewSource && (
            <div className="preview flex flex-col ">
              <h3 className="">Preview</h3>
              <h2 className="text-5xl font-bold my-5">{title}</h2>
              {previewSource && (
                <img
                  src={previewSource}
                  alt="Preview of upload media."
                  className="relative object-cover max-h-limit xl:max-h-extended w-full"
                />
              )}
            </div>
          )}
          <Input
            type="file"
            name="image"
            onChange={handleFileInputState}
            value={fileInputState}
            className="w-full "
          />
          <Input
            type="text"
            name="title"
            placeholder="A non-boring title here."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full"
          />

          <Button
            type="button"
            className="mb-10 flex w-full"
            disabled={title === "" || !previewSource ? true : false}
          >
            <Link
              to={{
                pathname: "/upload-ingredients-directions",
                state: { ...location.state, imageSrc: previewSource, title },
              }}
              className="w-full"
            >
              Next
            </Link>
          </Button>
        </form>
      </PaddingWrapper>
    </Layout>
  );
};

export default Upload;
