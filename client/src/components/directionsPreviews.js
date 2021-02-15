import React from "react";

const DirectionPreviews = ({ directionList }) => {
  return (
    <>
      <h3 className="font-bold text-3xl">Directions</h3>
      <ol className="list-decimal">
        {directionList &&
          directionList.map((item, i) => {
            return (
              <li className="ml-4 my-3 text-lg " key={i}>
                {item}
              </li>
            );
          })}
      </ol>
    </>
  );
};

export default DirectionPreviews;
