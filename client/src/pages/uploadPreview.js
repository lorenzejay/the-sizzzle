import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/button";
import ErrorMessage from "../components/errorMessage";
import Layout from "../components/layout";
import Loader from "../components/loader";
import PaddingWrapper from "../components/paddingWrapper";
import UploadLayout from "../components/uploadLayout";
import { uploadUsersPost } from "../redux/Actions/uploadActions";
import UploadProgressTimeline from "../components/uploadProgressTimeline";

const UploadPreview = ({ location, history }) => {
  const dispatch = useDispatch();
  const recipe = location.state;
  const { category, difficulty, directionList, imageSrc, ingredientList, title } = recipe;

  const [uploadError, setUploadError] = useState("");

  const uploadPost = useSelector((state) => state.uploadPost);
  const { loading, error } = uploadPost;

  //   console.table(recipe);
  const handleSubmitPost = async () => {
    if (
      !imageSrc ||
      !title ||
      ingredientList.length === 0 ||
      directionList.length === 0 ||
      !difficulty ||
      !category
    ) {
      return setUploadError("Nothing should be blank before uploading");
    }
    await dispatch(
      uploadUsersPost(title, ingredientList, directionList, difficulty, category, imageSrc)
    );
    if (!error) {
      history.push("/");
    } else {
      setUploadError("Could not upload image, please try again. ");
    }
  };

  return (
    <Layout>
      <PaddingWrapper>
        {loading && <Loader />}
        <UploadProgressTimeline step1={false} step2={false} step3={false} step4={true} />
        <h1 className="font-semibold text-2xl underline">Preview</h1>
        {uploadError && <ErrorMessage>{uploadError}</ErrorMessage>}
      </PaddingWrapper>
      <UploadLayout
        imageSrc={recipe.imageSrc}
        title={recipe.title}
        ingredients={recipe.ingredientList}
        directions={recipe.directionList}
        difficulty={recipe.difficulty}
        category={recipe.category}
      />
      <PaddingWrapper>
        <section className="flex justify-between my-5 w-full">
          <Link
            className="w-full"
            to={{ pathname: "/upload-difficulty-category", state: { ...location.state } }}
          >
            <Button className="flex justify-around">Back</Button>
          </Link>
          <Button className="" type="button" onClick={handleSubmitPost}>
            Upload
          </Button>
        </section>
      </PaddingWrapper>
    </Layout>
  );
};

export default UploadPreview;
