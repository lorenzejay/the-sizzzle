import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/button";
import Input from "../components/input";
import Layout from "../components/layout";
import Loader from "../components/loader";
import IngredientPreviews from "../components/ingredientPreviews";
import { uploadUsersPost } from "../redux/Actions/uploadActions";
import ErrorMessage from "../components/errorMessage";
import DirectionPreviews from "../components/directionsPreviews";

const Upload = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const uploadPost = useSelector((state) => state.uploadPost);
  const { postResult, error, loading } = uploadPost;

  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");

  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [direction, setDirection] = useState("");
  const [directionList, setDirectionList] = useState([]);
  const [uploadError, setUploadError] = useState([]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  useEffect(() => {
    if (postResult && postResult.success) {
      history.push("/");
    }
  }, [dispatch, history, postResult]);

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
    if (!previewSource || !title || ingredientList.length === 0) {
      setUploadError("Nothing must be blank before uploading");
    }
    // uploadImage(previewSource);
    dispatch(uploadUsersPost(title, ingredientList, directionList, previewSource));
    if (postResult && !error) {
      history.push("/");
    }
  };
  const handleIngredients = () => {
    if (ingredient !== "") {
      setIngredientList([...ingredientList, ingredient]);
      setIngredient("");
    } else {
      window.alert("Invisble ingredient? I think not. Please input an ingredient.");
    }
  };

  const undoLastIngredient = () => {
    const lastItem = ingredientList.pop();
    // console.log(lastItem);
    const filteredList = ingredientList.filter((list) => list !== lastItem);
    setIngredientList(filteredList);
  };

  const handleDirectionLists = () => {
    if (direction !== "") {
      setDirectionList([...directionList, direction]);
      setDirection("");
    } else {
      window.alert("Invisble direction? I think not. Please input an direction.");
    }
  };

  const undoLastDirection = () => {
    const lastItem = directionList.pop();
    // console.log(lastItem);
    const filteredList = directionList.filter((list) => list !== lastItem);
    setDirectionList(filteredList);
  };

  // console.log(title);
  return (
    <Layout>
      <div>
        {loading && <Loader />}
        <form onSubmit={handleSubmitPost} className="flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold uppercase my-10 text-center">
            Post your fire dishes <span>🔥</span>
          </h1>
          {uploadError && (
            <div className={`${uploadError && "hidden"}`}>
              <ErrorMessage>{uploadError}</ErrorMessage>
            </div>
          )}
          {previewSource && (
            <div className="preview flex flex-col w-3/4 md:w-1/2">
              <h3 className="">Preview</h3>
              <h2 className="text-5xl font-bold my-5">{title}</h2>
              {previewSource && (
                <img
                  src={previewSource}
                  alt="Preview of upload media."
                  className="relative object-cover max-h-screen w-full"
                />
              )}
              <IngredientPreviews ingredientList={ingredientList} />

              <DirectionPreviews directionList={directionList} />
            </div>
          )}
          <Input type="file" name="image" onChange={handleFileInputState} value={fileInputState} />
          <Input
            type="text"
            name="title"
            placeholder="A non-boring title here."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <div className="flex flex-row w-3/4 md:w-1/2 my-3 items-center">
            <Input
              type="text"
              name="ingredients"
              placeholder="List your secret ingredients"
              onChange={(e) => setIngredient(e.target.value)}
              value={ingredient}
              className="flex-grow"
            />
            <button
              type="button"
              onClick={handleIngredients}
              className="w-auto cursor-pointer outline-none hover:bg-green-400 text-xl px-2"
            >
              +
            </button>
            <button
              type="button"
              onClick={undoLastIngredient}
              className="w-auto cursor-pointer outline-none hover:bg-red-400 text-xl px-2"
            >
              Undo
            </button>
          </div>

          <div className="flex flex-row w-3/4 md:w-1/2 my-3 items-center">
            <textarea
              name="direction"
              placeholder="Directions"
              onChange={(e) => setDirection(e.target.value)}
              value={direction}
              className="flex-grow px-5 py-2 rounded"
            />
            <button
              type="button"
              onClick={handleDirectionLists}
              className="w-auto cursor-pointer outline-none hover:bg-green-400 text-xl h-auto px-2"
            >
              +
            </button>
            <button
              type="button"
              onClick={undoLastDirection}
              className="w-auto cursor-pointer outline-none hover:bg-red-400 text-xl h-auto px-2"
            >
              Undo
            </button>
          </div>
          {/* <RichTextEditor description={description} setDescription={setDescription} /> */}
          <Button type="submit" className="w-3/4 md:w-1/2">
            Post
          </Button>
        </form>
      </div>
    </Layout>
  );
};

export default Upload;
