import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";
import Loader from "../components/loader";
// import RichTextEditor from "../components/richTextEditor";
import { uploadUsersPost } from "../redux/Actions/uploadActions";
import RichTextEditor from "../components/richTextEditor";

const Upload = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uploadPost = useSelector((state) => state.uploadPost);
  const { postResult, error, loading } = uploadPost;

  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history]);

  // useEffect(() => {
  //   if (postResult && !error) {
  //     history.push("/");
  //   }
  // }, [dispatch, history, postResult]);

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
    if (!previewSource || !title || !description || !caption) return;
    // uploadImage(previewSource);
    dispatch(uploadUsersPost(title, caption, description, previewSource));
    if (postResult && !error) {
      history.push("/");
    }
  };

  return (
    <Layout>
      <div>
        {loading && <Loader />}
        <form
          onSubmit={handleSubmitPost}
          className="flex flex-col justify-center items-center padding"
        >
          <h1 className="text-xl uppercase">
            Post your fire dishes <span>🔥</span>
          </h1>
          <Input type="file" name="image" onChange={handleFileInputState} value={fileInputState} />
          <Input
            type="text"
            name="title"
            placeholder="A non-boring title here please"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <textarea
            name="caption"
            onChange={(e) => setCaption(e.target.value)}
            value={caption}
            rows="3"
            placeholder="Insert your fire caption here."
            className="px-5 py-2 rounded outline-none w-3/4 md:w-1/2 mx-auto my-3 "
          />

          <RichTextEditor description={description} setDescription={setDescription} />

          <Button type="submit">Submit</Button>
        </form>

        <div className="preview flex flex-col justify-center mx-auto">
          {previewSource && (
            <img
              src={previewSource}
              alt="User selected image"
              style={{ height: "300px" }}
              className="mx-auto mt-10"
            />
          )}
          {title && <h3 className="text-lg">{title}</h3>}
          {caption && <p className="text-lg">{caption}</p>}
          {description && <p>{description}</p>}
        </div>
      </div>
    </Layout>
  );
};

export default Upload;
