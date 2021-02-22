import React from "react";

const DifficultyAndCategory = ({ difficulty, category }) => {
  return (
    <section className="my-3 flex justify-start text-base uppercase">
      <p className="bg-red-500 px-3 rounded-sm mr-5">{difficulty}</p>
      <p className="bg-gray-300 px-3 rounded-sm ">{category}</p>
    </section>
  );
};

export default DifficultyAndCategory;
