import React, { useEffect, useState } from "react";
import Layout from "../components/layout";
import UploadProgressTimeline from "../components/uploadProgressTimeline";
import foodCategories from "../data/foodCategories.json";
import PaddingWrapper from "../components/paddingWrapper";
import UploadBackandNextButton from "../components/uploadBackandNextButton";

const UploadDifficulty = ({ location }) => {
  const [difficulty, setDifficulty] = useState("");
  const [category, setCategory] = useState("");

  // console.log(location.state);

  useEffect(() => {
    if (location.state.category && location.state.difficulty) {
      setCategory(location.state.category);
      setDifficulty(location.state.difficulty);
    }
  }, [location]);

  return (
    <Layout>
      <UploadProgressTimeline step1={false} step2={false} step3={true} step4={false} />
      <PaddingWrapper>
        <h3 className="font-bold text-3xl">Categories</h3>
        <select
          placeholder="categories"
          onChange={(e) => setCategory(e.target.value)}
          value={category}
        >
          <option value="">Choose from the popular categories</option>
          {foodCategories.map((category) => (
            <option key={category.id} value={category.type.toLowerCase()}>
              {category.type}
            </option>
          ))}
        </select>

        <h3 className="font-bold text-3xl mt-10">Difficulty</h3>
        <select
          placeholder="border-2"
          onChange={(e) => setDifficulty(e.target.value)}
          value={difficulty}
        >
          <option value="">Choose difficulty of the recipe</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
          <option value="extreme">Extreme</option>
        </select>

        <UploadBackandNextButton
          backPath={"/upload-ingredients-directions"}
          state={{ ...location.state, difficulty, category }}
          nextPath={"/upload-preview"}
          // nextState={{ ...location.state, difficulty, category }}
          disabled={difficulty === "" || category === "" ? true : false}
        />
      </PaddingWrapper>
    </Layout>
  );
};

export default UploadDifficulty;
