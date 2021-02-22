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
import foodCategories from "../data/foodCategories.json";

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
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [direction, setDirection] = useState("");
  const [directionList, setDirectionList] = useState([]);
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
      setDifficulty(details.difficulty);
      setCategory(details.category);
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
    if (
      title !== "" &&
      ingredientList !== [] &&
      direction !== [] &&
      difficulty !== "" &&
      category !== ""
    ) {
      dispatch(
        updateUpload(title, ingredientList, directionList, difficulty, category, uploadIdFromPath)
      );
      setUpdateError("");
      window.location.reload();
    } else {
      setUpdateError("Nothing cannot be blank.");
    }
  };

  // details && console.log(details.directions);

  return (
    <Layout>
      {loading && <Loader />}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {details && (
        <PaddingWrapper>
          {updateError && <ErrorMessage>{updateError}</ErrorMessage>}
          <DeleteUpload upload_id={details.upload_id} className="float-right mb-5" />
          <form onSubmit={updateUploadPost} className="float-left w-full">
            <textarea
              name="title"
              id="title"
              className="text-5xl w-full min-h-full font-bold outline-none break-words border-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></textarea>

            <div className="flex items-center gap-5">
              <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
              <p className="my-4 pb-3 text-gray-400">{convertDate(details.created_at)}</p>
            </div>

            <section className="my-3 flex justify-start text-base uppercase">
              <p className="bg-red-500 px-3 rounded-sm mr-5">{difficulty}</p>
              <p className="bg-gray-300 px-3 rounded-sm ">{category}</p>
            </section>
            <section className="flex items-center mb-5">
              <select
                placeholder="border-2"
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
                className="w-1/4 lg:w-1/2"
              >
                <option value="">Choose difficulty of the recipe</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="extreme">Extreme</option>
              </select>

              <select
                placeholder="categories"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
                className="w-1/4 lg:w-1/2"
              >
                <option value="">Choose from the popular categories</option>
                {foodCategories.map((category) => (
                  <option key={category.id} value={category.type.toLowerCase()}>
                    {category.type}
                  </option>
                ))}
              </select>
            </section>

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
                <li key={i} className="ml-4 my-1 text-lg">
                  {item}
                </li>
              ))}
            </ol>
            <div className="flex flex-row my-3 items-center">
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
            <div className="flex flex-row my-3 items-center">
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
