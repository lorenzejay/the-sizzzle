import React from "react";
import DirectionPreviews from "./directionsPreviews";
import IngredientPreviews from "./ingredientPreviews";
import PaddingWrapper from "./paddingWrapper";
import UploaderProfileBar from "./uploaderProfileBar";
import convertDate from "../components/date";
import DifficultyAndCategory from "./difficultyAndCategory";
const UploadLayout = ({
  details,
  title,
  imageSrc,
  ingredients,
  directions,
  difficulty,
  category,
}) => {
  return (
    <PaddingWrapper>
      <h2 className="text-5xl font-bold my-5">{title}</h2>

      {details && (
        <div className="flex items-center justify-between ">
          <UploaderProfileBar uploaded_by={details.uploaded_by} className="w-full " />
          <p className="my-4 pb-3 text-gray-400 text-sm sm:text-lg lg:text-xl">
            {convertDate(details.created_at)}
          </p>
        </div>
      )}
      <DifficultyAndCategory difficulty={difficulty} category={category} />

      <img
        src={imageSrc}
        className="relative object-cover max-h-mobileMax lg:h-auto xl:max-h-extended w-full"
        alt="Visual of the recipe posted."
      />

      <div className="my-5">
        <IngredientPreviews ingredientList={ingredients} />

        <hr className="my-6" />

        <DirectionPreviews directionList={directions} />
      </div>
    </PaddingWrapper>
  );
};

export default UploadLayout;
