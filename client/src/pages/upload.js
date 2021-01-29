import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";

const Upload = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history]);

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
  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!previewSource || !title || !description) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage) => {
    console.log(base64EncodedImage);
    //will be done through redux instead later
    try {
      await fetch("http://localhost:5000/upload/submit", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ data: base64EncodedImage, title, description }),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div>
        <form
          onSubmit={handleSubmitPost}
          className="flex flex-col justify-center items-center padding"
        >
          <h1>Upload Form</h1>
          <Input type="file" name="image" onChange={handleFileInputState} value={fileInputState} />
          <Input
            type="text"
            name="title"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            rows="5"
            placeholder="Description"
            className="px-5 py-2 rounded outline-none w-3/4 md:w-1/2 mx-auto my-3 "
          />
          <Button type="submit">Submit</Button>
        </form>
        {previewSource && (
          <img
            src={previewSource}
            alt="User selected image"
            style={{ height: "300px" }}
            className="mx-auto mt-10"
          />
        )}
      </div>
    </Layout>
  );
};

export default Upload;
