import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Layout from "../components/layout";
import PaddingWrapper from "../components/paddingWrapper";
import { getSavedUploads } from "../redux/Actions/saveUploadsActions";
import PostPreview from "../components/postPreview";

const SavedPosts = () => {
  const dispatch = useDispatch();
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const saveUploads = useSelector((state) => state.saveUploads);
  const { isSaved } = saveUploads;

  const savedPosts = useSelector((state) => state.savedPosts);
  const { savedPosts: posts } = savedPosts;

  useEffect(() => {
    if (loggedInUserDetails) {
      dispatch(getSavedUploads());
    }
  }, [dispatch, loggedInUserDetails, isSaved]);

  return (
    <Layout>
      <PaddingWrapper className="pt-20">
        <section>
          <h1 className="text-4xl font-semibold ">Saved Posts</h1>
          {posts && (
            <div className="flex flex-col justify-start  gap-10 pt-20 md:gap-20 lg:gap-12">
              {posts.map((post) => {
                return <PostPreview post={post} key={post.upload_id} />;
              })}
            </div>
          )}
        </section>
      </PaddingWrapper>
    </Layout>
  );
};

export default SavedPosts;
