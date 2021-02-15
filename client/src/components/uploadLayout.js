import React from "react";
import DirectionPreviews from "./directionsPreviews";
import IngredientPreviews from "./ingredientPreviews";
import PaddingWrapper from "./paddingWrapper";
import UploaderProfileBar from "./uploaderProfileBar";

const UploadLayout = ({ details, title, imageSrc, ingredients, directions }) => {
  //if there is details show it instead its defaults
  const convertDate = (date) => {
    return new Date(date).toLocaleString().slice(0, 9);
  };
  return (
    <PaddingWrapper>
      <h2 className="text-5xl font-bold my-5">{details.title || title}</h2>
      {details && (
        <div className="flex items-center gap-5">
          <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
          <p className="my-4 pb-3 text-gray-400">{convertDate(details.created_at)}</p>
        </div>
      )}
      <img
        src={details.image_url || imageSrc}
        className="relative object-cover max-h-screen w-full"
        alt="Visual of the recipe posted."
      />

      <div className=" md:px-0">
        <ul>
          {details ? (
            <IngredientPreviews ingredientList={details.ingredients} />
          ) : (
            <IngredientPreviews ingredientList={ingredients} />
          )}
        </ul>
        <hr className="my-6" />

        {details.directions ? (
          <DirectionPreviews directionList={details.directions} />
        ) : (
          <DirectionPreviews directionList={directions} />
        )}
      </div>
    </PaddingWrapper>
  );
};

export default UploadLayout;
