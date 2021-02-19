import React, { useEffect, useState } from "react";
import DirectionPreviews from "../components/directionsPreviews";
import IngredientPreviews from "../components/ingredientPreviews";
import PaddingWrapper from "../components/paddingWrapper";
import Input from "../components/input";
import Layout from "../components/layout";
import UploadProgressTimeline from "../components/uploadProgressTimeline";
import UploadBackandNextButton from "../components/uploadBackandNextButton";

const UploadIngredientsAndDirections = ({ location }) => {
  // console.log(location.state);

  const [ingredient, setIngredient] = useState("");
  const [ingredientList, setIngredientList] = useState([]);
  const [direction, setDirection] = useState("");
  const [directionList, setDirectionList] = useState([]);

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

  useEffect(() => {
    if (location.state.ingredientList && location.state.directionList) {
      setDirectionList(location.state.directionList);
      setIngredientList(location.state.ingredientList);
    }
  }, [location]);
  return (
    <Layout>
      <UploadProgressTimeline step1={false} step2={true} step3={false} step4={false} />

      <PaddingWrapper>
        <IngredientPreviews ingredientList={ingredientList} />

        <DirectionPreviews directionList={directionList} />
        <div className="flex flex-row my-3 items-center">
          <Input
            type="text"
            name="ingredients"
            placeholder="Input Ingredient"
            onChange={(e) => setIngredient(e.target.value)}
            value={ingredient}
            className="flex-grow"
          />
          <button
            type="button"
            onClick={handleIngredients}
            className="w-auto cursor-pointer outline-none hover:bg-green-400 text-xl px-2 border-r-2"
          >
            Add
          </button>
          <button
            type="button"
            onClick={undoLastIngredient}
            className="w-auto cursor-pointer outline-none hover:bg-red-400 text-xl px-2"
          >
            Undo
          </button>
        </div>

        <div className="flex flex-row  my-3 items-center">
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
            className="w-auto cursor-pointer outline-none hover:bg-green-400 text-xl h-auto px-2 border-r-2"
          >
            Add
          </button>
          <button
            type="button"
            onClick={undoLastDirection}
            className="w-auto cursor-pointer outline-none hover:bg-red-400 text-xl h-auto px-2"
          >
            Undo
          </button>
        </div>
        <UploadBackandNextButton
          backPath={"/upload"}
          state={{ ...location.state, ingredientList, directionList }}
          nextPath="/upload-difficulty-category"
          // nextState={{ ...location.state, ingredientList, directionList }}
          disabled={ingredientList.length === 0 || directionList.length === 0 ? true : false}
        />
      </PaddingWrapper>
    </Layout>
  );
};

export default UploadIngredientsAndDirections;
