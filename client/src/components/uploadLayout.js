import React from "react";
import PaddingWrapper from "./paddingWrapper";
import UploaderProfileBar from "./uploaderProfileBar";

const UploadLayout = ({ details, title, imageSrc, ingredients, directions }) => {
  //if there is details show it instead its defaults
  const convertDate = (date) => {
    // return new Date(date).toString().slice(4, 15).replaceAt(6, ", ");
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
        <h3 className="text-2xl font-bold mt-5">Ingredients</h3>
        <ul>
          {details
            ? details.ingredients.map((item, i) => (
                <li key={i} className="flex flex-row gap-3 items-center my-1 text-lg">
                  <input type="checkbox" />
                  {item}
                </li>
              ))
            : ingredients.map((item, i) => (
                <li key={i} className="flex flex-row gap-3 items-center my-1 text-lg">
                  <input type="checkbox" />
                  {item}
                </li>
              ))}
        </ul>
        <hr className="my-6" />

        <h3 className="text-2xl font-bold">Directions</h3>
        <ol className="list-decimal">
          {details.directions
            ? details.directions.map((item, i) => {
                return (
                  <li className="ml-4 my-1 text-lg " key={i}>
                    {item}
                  </li>
                );
              })
            : directions.map((item, i) => {
                return (
                  <li className="ml-4 my-1 text-lg " key={i}>
                    {item}
                  </li>
                );
              })}
        </ol>
      </div>
    </PaddingWrapper>
  );
};

export default UploadLayout;
