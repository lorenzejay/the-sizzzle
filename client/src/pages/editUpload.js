import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import UploaderProfileBar from "../components/uploaderProfileBar";
import { getUploadDetails, updateUpload } from "../redux/Actions/uploadActions";
import ErrorMessage from "../components/errorMessage";
import Button from "../components/button";
import Loader from "../components/loader";
import DeleteUpload from "../components/deleteUpload";
import Input from "../components/input";

const EditUpload = ({ location, history }) => {
  const dispatch = useDispatch();
  const path = location.pathname;
  const uploadIdFromPath = path.substring(11, path.length);

  const uploadDetails = useSelector((state) => state.uploadDetails);
  const { details, loading, error } = uploadDetails;

  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const deleteUpload = useSelector((state) => state.deleteUpload);
  const { deleteStatus } = deleteUpload;

  const [title, setTitle] = useState("");
  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [direction, setDirection] = useState("");
  const [directionList, setDirectionList] = useState([]);
  const [uploadError, setUploadError] = useState([]);
  const [updateError, setUpdateError] = useState("");

  useEffect(() => {
    if (userInfo) {
      dispatch(getUploadDetails(uploadIdFromPath));
    }
  }, [dispatch, uploadIdFromPath, userInfo]);

  useEffect(() => {
    if (details) {
      setIngredientList(details.ingredients);
      setDirectionList(details.directions);
      setTitle(details.title);
    }
  }, [details]);

  useEffect(() => {
    if (deleteStatus) {
      history.push(`/dashboard/${loggedInUserDetails.username}`);
    }
  }, [deleteStatus]);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo]);

  const convertDate = (date) => {
    // return new Date(date).toString().slice(4, 15).replaceAt(6, ", ");
    return new Date(date).toLocaleString().slice(0, 8);
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

  const updateUploadPost = (e) => {
    e.preventDefault();
    if (title !== "" && ingredientList !== [] && direction !== []) {
      dispatch(updateUpload(title, ingredientList, directionList, uploadIdFromPath));
      setUpdateError("");
      window.location.reload();
    } else {
      setUpdateError("Nothing cannot be blank.");
    }
  };

  details && console.log(details.directions);
  console.log(directionList);
  return (
    <Layout>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {details && (
        <PaddingWrapper>
          {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
          <DeleteUpload upload_id={details.upload_id} className="float-right" />
          <form onSubmit={updateUploadPost}>
            <input
              placeholder="Title"
              value={title}
              name="title"
              onChange={(e) => setTitle(e.target.value)}
              className="border-none text-3xl w-full"
            />
            <div className="flex items-center gap-5">
              <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
              <p className="my-4 pb-3 text-gray-400">{convertDate(details.created_at)}</p>
            </div>
            <img src={details.image_url} className="relative object-cover max-h-screen w-full" />
            <h3 className="text-2xl font-bold">Ingredients</h3>
            <ul>
              {ingredientList.map((item, i) => (
                <li key={i} className="flex flex-row gap-3 items-center my-1 text-lg">
                  <input type="checkbox" />
                  {item}
                </li>
              ))}
            </ul>
            <hr className="my-3" />
            <h3 className="text-2xl font-bold">Directions</h3>
            <ol className="list-decimal">
              {directionList.map((item, i) => (
                <li key={i} className=" my-1 text-lg">
                  {item}
                </li>
              ))}
            </ol>
            <div className="flex flex-row w-3/4 md:w-1/2 lg:w-full my-3 items-center">
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
            <div className="flex flex-row w-3/4 md:w-1/2 lg:w-full my-3 items-center">
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
            <Button type="submit" className="mb-10">
              Update
            </Button>
          </form>
        </PaddingWrapper>
      )}
    </Layout>
  );
};

export default EditUpload;
