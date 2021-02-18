import React from "react";

const IngredientPreviews = ({ ingredientList }) => {
  return (
    <section className="mb-5">
      <h3 className="font-bold text-3xl">Ingredients</h3>
      <ul>
        {ingredientList &&
          ingredientList.map((item, i) => {
            return (
              <li className="flex flex-row items-center my-3 text-lg" key={i}>
                <input type="checkbox" className="mr-3" />
                {item}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default IngredientPreviews;
