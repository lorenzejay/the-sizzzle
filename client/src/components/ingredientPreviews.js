import React from "react";

const IngredientPreviews = ({ ingredientList }) => {
  return (
    <>
      <h3 className="font-bold text-3xl">Ingredients</h3>
      <ul>
        {ingredientList &&
          ingredientList.map((item, i) => {
            return (
              <li className="flex flex-row gap-3 items-center my-1 text-lg" key={i}>
                <input type="checkbox" />
                {item}
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default IngredientPreviews;
